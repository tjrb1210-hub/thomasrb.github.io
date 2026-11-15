
let pyodide;
let analyserReady = false;

async function initialiseAnalyser() {
    const status = document.getElementById("lexicon-status");

    status.textContent = "Loading Python analyser...";

    try {
        pyodide = await loadPyodide();

        const response = await fetch(
            "/assets/python/analyser.py"
        );

        if (!response.ok) {
            throw new Error("Could not load analyser.py");
        }

        const pythonCode = await response.text();

        pyodide.runPython(pythonCode);

        analyserReady = true;
        status.textContent = "Analyser ready.";

    } catch (error) {
        console.error(error);
        status.textContent =
            "Could not load the analyser. Please refresh the page.";
    }
}


async function analyseInput() {
    const input = document.getElementById("lexicon-input");
    const status = document.getElementById("lexicon-status");
    const results = document.getElementById("lexicon-results");

    const text = input.value.trim();

    if (!text) {
        status.textContent = "Please enter some text first.";
        return;
    }

    if (!analyserReady) {
        status.textContent = "The analyser is still loading.";
        return;
    }

    try {
        status.textContent = "Analysing text...";

        pyodide.globals.set("submitted_text", text);

        const pythonResults = pyodide.runPython(`
import json
json.dumps(analyse_text(submitted_text))
`);

        const data = JSON.parse(pythonResults);

        displayResults(data);

        results.hidden = false;
        status.textContent = "Analysis complete.";

    } catch (error) {
        console.error(error);
        status.textContent = "Something went wrong during analysis.";
    }
}


function displayResults(data) {
    document.getElementById("total-words").textContent =
        data.total_words;

    document.getElementById("unique-words").textContent =
        data.unique_words;

    document.getElementById("average-length").textContent =
        data.average_word_length;

    const difficultyTable =
        document.getElementById("difficulty-results");

    difficultyTable.replaceChildren();

    data.word_profiles.slice(0, 10).forEach(profile => {
        const row = document.createElement("tr");

        [
            profile.word,
            profile.syllables,
            profile.length,
            profile.frequency,
            profile.difficulty
        ].forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        difficultyTable.appendChild(row);
    });

    const rareList = document.getElementById("rare-results");

    rareList.replaceChildren();

    data.rarest_words.forEach(([word, frequency]) => {
        const item = document.createElement("li");
        item.textContent = `${word} — ${frequency} occurrence(s)`;
        rareList.appendChild(item);
    });
}


function clearAnalyser() {
    document.getElementById("lexicon-input").value = "";
    document.getElementById("lexicon-results").hidden = true;
    document.getElementById("lexicon-status").textContent =
        "Ready to analyse.";
}


document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("analyse-button")
        .addEventListener("click", analyseInput);

    document.getElementById("clear-button")
        .addEventListener("click", clearAnalyser);

    initialiseAnalyser();
});
