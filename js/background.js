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
 * @file Background javascript file for Chrome extension.
 * @author Shahzeb Ihsan
 */

var stored_ip_port;
var stored_predefined_sequences;

/**
 * 'onLaunched' listener
 */
chrome.app.runtime.onLaunched.addListener(function() {
   // Read the stored IP address
   chrome.storage.sync.get('stored_ip_port',
      function(obj){
         console.log(obj);
         if (obj.stored_ip_port === undefined) {
            stored_ip_port = undefined;
         } else {
            stored_ip_port = obj.stored_ip_port;
         }
      });

   // Read the stored per-defined sequences
   chrome.storage.sync.get('stored_predefined_sequences',
      function(obj){
         console.log(obj);
         if (obj.stored_predefined_sequences === undefined) {
            stored_predefined_sequences = undefined;
         } else {
            stored_predefined_sequences = obj.stored_predefined_sequences;
         }
      });

   // Create the window
   chrome.app.window.create('window.html',
                            {'bounds': {'width': 560, 'height': 610}});

});
