// =====================================================
// ENGLISH LEVEL TEST — A1 TO C2
// =====================================================

// Supabase connection
const SUPABASE_URL = "https://cjgcppevyfxnjlhlwigw.supabase.co/";
const SUPABASE_KEY = "sb_publishable_qhmIXNZRhgGSIgjibYe0Sg_zHTFIT7c";

// =====================================================
// QUESTIONS
// Format: question, A, B, C, D, correct answer index
// =====================================================

const QUESTIONS = [
    // A1
    ["She ___ a teacher.", "am", "is", "are", "be", 1],
    ["I ___ playing football tonight.", "am", "have", "go", "will", 0],
    ["___ do you live? In Madrid.", "Who", "Where", "What", "When", 1],
    ["There ___ two apples on the table.", "is", "are", "am", "be", 1],
    ["This is my brother. ___ name is Tom.", "He", "His", "Him", "Her", 1],
    ["I ___ coffee every morning.", "drinks", "drinking", "drink", "am drink", 2],
    ["A place where you can buy bread is a ___.", "bakery", "library", "hospital", "garage", 0],

    // A2
    ["Yesterday we ___ to the cinema.", "go", "goes", "went", "going", 2],
    ["My sister is ___ than me.", "tall", "taller", "tallest", "more tall", 1],
    ["I'm going to ___ my grandparents this weekend.", "visiting", "visit", "visited", "visits", 1],
    ["How ___ water do you drink every day?", "many", "much", "few", "a lot", 1],
    ["Where's Anna? She's ___ the kitchen.", "at", "in", "on", "to", 1],
    ["He usually ___ up at 7 o'clock, but today he is still in bed.", "get", "gets", "getting", "got", 1],
    ["My mother's sister is my ___.", "cousin", "niece", "aunt", "uncle", 2],

    // B1
    ["I ___ in this city since 2019.", "live", "lived", "have lived", "am living", 2],
    ["If it rains tomorrow, we ___ at home.", "stay", "will stay", "would stay", "stayed", 1],
    ["The window ___ by a boy yesterday.", "broke", "was broken", "is broken", "has broke", 1],
    ["She asked me where ___.", "I lived", "did I live", "do I live", "I do live", 0],
    ["You ___ wear a seatbelt. It's the law.", "can", "might", "must", "would", 2],
    ["I was watching TV when the phone ___.", "rings", "rang", "has rung", "ringing", 1],
    ["I'm really looking forward ___ you next week.", "to see", "to seeing", "seeing", "for seeing", 1],

    // B2
    ["If I had known about the traffic, I ___ earlier.", "would leave", "would have left", "will leave", "had left", 1],
    ["By the time we arrived, the film ___.", "already started", "has already started", "had already started", "was already starting", 2],
    ["She suggested ___ a taxi instead of walking.", "to take", "taking", "take", "to taking", 1],
    ["That is the house ___ roof was damaged in the storm.", "which", "who", "whose", "that", 2],
    ["I wish I ___ more free time these days.", "have", "had", "would have", "having", 1],
    ["The manager decided to ___ the meeting until next week because several people were ill.", "put off", "put on", "put up", "put out", 0],
    ["Don't worry, the report ___ by Friday.", "will have finished", "will have been finished", "is finishing", "has finished", 1],

    // C1
    ["Not only ___ late, but he also forgot the documents.", "he arrived", "did he arrive", "he did arrive", "arrived he", 1],
    ["Had it not been for your help, we ___ the deadline.", "would miss", "will have missed", "would have missed", "had missed", 2],
    ["Her argument was so ___ that nobody in the room could disagree.", "compelling", "compulsive", "compulsory", "complacent", 0],
    ["I'd rather you ___ anything to him about it.", "don't say", "didn't say", "not to say", "won't say", 1],
    ["Hardly ___ the building when the alarm went off.", "had she entered", "she had entered", "did she enter", "she entered", 0],
    ["The CEO's remarks were deliberately ___, leaving investors unsure of the company's plans.", "ambiguous", "ambitious", "ambivalent", "amiable", 0],

    // C2
    ["She spoke with such ___ that the entire audience was moved.", "eloquence", "elocution", "eloquent", "eloquently", 0],
    ["No sooner had the meeting begun ___ the fire alarm sounded.", "when", "than", "that", "then", 1],
    ["The minister's ___ remarks about the scandal did little to reassure the public.", "glib", "gaunt", "gruff", "gallant", 0],
    ["Come what ___, we will not abandon the project.", "may", "might", "will", "shall", 0],
    ["After the scandal, the senator was forced to ___ humble pie.", "eat", "take", "have", "serve", 0],
    [
        "Which sentence is grammatically correct and appropriately formal?",
        "Were the board to reject the offer, the company would face liquidation.",
        "If the board would reject the offer, the company would face liquidation.",
        "Should the board to reject the offer, the company would face liquidation.",
        "Was the board rejecting the offer, the company would face liquidation.",
        0
    ]
];

