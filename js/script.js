// An Array that contains the question and their options with one correct answer
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

shuffleQuestions();

// It will shuffle the array so we can get random question
function shuffleQuestions() {
  for (var index = questions.length - 1; index > 0; index--) {
    var randomIndex = Math.floor(Math.random() * (index + 1));
    var temp = questions[index];
    questions[index] = questions[randomIndex];
    questions[randomIndex] = temp;
  }
}

// It will start the quiz and reset the currentQuestionIndex and score to 0
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next"; // bcz at the end we will start the quiz (we can add any text here like restart the Quiz)
  showQuestion();
}

// This function will show the question on the we page
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

// It will reset the quiz
function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

// This function will do selection the answer task
function selectAnswer(user_answer) {
  // target is a property of an event object that refers to the element that triggered the event.
  const selectedBtn = user_answer.target;
  //The dataset read-only property of the HTMLElement interface provides read/write access to custom data attributes (data-*) on elements.
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

// It will show the score at the end of the quiz
function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "play Again";
  nextButton.style.display = "block";
}

// This function will show the next question
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

// When we click on the next button so it should show the next question over the first question. This function do this task
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
