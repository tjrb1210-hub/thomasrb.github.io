---
layout: default
title: Writing
permalink: /writing/
---

<section class="page-intro">

    <p>02 / NOTES & IDEAS</p>

    <h1>Things I've written.</h1>

    <p>
        A collection of essays, reflections and written explorations
        across language, education, technology, politics and society.
    </p>

</section>

<section class="project-list">

    {% assign writings = site.writing | sort: "date" | reverse %}

    {% if writings.size > 0 %}

        {% for writing in writings %}

            <a href="{{ writing.url | relative_url }}" class="project-entry">

                <span>{{ writing.category | default: "WRITING" }}</span>

                <h2>{{ writing.title }}</h2>

                <p>{{ writing.description }}</p>

                <span>Read more →</span>

            </a>

        {% endfor %}

    {% else %}

        <p>Writing and essays will appear here as they are published.</p>

    {% endif %}

</section>

