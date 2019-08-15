---
layout: page
title: Blog
permalink: /blog/
---

<div>
    <a href="#"><div class="color-button">Chronological</div></a>
    <a href="/categories/"><div class="color-button">Categorized</div></a>
</div>
<ul class="listing">
{% for post in site.posts %}
  {% capture y %}{{post.date | date:"%Y"}}{% endcapture %}
  {% if year != y %}
    {% assign year = y %}
    <li class="listing-seperator">{{ y }}</li>
  {% endif %}
  <li class="listing-item" style="border-bottom:1px dashed rgb(0, 0, 0, 0.3);">
    <a href="{{ site.baseurl }}{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a>
    <time class="fa-pull-right" datetime="{{ post.date | date:"%Y-%m-%d" }}">{{ post.date | date:"%b %d, %Y" }}</time>
  </li>
{% endfor %}
</ul>
