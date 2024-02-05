var playing = false;



function playSound(fileName) {
    var sound = new Audio("./sounds/"+fileName+".mp3");
    // only loop audio if its ring.mp3
    if(fileName === "ring") {
        sound.loop = "loop";
    }
    sound.play();
}


// play ring sound
// $(document).click(function() {
//     playSound("ring");
// });