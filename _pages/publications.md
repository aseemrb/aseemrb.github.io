---
layout: page
permalink: 'publications'
title: publications
description: 
years: [2023,2021,2020,2019]
nav: true
---

<div class="publications">
  More details on <a href="https://scholar.google.com/citations?user=DPt626YAAAAJ">Google scholar</a>.
  {% for y in page.years %}
    <h4 class="year">{{y}}</h4>
    {% bibliography -f papers -q @*[year={{y}}]* %}
  {% endfor %}
</div>
