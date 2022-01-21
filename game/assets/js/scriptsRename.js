// variáveis globais 

const h1 = document.getElementById('title')
const comando = document.getElementById('command'); 
const btnInit = document.getElementById('init')
const div = document.getElementById('initial')

function clearBtn(){
    btnPt.style.visibility= 'hidden';
    btnEn.style.visibility= 'hidden';
    btnEs.style.visibility= 'hidden';
    div.style.visibility= 'visible';
    document.getElementById("backgroundGame").style.visibility= 'visible';
}

// Jogo com idioma em Portugues
// variáveis locais 
const btnPt = document.getElementById('btnPortugues');
const portuguesBR = 'portuguese'; 

function portugues(){
    changeClassPT()
    changeTextPT()
    clearBtn()
}

function changeClassPT () {
    h1.classList.add(portuguesBR);
 }

function changeTextPT() {
    h1.innerHTML = "resgate";
    comando.innerHTML = "utilize a tecla W para movimentar o helicoptero para cima, a tecla S para movimentar o helicoptero para baixo e a tecla D para efetuar disparos";
    btnInit.innerHTML = "Iniciar";
    
}

btnPt.addEventListener('click', portugues);

// English language game
// Local variables
const btnEn = document.getElementById('btnEnglish');
const ingles = 'english';

function english() {
    changeClassEn()
    changeTextEn()
    clearBtn()
}

function changeClassEn() {
    h1.classList.add(ingles);
}

function changeTextEn() {
    h1.innerHTML = "Rescue";
    comando.innerHTML = "Use the W key to move the helicopter up, the S key to move helicopter down and the D key to trigger"
    btnInit.innerHTML = "Start"
}

btnEn.addEventListener('click', english)

// Juego de lenguaje en español

const btnEs = document.getElementById("btnEspanish");
const espanol = 'espanish';

function espanhol() {
    changeClassEs()
    changeTextEs()
    clearBtn()
}

function changeClassEs() {
    h1.classList.add(espanol);
}

function changeTextEs() {
    h1.innerHTML = "Rescate";
    comando.innerHTML = "Use la tecla W para mover el helicóptero hacia arriba, la tecla S para mover el helicóptero hacia abajo y la tecla D para activar";
    btnInit.innerHTML = "Comienzo";
}

btnEs.addEventListener('click', espanhol)

