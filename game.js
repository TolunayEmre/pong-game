(function(){
  const gameLocalStorage = JSON.parse(window.localStorage.getItem('gameData'));
  let CSS = {
    arena: {
      width: 900,
      height: 600,
      background: '#62247B',
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },
    ball: {
      width: 15,
      height: 15,
      position: 'absolute',
      top: 300,
      left: 450,
      borderRadius: 50,
      background: '#C6A62F'
    },
    line: {
      width: 0,
      height: 600,
      borderLeft: '3px dashed #C6A62F',
      position: 'absolute',
      top: 0,
      left: '50%'
    },
    stick: {
      width: 15,
      height: 85,
      position: 'absolute',
      background: '#C6A62F'
    },
    stickOne: {
      left: 0,
      top: 260
    },
    stickTwo: {
      right: 0,
      top: 260
    },
    scoreBoard: {
      color: 'white',
      width: '650px',
      height: '100px',
      display: 'flex',
      top: '50%',
      margin: ' 0 auto',
      position: 'releative'
    },
    leftScore: {
      "font-size": '50px',
      "text-align": "center",
      width: "50%",
      margin: "auto",
    },
    rightScore: {
      "font-size": "50px",
      "text-align": "center",
      width: "50%",
      margin: "auto"
    },
    gameSelect: {
      "text-align": 'center',
      "align-items": 'center',
      width: 900,
      height: 600,
      background: '#a93ad6',
      position: 'fixed',
      display: 'flex',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      opacity: '0',
    },
    continueGame: {
      "text-align": 'center',
      "align-items": 'center',
      width: 900,
      height: 600,
      background: '#a93ad6',
      position: 'fixed',
      display: 'flex',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      opacity: '0',
    },
    gameOver: {
      "text-align": 'center',
      "align-items": 'center',
      width: 900,
      height: 600,
      background: '#ccc',
      position: 'fixed',
      display: 'flex',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      opacity: '0',
    },
    informationP: {
      color: 'black',
      "font-size": '40px',
      left: '50%',
      bottom: '60%',
      display: 'flex',
      position: 'absolute',
      transform: 'translate(-50%, -50%)'
    },
    selectButton: {
      "font-size" : '30px',
      width: '180px',
      height:'120px',
      position: 'releative',
      display: 'block',
      margin: 'auto',
      backgroundColor: '#6c218a',
      'border-radius': '12px 0 12px 0',
      'box-shadow': '10px'
    },
    howToPlay: {
      width: '150px',
      height: '400px',
      display: 'inline-block',
      position: 'absolute',
      top:'30%',
      left: '30px',
      backgroundColor: 'rgba(white,black,white,0.5)',
      h: {
        "font-size": '25px'
      },
      p: {
        "font-size": '14px',
        "margin": "0 0 10px 0",
      }
    }
  };
    
  let CONSTS = {
    gameSpeed: 15,
    ballSpeed: 0.4,
    ballTopSpeed: 0,
    ballLeftSpeed: 0,
    stickOneSpeed: 0,
    stickTwoSpeed: 0,
    playAndPause: false,
    gameStatus: false
  };
  
  // Local Storage
  if (gameLocalStorage != null) {
    continueData = gameLocalStorage.continueData;
  } else {
    continueData = {
      localScore: {
        L:0,
        R:0
      },
      selectMode: {
        playerVsplayer: false,
        playerVsComp: false,
        compVsComp: false
      }
    }
  }

  function startGame() {
    select();
    draw();
    loop();
    roll();
    setEvents();
  }

  // Check after reloading page
  function control() {
    if (continueData.localScore.L == 0 && 
        continueData.localScore.R == 0) {
          select();
        } else {
          continueGame();
        }
  }  

  // Game information
  function howToPlay() {
    $('<div/>', {id: 'how-to-play-div'}).css(CSS.howToPlay).appendTo('body');
    $('<h1>', {id: 'how-to-play-title'}).css(CSS.howToPlay.h).appendTo('#how-to-play-div').text('How To Play?');
    $('<p>', {id: 'how-to-play-p1'}).css(CSS.howToPlay.p).appendTo('#how-to-play-div');
    $('<p>', {id: 'how-to-play-p2'}).css(CSS.howToPlay.p).appendTo('#how-to-play-div');
    $('<p>', {id: 'how-to-play-p3'}).css(CSS.howToPlay.p).appendTo('#how-to-play-div');
    $('<p>', {id: 'how-to-play-p4'}).css(CSS.howToPlay.p).appendTo('#how-to-play-div');
    $('<p>', {id: 'how-to-play-p5'}).css(CSS.howToPlay.p).appendTo('#how-to-play-div');
    $('#how-to-play-p1').text('Left Stick Move');
    $('#how-to-play-p2').css("margin","0 0 30px 0").text('Keyboard \'W\' : Up  Keyboard \'S\' : Down');
    $('#how-to-play-p3').text('Right Stick Move');
    $('#how-to-play-p4').css("margin","0 0 30px 0").text('\'ArrowUp (↑)\' : Up \'ArrowDown (↓)\' : Down');
    $('#how-to-play-p5').text('Play/Pause : \'P\'');
  }

  // Select game mode (Player vs Player - Player vs Computer - Computer vs Computer)
  function select() {
    $('<div/>', {id: 'game-information'}).css(CSS.gameSelect).appendTo('body');
    $('#game-information').css('opacity','0.9');
    $('<p>', {id : 'gameinf-p'}).css(CSS.informationP).appendTo('#game-information').text('Select Game Mode');
    $('<button/>', {id: 'select-one'}).css(CSS.selectButton).appendTo('#game-information').text('Player VS Player');
    $('<button/>', {id: 'select-two'}).css(CSS.selectButton).appendTo('#game-information').text('Player Vs Comp');
    $('<button/>', {id: 'select-three'}).css(CSS.selectButton).appendTo('#game-information').text('Comp Vs Comp');

    $(document).on("click", "#select-one", function(){
      CONSTS.gameStatus = true;
      continueData.selectMode.playerVsplayer = true;
      continueData.selectMode.playerVsComp = false;
      continueData.selectMode.compVsComp = false;
      $('#game-information').css('visibility','hidden');
      startGame();
    });

    $(document).on("click", "#select-two", function(){
      CONSTS.gameStatus = true;
      continueData.selectMode.playerVsplayer = false;
      continueData.selectMode.playerVsComp = true;
      continueData.selectMode.compVsComp = false;
      $('#game-information').css('visibility','hidden');
      startGame();
    });

    $(document).on("click", "#select-three", function(){
      CONSTS.gameStatus = true;
      continueData.selectMode.playerVsplayer = false;
      continueData.selectMode.playerVsComp = false;
      continueData.selectMode.compVsComp = true;
      $('#game-information').css('visibility','hidden');
      startGame();
    });
  }

  // Game draw
  function draw() {
    $('<div/>', {id: 'pong-game'}).css(CSS.arena).appendTo('body');
    $('<div/>', {id: 'pong-line'}).css(CSS.line).appendTo('#pong-game');
    $('<div/>', {id: 'pong-ball'}).css(CSS.ball).appendTo('#pong-game');
    $('<div/>', {id: 'stick-one'}).css($.extend(CSS.stickOne, CSS.stick)).appendTo('#pong-game');
    $('<div/>', {id: 'stick-two'}).css($.extend(CSS.stickTwo, CSS.stick)).appendTo('#pong-game');
    $('<div/>', {id: 'score-board'}).css(CSS.scoreBoard).appendTo('#pong-game');
    $('<div/>', {id: 'left-score'}).css(CSS.leftScore).appendTo('#score-board').text(continueData.localScore.L);
    $('<div/>', {id: 'right-score'}).css(CSS.rightScore).appendTo('#score-board').text(continueData.localScore.R);
  }

  // Key listening
  function setEvents(gameCont) {
    $(document).on('keydown', function (e) {
      // Play/pause
      if (e.keyCode == 80 || e.key == 'p') {
        CONSTS.playAndPause = !CONSTS.playAndPause;
        if (CONSTS.playAndPause) {
          CONSTS.gameStatus = false;
        } else {
          CONSTS.gameStatus = true;
        }
      }

      if(continueData.selectMode.playerVsComp || continueData.selectMode.playerVsplayer || gameCont) {
        if (e.keyCode == 87 || e.key == 'w') {
          CONSTS.stickOneSpeed = -8;
        }
  
        if (e.keyCode == 83 || e.key == 's') {
          CONSTS.stickOneSpeed = +8;
        }
      } 

      if (continueData.selectMode.playerVsplayer || gameCont) {
        if (e.keyCode == 38 || e.key == 'ArrowUp') {
          CONSTS.stickTwoSpeed = -8;
        }
  
        if (e.keyCode == 40 || e.key == 'ArrowDown') {
          CONSTS.stickTwoSpeed = +8;
        }
      }      
    });

    $(document).on('keyup', function (e) {
      if (e.keyCode == 87 || e.key == 'w') {
        CONSTS.stickOneSpeed = 0;
      }

      if (e.keyCode == 83 || e.key == 's') {
        CONSTS.stickOneSpeed = 0;
      }

      if (e.keyCode == 38 || e.key == 'ArrowUp') {
        CONSTS.stickTwoSpeed = 0;
      }

      if (e.keyCode == 40 || e.key == 'ArrowDown') {
        CONSTS.stickTwoSpeed = 0;
      }
    }); 
  }

  function loop() {
    window.gameLoop = setInterval(function () {
      if (CONSTS.gameStatus) {
        // Player vs Computer
        if (continueData.selectMode.playerVsComp) {
          if (CSS.ball.top >= CSS.arena.height - CSS.stick.height) {
            CSS.stickTwo.top = CSS.arena.height - CSS.stick.height - 8;
          } else {
            CSS.stickTwo.top = CSS.ball.top;
          }
        }
        // Computer vs Computer
        if (continueData.selectMode.compVsComp) {
          if (CSS.ball.top >= CSS.arena.height - CSS.stick.height) {
            CSS.stickTwo.top = CSS.arena.height - CSS.stick.height - 8;
            CSS.stickOne.top = CSS.arena.height - CSS.stick.height - 8;
          } else {
            CSS.stickOne.top = CSS.ball.top;
            CSS.stickTwo.top = CSS.ball.top;
          }
        }

        // Player vs Player (and stick control!)
        CSS.stickOne.top += CONSTS.stickOneSpeed;
        CSS.stickTwo.top += CONSTS.stickTwoSpeed;
        $('#stick-one').css('top', CSS.stickOne.top);
        $('#stick-two').css('top', CSS.stickTwo.top);

        if (CSS.stickOne.top < 8) {
          CSS.stickOne.top = 8;
        }

        if (CSS.stickOne.top + 8 > CSS.arena.height - CSS.stick.height) {
          CSS.stickOne.top = CSS.arena.height - CSS.stick.height - 8;
        }

        if (CSS.stickTwo.top < 8) {
          CSS.stickTwo.top = 0;
        }

        if (CSS.stickTwo.top + 8 > CSS.arena.height - CSS.stick.height) {
          CSS.stickTwo.top = CSS.arena.height - CSS.stick.height - 8;
        }

        // Ball control
        CSS.ball.top += CONSTS.ballTopSpeed;
        CSS.ball.left += CONSTS.ballLeftSpeed;
        $('#pong-ball').css({
          top: CSS.ball.top,
          left: CSS.ball.left
        });

        if (CSS.ball.top <= 0 ||
          CSS.ball.top >= CSS.arena.height - CSS.ball.height) {
          CONSTS.ballTopSpeed = CONSTS.ballTopSpeed * -1;
          if (CONSTS.ballTopSpeed < 0) {
            CONSTS.ballTopSpeed += -CONSTS.ballSpeed;
          } else {
            CONSTS.ballTopSpeed += CONSTS.ballSpeed;
          }
        }

        if (CSS.ball.left <= CSS.stick.width) {
          if ((CSS.ball.top + CSS.ball.height > CSS.stickOne.top) && 
          (CSS.ball.top - CSS.ball.height < CSS.stickOne.top+ CSS.stick.height)) {
            CONSTS.ballLeftSpeed = CONSTS.ballLeftSpeed * -1
            if (CONSTS.ballLeftSpeed < 0) {
              CONSTS.ballLeftSpeed += -CONSTS.ballSpeed;
            } else {
              CONSTS.ballLeftSpeed += CONSTS.ballSpeed;
            }
          } else {
            continueData.localScore.R += 1;
            $("#right-score").text(continueData.localScore.R);            
            roll();
          }
        }

        if (CSS.ball.left >= CSS.arena.width - CSS.stick.width - CSS.stick.width) {
          if ((CSS.ball.top + CSS.ball.height > CSS.stickTwo.top) && 
          (CSS.ball.top - CSS.ball.height < CSS.stickTwo.top + CSS.stick.height)) {
            CONSTS.ballLeftSpeed = CONSTS.ballLeftSpeed * -1
            if (CONSTS.ballLeftSpeed < 0) {
              CONSTS.ballLeftSpeed += -CONSTS.ballSpeed;
            } else {
              CONSTS.ballLeftSpeed += CONSTS.ballSpeed;
            }
          } else {
            continueData.localScore.L += 1;
            $("#left-score").text(continueData.localScore.L);            
            roll();
          }
        }

        // end of game check
        if (continueData.localScore.L == 5 || continueData.localScore.R == 5) {
          clearInterval(gameLoop);
          gameOver();
        }

        localSave();
      } 
    }, CONSTS.gameSpeed);
  }

  // roll
  function roll() {
    CSS.ball.top = 300;
		CSS.ball.left = 450;
		CSS.stickOne.top = 260;
		CSS.stickTwo.top = 260;
    
    let side = 1;
		if (Math.random() < 0.5) {
			side = -1;
    }

    CONSTS.ballTopSpeed = Math.random() * -2 - 3;
    CONSTS.ballLeftSpeed = (Math.random() * 2 + 3) * side;
  }

  // Continue the game
  function continueGame() {
    $('<div/>', {id: 'continue-game'}).css(CSS.continueGame).appendTo('body');
    $('#continue-game').css('opacity','0.8');
    $('<button/>', {id: 'continue-button'}).css(CSS.selectButton).appendTo('#continue-game').text('Resume Game');
    $('<button/>', {id: 'restart-game-button'}).css(CSS.selectButton).appendTo('#continue-game').text('Restart Game');

    $(document).on("click", "#continue-button", function(){
      $('#continue-game').css('visibility','hidden');
      CONSTS.gameStatus = true;
      draw();
      roll();
      loop();
      setEvents();
    });

    $(document).on("click", "#restart-game-button", function(){
      $('#continue-game').css('visibility','hidden');
        localStorage.clear();
        location.reload();
    });
  }

  // Game over
  function gameOver() {
    let win;
    if (continueData.localScore.L > continueData.localScore.R) {
      win = 'Left Stick Win!'
    } else if (continueData.localScore.L < continueData.localScore.R) {
      win = 'Right Stick Win!'
    }

    $('<div/>', {id: 'game-over'}).css(CSS.gameOver).appendTo('body')
    $('#game-over').css('opacity','0.9');
    $('<p>', {id : 'game-over-p'}).css(CSS.informationP).appendTo('#game-over').text(win);
    $('<button/>', {id: 'gameover-button'}).css(CSS.selectButton).appendTo('#game-over').text('Try Again?');

    $(document).on("click", "#gameover-button", function(){
      localStorage.clear();
      location.reload();
    });
  }

  // Game save
  function localSave() {
    window.localStorage.setItem('gameData',JSON.stringify({
      continueData: continueData
    }));
  }

  control();
  howToPlay();
})();
