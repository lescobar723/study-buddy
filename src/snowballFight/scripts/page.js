////  Page-scoped globals  ////

// Counters
let personIdx = 1;
let snowballIdx = 1;
let giantIdx = 1;
let picIdx = 1;

PERSON_SPEED = 25;
SCORE_UNIT = 1;
COMP_SPEED = 1;
BALL_SPEED = 10;
PEOPLE_SPEED = 1;
GIANT_SPEED = 3;

// Size vars
let maxPersonPosX, maxPersonPosY;
let maxItemPosX;
let maxItemPosY;
let endPosWidth;

// Global Window Handles (gwh__)
let gwhGame, gwhStatus, gwhScore;

// Global Object Handles
let player;
let whatObject;
let gameWinWidth;
let gameWinHeight;

let createEnemyHandle;
let currentFrequency = 3000;

let nextRock = 1;
let nextGood = 1;
let nextBad = 1;

let points;
let giantHit;
let friendHit;
let enemyHit;

let ballCount;
let pile;
let add;
let bum;

/*
 * This is a handy little container trick: use objects as constants to collect
 * vals for easier (and more understandable) reference to later.
 */
const KEYS = {
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  shift: 16,
  spacebar: 32
};

let rock1;
let rock2;
let rock3;
let rock4;

let person1;
let p1bool = false;
let p1type;
let person2;
let p2bool = false;
let p2type;
let person3;
let p3bool = false;
let p3type;
let person4;
let p4bool = false;
let p4type;

////  Functional Code  ////

// Main
$(document).ready( function() {
  setting1();
});

function keydownRouter(e) {
  switch (e.which) {
    case KEYS.shift:
      break;
    case KEYS.down:
      break;
    case KEYS.spacebar:
      break;
    case KEYS.left:
    case KEYS.right:
    case KEYS.up:
      movePerson(e.which);
      break;
    default:
      console.log("Invalid input!");
  }
}

// Check if two objects are colliding
function isColliding(o1, o2) {
  const o1D = { 'left': o1.offset().left,
        'right': o1.offset().left + o1.width(),
        'top': o1.offset().top,
        'bottom': o1.offset().top + o1.height()
      };
  const o2D = { 'left': o2.offset().left,
        'right': o2.offset().left + o2.width(),
        'top': o2.offset().top,
        'bottom': o2.offset().top + o2.height()
      };
  // Adapted from https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
  if (o1D.left < o2D.right &&
    o1D.right > o2D.left &&
    o1D.top < o2D.bottom &&
    o1D.bottom > o2D.top) {
     // collision detected!
     return true;
  }
  return false;
}

// Check if two objects are colliding
function snowColliding(o1, o2) {
  const o1D = { 'left': o1.offset().left,
        'right': o1.offset().left + o1.width(),
        'top': o1.offset().top,
        'bottom': o1.offset().top + o1.height()
      };
  const o2D = { 'left': o2.offset().left,
        'right': o2.offset().left + o2.width(),
        'top': o2.offset().top,
        'bottom': o2.offset().top + o2.height(),
        'height': o2.height()
      };

    o2D.bottom = o2D.bottom - (o2D.height * .60);

  // Adapted from https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
  if (o1D.left < o2D.right &&
    o1D.right > o2D.left &&
    o1D.top < o2D.bottom &&
    o1D.bottom > o2D.top) {
     // collision detected!
     return true;
  }
  return false;
}

function isGiant(o1, o2) {
  const o1D = { 'left': o1.offset().left,
        'right': o1.offset().left + o1.width(),
        'top': o1.offset().top,
        'bottom': o1.offset().top + o1.height(),
        'width': o1.width(),
        'height': o1.height()
      };
  const o2D = { 'left': o2.offset().left,
        'right': o2.offset().left + o2.width(),
        'top': o2.offset().top,
        'bottom': o2.offset().top + o2.height()
      };
  // Adapted from https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection

  o1D.right = o1D.right - (o1D.width * 0.2)
  o1D.left = o1D.left + (o1D.width * 0.2)
  o1D.top = o1D.top + (o1D.height * 0.2)
  o1D.bottom = o1D.bottom - (o1D.height * 0.2)

  if (o1D.left < o2D.right &&
    o1D.right > o2D.left &&
    o1D.top < o2D.bottom &&
    o1D.bottom > o2D.top) {
     // collision detected!
     return true;
  }
  return false;
}

