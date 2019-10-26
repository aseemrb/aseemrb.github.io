---
layout: page
title: Blog
permalink: /blog/
---

<a class="badge badge-primary" href="#">Chronological</a>
<a class="badge badge-light" href="/categories/">Categorized</a>

<ul class="list-group">
  <div class="dropdown-divider"></div>
  {% for post in site.posts %}
    {% capture y %}{{post.date | date:"%Y"}}{% endcapture %}
    <!-- {% if year != y %}
      {% assign year = y %}
      <li class="list-group-item list-group-item-light"><h5>{{ y }}</h5></li>
    {% endif %} -->
    <li class="list-group-item list-group-item-action">
      <a href="{{ site.baseurl }}{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a>
      <time class="fa-pull-right" datetime="{{ post.date | date:"%Y-%m-%d" }}">{{ post.date | date:"%b %d, %Y" }}</time>
    </li>
  {% endfor %}
</ul>
