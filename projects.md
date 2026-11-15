---
layout: default
title: Projects
permalink: /projects/
---

<section class="page-intro">
    <p>01 / SELECTED WORK</p>
    <h1>Projects & experiments.</h1>
    <p>
        A collection of projects, experiments and ideas developed
        across programming, linguistics, research and technology.
    </p>
</section>

<section class="project-list">

    {% assign projects = site.projects | sort: "date" | reverse %}

    {% if projects.size > 0 %}

        {% for project in projects %}

            <a href="{{ project.link | default: project.url | relative_url }}" class="project-entry">
                <span>{{ project.category | default: "PROJECT" }}</span>
                <h2>{{ project.title }}</h2>
                <p>{{ project.description }}</p>
                <span>Explore project →</span>
            </a>

        {% endfor %}

    {% else %}

        <p>Projects are currently being developed. Check back soon.</p>

    {% endif %}

</section>