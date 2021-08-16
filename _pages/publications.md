---
layout: page
permalink: /publications/
title: publications
description: 
years: [2021,2020,2019]
nav: true
---

<div class="publications">
  <!-- <div class='row'>
  <div class='col-sm-3'>
    <span class="badge pub-type-conf">&nbsp;</span> Conference
  </div>
  <div class='col-sm-3'>
    <span class="badge pub-type-jrnl">&nbsp;</span> Journal/Article
  </div>
  </div> -->

  {% for y in page.years %}
    <h2 class="year">{{y}}</h2>
    {% bibliography -f papers -q @*[year={{y}}]* %}
  {% endfor %}
</div>
