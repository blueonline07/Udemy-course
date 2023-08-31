let drums = document.querySelectorAll(".drum");
let sounds = [new Audio("./sounds/tom-1.mp3"),new Audio("./sounds/tom-2.mp3"),new Audio("./sounds/tom-3.mp3"),new Audio("./sounds/tom-4.mp3"),new Audio("./sounds/crash.mp3"),new Audio("./sounds/kick-bass.mp3"),new Audio("./sounds/snare.mp3")];
for(let i=0; i< drums.length; i++){
    drums[i].addEventListener("click",function (){
        buttonAnimation(drums[i].innerHTML);
        sounds[i].play();
    });
}
document.addEventListener("keydown",function(event){
    buttonAnimation(event.key);
    switch (event.key){
        case 'w':
            sounds[0].play();
        break;
        case 'a':
            sounds[1].play();
        break;
        case 's':
            sounds[2].play();
        break;
        case 'd':
            sounds[3].play();
        break;
        case 'j':
            sounds[4].play();
        break;
        case 'k':
            sounds[5].play();
        break;
        case 'l':
            sounds[6].play();
        break;
    }
})
function buttonAnimation(currentKey){
    var currentButton = document.querySelector("."+currentKey);
    currentButton.classList.add("pressed");
    setTimeout(backToNormal,100,currentButton);
}
function backToNormal(currentButton){
    currentButton.classList.remove("pressed");
}