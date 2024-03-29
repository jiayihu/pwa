import lozad from "lozad";
import addAnchors from "./modules/anchors";
import requestComments from "./modules/comments";
import addReadingTime from "./modules/reading-time";

const isArticle = document.body.classList.contains("page--article");
const isBrowser = window.fetch; // Avoid execution if it's gulp script like uncss

if (isArticle && isBrowser) {
  // Lazy load images
  const observer = lozad();
  observer.observe();

  addAnchors();
  addReadingTime();
  requestComments();
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("[ServiceWorker] registered");

        navigator.serviceWorker.controller.postMessage({
          type: "TRIM_CACHE",
          payload: { limit: 3 },
        });
      })
      .catch((error) => {
        console.log("[ServiceWorker] registration failed: ", error);
      });
  });
}
