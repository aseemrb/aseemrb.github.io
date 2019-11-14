---
layout: page
permalink: /categories/
title: Blog
---

<a class="btn btn-sm btn-outline-secondary" href="/blog/">Chronological</a>
<span class="btn btn-sm btn-dark">Categorized</span>

<ul class="list-group">
  {% for category in site.categories %}
    {% capture category_name %}{{ category | first }}{% endcapture %}
    <div id="#{{ category_name | slugize }}"></div>
    <div class="dropdown-divider"></div>
    <a name="{{ category_name | slugize }}"></a>
    <li class="list-group-item list-group-item-secondary"><h6>{{ category_name | capitalize }}</h6></li>
    {% for post in site.categories[category_name] %}
      <li class="list-group-item list-group-item-action">
        <a href="{{ site.baseurl }}{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a>
        <time class="fa-pull-right" datetime="{{ post.date | date:"%Y-%m-%d" }}">{{ post.date | date:"%b %d, %Y" }}</time>
      </li>
    {% endfor %}
  {% endfor %}
</ul>