// function for initial game
function start() { //init function start()
    $('#initial').hide();
    
    var bgGame= $('#backgroundGame')

    bgGame.append("<div id='player' class='cheerUp1'></div>");
    bgGame.append("<div id='enemy1' class='cheerUp2'></div>")
    bgGame.append("<div id='enemy2' ></div>")
    bgGame.append("<div id='friend' class='cheerUp3'></div>")
    bgGame.append("<div id='score'></div>")
    bgGame.append("<div id='energy'></div>")
    
    // Main game variables
    var game = {}
    game.timer = setInterval(loop, 30);

    var key = {
        W: 87,
        S: 83,
        D: 68
    };
    game.press = [];

    
    var speedEnemy1= 5;
    var speedEnemy2= 3;
    var speedFriend= 1; 
    var positionY = parseInt(Math.random() * 334);

    var canShot= true;

    var gameOver = false;

    var points = 0;
    var saved = 0;
    var dead = 0;
     
    var currentEnergy= 3;

    // audio variables
    var shootSounds = document.getElementById("shootSounds");
    var explosionSounds = document.getElementById("explosionSounds");
    var music = document.getElementById("music");
    var gameOverSounds = document.getElementById("gameOverSounds");
    var lostSounds = document.getElementById("lostSounds")
    var rescueSounds = document.getElementById("rescueSounds")

    // start music
    music.addEventListener("ended", function(){ music.currentTime = 0; music.play(); }, false);
    music.play();

    // check if the user pressed any key

    $(document).keydown(function(e) {
        game.press[e.which] = true;
    });

    $(document).keyup(function(e) {
        game.press[e.which] = false;
    });

    // Function Game loop
    
    function loop() {
        moveBackground();
        movePlayer();
        moveEnemy1();
        moveEnemy2();
        moveFriend();
        colision();
        scoreBoard();
        energy();
    } // End function

    // Function move background
    function moveBackground() {
        var left = parseInt(bgGame.css('background-position'));
        bgGame.css('background-position', left-1);
    } // End function

    // Function move player
    function movePlayer() {
        if (game.press[key.W]) {
            var top = parseInt($('#player').css('top'));
            $('#player').css('top', top-10);

            if (top <= 0) {
                $('#player').css('top', top + 10)
            }

        }else if (game.press[key.S]) {
            var top = parseInt($('#player').css('top'));
            $('#player').css('top', top+10)

            if (top >= 454) {
                $('#player').css('top',top -10)
            }

        } else if (game.press[key.D]){
            // Call trigger function
            shot();
        }             
    } // End function

    // Function move enemy
    function moveEnemy1() {
        positionX = parseInt($('#enemy1').css('left'));
        $('#enemy1').css('left', positionX - speedEnemy1);
        $('#enemy1').css('top', positionY);

       
        if (positionX <= 0) {
            
            positionY = parseInt(Math.random() * 334);
            $('#enemy1').css('left', 694);
            $('#enemy1').css('top', positionY);
           
        }
    } // End function
    // Function move enemy2
    function moveEnemy2() {
        var positionX = parseInt($('#enemy2').css('left'));
        $('#enemy2').css('left', positionX -speedEnemy2);
        
        if (positionX <=0) {
            $('#enemy2').css('left', 694)
        }
    } //End function

    // Function move friend
    function moveFriend() {
        positionX = parseInt($('#friend').css('left'));
        $('#friend').css('left', positionX + speedFriend);
        
        if (positionX >= 906){
            $('#friend').css('left', 0)
        }
    }

    // Function shot
    
    function shot() {
        
        if (canShot == true) {
            
            shootSounds.play();
            canShot = false;
            
            topo = parseInt($("#player").css("top"))
            positionX = parseInt($("#player").css("left"))
            tiroX = positionX+190;
            topTiro = topo+50;
            bgGame.append("<div id='shot'></div>");
            $("#shot").css("top", topTiro);
            $("#shot").css("left", tiroX);

            var timeShot = window.setInterval(executeShot, 30);
        } 

        function executeShot() {
            positionX = parseInt($('#shot').css('left'));
            $('#shot').css('left', positionX +15);

            if (positionX > 900) {
                window.clearInterval(timeShot);
                timeShot= null;
                $('#shot').remove();
                canShot = true;
            }
        }


    } // End function

    // *************************script***********************
    // Function colision
    function colision() {
        var colision1 = ($('#player').collision($('#enemy1')));
        var colision2 = ($('#player').collision($('#enemy2')));
        var colision3 = ($('#shot').collision($('#enemy1')));
        var colision4 = ($('#shot').collision($('#enemy2')));
        var colision5 = ($('#player').collision($('#friend')));
        var colision6 = ($('#enemy2').collision($('#friend')));
        
        if (colision1.length > 0) {
            
            currentEnergy--
            enemy1X = parseInt($('#enemy1').css('left'));
            enemy1Y = parseInt($('#enemy1').css("top"));
            explosion1(enemy1X, enemy1Y);

            positionY = parseInt(Math.random() * 334);
            $('#enemy1').css('left', 694);
            $('#enemy1').css('top', positionY)
        } else if(colision2.length > 0){ // Colision player with enemy2
            
            
            currentEnergy--
            enemy2X = parseInt($("#enemy2").css("left"));
            enemy2Y = parseInt($("#enemy2").css("top"));
            explosion2(enemy2X, enemy2Y);

            $("#enemy2").remove();

            repositionEnemy2();
        } else if(colision3.length > 0) { // Shot with enemy1 
           
            speedEnemy1 +-0.3
            points+= 100;
            enemy1X= parseInt($('#enemy1').css('left'));
            enemy1Y= parseInt($('#enemy1').css('top'));
            explosion1(enemy1X, enemy1Y);
            
            $('#shot').css('left', 950);
            

            positionY = parseInt(Math.random() * 334);
            $('#enemy1').css('left', 664);
            $('#enemy1').css('top', positionY);

        } else if(colision4.length > 0){
           
            
            speedEnemy1 +-0.3
            points += 50;
            enemy2X = parseInt($('#enemy2').css('left'));
            enemy2Y = parseInt($('#enemy2').css('top'));
            $('#enemy2').remove();
            
            explosion2(enemy2X, enemy2Y);
            $('#shot').css('left', 950);

            repositionEnemy2();


        } else if(colision5.length > 0){ // Player with friend
            
            rescueSounds.play();
            speedFriend += 0.5
            saved ++
            repositionFriend();
            $('#friend').remove();
            

        } else if(colision6.length > 0) {

            lostSounds.play();
            dead ++
            friendX = parseInt($('#friend').css('left'));
            friendY = parseInt($('#friend').css('top'));
            explosion3(friendX, friendY);
            $('#friend').remove();

            repositionFriend();
        }
        
    }

    // *************************script***********************
    // Function explosion1
    function explosion1(enemy1X, enemy1Y) {

        explosionSounds.play();
        bgGame.append('<div id="explosion1"></div>');
        var exp=$('#explosion1');
        exp.css('background-image', 'url(assets/imgs/explosao.png)');
        exp.css("top", enemy1Y);
        exp.css("left", enemy1X);
        exp.animate({width:200, opacity:0}, "slow");

        var timeExplosion = window.setInterval(removeExplosion, 1000);

        function removeExplosion(){
            exp.remove();
            window.clearInterval(timeExplosion);
            timeExplosion= null;
        } // End function
    }
    

    // Function explosion2
    function explosion2(enemy2X, enemy2Y) {

        explosionSounds.play();
        bgGame.append('<div id="explosion2"></div>');
        $('#explosion2').css('background-image', 'url(assets/imgs/explosao.png');
        var exp2= $('#explosion2');
        exp2.css('top', enemy2Y);
        exp2.css('left', enemy2X);
        exp2.animate({width:200, opacity:0}, "slow");
        
        var timeExplosion2 = window.setInterval(removeExplosion2, 1000);
        function removeExplosion2() {
            
            exp2.remove();
            window.clearInterval(timeExplosion2);
            timeExplosion2= null;
        }
    }// End function

     // Function explosion3
    function explosion3(friendX, friendY) {
        bgGame.append("<div id='explosion3' class='cheerUp4'></div>");
        var exp3 = $('#explosion3');
        exp3.css('top', friendY);
        exp3.css('left', friendX);

        var timeExplosion3=window.setInterval(removeExplosion3, 1000);

            function removeExplosion3() {

                exp3.remove();
                window.clearInterval(timeExplosion3);
                timeExplosion3 = null
            }
    }
    
      // End Function

    //++++++++++++++++++++++++scripts+++++++++++++++++++++++++
    // Function reposition enemy2
    function repositionEnemy2(){

        var timeColision4=window.setInterval(reposition4, 5000);

        function reposition4() {

            window.clearInterval(timeColision4);
            timeColision4= null;

            if (gameOver == false){
            
                bgGame.append("<div id=enemy2></div>");
            
            }
        }
    }

    // Function reposition friend
    function repositionFriend() {

        var timeFriend = window.setInterval(reposition6, 6000);

            function reposition6() {
                window.clearInterval(timeFriend);
                timeFriend = null;

                if (gameOver == false) {
                    bgGame.append("<div id='friend' class='cheerUp3'></div>")
                }
            }
    }
    
    function scoreBoard() {
        $('#score').html("  <h2>   Points: " + points + " Saved: " + saved + " Dead: " +dead + "</h2>")
    }

    // Energy function
    function energy() {

        if(currentEnergy == 3) {
        
            $('#energy').css('background-image', 'url(assets/imgs/energia3.png)');
        
        } else if(currentEnergy == 2) {
        
            $('#energy').css('background-image', 'url(assets/imgs/energia2.png)');
        
        } else if(currentEnergy == 1) {
        
            $('#energy').css('background-image', 'url(assets/imgs/energia1.png)');
        
        } else if(currentEnergy == 0) {
        
            $('#energy').css('background-image', 'url(assets/imgs/energia0.png)');
            
            game_over();
        
        } // End function
    }

    function game_over() {
        gameOver = true;
        music.pause();
        gameOverSounds.play();

        window.clearInterval(game.timer);
        game.timer= null;

        $('#player').remove();
        $('#enemy1').remove();
        $('#enemy2').remove();
        $('#friend').remove();

        $('#backgroundGame').append('<div id="end"></div>')

        $('#end').html('<h1> Game Over </h1><p>Your score was: ' + points +'</p>'+ '<button id="restart"><h3>restart</h3></button>')

        const btnrestart= document.getElementById("restart")
        
        btnrestart.addEventListener("click", newGame)
    }

    function newGame() {
        gameOverSounds.pause();
        $('#end').remove();
        start()
    }

} // End of start function 

btnInit.addEventListener('click', start)