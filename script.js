const questions = [
    {
        question: "Arrange the following code to print 'Hello, World!' in JavaScript.",
        blocks: ["console.log('Hello, World!');", "function main() {", "}", "main();"],
        correctOrder: [1, 0, 3, 2]
    },
    {
        question: "Arrange the following code to create a function that adds two numbers in JavaScript.",
        blocks: ["return a + b;", "function add(a, b) {", "}"],
        correctOrder: [1, 0, 2]
    },
    {
        question: "Arrange the following code to create a loop that prints numbers 1 to 5 in JavaScript.",
        blocks: ["for (let i = 1; i <= 5; i++) {", "console.log(i);", "}"],
        correctOrder: [0, 1, 2]
    },
    {
        question: "Arrange the following code to create a JavaScript function that sorts an array of numbers.",
        blocks: ["return arr.sort((a, b) => a - b);", "function sortArray(arr) {", "}"],
        correctOrder: [1, 0, 2]
    },
    {
        question: "Arrange the following code to create a Python function that finds the maximum number in a list.",
        blocks: ["def find_max(numbers):", "return max(numbers)"],
        correctOrder: [0, 1]
    },
    {
        question: "Arrange the following code to create a JavaScript function that generates a random number between 1 and 10.",
        blocks: ["return Math.floor(Math.random() * 10) + 1;", "function getRandomNumber() {", "}"],
        correctOrder: [1, 0, 2]
    },
    {
        question: "Arrange the following code to create a Python function that checks if a number is prime.",
        blocks: ["def is_prime(n):", "if n <= 1:","if n % i == 0:", "return False", "for i in range(2, int(n ** 0.5) + 1):", "return False", "return True"],
        correctOrder: [0, 1, 2, 3, 4, 5, 6]
    },
    {
        question: "Arrange the following code to create a JavaScript function that converts a string to uppercase.",
        blocks: ["return str.toUpperCase();", "function toUpper(str) {", "}"],
        correctOrder: [1, 0, 2]
    },
    {
        question: "Arrange the following code to create a Python function that calculates the area of a circle.",
        blocks: ["def area_of_circle(radius):", "return 3.14 * radius ** 2"],
        correctOrder: [0, 1]
    },
    {
        question: "Arrange the following code to create a Python class representing a car.",
        blocks: ["class Car:", "self.model = model", "def __init__(self, make, model):", "self.make = make"],
        correctOrder: [0, 1, 2, 3]
    },
    {
        question: "Arrange the following code to create a JavaScript promise that resolves after 1 second.",
        blocks: ["});", "new Promise((resolve) => {", "resolve('Done!');", "}, 1000);", "setTimeout(() => {"],
        correctOrder: [0, 1, 2, 3, 4]
    },
    {
        question: "Arrange the following code to create a Python function that checks if a string is a palindrome.",
        blocks: ["def is_palindrome(s):", "return s == s[::-1]"],
        correctOrder: [0, 1]
    },
    {
        question: "Arrange the following code to create a JavaScript function that fetches data from an API.",
        blocks: ["fetch('https://api.example.com/data')", ".then(response => response.json())", ".then(data => console.log(data));"],
        correctOrder: [0, 1, 2]
    },
    {
        question: "Arrange the following code to create a Python function that reads a file and prints its contents.",
        blocks: ["print(file.read())","with open('file.txt', 'r') as file:",],
        correctOrder: [0, 1]
    },

];

    // Add other questions...

let currentQuestionIndex = 0;
let sortableList;

function loadQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById('question').textContent = question.question;
    const list = document.getElementById('sortable-list');
    list.innerHTML = '';

    // Create list items with draggable property
    question.blocks.forEach((block, index) => {
        const li = document.createElement('li');
        li.textContent = block;
        li.setAttribute('data-index', index);
        li.setAttribute('draggable', 'true'); // Make the list item draggable
        li.classList.add('sortable-item');
        list.appendChild(li);
    });

    // Initialize Sortable.js for drag and drop
    sortableList = new Sortable(list, {
        animation: 150, // Optional animation when dragging
        onEnd: function (evt) {
            // Optional: Handle the end of sorting
            console.log('Sorting ended');
        },
        swap: true,
    });
}

function checkAnswer() {
    const listItems = document.querySelectorAll('#sortable-list li');
    const userOrder = Array.from(listItems).map(item => parseInt(item.getAttribute('data-index')));
    const correctOrder = questions[currentQuestionIndex].correctOrder;

    if (JSON.stringify(userOrder) === JSON.stringify(correctOrder)) {
        document.getElementById('result').textContent = 'Correct!';
        document.getElementById('next-question').style.display = 'inline-block'; // Show Next Question button
        document.getElementById('check-answer').style.display = 'none'; // Hide Check Answer button
    } else {
        document.getElementById('result').textContent = 'Incorrect! Try again.';
    }
}

document.getElementById('check-answer').addEventListener('click', checkAnswer);

// Add event listener for "Next Question" button
document.getElementById('next-question').addEventListener('click', function() {
    currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
    loadQuestion();
    document.getElementById('result').textContent = '';
    document.getElementById('next-question').style.display = 'none'; // Hide Next Question button
    document.getElementById('check-answer').style.display = 'inline-block'; // Show Check Answer button again
});

// Load the first question
loadQuestion();
