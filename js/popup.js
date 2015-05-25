/**
 * @file Manages the pop-up's behaviour.
 * @author Shahzeb Ihsan
 * ---------------------------------------------------------------------
 */

/**
 * Implements the pop-up functionality.
 */
function popup (){
   set_size_and_pos('blanket', 'popup');

   /* Set height to 'auto' to make the pop-up's contents fit nicely */
   var popup_div = document.getElementById('popup');
   popup_div.style.height = 'auto';

   toggle_visibility('blanket');
   toggle_visibility('popup');		
}

/**
 * Toggle the visibility of the specified element.
 * @param {string} element_id ID of the element.
 */
function toggle_visibility(element_id) {
	var element = document.getElementById(element_id);

	if(element.style.display == 'none') {
      element.style.display = 'block';
   } else {
      element.style.display = 'none';
   }
}

/**
 * Sets the blanket dimensions and pop-up position.
 * @param {string} blanket_id ID of the blanket section/div.
 * @param {string} popup_id ID of the pop-up section/div.
 */
function set_size_and_pos(blanket_id, popup_id) {
   var window_width = 0;
   var blanket_height = 0;
   var viewport_width = 0;
   var viewport_height = 0;

   /* Determine the viewport width and height */
   if (typeof window.innerWidth != 'undefined') {
		viewport_width = window.innerWidth;
      viewport_height = window.innerHeight;
   } else {
		viewport_width = document.documentElement.clientWidth;
      viewport_height = document.documentElement.clientHeight;
   }

   /* Determine the blanket's height */
   if ((viewport_height > document.body.parentNode.scrollHeight) &&
       (viewport_height > document.body.parentNode.clientHeight)) {
      blanket_height = viewport_height;
   } else {
      if (document.body.parentNode.clientHeight > document.body.parentNode.scrollHeight) {
         blanket_height = document.body.parentNode.clientHeight;
      } else {
         blanket_height = document.body.parentNode.scrollHeight;
      }
   }

   /* Set the blanket's height */
   var blanket = document.getElementById(blanket_id);
   blanket.style.height = blanket_height + 'px';

   /* Determine the pop-up's position such that it is centred on the blanket */
   var popup_div = document.getElementById(popup_id);
   var popup_div_top = (blanket_height / 2) - (get_div_dimensions_from_css('popup').height / 2);
   popup_div.style.top = popup_div_top + 'px';

   if ((viewport_width > document.body.parentNode.scrollWidth) &&
       (viewport_width > document.body.parentNode.clientWidth)) {
      window_width = viewport_width;
	} else {
      if (document.body.parentNode.clientWidth > document.body.parentNode.scrollWidth) {
         window_width = document.body.parentNode.clientWidth;
      } else {
         window_width = document.body.parentNode.scrollWidth;
      }
   }

   /* Set the pop-up's position */
   popup_div_top = (window_width / 2) - (get_div_dimensions_from_css('popup').width / 2);
   popup_div.style.left = popup_div_top + 'px';
}
