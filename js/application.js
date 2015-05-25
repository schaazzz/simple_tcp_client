/**
 * @file Sets up the application functionality.
 * @author Shahzeb Ihsan
 * ---------------------------------------------------------------------
 */

/**
 * Called on the "onload" event, sets event handlers for various elements.
 */
onload = function() {
   chrome.runtime.getBackgroundPage(
      function (bg_page) {
         window.stored_ip_port = bg_page.stored_ip_port;

         if (window.stored_ip_port != undefined) {
            document.getElementById('ip_port').value = window.stored_ip_port;
         }

         window.stored_predefined_sequences = bg_page.stored_predefined_sequences;

         if (window.stored_ip_port != undefined) {
            for (var i = 0; i < window.stored_predefined_sequences.length; i++) {
               option = document.createElement('option');
               option.text = window.stored_predefined_sequences[i];
               document.getElementById('predefined_sequences').add(option);
            }
         }
      });

   document.getElementById('del_sequence').onclick = del_sequence;
   document.getElementById('add_sequence').onclick = popup;
   document.getElementById('close_popup').onclick = popup;
   document.getElementById('connect').onclick = connect;
   document.getElementById('send_data').onclick = send_data;
   document.getElementById('save_sequence').onclick = save_sequence;
}
