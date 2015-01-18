/**
 * @file The "C" of "MVC", all UI event handlers and their handling of side
 *    effects on the model go here.
 * @author Shahzeb Ihsan
 * ---------------------------------------------------------------------
 */

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
      show_ip_error();
   }
}