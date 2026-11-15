---
layout: default
title: Interests
permalink: /interests/
---

<section class="page-intro">

    <p>04 / EXPLORATIONS</p>

    <h1>Things I'm exploring.</h1>

    <p>
        A space for ideas, subjects and interests that I find
        worth exploring, from language and politics to technology,
        culture and society.
    </p>

</section>

<section class="project-list">

    {% assign interests = site.interests | sort: "date" | reverse %}

    {% if interests.size > 0 %}

        {% for interest in interests %}

            <a href="{{ interest.url | relative_url }}" class="project-entry">

                <span>{{ interest.category | default: "INTERESTS" }}</span>

                <h2>{{ interest.title }}</h2>

                <p>{{ interest.description }}</p>

                <span>Explore further →</span>

            </a>

        {% endfor %}

    {% else %}

        <p>New interests and explorations will appear here soon.</p>

    {% endif %}

</section>
