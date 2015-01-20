/**
 * @file Sets up the application functionality.
 * @author Shahzeb Ihsan
 * ---------------------------------------------------------------------
 */

/**
 * Called on the "onload" event, sets event handlers for various elements.
 */
onload = function(){
   document.getElementById('add_sequence').onclick = popup;
   document.getElementById('close_popup').onclick = popup;
   document.getElementById('connect').onclick = connect;
   document.getElementById('send_data').onclick = send_data;
   document.getElementById('save_sequence').onclick = save_sequence;
}