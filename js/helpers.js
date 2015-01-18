/**
 * @file Various helper functions.
 * @author Shahzeb Ihsan
 * ---------------------------------------------------------------------
 */

/**
 * Get width and height defined in CSS for the specified section/div.
 * @param {string} div_id ID of the section/div.
 * @return {number|number} width, height Width and Height of the specified element.
 */
function get_div_dimensions_from_css(div_id) {
   div_style = window.getComputedStyle(document.getElementById(div_id));
   
   var temp = div_style.getPropertyValue('width').split('px');
   temp = temp[0];
   var div_width = parseInt(temp);
   
   temp = div_style.getPropertyValue('height').split('px');
   temp = temp[0];
   var div_height = parseInt(temp);
   
   return {
      width: div_width,
      height: div_height
   }
}