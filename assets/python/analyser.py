
import string
from collections import Counter


VOWELS = "aeiouy"


def clean_text(text):
    words = text.split()

    cleaned_words = []

    for word in words:
        clean_word = word.lower().strip(
            string.punctuation + "“”‘’—–…"
        )

        if clean_word:
            cleaned_words.append(clean_word)

    return cleaned_words


def count_syllables(word):
    word = word.lower()

    syllables = 0
    previous_was_vowel = False

    for character in word:
        if character in VOWELS:
            if not previous_was_vowel:
                syllables += 1

            previous_was_vowel = True

        else:
            previous_was_vowel = False

    return syllables


def calculate_difficulty(word, word_counts):
    syllables = count_syllables(word)
    frequency = word_counts[word]
    length = len(word)

    difficulty = (
        syllables +
        length +
        (1 / frequency)
    )

    return {
        "word": word,
        "syllables": syllables,
        "length": length,
        "frequency": frequency,
        "difficulty": round(difficulty, 2)
    }


def analyse_text(text):
    clean_words = clean_text(text)

    word_counts = Counter(clean_words)

    word_profiles = []

    for word in set(clean_words):
        profile = calculate_difficulty(
            word,
            word_counts
        )

        word_profiles.append(profile)

    word_profiles.sort(
        key=lambda item: item["difficulty"],
        reverse=True
    )

    rare_words = sorted(
        word_counts.items(),
        key=lambda item: (item[1], item[0])
    )[:10]

    difficult_words = [
        profile
        for profile in word_profiles
        if profile["frequency"] == 1
        and profile["syllables"] >= 3
    ]

    total_words = len(clean_words)
    unique_words = len(word_counts)

    average_word_length = (
        round(sum(len(word) for word in clean_words) / total_words, 2)
        if total_words else 0
    )

    average_syllables = (
        round(sum(count_syllables(word) for word in clean_words) / total_words, 2)
        if total_words else 0
    )

    return {
        "total_words": total_words,
        "unique_words": unique_words,
        "average_word_length": average_word_length,
        "average_syllables": average_syllables,
        "word_profiles": word_profiles,
        "rarest_words": rare_words,
        "difficult_words": difficult_words
    }
