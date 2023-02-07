const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "What is MCU?",
    choice1: "Marvel Community Universal",
    choice2: "Marvel Comics Universe",
    choice3: "Marvel Command Unique",
    choice4: "Marvel Concert Universal",
    answer: 2,
  },

  {
    question: "Who are the craziest avenger?",
    choice1: "Thor",
    choice2: "IronMan",
    choice3: "Captain America",
    choice4: "Hulk",
    answer: 4,
  },

  {
    question: "How many are infinity stones?",
    choice1: "4",
    choice2: "5",
    choice3: "6",
    choice4: "7",
    answer: 3,
  },

  {
    question: "Where is Wakanda located?",
    choice1: "South America",
    choice2: "Europe",
    choice3: "Oceania",
    choice4: "Africa",
    answer: 4,
  },

  {
    question: "Where is Thanos place of birth?",
    choice1: "Earth",
    choice2: "Nowhere",
    choice3: "Titan",
    choice4: "Nova",
    answer: 3,
  },

  {
    question: "Who is Quil father?",
    choice1: "Yondu",
    choice2: "Kevin Bakon",
    choice3: "Creglin",
    choice4: "Ego",
    answer: 4,
  },

  {
    question: "What element help Tony Stark living?",
    choice1: "Helium",
    choice2: "Paladium",
    choice3: "Vibranium",
    choice4: "Gold",
    answer: 2,
  },
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 7;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    return window.location.assign("/html/end.html");
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
