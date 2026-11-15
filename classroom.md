---
layout: default
title: Classroom
permalink: /classroom/
---

<section class="page-intro">

    <p>03 / LANGUAGE EDUCATION</p>

    <h1>Ideas for teaching.</h1>

    <p>
        A collection of teaching resources, classroom activities,
        lesson plans and reflections on language education.
    </p>

</section>

<section class="project-list">

    {% assign lessons = site.classroom | sort: "date" | reverse %}

    {% if lessons.size > 0 %}

        {% for lesson in lessons %}

            <a href="{{ lesson.url | relative_url }}" class="project-entry">

                <span>{{ lesson.category | default: "CLASSROOM" }}</span>

                <h2>{{ lesson.title }}</h2>

                <p>{{ lesson.description }}</p>

                <span>Explore resource →</span>

            </a>

        {% endfor %}

    {% else %}

        <p>Teaching resources and classroom ideas will appear here soon.</p>

    {% endif %}

</section>
