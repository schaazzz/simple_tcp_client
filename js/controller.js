/**
 * @file The "C" of "MVC", all UI event handlers and their handling of side
 *       effects on the model go here.
 * @author Shahzeb Ihsan
 * ---------------------------------------------------------------------
 */

var connected = false;
var socket_id = null;

/**
 * Called when a connection has to be established.
 */
connect = function() {
   var valid_ip_port = false;

   /* Regex pattern for validating the IP address and port number */
   var pattern = RegExp(['^(2[0-5][0-4]|1[0-9][0-9]|[0-9][0-9]|[1-9])\\.',
                         '(2[0-5][0-4]|1[0-9][0-9]|[0-9][0-9]|[0-9])\\.',
                         '(2[0-5][0-4]|1[0-9][0-9]|[0-9][0-9]|[0-9])\\.',
                         '(2[0-5][0-4]|1[0-9][0-9]|[0-9][0-9]|[0-9])\\:\\d+$'].join(''));

   var ip_port = get_ip_port();

   if (pattern.test(ip_port)) {
      var ip_addr = ip_port.split(':');
      var port = parseInt(ip_addr[1]);
      ip_addr = ip_addr[0];

      if ((port > 0) && (port <= 65535)) {
         valid_ip_port = true;
      }
   }

   if (!valid_ip_port) {
      show_error('Incorrect IP address and/or port number');
   } else {
      save_ip_port(ip_addr + ':' + port.toString());

      chrome.sockets.tcp.create({},
         function(createInfo) {
            socket_id = createInfo.socketId;

            if (connected) {
               chrome.sockets.tcp.disconnect(socket_id);
               connected = false;
               notify_connection_state(connected);
               log('Disconnected');
            } else {
               chrome.sockets.tcp.connect(createInfo.socketId, ip_addr, port,
                  function(result) {
                     if (result < 0) {
                        show_error('Connection error: ' + result);
                     } else {
                        connected = true;
                        notify_connection_state(connected);
                        log('Connected');
                        chrome.sockets.tcp.onReceive.addListener(rcv_handler);
                     }
                  });
            }
         });
   }
}

/**
 *
 */
save_sequence = function() {
   var sequence = get_new_sequence();
   add_sequence_to_view(sequence);
   var sequences = get_all_sequences();
   console.log(sequences);
   save_predefined_sequences(sequences);
}

/**
 *
*/
del_sequence = function() {
   var el = document.getElementById('predefined_sequences');
   el.remove(el.selectedIndex);
   var sequences = get_all_sequences();
   console.log(sequences);
   save_predefined_sequences(sequences);
}

/**
 *
 */
send_data = function() {
   var binary = false;
   var data = get_data_to_send();
   var buffer_size = data.length;

   if (data.substring(0,2) == '\\x') {
      binary = true;
      data = data.substring(2, data.length);
      buffer_size = data.length / 2;
      log(data);

   }

   var buffer = new ArrayBuffer(buffer_size);
   var buffer_view = new Uint8Array(buffer);

   for (var i = 0, j = 0, str_length = data.length; i < str_length; i++, j++) {
      if (binary) {
         var value = parseInt(data.substring(i, i + 2), 16);
         buffer_view[j] = value;
         i++;
      } else {
         buffer_view[i] = data.charCodeAt(i);
      }
   }

   log('<Sending: ' + data.length + '>: ' + data);

   chrome.sockets.tcp.send(socket_id, buffer,
      function(send_info) {
         if (send_info.resultCode == 0) {
            log('Successfully sent ' + send_info.bytesSent + ' bytes');
         } else {
            log('Error sending data, error code: ' + send_info.resultCode);
         }
      });
}

/**
 *
 */
rcv_handler = function(rcv_info) {
   if (rcv_info.socketId != socket_id) {
      return;
   }

   var hex = []
   var bytes = new Uint8Array(rcv_info.data);
   data = String.fromCharCode.apply(null, new Uint8Array(rcv_info.data));

   for(var i = 0; i < bytes.length; i++) {
      hex[i] = bytes[i].toString(16);
   }

   log('<Received: ' + data.length + '>: ' + data + ', hex: [' + hex + ']');
}
