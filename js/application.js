/**
 *---------------------------------------------------------------------
 * The MIT License (MIT)
 * 
 * Copyright (c) 2014 Shahzeb Ihsan
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

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
         // Populate the IP address field from the stored value
         window.stored_ip_port = bg_page.stored_ip_port;

         if (window.stored_ip_port !== undefined) {
            document.getElementById('ip_port').value = window.stored_ip_port;
         }

         // Populate the pre-defined sequences field from the stored value
         window.stored_predefined_sequences = bg_page.stored_predefined_sequences;

         if (window.stored_predefined_sequences !== undefined) {
            for (var i = 0; i < window.stored_predefined_sequences.length; i++) {
               option = document.createElement('option');
               option.text = window.stored_predefined_sequences[i];
               document.getElementById('predefined_sequences').add(option);
            }
         }
      });

   // Attach event listeners to UI elements
   document.getElementById('del_sequence').onclick = del_sequence;
   document.getElementById('add_sequence').onclick = popup;
   document.getElementById('close_popup').onclick = popup;
   document.getElementById('connect').onclick = connect;
   document.getElementById('send_data').onclick = send_data;
   document.getElementById('save_sequence').onclick = save_sequence;
};
