/**
 * @file Background javascript file for Chrome extension.
 * @author Shahzeb Ihsan
 * ---------------------------------------------------------------------
 */

chrome.app.runtime.onLaunched.addListener(function() {
   chrome.app.window.create(
      'window.html',
      {'bounds': {'width': 560, 'height': 610}}
   );
});