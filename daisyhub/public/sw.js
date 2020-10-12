/** @type {ServiceWorkerGlobalScope} */
var _self = self;

const CACHE_STATIC = 'daisyhub-static-v1';
const CACHE_IMAGES = 'daisyhub-images-v1';
const CACHE_NAMES = [CACHE_STATIC, CACHE_IMAGES];

const staticFiles = ['/offline.html'];

_self.addEventListener('install', (event) => {
  console.log('install');
  _self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_STATIC).then((cache) => {
      return Promise.all(
        staticFiles.map((url) =>
          cache.add(url).catch((error) => {
            console.log('Failed to add', url, 'to the cache');
            console.error(error);
          }),
        ),
      );
    }),
  );
});

_self.addEventListener('activate', (event) => {
  console.log('activate');
  event.waitUntil(
    caches
      .keys()
      .then((keyList) => {
        return Promise.all(
          keyList.map((cacheKey) => {
            if (!CACHE_NAMES.includes(cacheKey)) return caches.delete(cacheKey);

            return Promise.resolve(null);
          }),
        );
      })
      .then(() => _self.clients.claim()),
  );
});

_self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  if (request.method !== 'GET' || url.origin !== location.origin) return;

  const imagesRegex = /(\.(png|jpg|jpeg|svg|ico))$/;
  if (imagesRegex.test(request.url)) {
    return event.respondWith(staleWhileRevalidate(CACHE_IMAGES, request));
  }

  if (request.mode === 'navigate') {
    return event.respondWith(fetch(request).catch((error) => caches.match('/offline.html')));
  }

  // Do nothing, the request won't show as handled by the SW
  return;
});

function staleWhileRevalidate(cacheName, request) {
  return caches.open(cacheName).then((cache) => {
    return cache.match(request).then((response) => {
      const fetchRequest = fetch(request).then((fetchResponse) => {
        cache.put(request, fetchResponse.clone());

        return fetchResponse;
      });

      return response || fetchRequest;
    });
  });
}

_self.addEventListener('push', (event) => {
  if (!event.data) return;

  const message = event.data.json();

  let notification = Promise.resolve();

  switch (message.type) {
    case 'TRIGGER':
      notification = _self.registration.showNotification("It's your turn", {
        body: 'This is a description',
        icon: '/images/icons/icon-192x192.png',
        data: { url: '/' },
      });
      break;
    case 'BULLETIN_MESSAGE': {
      const bulletinMessage = message.payload;

      notification = _self.registration.showNotification('There is a message in the queue', {
        body: bulletinMessage.message,
        icon: '/images/icons/icon-192x192.png',
        data: { url: '/bulletins/' + bulletinMessage.bulletinId },
      });
      break;
    }
    default:
      break;
  }

  event.waitUntil(notification);
});

_self.addEventListener('notificationclick', (event) => {
  const notification = event.notification;
  notification.close();

  event.waitUntil(
    _self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      const thereIsFocused = clientList.find((client) => client.focused);
      if (thereIsFocused) return;

      const hasWindowToFocus = clientList.length > 0;
      if (hasWindowToFocus) clientList[0].focus();

      if (!hasWindowToFocus) {
        _self.clients
          .openWindow(notification.data.url)
          .then((windowClient) => (windowClient ? windowClient.focus() : null));
      }
    }),
  );
});

_self.addEventListener('sync', (event) => {
  switch (event.tag) {
    case 'new-message': {
      const operation = getIDB('daisyhub', 1)
        .then((db) => {
          const request = db.transaction('new-messages').objectStore('new-messages').getAll();

          return promisifyRequest(request).then((messages) => {
            const fetches = messages.map((message) => {
              const { bulletinId, body } = message;

              return fetch(
                `https://europe-west2-turnips-274820.cloudfunctions.net/app/bulletins/${bulletinId}/messages`,
                {
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  method: 'POST',
                  body: JSON.stringify(body),
                },
              ).then(() => {
                const request = db
                  .transaction('new-messages', 'readwrite')
                  .objectStore('new-messages')
                  .delete(body.authorId);

                return promisifyRequest(request);
              });
            });

            return Promise.all(fetches);
          });
        })
        .catch((error) => {
          if (event.lastChance) {
            _self.registration.showNotification('Message error', {
              body: 'A message could not be sent',
            });
          }

          throw error;
        });

      event.waitUntil(operation);
      break;
    }
    default:
      break;
  }
});

function getIDB() {
  /** @type Promise<IDBDatabase> */
  const db = new Promise((resolve, reject) => {
    /** @type IDBOpenDBRequest */
    const request = indexedDB.open('daisyhub', 1);

    request.addEventListener('error', () => {
      const error = event.target.error;
      reject(error);
    });

    request.addEventListener('success', () => {
      resolve(request.result);
    });

    request.addEventListener('blocked', () => {
      reject('Request to open IDB was blocked');
    });
  });

  return db;
}

/**
 * @template T
 * @param {IDBRequest<T>} request - A generic parameter that flows through to the return type
 * @return {Promise<T>}
 */
function promisifyRequest(request) {
  return new Promise((resolve, reject) => {
    request.addEventListener('success', () => {
      resolve(request.result);
    });

    request.addEventListener('error', () => {
      reject(request.error);
    });
  });
}
