---
layout: page
title: Blog
permalink: /blog/
---

<!-- Here are my carefully compiled views on some topics that I encountered so far. You can also search my posts by category <a href="{{ site.baseurl }}/categories/">here</a>. -->

<ul class="listing">
{% for post in site.posts %}
  {% capture y %}{{post.date | date:"%Y"}}{% endcapture %}
  {% if year != y %}
    {% assign year = y %}
    <li class="listing-seperator">{{ y }}</li>
  {% endif %}
  <li class="listing-item" style="border-bottom:1px dashed rgb(0, 0, 0, 0.1);">
    <a href="{{ site.baseurl }}{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a>
    <time class="fa-pull-right" datetime="{{ post.date | date:"%Y-%m-%d" }}">{{ post.date | date:"%b %d, %Y" }}</time>
  </li>
{% endfor %}
</ul>