// Get random number between min and max integer
function getRandomNumber(min, max){
  return (Math.random() * (max - min)) + min;
}

function createEnemy(){
  let divString = "";
  let side = "";
  let guess = getRandomNumber(0,3)
  if (guess <= 1) {
    // create good person
    side = "good";
    if (nextGood == 1) {
      divString = "<div id='p-" + personIdx + "' class='person'> <img src='img/blue.png'> </div>";
      nextGood++;
    } else if (nextGood == 2) {
      divString = "<div id='p-" + personIdx + "' class='person'> <img src='img/idk.png'> </div>";
      nextGood++;
    } else {
      divString = "<div id='p-" + personIdx + "' class='person'> <img src='img/four.png'> </div>";
      nextGood = 1;
    }    
  } else {
    // create enemy
    side = "bad";
    if (nextBad == 1) {
      divString = "<div id='p-" + personIdx + "' class='person'> <img src='img/enemy1.png'> </div>";
      nextBad++;
    } else if (nextBad == 2) {
      divString = "<div id='p-" + personIdx + "' class='person'> <img src='img/enemy2.png'> </div>";
      nextBad++;
    } else {
      divString = "<div id='p-" + personIdx + "' class='person'> <img src='img/enemy3.png'> </div>";
      nextBad = 1;
    }
  }

  let personId = "#p-" + personIdx.toString();
  $('#actualGame').append(divString);
  personIdx++;
  let startTop = 0;
  let startLeft = 0;
  let rockWidth = 0;
  let rockHeight = 0;
  let righty = false;
  let rocky = 0;

  let hit = false;

  if (nextRock == 1) {
    righty = true;
    rocky = 1;
    nextRock++;
    startLeft = parseInt(rock1.css('left'));
    startTop = parseInt(rock1.css('top'));
    rockWidth = rock1.width();
    rockHeight = rock1.height();
    person1 = $(personId);
    p1bool = true;
    if (side == "good") {
      p1type = "friend";
    } else {
      p1type = "enemy";
    }
  } else if (nextRock == 2) {
    righty = false;
    rocky = 2;
    nextRock++;
    startLeft = parseInt(rock2.css('left'));
    startTop = parseInt(rock2.css('top'));
    rockWidth = rock2.width();
    rockHeight = rock2.height();
    person2 = $(personId);
    p2bool = true;
    if (side == "good") {
      p2type = "friend";
    } else {
      p2type = "enemy";
    }
  } else if (nextRock == 3) {
    righty = true;
    nextRock++;
    rocky = 3;
    startLeft = parseInt(rock3.css('left'));
    startTop = parseInt(rock3.css('top'));
    rockWidth = rock3.width();
    rockHeight = rock3.height();
    person3 = $(personId);
    p3bool = true;
    if (side == "good") {
      p3type = "friend";
    } else {
      p3type = "enemy";
    }
  } else {
    righty = false;
    nextRock = 1;
    rocky = 4;
    startLeft = parseInt(rock4.css('left'));
    startTop = parseInt(rock4.css('top'));
    rockWidth = rock4.width();
    rockHeight = rock4.height();
    person4 = $(personId);
    p4bool = true;
    if (side == "good") {
      p4type = "friend";
    } else {
      p4type = "enemy";
    }
  }

  let currPerson = $(personId);
  let pWidth = currPerson.width();
  let pHeight = currPerson.height();
  if (righty == true) {
    startLeft = rockWidth + startLeft - pWidth;
  }
  startTop = startTop + rockHeight - pHeight;
  $(personId).css('left' , startLeft + 'px');
  $(personId).css('top' , startTop + 'px');
  let thrown = false;

  setInterval( function() {
    if (rocky == 1) {
      if (p1bool == false) {
        hit = true;
      }
    } else if (rocky == 2) {
      if (p2bool == false) {
        hit = true;
      }
    } else if (rocky == 3) {
      if (p3bool == false) {
        hit = true;
      }
    } else {
      if (p4bool == false) {
        hit = true;
      }
    }
  }, 50);

  setTimeout( function() {
    if (hit == false) {
      thrown = true;
      let newLeft = parseInt(currPerson.css('left'));
      let newTop = parseInt(currPerson.css('top'));
      let endLeft = parseInt(player.css('left'));
      let endTop = parseInt(player.css('top'));
      let leftTrav = endLeft - newLeft;
      leftTrav = Math.abs(leftTrav);
      enemyThrowSnowball(newTop, newLeft, endTop, endLeft, leftTrav);
    }
  }, 5000);

  setInterval( function() {
    if (hit == false) {
      let currLeft = parseInt(currPerson.css('left'));
      if (thrown == false) {
        if (righty == true) {
          currLeft = currLeft + PEOPLE_SPEED;
          $(personId).css('left' , currLeft + 'px');
        } else {
          currLeft = currLeft - PEOPLE_SPEED;
          $(personId).css('left' , currLeft + 'px');
        }
      } else {
        if (righty == true) {
          currLeft = currLeft - PEOPLE_SPEED;
          $(personId).css('left' , currLeft + 'px');
        } else {
          currLeft = currLeft + PEOPLE_SPEED;
          $(personId).css('left' , currLeft + 'px');
        }
      } //move backwards
    }
  }, 50);

  setTimeout( function() {
    if (hit == false) {
      graduallyFadeAndRemoveElement(personId);
      if (rocky == 1) {
        p1bool = false;
      } else if (rocky == 2) {
        p2bool = false;
      } else if (rocky == 3) {
        p3bool = false;
      } else {
        p4bol = false;
      }
    }
  }, 10000);
}

