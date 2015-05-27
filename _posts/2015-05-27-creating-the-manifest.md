---
layout: post
title: Step 2 - Creating the Manifest (manifest.json)
author: Shahzeb Ihsan
---

Creating a manifest is simple enough:

{% highlight javascript %}
{
   'name': 'Sample Chrome App',
   'description': 'A simple chrome app to accompany the tutorial at http://schaazzz.github.io/simple_tcp_client/',
   'version': '0.1',
   'app': {
      'background': {
         'scripts': ['js/background.js']
      }
   }
}
{% endhighlight %}

You can download [manifest.json](https://raw.githubusercontent.com/schaazzz/simple_tcp_client/sandbox/manifest.json) or checkout the "sandbox" branch from the following commit (refer to this [post]({{ site.baseurl }}{% post_url 2015-05-25-git-reference %}) if you need a quick reference to Git commands for doing this):

<pre>
git checkout c5449c7d5c60b2e6eb946332ec34af8ee1b658df
</pre>

[Next Step: The Background Script (background.js)]({{ site.baseurl }}{% post_url 2015-05-27-the-background-script %})
