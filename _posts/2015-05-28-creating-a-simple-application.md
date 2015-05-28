---
layout: post
title: Step 4 - Creating a Simple Application
author: Shahzeb Ihsan
---

[Previous Step: The Background Script (background.js)]({{ site.baseurl }}{% post_url 2015-05-27-the-background-script %})

Let's create an HTML file, "window.html", which will contain a text field, a button and a text area.

"window.html" is loaded in [background.js]({{ site.baseurl }}{% post_url 2015-05-27-the-background-script %}) in the "onLaunched" listener in following statement:

{% highlight javascript %}
chrome.app.window.create('window.html',
                         {'bounds': {'width': 250, 'height': 250}});

{% endhighlight %}
