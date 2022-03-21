const CACHE_NAME = 'my-site-cache-budget';
const DATA_CACHE_NAME = 'data-cache-budget';

const FILES_TO_CACHE = [
    '/',
    '/index.html',
    '/manifest.json',
    '/js/index.js',
    '/js/idb.js',
    '/css/style.css',
    '/icon/icon-72x72.png',
    '/icon/icon-96x96.png',
    '/icon/icon-128x128.png',
    '/icon/icon-144x144.png',
    '/icon/icon-152x152.png',
    '/icon/icon-384x384.png',
    '/icon/icon-512x512.png'
];


self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            console.log('installing cache : ' + CACHE_NAME)
            return cache.addAll(FILES_TO_CACHE)
        })
    );

    self.skipWaiting();
})

self.addEventListener('activate', function (e) {
    e.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(
                keyList.map(key => {
                    if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
                        console.log('Removing old cache data', key);
                        return caches.delete(key);
                    }
                })
            );
        })
    );

    self.clients.claim();
})