function enemyThrowSnowball(toppy, lefty, endtop, endleft, leftTrav) {
  
  let divString = "<div id='g-" + giantIdx + "' class='giant'> <img src='img/snowball.png'> </div>";
  let ballId = "#g-" + giantIdx.toString();
  giantIdx++;
  $('#actualGame').append(divString);

  $(ballId).css('left' , lefty + 'px');
  $(ballId).css('top' , toppy + 'px');
  let currball = $(ballId);
  let righty = false;

  if ((endleft - lefty) > 0) {
    righty = true;
  }

  let leftTravel = leftTrav;
  let iterat = endtop - toppy;
  leftTravel = leftTravel / iterat;

  let pointCounted = false;
  setInterval( function() {
    if (pointCounted == false) {
      let chan = $(ballId).css('top');
      chan = parseInt(chan);
      let nexttop = chan + GIANT_SPEED;

      if (nexttop > endtop) {
        pointCounted = true;
        graduallyFadeAndRemoveElement(ballId);
      } else {
        $(ballId).css('top' , nexttop + 'px');
      }
      
      chan = $(ballId).css('left');
      chan = parseInt(chan);
      let nextleft = chan;
      if (righty) {
        nextleft = chan + leftTravel;
      } else {
        nextleft = chan - leftTravel;
      }
      $(ballId).css('left' , nextleft + 'px');

      if (isGiant(currball, player)) {
        graduallyFadeAndRemoveElement(ballId);
        pointCounted = true;
        points = points - 3;
        giantHit++;
        document.getElementById("hitCounter").textContent = giantHit;
        document.getElementById("score-box").textContent = points;
      }
    }
  }, 50);
}

