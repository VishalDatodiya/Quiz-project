const questions = [
  {
    question: "1 + 2",
    answer: [
      { text: 1, correct: false },
      { text: 2, correct: false },
      { text: 3, correct: true },
      { text: 4, correct: false },
    ],
  },
  {
    question: "2 * 2",
    answer: [
      { text: 1, correct: false },
      { text: 2, correct: false },
      { text: 3, correct: false },
      { text: 4, correct: true },
    ],
  },
  {
    question: "10 - 2",
    answer: [
      { text: 1, correct: false },
      { text: 8, correct: true },
      { text: 3, correct: false },
      { text: 4, correct: false },
    ],
  },
  {
    question: "10 / 2",
    answer: [
      { text: 1, correct: false },
      { text: 5, correct: true },
      { text: 3, correct: false },
      { text: 4, correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

// It will start the quiz and reset the currentQuestionIndex and score to 0
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  // bcz at the end we will start the quiz (we can add any text here like resart the Quiz)
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();

  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ": " + currentQuestion.question;

  currentQuestion.answer.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    // select answer is a function which will use for selecting the answer
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }

  // if we select wrong answer so correct answer should highlight automatically
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct == "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});
startQuiz();
