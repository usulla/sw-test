// Проверка того, что наш браузер поддерживает Service Worker API.
if ('serviceWorker' in navigator) {
    console.log("SW in browser")
    // Весь код регистрации у нас асинхронный.
    navigator.serviceWorker.register('/sw-test/sw.js')
        .then((reg) => {
            // регистрация сработала
            console.log('Registration succeeded. Scope is ' + reg.scope)
            navigator.serviceWorker.ready
        })
        .then((worker) => {
            console.log('syncdata')
            worker.sync.register('syncdata')
        })
        .catch((err) => console.log(err));
}
