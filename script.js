// Get elements
const startBtn = document.querySelector(".start_btn button");
const infoBox = document.querySelector(".info_box");
const exitBtn = document.querySelector(".quit");
const continueBtn = document.querySelector(".Restart");
const quizBox = document.querySelector(".quiz_box");
const resultBox = document.querySelector(".result_box");
const optionList = document.querySelector(".option_list");
const nextBtn = document.querySelector(".next_btn");
const scoreText = document.querySelector(".score_text span");
const questionText = document.querySelector(".que_text span");
const totalQues = document.querySelector(".total_ques span");

// Quiz data
const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Preprocessor",
      "Hyper Text Markup Language",
      "Hyper Text Multiple Language",
      "Hyper Tool Markup Language"
    ],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "Which tag is used to create a hyperlink in HTML?",
    options: [
      "link",
      "a",
      "href",
      "hyper"
    ],
    answer: "a"
  },
  {
    question: "Which property is used to change the background color in CSS?",
    options: [
      "color",
      "bgcolor",
      "background-color",
      "background"
    ],
    answer: "background-color"
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Creative Style Sheets",
      "Computer Style Sheets",
      "Cascading Style Sheets",
      "Colorful Style Syntax"
    ],
    answer: "Cascading Style Sheets"
  },
  {
    question: "Which HTML tag is used to define an unordered list?",
    options: [
      "ul",
      "ol",
      "li",
      "list"
    ],
    answer: "ul"
  },
  
  {
    question: "Which method is used to output data to the console in JavaScript?",
    options: [
      "print()",
      "console.log()",
      "log.console()",
      "display()"
    ],
    answer: "console.log()"
  },
  {
    question: "Which attribute is used to provide a unique identifier to an HTML element?",
    options: [
      "class",
      "id",
      "name",
      "key"
    ],
    answer: "id"
  },
  {
    question: "Which CSS property controls the text size?",
    options: [
      "font-style",
      "text-size",
      "font-size",
      "size"
    ],
    answer: "font-size"
  },
  {
    question: "What does DOM stand for?",
    options: [
      "Document Object Model",
      "Data Object Method",
      "Digital Output Mechanism",
      "Display Order Module"
    ],
    answer: "Document Object Model"
  },
 
{
  question: "Which keyword is used to declare a variable in JavaScript?",
  options: [
    "var",
    "int",
    "let",
    "Both var and let"
  ],
  answer: "Both var and let"
}
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 15;

// Show rules
startBtn.onclick = () => {
  infoBox.classList.add("activeInfo");
};

// Exit rules
exitBtn.onclick = () => {
  infoBox.classList.remove("activeInfo");
};

// Start quiz
continueBtn.onclick = () => {
  infoBox.classList.remove("activeInfo");
  quizBox.style.display = "block";
  showQuestion();
};

// Show question
function showQuestion() {
  const q = questions[currentQuestion];
  questionText.textContent = q.question;
  optionList.innerHTML = "";

  q.options.forEach(option => {
    const div = document.createElement("div");
    div.className = "option";
    div.innerHTML = `<span>${option}</span>`;
    div.onclick = () => checkAnswer(div, option);
    optionList.appendChild(div);
  });

  nextBtn.style.display = "none";
  totalQues.innerHTML = `<p>${currentQuestion + 1}</p> of <p>${questions.length}</p> Questions`;

  startTimer();
}
function startTimer() {
  timeLeft = 15;
  document.querySelector(".timer_sec").textContent = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    document.querySelector(".timer_sec").textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      autoShowAnswer();
    }
  }, 1000);
}
function autoShowAnswer() {
  const correct = questions[currentQuestion].answer;

  document.querySelectorAll(".option").forEach(opt => {
    opt.style.pointerEvents = "none";
    if (opt.textContent === correct) {
      opt.classList.add("correct");
      opt.innerHTML += `<div class="icon tick"><i class="fas fa-check"></i></div>`;
    }
  });

  nextBtn.style.display = "block";
}

// Check answer
function checkAnswer(selected, answer) {
  clearInterval(timer); // Stop the timer

  const correct = questions[currentQuestion].answer;

  if (answer === correct) {
    selected.classList.add("correct");
    selected.innerHTML += `<div class="icon tick"><i class="fas fa-check"></i></div>`;
    score++;
  } else {
    selected.classList.add("incorrect");
    selected.innerHTML += `<div class="icon cross"><i class="fas fa-times"></i></div>`;
  }

  // Show correct answer if user got it wrong
  document.querySelectorAll(".option").forEach(opt => {
    opt.style.pointerEvents = "none";
    if (opt.textContent === correct && opt !== selected) {
      opt.classList.add("correct");
      opt.innerHTML += `<div class="icon tick"><i class="fas fa-check"></i></div>`;
    }
  });

  nextBtn.style.display = "block";
}

// Next question
nextBtn.onclick = () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
};

// Show result
function showResult() {
  quizBox.style.display = "none";
  resultBox.style.display = "flex";
  scoreText.innerHTML = `You got <p>${score}</p> out of <p>${questions.length}</p> correct`;
}

// Replay quiz
document.querySelector(".result_box .Restart").onclick = () => {
  currentQuestion = 0;
  score = 0;
  resultBox.style.display = "none";
  quizBox.style.display = "block";
  showQuestion();
};

// Quit quiz
document.querySelector(".result_box .quit").onclick = () => {
  window.location.reload();
};