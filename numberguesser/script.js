var typebox = document.querySelector('.typer');
let audio = new Audio();
var resetbutton = document.querySelector('#reset');
var guessbutton = document.querySelector('#guess');
var bignum = document.querySelector('.bignum');
var cancelbutton = document.querySelector('#clear');
var low = document.querySelector('#low');
var high = document.querySelector('#high');
var punk = document.querySelector('.punk');
var min = 0;
var max = 100;
var random = getRandom(max);
var show = document.querySelector('.main-box');
var unshow = document.querySelector('.unshow');
var lastguess = document.querySelector('.lastguess');


punk.addEventListener('click', function (event) {
  event.preventDefault();
  min = parseInt(low.value);
  max = parseInt(high.value);
  random = getRandom(max);
  console.log(random)
  show.style.display = 'block';
  unshow.style.display = 'none';
})

// audio clip
audio.src="sound/rifle_shot_echo.ogg";
// var clearInstruct = document.querySelector('h3');

// This generats random number 1-100
function getRandom(max){

  random = Math.floor(((Math.random() * (max - min)) + min));
  console.log(random);
  return random;
  } 
 
  //this button submits guess
  guessbutton.addEventListener('click', function(e) {
  e.preventDefault();
  document.querySelector('.lastguess').innerText = 'Your last guess was' //this function validates guess
  validate();
});

// this logic 
function validate() {
  var typebox = parseInt(document.querySelector('.typer').value);
  var feedback = document.querySelector('.feedback');
  if ( typebox > random && typebox <= max) {
    feedback.innerText = "That is too high";
    bignum.innerText = typebox;
  } else if  (typebox < random && typebox >= min) {
    bignum.innerText = typebox;
    feedback.innerText = "This is too low";  
  } else if (typebox < min) {
    feedback.innerText = "Guess must be " + min +" and " + max;
    bignum.innerText = typebox;
  } else if ( typebox > max) {
    feedback.innerText = "Guess must be " + min +" and " + max;
    bignum.innerText = typebox;
  } else if (typebox = random) {
    feedback.innerText = "BOOM!";
    bignum.innerText = typebox;
    audio.play();
    levelup();
  }
}

//this button clears the first input field 
cancelbutton.addEventListener('click', function () {
  document.querySelector('.typer').value = "";
});

//this button resets the number
resetbutton.addEventListener('click', function () {
  window.location.reload();
});

// disable Clear button
typebox.addEventListener('keyup', function () {
  if (typebox.value === "") {
    cancelbutton.disabled = true;
  } else {
    cancelbutton.disabled = false;
  }
});

// disable Guess button
typebox.addEventListener('keyup', function () {
  if (typebox.value !== "") {
    guessbutton.disabled = false;
  } else {
    guessbutton.disabled = true;
  } 
});

// disable Reset button
typebox.addEventListener('keyup', function () {
  if (typebox.value === "") {
    resetbutton.disabled = true;
  } else {
    resetbutton.disabled = false;
  }
});

function levelup() {
  min = min - 10;
  max = max + 10;
  lastguess.innerText = "The new range is " + min + " to " + max;
  getRandom(max); 
}


