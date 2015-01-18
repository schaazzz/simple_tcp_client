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
show_ip_error = function() {
   chrome.notifications.create('error',
                               {type: 'basic',
                                title: 'Error',
                                message: 'Incorrect IP address and/or port number',
                                iconUrl: 'icons/error.png'},
                                function(){});
}