// =====================================================
// CEFR BANDS
// =====================================================

const BANDS = [
    { level: "A1", from: 0, to: 6, pass: 5 },
    { level: "A2", from: 7, to: 13, pass: 5 },
    { level: "B1", from: 14, to: 20, pass: 5 },
    { level: "B2", from: 21, to: 27, pass: 5 },
    { level: "C1", from: 28, to: 33, pass: 4 },
    { level: "C2", from: 34, to: 39, pass: 4 }
];

const LEVEL_DESCRIPTIONS = {
    "Below A1": "Your result is below the A1 threshold. Building a foundation in basic English would be a good starting point.",
    "A1": "You demonstrate a beginner level of English, with some understanding of basic expressions and structures.",
    "A2": "You demonstrate an elementary level of English and an understanding of common everyday language.",
    "B1": "You demonstrate an intermediate level of English and some ability to deal with familiar situations.",
    "B2": "You demonstrate an upper-intermediate level of English, with a good grasp of a range of structures.",
    "C1": "You demonstrate an advanced level of English and a strong command of complex language.",
    "C2": "You demonstrate a very advanced command of English, including complex and nuanced language."
};

// =====================================================
// APPLICATION STATE
// =====================================================

let currentQuestion = 0;
let answers = new Array(QUESTIONS.length).fill(null);

// =====================================================
// ELEMENTS
// =====================================================

const introduction = document.getElementById("test-introduction");
const questionSection = document.getElementById("test-questions");
const resultsSection = document.getElementById("test-results");

const questionContainer = document.getElementById("question-container");
const questionCounter = document.getElementById("question-counter");
const questionLevel = document.getElementById("question-level");
const progressBar = document.getElementById("test-progress-bar");

const startButton = document.getElementById("start-test");
const previousButton = document.getElementById("previous-question");
const nextButton = document.getElementById("next-question");
const submitButton = document.getElementById("submit-test");

// =====================================================
// START TEST
// =====================================================

startButton.addEventListener("click", () => {
    introduction.hidden = true;
    questionSection.hidden = false;
    currentQuestion = 0;
    renderQuestion();
});

// =====================================================
// DISPLAY QUESTION
// =====================================================

function getQuestionLevel(index) {
    const band = BANDS.find(b => index >= b.from && index <= b.to);
    return band.level;
}

