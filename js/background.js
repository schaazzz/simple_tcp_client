/**
 * @file Background javascript file for Chrome extension.
 * @author Shahzeb Ihsan
 * ---------------------------------------------------------------------
 */

/**
 *
 */
var stored_ip_port = undefined;

/**
 *
 */
chrome.app.runtime.onLaunched.addListener(function() {
   
   chrome.storage.sync.get('stored_ip_port',
      function(obj){
         console.log(obj);
         if (obj.stored_ip_port == undefined) {
            stored_ip_port = undefined;
         } else {
            stored_ip_port = obj.stored_ip_port;
            //document.getElementById('ip_port').value = stored_ip_port;
         }
      });
   
   chrome.app.window.create('window.html',
                            {'bounds': {'width': 560, 'height': 610}});

});