function throwSnowball() {
  if (ballCount > 0) {
    ballCount--;
    if(isColliding(player,pile)) {
      ballCount = 10;
      if(bum == true) {
        $('#out').remove();
        bum = false;
      }
    }
    document.getElementById("ball-box").textContent = ballCount;
    const playLoc = { 'left': player.offset().left,
        'right': player.offset().left + player.width(),
        'top': player.offset().top,
        'bottom': player.offset().top + player.height()
      };
    let middle = playLoc.left + playLoc.right;
    middle = middle / 2;
    let startPosTop = playLoc.top;
    let divString = "<div id='s-" + snowballIdx + "' class='snowball'> <img src='img/snowball.png'> </div>";
    let ballId = "#s-" + snowballIdx.toString();
    snowballIdx++;
    $('#actualGame').append(divString);
    $(ballId).css('left' , middle + 'px');
    $(ballId).css('top' , startPosTop + 'px');
    let currball = $(ballId);
    let pointCounted = false;
    setInterval( function() {
      if (pointCounted == false) {
        let chan = $(ballId).css('top');
        chan = parseInt(chan);
        let next = chan - BALL_SPEED;
      
        if (next < 0) {
          graduallyFadeAndRemoveElement(ballId);
        } else {
          $(ballId).css('top' , next + 'px');
        }
        if (p1bool) {
          if (snowColliding(currball, person1)) {
            if (p1type == "friend") {
              points = points - 1;
              friendHit++;
              document.getElementById("friendCounter").textContent = friendHit;
              displayMinus(person1);
            } else {
              points = points + 1;
              enemyHit++;
              document.getElementById("enemyCounter").textContent = enemyHit;
              displayPlus(person1);
            }
            graduallyFadeAndRemoveElement(ballId);
            pointCounted = true;
            document.getElementById("score-box").textContent = points;
            p1bool = false;
            graduallyFadeAndRemoveElement(person1);
          }
        }
        if (p2bool) {
          if (snowColliding(currball, person2)) {
            if (p2type == "friend") {
              points = points - 1;
              friendHit++;
              document.getElementById("friendCounter").textContent = friendHit;
              displayMinus(person2);
            } else {
              points = points + 1;
              enemyHit++;
              document.getElementById("enemyCounter").textContent = enemyHit;
              displayPlus(person2);
            }
            graduallyFadeAndRemoveElement(ballId);
            pointCounted = true;
            document.getElementById("score-box").textContent = points;
            p2bool = false;
            graduallyFadeAndRemoveElement(person2);
          }
        }
        if (p3bool) {
          if (snowColliding(currball, person3)) {
            if (p3type == "friend") {
              points = points - 1;
              friendHit++;
              document.getElementById("friendCounter").textContent = friendHit;
              displayMinus(person3);
            } else {
              oints = points + 1;
              enemyHit++;
              document.getElementById("enemyCounter").textContent = enemyHit;
              displayPlus(person3);
            }
            graduallyFadeAndRemoveElement(ballId);
            pointCounted = true;
            document.getElementById("score-box").textContent = points;
            p3bool = false;
            graduallyFadeAndRemoveElement(person3);
          }
        }
        if (p4bool) {
          if (snowColliding(currball, person4)) {
            if (p4type == "friend") {
              points = points - 1;
              friendHit++;
              document.getElementById("friendCounter").textContent = friendHit;
              displayMinus(person4);
            } else {
              points = points + 1;
              enemyHit++;
              document.getElementById("enemyCounter").textContent = enemyHit;
              displayPlus(person4);
            }
            graduallyFadeAndRemoveElement(ballId);
            pointCounted = true;
            document.getElementById("score-box").textContent = points;
            p4bool = false;
            graduallyFadeAndRemoveElement(person4);
          }
        }
      }
    }, 50);
  } else {
    //remind user to fill snowballs
    if (bum == false) {
      let divString = "<div class='warning' id='out'>REFILL BALLS IN BOTTOM LEFT CORNER!</div>"
      $('#add').append(divString);
      bum = true;
    }
  }
}

function graduallyFadeAndRemoveElement(elementObj){
  $(elementObj).fadeTo(500, 0, function(){
    $(this).remove();
  });
}

function startParade(){
  console.log("Starting parade...");
  fight = setInterval( function() {
    createEnemy()
    
  }, currentFrequency);
}

function displayMinus(person) {
  let startL = parseInt(person.css('left'));
  let startT = parseInt(person.css('top'));
  let divString = "<div id='pic-" + picIdx + "' class='point'> <img src='img/minusone.png'> </div>";
  let itPic = "#pic-" + picIdx.toString();
  $('#actualGame').append(divString);
  picIdx++;
  $(itPic).css('left' , startL + 'px');
  $(itPic).css('top' , startT + 'px');
  setTimeout( function() {
    graduallyFadeAndRemoveElement(itPic);
  }, 1000);
}

function displayPlus(person) {
  let startL = parseInt(person.css('left'));
  let startT = parseInt(person.css('top'));
  let divString = "<div id='pic-" + picIdx + "' class='point'> <img src='img/plusone.png'> </div>";
  let itPic = "#pic-" + picIdx.toString();
  $('#actualGame').append(divString);
  $(itPic).css('left' , startL + 'px');
  $(itPic).css('top' , startT + 'px');
  picIdx++;
  setTimeout( function() {
    graduallyFadeAndRemoveElement(itPic);
  }, 1000);
}

