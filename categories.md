---
layout: page
permalink: /categories/
title: Blog
---

<div>
    <a href="/blog/"><div class="color-button">Chronological</div></a>
    <a href="#"><div class="color-button">Categorized</div></a>
</div>
<ul class="listing">
{% for category in site.categories %}
    {% capture category_name %}{{ category | first }}{% endcapture %}
    <div id="#{{ category_name | slugize }}"></div>
    <li class="listing-seperator">{{ category_name | capitalize }}</li>
    <a name="{{ category_name | slugize }}"></a>
    {% for post in site.categories[category_name] %}
    <li class="listing-item" style="border-bottom:1px dashed rgb(0, 0, 0, 0.3);">
        <a href="{{ site.baseurl }}{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a>
        <time class="fa-pull-right" datetime="{{ post.date | date:"%Y-%m-%d" }}">{{ post.date | date:"%b %d, %Y" }}</time>
    </li>
    <!-- <article>
        <li style="border-bottom:1px dashed rgb(0, 0, 0, 0.3);">
            <font size="3"><a href="{{ site.baseurl }}{{ post.url }}">{{post.title}}</a></font>
            <time class="fa-pull-right" datetime="{{ post.date | date:"%Y-%m-%d" }}">{{ post.date | date:"%b %d, %Y" }}</time>
        </li>
    </article> -->
    {% endfor %}
{% endfor %}
</ul>
