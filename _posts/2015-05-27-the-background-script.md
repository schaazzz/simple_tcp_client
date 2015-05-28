---
layout: post
title: Step 3 - The Background Script (background.js)
author: Shahzeb Ihsan
---

[Previous Step: Creating the Manifest (manifest.json)]({{ site.baseurl }}{% post_url 2015-05-27-creating-the-manifest %})

In the manifest.json we created in the previous step, we configured the following path for background.js:

{% highlight javascript %}
{
    //..........
    //..........
    'app': {
        'background': {
        'scripts': ['js/background.js']
        }
    }
}
{% endhighlight %}

Create a folder "js" and create file [background.js]() with the following content:

{% highlight javascript %}
/**
 * 'onLaunched' listener
 */
chrome.app.runtime.onLaunched.addListener(function() {
    // We'll add more functionality later, for now we'll just create
    // the window with dimensions 250x250
    chrome.app.window.create('window.html',
                             {'bounds': {'width': 250, 'height': 250}});

});
{% endhighlight %}

[Next Step: ...]
