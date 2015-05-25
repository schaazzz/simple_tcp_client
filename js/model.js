/**
 * @file The "M" of "MVC", all storage functionality goes here.
 * @author Shahzeb Ihsan
 * ---------------------------------------------------------------------
 */

/**
 * Save the IP address and port to storage.
 * @param {string} String containing the IP address and port as "<ip_addr>:<port>".
 */
save_ip_port = function(value) {
   chrome.storage.sync.set({'stored_ip_port': value},
      function() {
         console.log('Done');
      });
};

/**
 * Save pre-defined sequences to storage.
 * @param {array} Array of sequences.
 */
save_predefined_sequences = function(value) {
   chrome.storage.sync.set({'stored_predefined_sequences': value},
      function() {
         console.log('Ok');
      });
};