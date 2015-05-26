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
   var div_style = window.getComputedStyle(document.getElementById(div_id));
   
   var temp = div_style.getPropertyValue('width').split('px');
   temp = temp[0];
   var div_width = parseInt(temp);
   
   temp = div_style.getPropertyValue('height').split('px');
   temp = temp[0];
   var div_height = parseInt(temp);
   
   return {
      width: div_width,
      height: div_height
   };
}