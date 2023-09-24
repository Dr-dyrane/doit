// Service Worker Version
const CACHE_VERSION = "v1";

// Cache Name
const CACHE_NAME = `doits-cache-${CACHE_VERSION}`;

// List of URLs to cache
const cacheUrls = [
	"/",
	"/index.html",
	"/src/assets/index.css",
	"/src/main.jsx",
	"/doit.png",
	// Add more URLs of assets to cache here
];

// Install Event: Cache assets
self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			return cache.addAll(cacheUrls);
		})
	);
});

// Activate Event: Remove old caches
self.addEventListener("activate", (event) => {
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames
					.filter((name) => name !== CACHE_NAME)
					.map((name) => caches.delete(name))
			);
		})
	);
});

// Fetch Event: Serve cached assets when offline
self.addEventListener("fetch", (event) => {
	event.respondWith(
		caches.match(event.request).then((cachedResponse) => {
			return cachedResponse || fetch(event.request);
		})
	);
});
