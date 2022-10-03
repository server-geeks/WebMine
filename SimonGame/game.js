var buttoncolors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var randomNumber;
var randomChosenColour;
var level = 0;
var started = false

$(document).keypress(function () {
    if (!started) {

        $("#level-title").text("Level " + level);
        nextSequence();

        started = true;
    }
});

$("[type=button]").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);

});

var nextSequence = () => {
    userClickedPattern = [];

    randomNumber = Math.floor(Math.random() * 4);
    randomChosenColour = buttoncolors[randomNumber];
    gamePattern.push(randomChosenColour);

    playSound(randomChosenColour);

    $("h1").text("Level " + level);
    level++;

    $("#" + randomChosenColour).fadeTo(100, 0.3, function () {
        $(this).fadeTo(500, 1.0);
    });

}

var playSound = (name) => {
    var audio = new Audio("sounds/" + name + ".mp3 ");
    audio.play();
}

var animatePress = (chosenColor) => {
    $("#" + chosenColor).addClass("pressed");
    setTimeout(() => {
        $("#" + chosenColor).removeClass("pressed");
    }, 100)
}

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        if (userClickedPattern.length === gamePattern.length) {

            setTimeout(function () {
                nextSequence();
            }, 1000);

        }

    } else {
        var audio = new Audio("sounds/wrong.mp3 ");
        audio.play();
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press any key to Restart");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }

}
var startOver = () => {
    level = 0;
    gamePattern = [];
    started = false;
    userClickedPattern = [];
}