// Handle player movement events
function movePerson(arrow) {
  switch (arrow) {
    case KEYS.up: { // up arrow
      throwSnowball();
      break;
    }
    case KEYS.left: { // left arrow
      let newPos = parseInt(player.css('left'));
      if (newPos - PERSON_SPEED < 0) {
        newPos = 0;
      } else {
        newPos = newPos - PERSON_SPEED;
      }
      player.css('left', newPos);
      if(isColliding(player,pile)) {
        ballCount = 10;
        document.getElementById("ball-box").textContent = ballCount;
        if(bum == true) {
          $('#out').remove();
          bum = false;
        }
      }
      break;
    }
    case KEYS.right: { // right arrow
      let newPos = parseInt(player.css('left'));
      if (newPos + PERSON_SPEED > maxPersonPosX) {
        newPos = maxPersonPosX;
      } else {
        newPos = newPos + PERSON_SPEED;
      }
      player.css('left', newPos);
      if(isColliding(player,pile)) {
        ballCount = 10;
        document.getElementById("ball-box").textContent = ballCount;
        if(bum == true) {
          $('#out').remove();
          bum = false;
        }
      }
      break;
    }
  }
}

function quitGame() {
  $("#quit").remove();
  let p = "<div id='p'>Are you sure you want to quit now?</div>";
  let yes = "       <button id='yes' type='button' onclick= timeUp()>Yes, Quit Game</button>";
  let no = "<button id='no' type='button' onclick= cancel()>No, Don't Quit</button>";
  $('#settings').append(p);
  $('#settings').append(no);
  $('#settings').append(yes);
}

function cancel() {
  $("#p").remove();
  $("#yes").remove();
  $("#no").remove();
  let quit = "<button id='quit' type='button' onclick= quitGame()>Quit Game</button>";
  $('#settings').append(quit);
}

function setting1() {
  let div1 = "<div class='setting' style='text-align: center'></div>";
  $('.outer-container').append(div1);
  let div0 = "<div id='0'></div>";
  $('.setting').append(div0);
  setUp();
}

function setUp() {
  $('#0').remove();
  let div0 = "<div class='balz' id='0'>Welcome to Snowball Fight! Press 'Next' to learn the rules, or 'Play' to start the game! <br> <div class='empty'></div> <button id='play' type='button' onclick= play()>Play</button>        <button id='next' type='button' onclick= setting2()>Next</button></div>";
  $('.setting').append(div0);
}

function setting2() {
  $('#0').remove();
  let div0 = "<div id='0' class='balz'> </div>";
  $('.setting').append(div0);
  let div1 = "<div id='1' class='fon'> The goal is to throw snowballs at enemies, and avoid getting hit! </div>";
  let div2 = "<div id='2' class='fon'> To throw a snowball, press the UP arrow on your keyboard.</div>";
  let div3 = "<div id='3' class='fon'> Your character can only move to the left or right, and is located at the bottom of the screen.</div>";
  let div4 = "<div id='4' class='fon'> To move left, press the LEFT arrow on your keyboard.</div>";
  let div5 = "<div id='5' class='fon'> To move right, press the RIGHT arrow on your keyboard.</div>";
  let div6 = "<div id='6' class='fon'> This is what your character looks like: </div>";
  let im = "<img src='img/red.png'>";
  let pre = "<br><divclass='empty'></div> <button id='prev' type='button' onclick= setUp()>Prev</button>";
  let div7 = "          <button id='play' type='button' onclick= play()>Play</button>";
  let div8 = "          <button id='next' type='button' onclick= settinghalf()>Next</button>";
  $('#0').append(div1);
  $('#0').append(div2);
  $('#0').append(div3);
  $('#0').append(div4);
  $('#0').append(div5);
  $('#0').append(div6);
  $('#0').append(im);
  $('#0').append(pre);
  $('#0').append(div7);
  $('#0').append(div8);
}

function settinghalf() {
  $('#0').remove();
  let div0 = "<div id='0' class='balz'> </div>";
  $('.setting').append(div0);
  let div1 = "<div id='1' class='fon'> You can only hold 10 snowballs at a time, and you need to walk over to the snowball pile to get more if you run out: </div>";
  let di = "<br><div id='d' class='fon'> This is the snow pile: </div>";
  let div2 = "<div id='2' class='empty'></div>";
  let im = "<img src='img/snowpile.png'>";
  let pre = "<div class='empty'></div><button id='prev' type='button' onclick= setting2()>Prev</button>";
  let div3 = "       <button id='play' type='button' onclick= play()>Play</button>";
  let div4 = "       <button id='next' type='button' onclick= setting3()>Next</button>";
  $('#0').append(div1);
  $('#0').append(di);
  $('#0').append(div2);
  $('#0').append(im);
  $('#0').append(pre);
  $('#0').append(div3);
  $('#0').append(div4);
}

