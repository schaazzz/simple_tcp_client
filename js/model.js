/**
 * @file The "M" of "MVC", all storage functionality goes here.
 * @author Shahzeb Ihsan
 * ---------------------------------------------------------------------
 */

/**
 *
 */
save_ip_port = function(value) {
   chrome.storage.sync.set({'stored_ip_port': value},
      function() {
         console.log('Done');
      });
}

/**
 *
 */
save_predefined_sequences = function(value) {
   chrome.storage.sync.set({'stored_predefined_sequences': value},
      function() {
         console.log('Ok');
      });
}