function renderQuestion() {
    const question = QUESTIONS[currentQuestion];

    questionCounter.textContent =
        `Question ${currentQuestion + 1} of ${QUESTIONS.length}`;

    questionLevel.textContent = getQuestionLevel(currentQuestion);

    progressBar.style.width =
        `${((currentQuestion + 1) / QUESTIONS.length) * 100}%`;

    questionContainer.innerHTML = "";

    const heading = document.createElement("h2");
    heading.textContent = question[0];
    questionContainer.appendChild(heading);

    const options = document.createElement("div");
    options.className = "question-options";

    for (let i = 0; i < 4; i++) {
        const label = document.createElement("label");
        label.className = "question-option";

        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "question-answer";
        radio.value = i;
        radio.checked = answers[currentQuestion] === i;

        radio.addEventListener("change", () => {
            answers[currentQuestion] = i;
        });

        const text = document.createElement("span");
        text.textContent = question[i + 1];

        label.appendChild(radio);
        label.appendChild(text);
        options.appendChild(label);
    }

    questionContainer.appendChild(options);

    previousButton.disabled = currentQuestion === 0;

    nextButton.hidden = currentQuestion === QUESTIONS.length - 1;
    submitButton.hidden = currentQuestion !== QUESTIONS.length - 1;
}

// =====================================================
// QUESTION NAVIGATION
// =====================================================

previousButton.addEventListener("click", () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        renderQuestion();
    }
});

nextButton.addEventListener("click", () => {
    if (answers[currentQuestion] === null) {
        alert("Please select an answer before continuing.");
        return;
    }

    if (currentQuestion < QUESTIONS.length - 1) {
        currentQuestion++;
        renderQuestion();
    }
});

// =====================================================
// CALCULATE RESULTS
// =====================================================

function calculateResults() {
    const bandScores = BANDS.map(() => 0);
    let totalScore = 0;

    QUESTIONS.forEach((question, index) => {
        if (answers[index] === question[5]) {
            totalScore++;

            const bandIndex = BANDS.findIndex(
                band => index >= band.from && index <= band.to
            );

            bandScores[bandIndex]++;
        }
    });

    // Sequential placement: every preceding band must be passed.
    let placedLevel = "Below A1";

    for (let i = 0; i < BANDS.length; i++) {
        if (bandScores[i] >= BANDS[i].pass) {
            placedLevel = BANDS[i].level;
        } else {
            break;
        }
    }

    return {
        totalScore,
        bandScores,
        placedLevel
    };
}

// =====================================================
// FINISH TEST
// =====================================================

submitButton.addEventListener("click", async () => {
    const unanswered = answers.findIndex(answer => answer === null);

    if (unanswered !== -1) {
        currentQuestion = unanswered;
        renderQuestion();
        alert("Please answer every question before finishing.");
        return;
    }

    const results = calculateResults();

    questionSection.hidden = true;
    resultsSection.hidden = false;

    displayResults(results);

    // Save result and load community statistics.
    await saveResult(results);
    await loadCommunityResults();
});

// =====================================================
// DISPLAY INDIVIDUAL RESULTS
// =====================================================

function displayResults(results) {
    document.getElementById("placed-level").textContent =
        results.placedLevel;

    document.getElementById("result-description").textContent =
        LEVEL_DESCRIPTIONS[results.placedLevel];

    document.getElementById("total-score").textContent =
        `${results.totalScore}/40`;

    document.getElementById("total-percentage").textContent =
        `${Math.round((results.totalScore / 40) * 100)}%`;

    const chart = document.getElementById("level-score-chart");
    const details = document.getElementById("level-score-details");

    chart.innerHTML = "";
    details.innerHTML = "";

    BANDS.forEach((band, index) => {
        const score = results.bandScores[index];
        const maximum = band.to - band.from + 1;
        const percentage = (score / maximum) * 100;

        const row = document.createElement("div");
        row.className = "level-score-row";

        const label = document.createElement("strong");
        label.textContent = band.level;

        const track = document.createElement("div");
        track.className = "level-score-track";

        const fill = document.createElement("div");
        fill.className = "level-score-fill";
        fill.style.width = `${percentage}%`;

        track.appendChild(fill);

        const scoreText = document.createElement("span");
        scoreText.textContent = `${score}/${maximum}`;

        row.append(label, track, scoreText);
        chart.appendChild(row);

        const detail = document.createElement("p");
        detail.textContent =
            `${band.level}: ${score}/${maximum} correct — ` +
            `${score >= band.pass ? "Pass" : "Below pass mark"}`;

        details.appendChild(detail);
    });
}