function setting3() {
  $('#0').remove();
  let div0 = "<div id='0' class='fwend'> </div>";
  $('.setting').append(div0);
  let div1 = "<div id='1' class='fon'> Enemies look like this: </div>";
  let di = "<div id='di' class='empty'></div>";
  let div2 = "<img src='img/enemy1.png'>";
  let div3 = "<img src='img/enemy2.png'>";
  let div4 = "<img src='img/enemy3.png'>";
  let div5 = "<div id='5' class='empty fon'> If you hit an enemy, you get 1 point </div>";
  let pre = "<div class='empty'></div><button id='prev' type='button' onclick= settinghalf()>Prev</button>";
  let div6 = "      <button id='play' type='button' onclick= play()>Play</button>";
  let div7 = "      <button id='next' type='button' onclick= setting4()>Next</button>";
  $('#0').append(div1);
  $('#0').append(di);
  $('#0').append(div2);
  $('#0').append(div3);
  $('#0').append(div4);
  $('#0').append(div5);
  $('#0').append(pre);
  $('#0').append(div6);
  $('#0').append(div7);
}

function setting4() {
  $('#0').remove();
  let div0 = "<div id='0' class='fwend'> </div>";
  $('.setting').append(div0);
  
  let div1 = "<div id='1' class='fon'> There are also allies that apprear, they look like this: </div>";
  let di = "<div id='di' class='empty'></div>";
  let div2 = "<img src='img/blue.png'>";
  let div3 = "<img src='img/idk.png'>";
  let div4 = "<img src='img/four.png'>";
  let div5 = "<div id='5' class='empty fon'> If you hit an ally, you lose 1 point </div>";
  let pre = "<div class='empty'></div><button id='prev' type='button' onclick= setting3()>Prev</button>";
  let div6 = "        </div><button id='play' type='button' onclick= play()>Play</button>";
  let div7 = "        <button id='next' type='button' onclick= setting5()>Next</button>";
  $('#0').append(div1);
  $('#0').append(di);
  $('#0').append(div2);
  $('#0').append(div3);
  $('#0').append(div4);
  $('#0').append(div5);
  $('#0').append(pre);
  $('#0').append(div6);
  $('#0').append(div7);
}

function setting5() {
  $('#0').remove();
  let div0 = "<div id='0' class='ballz'> </div>";
  $('.setting').append(div0);

  let div1 = "<div id='1' class='fon'> Allies and enemies throw giant snowballs, and if you get hit by one of those you lose 3 points!</div>";
  let div2 = "<div id='2' class='fon'> To win the game, you must have a positive score when the time is up. You get to play for 5 minutes!</div>";
  let div3 = "<div id='3' class='fon'> You can see the timer, score, the number of bals left, and some stats for the game on the screen to the right of the game window! </div>";
  let div4 = "<div class='empty'></div><div id='4' class='fon'> Have FUN! </div>";
  let pre = "<div class='empty'></div><button id='prev' type='button' onclick= setting4()>Previous</button>";
  let div5 = "        </div><button id='play' type='button' onclick= play()>Play Game!</button>";
  $('#0').append(div1);
  $('#0').append(div2);
  $('#0').append(div3);
  $('#0').append(div4);
  $('#0').append(pre);
  $('#0').append(div5);
}

