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
}

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
}

/**
 *
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
}

/**
 *
 */
get_data_to_send = function() {
   if (document.getElementById('data_source0').checked) {
      return document.getElementById('predefined_sequences').value;
   } else {
      return document.getElementById('input_data').value;
   }
}

/**
 *
 */
get_new_sequence = function() {
   return document.getElementById('new_sequence').value;
}

/**
 *
 */
add_sequence_to_view = function(sequence) {
   var option = document.createElement('option');
   option.text = sequence;
   document.getElementById('predefined_sequences').add(option);
}

/**
 *
 */
log = function(str) {
   var txt = document.getElementById('log').value + '\r\n';
   txt += str;
   document.getElementById('log').value = txt;

   console.log(str);
}

/**
 *
 */
get_all_sequences = function() {
   var element = document.getElementById('predefined_sequences');
   var options = element.innerHTML;
   while ((options.match('<option>') != null) && (options.match('</option>') != null)) {
      options = options.replace('<option>', '');
      options = options.replace('</option>', ',');
   }

   var options_array = options.trim().replace(",,",",").split(',');
   return options_array.slice(0, options_array.length - 1)
}
