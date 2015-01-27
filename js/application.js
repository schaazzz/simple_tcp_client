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
         document.getElementById('ip_port').value = window.stored_ip_port;
         
         //window.stored_sequences = bg_page.stored_sequences;
         //document.getElementById('').
      });
   
   document.getElementById('add_sequence').onclick = popup;
   document.getElementById('close_popup').onclick = popup;
   document.getElementById('connect').onclick = connect;
   document.getElementById('send_data').onclick = send_data;
   document.getElementById('save_sequence').onclick = save_sequence;
}