function play() {
  $('.setting').remove();

  let div0 = "<div class='game-window'></div>";
  $('.outer-container').append(div0);

  let div1 = "<div id='actualGame'> </div>";
  $('.game-window').append(div1);

  let div2 = "<div class='background'> <img class='back' src='img/background.jpeg'></div>";
  let div3 = "<div id='player' class='playerObject'><img class='player-avatar' src='img/red.png'/></div>";
  let div4 = "<div class='pile' id='snowpile'><img src='img/snowpile.png'/></div>";
  let div5 = "<div id='hills'></div>";

  $('#actualGame').append(div2);
  $('#actualGame').append(div3);
  $('#actualGame').append(div4);
  $('#actualGame').append(div5);
        
  let div6 = "<div id='hill1' class='hills'><img src='img/tallhill.png'/></div>";
  let div7 = "<div id='hill2' class='hills'><img src='img/tallhill.png'/></div>";
  let div8 = "<div id='hill3' class='hills'><img src='img/tallhill.png'/></div>";
  let div9 = "<div id='hill4' class='hills'><img src='img/tallhill.png'/></div>";

  $('#hills').append(div6);
  $('#hills').append(div7);
  $('#hills').append(div8);
  $('#hills').append(div9);

  let div10 = "<div class='status-window' style='text-align: center'> </div>";
  $('.outer-container').append(div10);
  let div11 = "<h3>Welcome NAME!</h3> <hr> <p>Balls Left:</p> <h1 id='ball-box'>10</h1>";
  let div12 = "<div id='add'></div> <p>Score:</p> <h1 id='score-box'>0</h1>";
  let div20 = "<div class='empty'></div><div id='time'><b>Time Left: <span id='timer'></span></b></div><div class='empty'></div>";
  let div13 = "<div> <b># of oponents hit:</b> <span id='enemyCounter'>0</span></div>";
  let div14 = "<div><b># of allies hit:</b><span id='friendCounter'>0</span></div>";
  let div15 = "<div><b># of times hit:</b><span id='hitCounter'>0</span></div>";
  let div16 = "<div id='settings'><button id='quit' type'button' onclick= quitGame()> Quit Game</button></div>";
  $('.status-window').append(div11);
  $('.status-window').append(div12);

  $('.status-window').append(div20);

  $('.status-window').append(div13);
  $('.status-window').append(div14);
  $('.status-window').append(div15);
  $('.status-window').append(div16);

  console.log("Ready!");

  maxItemPosX = $('.game-window').width() - 50;
  maxItemPosY = $('.game-window').height() - 40;
  // Set global handles (now that the page is loaded)
  gwhGame = $('#actualGame');
  gwhStatus = $('.status-window');
  gwhScore = $('#score-box');
  player = $('#player');  // set the global player handle
  pile = $('#snowpile');
  add = $('#add');

  rock1 = $("#hill1");
  rock2 = $("#hill2");
  rock3 = $("#hill3");
  rock4 = $("#hill4");
  gameWinWidth = $('.game-window').width();
  gameWinHeight = $('.game-window').height();

  // Set global positions
  maxPersonPosX = $('.game-window').width() - player.width();
  maxPersonPosY = $('.game-window').height() - player.height();
  endPosWidth = $('.game-window').width();

  points = 0;
  giantHit = 0;
  friendHit = 0;
  enemyHit = 0;
  ballCount = 10;
  bum = false;

  $(window).keydown(keydownRouter);

  document.getElementById('timer').innerHTML = 005 + ":" + 00;
  startTimer();

  startParade();
}

function startTimer() {
  let presentTime = document.getElementById('timer').innerHTML;
  let timeArray = presentTime.split(/[:]+/);
  let m = timeArray[0];
  let s = checkSecond((timeArray[1] - 1));
  if(s==59) {
    m = m - 1;
  }
  document.getElementById('timer').innerHTML = m + ":" + s;
  if (s==0 && m==0) {
    timeUp();
  } else {
    setTimeout(startTimer, 1000);
  }
}

function checkSecond(sec) {
  if (sec < 10 && sec >=0) {sec = "0" + sec};
  if (sec < 0) {sec = "59"};
  return sec;
}

function timeUp() {
  $('.game-window').remove();
  $('.status-window').remove();
  let div1 = "";
  if (points > 0) {
    //
    //
    div1 = "<div id='1' class='win'>YOU WIN! <div class='empty'></div> <button id='done' type'button' onclick= destroyGame()>Return to Studying!</button></div>";
  } else {
    div1 = "<div id='1' class='lose'>YOU LOST :( <div class='empty'></div> <button id='done' type'button' onclick= destroyGame()>Return to Studying!</button></div>";
  }
  $('.outer-container').append(div1);
}

function destroyGame() {
  $('.outer-container').remove();
  console.log("redirect now?");
  //add code here to redirect
  //ahhh
  //ahhh
  //ahhh
}
