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
 * ---------------------------------------------------------------------
 * @file The "C" of "MVC", all UI event handlers and their handling of side
 *       effects on the model go here.
 * @author Shahzeb Ihsan
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
   var ip_addr = "";
   var port = 0;

   // Check the value of the enter IP:Port combination
   if (pattern.test(ip_port)) {
      ip_addr = ip_port.split(':');
      port = parseInt(ip_addr[1]);
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
};

/**
 * Listener for the pop-up's 'Save' button.
 */
save_sequence = function() {
   var sequence = get_new_sequence();
   add_sequence_to_view(sequence);
   var sequences = get_all_sequences();
   console.log(sequences);
   save_predefined_sequences(sequences);
};

/**
 * Listener for the app's '-' button.
 */
del_sequence = function() {
   var el = document.getElementById('predefined_sequences');
   el.remove(el.selectedIndex);
   var sequences = get_all_sequences();
   console.log(sequences);
   save_predefined_sequences(sequences);
};

/**
 * Listener for the app's 'Send' button.
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
         if (send_info.resultCode === 0) {
            log('Successfully sent ' + send_info.bytesSent + ' bytes');
         } else {
            log('Error sending data, error code: ' + send_info.resultCode);
         }
      });
};

/**
 * Listener for data reception.
 */
rcv_handler = function(rcv_info) {
   if (rcv_info.socketId != socket_id) {
      return;
   }

   var hex = [];
   var bytes = new Uint8Array(rcv_info.data);
   data = String.fromCharCode.apply(null, new Uint8Array(rcv_info.data));

   for(var i = 0; i < bytes.length; i++) {
      hex[i] = bytes[i].toString(16);
   }

   log('<Received: ' + data.length + '>: ' + data + ', hex: [' + hex + ']');
};
