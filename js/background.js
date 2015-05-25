/**
 * @file Background javascript file for Chrome extension.
 * @author Shahzeb Ihsan
 * ---------------------------------------------------------------------
 */

var stored_ip_port;
var stored_predefined_sequences;

/**
 * 'onLaunched'listener
 */
chrome.app.runtime.onLaunched.addListener(function() {
   // Read the stored IP address
   chrome.storage.sync.get('stored_ip_port',
      function(obj){
         console.log(obj);
         if (obj.stored_ip_port === undefined) {
            stored_ip_port = undefined;
         } else {
            stored_ip_port = obj.stored_ip_port;
         }
      });

   // Read the stored per-defined sequences
   chrome.storage.sync.get('stored_predefined_sequences',
      function(obj){
         console.log(obj);
         if (obj.stored_predefined_sequences === undefined) {
            stored_predefined_sequences = undefined;
         } else {
            stored_predefined_sequences = obj.stored_predefined_sequences;
         }
      });

   // Create the window
   chrome.app.window.create('window.html',
                            {'bounds': {'width': 560, 'height': 610}});

});
