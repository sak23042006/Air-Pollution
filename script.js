document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM loaded");

    function loadPage(page) {
        fetch(page)
        .then(response => response.text())
        .then(html => {
            document.getElementById('main-content').innerHTML = html;
        })
        .catch(error => console.error('Error loading page:', error));
    }
    

    // Form Validation
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        if (name === '') {
            alert('Please enter your name.');
            nameInput.focus();
            return;
        }

        if (email === '') {
            alert('Please enter your email.');
            emailInput.focus();
            return;
        } else if (!isValidEmail(email)) {
            alert('Please enter a valid email address.');
            emailInput.focus();
            return;
        }

        if (message === '') {
            alert('Please enter your message.');
            messageInput.focus();
            return;
        }

        // If all fields are valid, submit the form (you can replace this with your desired action)
        alert('Form submitted successfully!');
        form.reset();
    });

    // Quiz Functionality (sample quiz questions)
    const quizQuestions = [
        {
            question: 'What is the primary cause of air pollution?',
            options: ['Vehicle emissions', 'Industrial activities', 'Deforestation', 'All of the above'],
            correctAnswer: 'All of the above'
        },
        {
            question: 'Which gas is responsible for the depletion of the ozone layer?',
            options: ['Carbon dioxide', 'Methane', 'Chlorofluorocarbons (CFCs)', 'Nitrous oxide'],
            correctAnswer: 'Chlorofluorocarbons (CFCs)'
        },
        // Add more quiz questions as needed
    ];

    const startQuizButton = document.getElementById('start-quiz');
    const quizQuestionsContainer = document.getElementById('quiz-questions');
    const quizResultsContainer = document.getElementById('quiz-results');

    startQuizButton.addEventListener('click', function() {
        // Display quiz questions
        displayQuizQuestions();
    });

    function displayQuizQuestions() {
        quizQuestionsContainer.innerHTML = '';
        quizResultsContainer.innerHTML = '';
        
        quizQuestions.forEach(function(question, index) {
            const questionElement = document.createElement('div');
            questionElement.classList.add('question');
            questionElement.innerHTML = `
                <h3>Question ${index + 1}</h3>
                <p>${question.question}</p>
                <ul>
                    ${question.options.map(option => `<li>${option}</li>`).join('')}
                </ul>
            `;
            quizQuestionsContainer.appendChild(questionElement);
        });

        quizQuestionsContainer.style.display = 'block';
    }

    // Function to check quiz results
    function checkQuizResults() {
        const userAnswers = [];
        const questionElements = quizQuestionsContainer.querySelectorAll('.question');
        
        questionElements.forEach(function(questionElement, index) {
            const selectedOption = questionElement.querySelector('input:checked');
            if (selectedOption) {
                userAnswers.push(selectedOption.value);
            } else {
                userAnswers.push(null); // If user didn't select an option
            }
        });

        // Compare user answers with correct answers
        const correctAnswers = quizQuestions.map(question => question.correctAnswer);
        const score = userAnswers.reduce((acc, answer, index) => {
            return answer === correctAnswers[index] ? acc + 1 : acc;
        }, 0);

        // Display quiz results
        quizQuestionsContainer.style.display = 'none';
        quizResultsContainer.innerHTML = `
            <h2>Quiz Results</h2>
            <p>You scored ${score} out of ${quizQuestions.length}.</p>
        `;
        quizResultsContainer.style.display = 'block';
    }

    // Helper function to validate email
    function isValidEmail(email) {
        // Very basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});
