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
 * @file The "V" of "MVC", all view specific functionality goes here.
 * @author Shahzeb Ihsan
 * ---------------------------------------------------------------------
 */

 /**
 * Returns the value of the IP address and port number entered by the user.
 * @return {string} The text from the ip_port text field.
 */
get_ip_port = function() {
   return (document.getElementById('ip_port').value);
};

/**
 * Shows an error notification.
 */
show_error = function(error) {
   chrome.notifications.create('error',
                               {type: 'basic',
                                title: 'Error',
                                message: error,
                                iconUrl: 'icons/error.png'},
                                function(){});
};

/**
 * Shows a pop-up Chrome notification when the connection state changes.
 * @param {string} state Connection state.
 */
notify_connection_state = function(state) {
   var btn = document.getElementById('connect');
   var input = document.getElementById('ip_port');

   if (state) {
      btn.innerHTML = 'Disconnect';
      input.disabled = true;
   } else {
      btn.innerHTML = 'Connect';
      input.disabled = false;
   }
};

/**
 * Based on the selected data source, return the data to be sent.
 * @return {string} Data to send.
 */
get_data_to_send = function() {
   if (document.getElementById('data_source0').checked) {
      return document.getElementById('predefined_sequences').value;
   } else {
      return document.getElementById('input_data').value;
   }
};

/**
 * Returns the value of the 'new sequence' to be added to pre-defiend sequences.
 * @return {string} Sequence string.
 */
get_new_sequence = function() {
   return document.getElementById('new_sequence').value;
};

/**
 * Add sequence to pre-defined 'select' element.
 * @param {string} Sequence to be added.
 */
add_sequence_to_view = function(sequence) {
   var option = document.createElement('option');
   option.text = sequence;
   document.getElementById('predefined_sequences').add(option);
};

/**
 * Output the specified value to the console logand the textarea log.
 * @param {string} String to output to the log
 */
log = function(str) {
   var txt = document.getElementById('log').value + '\r\n';
   txt += str;
   document.getElementById('log').value = txt;

   console.log(str);
};

/**
 * Returns the list of all sequences in the pre-defined sequences 'select' element.
 * @return {array} Array of values in the 'select' element.
 */
get_all_sequences = function() {
   var element = document.getElementById('predefined_sequences');
   var options = element.innerHTML;
   while ((options.match('<option>') !== null) && (options.match('</option>') !== null)) {
      options = options.replace('<option>', '');
      options = options.replace('</option>', ',');
   }

   var options_array = options.trim().replace(",,",",").split(',');
   return options_array.slice(0, options_array.length - 1);
};
