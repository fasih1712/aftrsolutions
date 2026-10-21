// Runs before first paint (loaded as a blocking script from index.html): applies the saved
// or system theme and hides the prerendered intro curtain for visitors who already saw it.
// Kept as an external file so the Content-Security-Policy needs no 'unsafe-inline' scripts.
(function () {
  var root = document.documentElement
  try {
    var t = localStorage.getItem('aftr-theme')
    if (!t) t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    root.setAttribute('data-theme', t)
  } catch (e) { root.setAttribute('data-theme', 'light') }
  try { if (sessionStorage.getItem('aftr-intro-seen') === '1') root.classList.add('intro-seen') } catch (e) { /* ignore */ }
})()