// =====================================================
// SAVE RESULT TO SUPABASE
// =====================================================

async function saveResult(results) {
    const status = document.createElement("p");
    status.id = "database-status";
    status.textContent = "Adding your result to the community statistics...";
    resultsSection.appendChild(status);

    const payload = {
        overall_score: results.totalScore,
        placed_level: results.placedLevel,
        a1_score: results.bandScores[0],
        a2_score: results.bandScores[1],
        b1_score: results.bandScores[2],
        b2_score: results.bandScores[3],
        c1_score: results.bandScores[4],
        c2_score: results.bandScores[5]
    };

    try {
        const response = await fetch(
            `${SUPABASE_URL}/rest/v1/assessment_results`,
            {
                method: "POST",
                headers: {
                    "apikey": SUPABASE_KEY,
                    "Authorization": `Bearer ${SUPABASE_KEY}`,
                    "Content-Type": "application/json",
                    "Prefer": "return=minimal"
                },
                body: JSON.stringify(payload)
            }
        );

        if (!response.ok) {
            throw new Error(await response.text());
        }

        status.textContent =
            "Your result has been added to the community statistics.";

    } catch (error) {
        console.error("Supabase submission error:", error);

        status.textContent =
            "Your result is displayed above, but could not be added to the community statistics.";
    }
}

// =====================================================
// LOAD COMMUNITY RESULTS
// =====================================================

async function loadCommunityResults() {
    const container = document.createElement("section");
    container.id = "community-results";

    const heading = document.createElement("h3");
    heading.textContent = "Community results";

    const description = document.createElement("p");
    description.textContent =
        "How participants across the website have performed.";

    const graph = document.createElement("div");
    graph.id = "community-chart";

    container.append(heading, description, graph);
    resultsSection.appendChild(container);

    try {
        const response = await fetch(
            `${SUPABASE_URL}/rest/v1/rpc/get_assessment_summary`,
            {
                method: "POST",
                headers: {
                    "apikey": SUPABASE_KEY,
                    "Authorization": `Bearer ${SUPABASE_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({})
            }
        );

        if (!response.ok) {
            throw new Error(await response.text());
        }

        const data = await response.json();

        if (!data || data.length === 0) {
            graph.textContent = "No community results are available yet.";
            return;
        }

        const total = data.reduce(
            (sum, item) => sum + Number(item.participant_count), 0
        );

        const totalText = document.createElement("p");
        totalText.textContent = `Total participants: ${total}`;
        graph.appendChild(totalText);

        BANDS.forEach(band => {
            const item = data.find(
                result => result.placed_level === band.level
            );

            const count = item ? Number(item.participant_count) : 0;
            const percentage = total ? (count / total) * 100 : 0;

            const row = document.createElement("div");
            row.className = "community-score-row";

            const label = document.createElement("strong");
            label.textContent = band.level;

            const track = document.createElement("div");
            track.className = "community-score-track";

            const fill = document.createElement("div");
            fill.className = "community-score-fill";
            fill.style.width = `${percentage}%`;

            track.appendChild(fill);

            const countText = document.createElement("span");
            countText.textContent = `${count} (${Math.round(percentage)}%)`;

            row.append(label, track, countText);
            graph.appendChild(row);
        });

    } catch (error) {
        console.error("Community results error:", error);
        graph.textContent =
            "Community statistics are temporarily unavailable.";
    }
}

// =====================================================
// PRINT RESULTS
// =====================================================

document.getElementById("print-results").addEventListener("click", () => {
    window.print();
});

// =====================================================
// RESTART TEST
// =====================================================

document.getElementById("restart-test").addEventListener("click", () => {
    answers = new Array(QUESTIONS.length).fill(null);
    currentQuestion = 0;

    resultsSection.hidden = true;
    introduction.hidden = false;

    document.getElementById("database-status")?.remove();
    document.getElementById("community-results")?.remove();
});
