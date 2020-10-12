/** @type {ServiceWorkerGlobalScope}  */
const _self = self;

const CACHE_STATIC = "blog-static-v2";
const CACHE_IMAGES = "blog-images-v1";
const CACHE_PAGES = "blog-pages-v1";
const CACHE_NAMES = [CACHE_STATIC, CACHE_IMAGES, CACHE_PAGES];
const staticFiles = [
  "/offline.html",
  "/css/main.css",
  "/css/prism.css",
  "/js/main.js",
  "/js/prism.js",
];

_self.addEventListener("install", (event) => {
  console.log("Installed");

  _self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_STATIC).then((cache) => {
      return Promise.all(
        staticFiles.map((url) =>
          cache.add(url).catch((error) => {
            console.log("Failed to add", url, "to the cache");
            console.error(error);
          })
        )
      );
    })
  );
});

_self.addEventListener("activate", (event) => {
  console.log("Activated");

  event.waitUntil(
    caches
      .keys()
      .then((keyList) => {
        const operations = keyList.map((cacheKey) => {
          if (!CACHE_NAMES.includes(cacheKey)) return caches.delete(cacheKey);

          return Promise.resolve(null);
        });

        return Promise.all(operations);
      })
      .then(() => _self.clients.claim())
  );
});

_self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  if (request.url.endsWith("css/main.css")) {
    return event.respondWith(
      caches.match(request).then((response) => {
        return response || fetch(request);
      })
    );
  }

  if (url.pathname === "/" && request.mode === "navigate") {
    return event.respondWith(
      networkFallbackCache(CACHE_PAGES, request).catch(() =>
        caches.match("/offline.html")
      )
    );
  }

  const imagesRegexp = /(\.(png|jpeg|jpg|svg|icon|webp))$/;
  if (imagesRegexp.test(request.url)) {
    return event.respondWith(staleWhileRevalidate(CACHE_IMAGES, request));
  }

  const isHTML = request.mode === "navigate";
  if (isHTML) {
    return event.respondWith(
      staleWhileRevalidate(CACHE_PAGES, request).catch((error) => {
        return caches.match("/offline.html");
      })
    );
  }

  if (request.url.endsWith(".js")) {
    return event.respondWith(
      caches.match(request).then((response) => {
        return response || fetch(request);
      })
    );
  }
});

function staleWhileRevalidate(cacheName, request) {
  return caches.match(request).then((response) => {
    const fetchRequest = caches.open(cacheName).then((cache) => {
      return fetch(request).then((fetchResponse) => {
        cache.put(request, fetchResponse.clone());

        return fetchResponse;
      });
    });

    return response || fetchRequest;
  });
}

function networkFallbackCache(cacheName, request) {
  return caches.open(cacheName).then((cache) => {
    return fetch(request)
      .then((response) => {
        if (response.status >= 400) {
          return Promise.reject(response);
        }

        cache.put(request, response.clone());

        return response;
      })
      .catch((error) => {
        return cache.match(request).then((response) => {
          if (!response) throw error;

          return response;
        });
      });
  });
}

_self.addEventListener("message", (event) => {
  const message = event.data;

  switch (message.type) {
    case "TRIM_CACHE":
      trimCache(CACHE_IMAGES, message.payload.limit);
      break;
    default:
      break;
  }
});

function trimCache(cacheName, limit) {
  return caches.open(cacheName).then((cache) => {
    if (!cache) return;

    return cache.keys().then((requests) => {
      const deleteOperations = requests
        .slice(0, limit)
        .map((request) => cache.delete(request));

      return Promise.all(deleteOperations);
    });
  });
}
