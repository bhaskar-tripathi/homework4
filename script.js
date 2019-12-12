document.addEventListener("DOMContentLoaded", function () {

    var instruction = document.querySelector("#instruction");
    var questionContent = document.querySelector("#questionContent");
    var startQuiz = document.querySelector("#startQuiz");
    var title = document.querySelector("#title");
    var clock = document.querySelector("#clock");
    var messageBox = document.querySelector("#messageBox");
    var message = document.querySelector("#message");
    var finalScore = document.querySelector(".finalScore");
    var score = document.querySelector("#score");
    var submitButton = document.querySelector("#submitButton");
    var highScoreList = document.querySelector("#highScoreList");
    var playerInitials = document.querySelector("#playerInitials");
    var scoreBoardButton = document.querySelector("#scoreBoardButton");
    var botButtonMenu = document.querySelector("#botButtonMenu");
    var timer;
    var timeLeft = 0;
    var currentScore = 0;
    const highScores = "highScores";    // local storage variable


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
        // {
        //     title: "The condition in an if / else statement is enclosed within ____. , The condition in an if / else statement is enclosed within ____., The condition in an if / else statement is enclosed within ____.",
        //     choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        //     answer: "parentheses"
        // },
    ];

    var highScoreBoard;



    var insText = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!"
    questionContent.textContent = insText;


    function getHighScoresFromStorage() {
        highScoreBoard = JSON.parse(localStorage.getItem(highScores));
        if (highScoreBoard === null) { highScoreBoard = [] };
    };

    function beginQuiz() {

        var questionNumber = 0;

        //disable buttons
        highscoreButtonToggle("deactivate");

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
                    // Decrement time - penalty for wrong answer

                    timeLeft = timeLeft - 15;
                    if (timeLeft < 0) { timeLeft = 0 };
                }

                // display the message box
                messageBox.classList.remove("d-none");
                messageBox.classList.add("d-block");
                message.textContent = messageText;

                setTimeout(function () {
                    // after specified seconds, hide the message box
                    messageBox.classList.add("d-none");
                    messageBox.classList.remove("d-block");
                }, 1500);

                if (questions[index + 1] !== undefined) {
                    showQuestion(index + 1);
                }
                else {
                    clearInterval(timer);
                    showScore(timeLeft);
                    //scoreBoardButton.setAttribute("aria-disabled",false);
                    highscoreButtonToggle("active");

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

    function showScore(scoreVal) {
        removeChoices();
        title.classList.remove("d-none");
        title.classList.remove("text-center");
        title.classList.remove("mx-auto");
        title.classList.add("text-left");

        title.textContent = "All done!";

        // Score
        finalScore.classList.remove("d-none");
        finalScore.classList.add("d-block");
        finalScore.classList.add("text-left");

        currentScore = scoreVal;
        score.textContent = currentScore;

        questionContent.classList.add("d-none");

    }

    function updateClock() {
        clock.textContent = timeLeft;
    };


    function showHighScore(event, scoreVal, playerInit) {

        event.preventDefault();

        if (scoreBoardButton.classList.contains("disabled") !== true) {


            // Clear screen to rerender it
            highScoreList.innerHTML = "";
            botButtonMenu.innerHTML = "";


            // if scoreVal is not null, store the passed value
            if (scoreVal !== undefined && playerInit !== undefined) {
                var scores = {
                    "init": playerInit,
                    "score": scoreVal,
                };
                highScoreBoard.push(scores);
                localStorage.setItem(highScores, JSON.stringify(highScoreBoard));
            }

            title.classList.remove("d-none");
            title.classList.remove("text-center");
            title.classList.remove("mx-auto");
            title.classList.add("text-left");

            title.textContent = "Highscores";

            finalScore.classList.add("d-none");
            finalScore.classList.remove("d-block");

            questionContent.classList.add("d-none");
            startQuiz.classList.add("d-none");

            highScoreBoard.forEach(function (scoreItem, index) {
                var scoreListItem = document.createElement("div");
                scoreListItem.classList.add("bg-info");
                scoreListItem.classList.add("my-2");
                scoreListItem.classList.add("p-2");
                scoreListItem.classList.add("text-white");
                scoreListItem.classList.add("rounded-pill");

                scoreListItem.innerHTML = "<span class='pr-2'>" + (index + 1) + ".</span><span class='pl-2 pr-4'>" + scoreItem.init + "</span><span class='p-4'>-</span><span class='pl-4'>" + scoreItem.score + "</span>";

                highScoreList.appendChild(scoreListItem);

            });

            addButtonToBotMenu("Go Home", "homeButton");
            addButtonToBotMenu("Clear Highscores", "clearScores");
        }

    }

    function addButtonToBotMenu(butText, butID) {
        var button = document.createElement("button");
        button.id = butID;
        button.classList.add("btn");
        button.classList.add("btn-primary");
        button.classList.add("mr-2");
        button.textContent = butText;
        botButtonMenu.appendChild(button);
    }

    function goHome(event) {
        if (event.target.id == "homeButton") {
            window.location = "index.html";
        }

    }

    function clearHighscores(event) {
        if (event.target.id == "clearScores") {
            localStorage.removeItem(highScores);
            getHighScoresFromStorage();
            showHighScore(event);
        }

    }


    getHighScoresFromStorage();
    startQuiz.addEventListener("click", beginQuiz);

    submitButton.addEventListener("click", function () {
        showHighScore(event, currentScore, playerInitials.value);
        currentScore = null;
        playerInitials.value = null;
    });

    function highscoreButtonToggle(state) {

        if (state === "active") {

            scoreBoardButton.classList.remove("disabled");
        }
        else if (state === "deactivate") {
            scoreBoardButton.classList.add("disabled");
        }

    };

    highscoreButtonToggle("active");


    botButtonMenu.addEventListener("click", goHome);
    botButtonMenu.addEventListener("click", clearHighscores);
    scoreBoardButton.addEventListener("click", function () {
        showHighScore(event);
    })



})