---
layout: page
permalink: /categories/
title: Blog
---

<a class="badge badge-light" href="/blog/">Chronological</a>
<a class="badge badge-primary" href="#">Categorized</a>

<ul class="list-group">
  {% for category in site.categories %}
    {% capture category_name %}{{ category | first }}{% endcapture %}
    <div id="#{{ category_name | slugize }}"></div>
    <div class="dropdown-divider"></div>
    <li class="list-group-item list-group-item-success"><h6>{{ category_name | capitalize }}</h6></li>
    <a name="{{ category_name | slugize }}"></a>
    {% for post in site.categories[category_name] %}
      <li class="list-group-item list-group-item-action">
        <a href="{{ site.baseurl }}{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a>
        <time class="fa-pull-right" datetime="{{ post.date | date:"%Y-%m-%d" }}">{{ post.date | date:"%b %d, %Y" }}</time>
      </li>
    {% endfor %}
  {% endfor %}
</ul>
