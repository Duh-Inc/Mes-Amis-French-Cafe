/* Mes Amis Café — theme-init.js
   Runs synchronously in <head> BEFORE CSS renders.
   Applies saved theme immediately to prevent flash. */
(function(){
  try {
    var t = localStorage.getItem('mesAmisTheme') || 'dark';
    document.documentElement.setAttribute('data-theme', t);
  } catch(e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
