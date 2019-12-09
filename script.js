document.addEventListener("DOMContentLoaded", function () {

    var instruction = document.querySelector("#instruction");
    var questionContent = document.querySelector("#questionContent");
    var startQuiz = document.querySelector("#startQuiz");
    var title = document.querySelector("#title");
    var clock = document.querySelector("#clock");
    var messageBox = document.querySelector("#messageBox");
    var message = document.querySelector("#message");
    var timer;
    var timeLeft = 0;


    var questions = [
        {
            title: "Commonly used data types DO NOT include:",
            choices: ["strings", "booleans", "alerts", "numbers"],
            answer: "alerts"
        },
        {
            title: "The condition in an if / else statement is enclosed within ____.",
            choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
            answer: "parentheses"
        },
        {
            title: "The condition in an if / else statement is enclosed within ____. , The condition in an if / else statement is enclosed within ____., The condition in an if / else statement is enclosed within ____.",
            choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
            answer: "parentheses"
        },
    ];


    var insText = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!"
    questionContent.textContent = insText;


    function beginQuiz() {

        var questionNumber = 0;

        title.classList.add("d-none");
        startQuiz.classList.add("d-none");
        instruction.classList.remove("h5");
        instruction.classList.remove("text-center");
        instruction.classList.add("h4");
        instruction.classList.add("text-left");
        instruction.classList.add("font-weight-bold");

        timeLeft = getQuizTime();       // get quiz time

        updateClock(); // Set the clock

        timer = setInterval(setTimer, 1000);

        showQuestion(questionNumber);



    }

    function setTimer() {

        timeLeft--;

        updateClock();  // update clock


        if (timeLeft <= 0) {
            clearInterval(timer);
            showScore();
        }
    }

    function getQuizTime() {
        return ((questions.length) * 15);
    }

    function showQuestion(index) {

        // destroy the previous questions choices
        // var choiceBox = document.querySelector("#choices");
        // if (choiceBox !== null) {
        //     choiceBox.remove();
        // }
        removeChoices();

        // set the new question
        questionContent.textContent = questions[index].title;

        // create choice box for new question
        var choiceBox = document.createElement("div");
        choiceBox.id = "choices";
        instruction.appendChild(choiceBox);

        // display choice buttons
        questions[index].choices.forEach(function (choice, choiceNum) {
            var row = document.createElement("div");
            row.classList.add("row");
            row.classList.add("mx-auto");
            row.classList.add("my-2");
            instruction.appendChild(row);

            var choiceButton = document.createElement("button");
            choiceButton.textContent = (++choiceNum) + ". " + choice;
            choiceButton.classList.add("btn");
            choiceButton.classList.add("btn-primary");
            choiceButton.classList.add("btn-sm");
            row.appendChild(choiceButton);
            choiceBox.appendChild(row);

            choiceButton.addEventListener("click", function (event) {
                var messageText = "";
                if (this.textContent.slice(3) === questions[index].answer) {
                    // if right answer, display success message
                    messageText = "Correct!";
                }
                else {
                    // otherwise, display fail message
                    messageText = "Wrong!";
                }

                // display the message box
                messageBox.classList.remove("d-none");
                messageBox.classList.add("d-block");
                message.textContent = messageText;

                setTimeout(function () {
                    // after specified seconds, hide the message box
                    messageBox.classList.add("d-none");
                    messageBox.classList.remove("d-block");
                }, 2000);

                if (questions[index+1] !== undefined) {
                    showQuestion(index+1);
                }
                else {
                    showScore();
                }

            });

        })
    }

    function removeChoices() {
        var choiceBox = document.querySelector("#choices");
        if (choiceBox !== null) {
            choiceBox.remove();
        }
    }

    function showScore() {
        removeChoices();
        title.classList.remove("d-none");
        title.classList.remove("text-center");
        title.classList.remove("mx-auto");
        title.classList.add("text-left");
        
        title.textContent = "All done!";

    }

    function updateClock() {
        clock.textContent = timeLeft;
    };

    startQuiz.addEventListener("click", beginQuiz);


})