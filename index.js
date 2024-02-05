var started = false;
var answerCall = false;
var sound = new Audio();

var song = new Audio("./sounds/song.mp3");
song.preload = "auto";
song.volume = 0.5;

function playSound(fileName) {
    sound = new Audio("./sounds/"+fileName+".mp3");
    sound.volume = 0.5;

    // only loop audio if its ring.mp3
    if(fileName === "ring") {
        sound.loop = "loop";

        // end loop after 20 seconds
        setTimeout(function() {
            sound.pause();
            sound.currentTime = 0;
        }, 20000);
    }

    // turn down yell sound volume
    if(fileName === "yell") {
        sound.volume = 0.3;
    }

    sound.play();
}


// play ring sound only once
$(".yes").click(function() {
    if(!started) {
        playSound("ring");
        started = true;
    }

    // show image, hide big button
    $(".dudu").css("visibility", "visible");
    $("h1").text("Your Dudu is calling you, would you like to answer the call?");
    $(".yes").css("display", "none");
    
    // show buttons
    $(".call-yes").css("display", "flex");
    $(".call-no").css("display", "flex");
});

$(".call-yes").click(function() {
    sound.pause();
    sound.currentTime = 0;
    playSound("yay");

    // change image, hide both buttons
    $(".dudu").attr("src", "./images/dudu rose.jpg")
    $(".call-yes").css("display", "none");
    $(".call-no").css("display", "none");

    // change question, show new buttons
    $("h1").text("Will you be my VALENTINE? (please im begging)");
    $(".val-yes").css("display", "flex");
    $(".val-no").css("display", "flex");
});

$(".call-no").click(function() {
    sound.pause();
    sound.currentTime = 0;
    playSound("yell");

    // change image, hide no button
    $(".dudu").attr("src", "./images/dudu no.gif")
    $(".call-no").css("display", "none");
});

// main gimmick, running no button
$(function() {
    $(".val-no").on({
        click:function() {
            // change no button position randomly
            $(this).css({
                left: (Math.random()*1000)+"px",
                top: (Math.random()*500)+"px"
            });

            
            randomDudu();

            // play yell sound if clicked
            sound.pause();
            sound.currentTime = 0;
            playSound("yell");

            // change no button text randomly, change font sizes accordingly
            $(this).addClass("reset-margin");
            $(this).text(generatePhrases());
            changeFontSize("val-yes", 5);
            changeFontSize("val-no", -1);
        }
    });
});

// final yes button
$(".val-yes").click(function() {
    // change header, image, and play song
    $("h1").text("YAY SEE YOU ON THE 14TH BABY!");
    $(".dudu").attr("src", "./images/hug.gif");

    sound.pause();
    sound.currentTime = 0;
    song.play();

    // hide buttons
    $(this).css("display", "none");
    $(".val-no").css("display", "none");
});

// choose phrases randomly from a list
function generatePhrases() {
    var phraseList = ["no", "stop trying", "r u srs", "this doesnt work", "wow cant believe u", "i did all this for a no? wont accept it"];
    var i = Math.floor(Math.random()*phraseList.length);

    return phraseList[i];
}

// choose random gif from a list
function randomDudu() {
    gifList = ["./images/dudu chase.gif", "./images/dudu drag.gif", "./images/dudu trash.gif", "./images/dudu write.gif"];
    var j = Math.floor(Math.random()*gifList.length);
    $(".dudu").attr("src", gifList[j]);
}

// function to change font size
function changeFontSize(className, factor) {
    newFontSize = parseInt($("."+className).css('font-size')) + factor;
    $("."+className).css('font-size', newFontSize);
    
    // change header and hide no button when newFontSize is below/equal to 15
    if(newFontSize <= 15) {
        $("h1").text("you have no other choice im afraid 🥺👉👈");
        $(".val-no").css("display", "none");
    }
}