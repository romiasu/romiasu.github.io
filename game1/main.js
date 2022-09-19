phina.globalize();

var ASSETS = {
  image: {
    'bg' : "./rabbit2.png",
    'bg2': "./background.png",
    'gauge' : "./gauge3.png",
    'gauge_power' : "./gauge4.png",
    'gauge_arrow' : "./gauge5.png",
    'ball' : "./standingkaida.png",
    'flyingkaida' : "./kaida.png",
    'bike' : "./natume.png",
    'smash' : "./smash.png",
    'bg3' : "./background1.png",
    'bg4' : "./background2.png",
  },
  sound: {
    'konnyara' : "./konnyara.mp3",

  },
};

var SCREEN_WIDTH = 960;
var SCREEN_HEIGHT = 540;

phina.define('TitleScene', {
  superClass: 'DisplayScene',
  init: function() {
    this.superInit({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    });
    var bg = DisplayElement().addChildTo(this);
    Sprite('bg').addChildTo(bg).setPosition(this.gridX.center(), this.gridY.center()).setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    this.on('pointend', function() {
      this.exit();
    });
  },
});

phina.define('MainScene', {
  superClass: 'DisplayScene',
  init: function() {
    this.superInit({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    });
    Sprite('bg2').addChildTo(this).setPosition(this.gridX.center(), this.gridY.center()).setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    this.bg = DisplayElement().addChildTo(this);
    //Sprite('bg2').addChildTo(this.bg).setPosition(this.gridX.center(), this.gridY.center()).setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    this.bg1 = Sprite('bg3').addChildTo(this.bg).setOrigin(0.5, 1).setPosition(this.gridX.center(), this.gridY.center(8)).setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    Sprite('bg4').addChildTo(this.bg1).setSize(SCREEN_WIDTH, SCREEN_HEIGHT).setOrigin(0.5, 1).setPosition(SCREEN_WIDTH, 0);
    Sprite('bg3').addChildTo(this.bg1).setSize(SCREEN_WIDTH, SCREEN_HEIGHT).setOrigin(0.5, 1).setPosition(2 * SCREEN_WIDTH, 0);
    Sprite('bg4').addChildTo(this.bg1).setSize(SCREEN_WIDTH, SCREEN_HEIGHT).setOrigin(0.5, 1).setPosition(3 * SCREEN_WIDTH, 0);
    Sprite('bg3').addChildTo(this.bg1).setSize(SCREEN_WIDTH, SCREEN_HEIGHT).setOrigin(0.5, 1).setPosition(4 * SCREEN_WIDTH, 0);
    Sprite('bg4').addChildTo(this.bg1).setSize(SCREEN_WIDTH, SCREEN_HEIGHT).setOrigin(0.5, 1).setPosition(5 * SCREEN_WIDTH, 0);
    Sprite('bg3').addChildTo(this.bg1).setSize(SCREEN_WIDTH, SCREEN_HEIGHT).setOrigin(0.5, 1).setPosition(6 * SCREEN_WIDTH, 0);
    Sprite('bg4').addChildTo(this.bg1).setSize(SCREEN_WIDTH, SCREEN_HEIGHT).setOrigin(0.5, 1).setPosition(7 * SCREEN_WIDTH, 0);

    this.game_state = 0;

    this.launch_angle = 0.0;
    this.delta_launch_angle = 3.0;
    this.launch_speed = 0.0;
    this.delta_launch_speed = 0.05;

    this.gauge = Sprite('gauge').addChildTo(this).setPosition(this.gridX.center(-3), this.gridY.center());
    this.gauge_power = Sprite('gauge_power').addChildTo(this.gauge).setScale(0.0, 0.0);
    this.gauge_arrow = Sprite('gauge_arrow').addChildTo(this.gauge).setScale(1.5, 1.5);
    this.gauge_label = Label({
      text: 'Press!',
      fontWeight: "bold",
      fontFamile: "'Monaco', 'Consolas', 'MS 明朝'",
      fontSize: 32,
      fill: 'red',
    }).addChildTo(this.gauge).setPosition(50, 30);

    this.kaida = DisplayElement().addChildTo(this.bg).setPosition(this.gridX.center() - 200, this.gridY.center(4));
    this.kaida.standing = Sprite('ball').addChildTo(this.kaida).setOrigin(0.5, 0.2).setScale(0.25, 0.25);
    this.kaida.flying = Sprite('flyingkaida').addChildTo(this.kaida).setScale(0.25, 0.25);
    this.kaida.flying.hide();
    this.naraka = Sprite('bike').addChildTo(this.bg).setScale(0.25, 0.25).setPosition(-300, this.gridY.center(4));
    this.naraka.hide();
    this.kaida.smash = Sprite('smash').addChildTo(this.kaida).setScale(0.0, 0.0).setRotation(90);
    this.kaida.vx = 0.0;
    this.kaida.vy = 0.0;
    this.kaida.px = 0.0;
    this.kaida.py = 0.0;
    this.kaida.yscale = 1.0;

    this.attack = this.tweener.clear();

  },
  update: function() {
    if (this.game_state == 0) {
      this.launch_angle += this.delta_launch_angle;
      if (this.launch_angle >= 90.0) {
        this.delta_launch_angle = -3.0;
      }
      if (this.launch_angle <= 0.0) {
        this.delta_launch_angle = 3.0;
      }
      this.gauge_arrow.rotation = -this.launch_angle;
    } else if (this.game_state == 1) {
      this.launch_speed += this.delta_launch_speed;
      if (this.launch_speed >= 1.0) {
        this.delta_launch_speed = -0.05;
      }
      if (this.launch_speed <= 0.0) {
        this.delta_launch_speed = 0.05;
      }
      this.gauge_power.setScale(this.launch_speed, this.launch_speed);
    } else if (this.game_state == 2) {
      this.gauge.tweener.clear()
        .wait(1200)
        .to({scaleX: 0.0, scaleY: 0.0}, 600)
        .call(function() {
          this.target.hide();
        }).setLoop(false);

      this.attack = this.tweener.clear()
        .wait(300)
        .call(function() {
          this.target.naraka.show();
        })
        .call(function() {
          SoundManager.play('konnyara');
          this.target.naraka.tweener.clear()
            .to({x: this.target.kaida.x - 100}, 600)//, 'easeOutExpo')
            .setLoop(false);
        })
        .wait(600)
        .call(function() {
          this.target.kaida.standing.hide();
          this.target.kaida.flying.show();
        })
        .call(function() {
          this.target.kaida.flying.tweener.clear()
            .to({rotation: 30, x: 200, y:-200}, 800, 'easeOutQuart')
            .setLoop(false);
          this.target.kaida.smash.tweener.clear()
            .to({y: -500, scaleX: 1.0, scaleY: 1.0, rotation: 0}, 500).setLoop(false);
        })
        .wait(800)
        .setLoop(false);
      this.game_state++;
    } else if (this.game_state == 3) {
      if (!this.attack.playing) {
        this.kaida.smash.hide();
        this.game_state++;
        this.vx = 4000.0 * this.launch_speed * Math.cos(this.launch_angle / 180.0 * 3.14159);
        this.vy = 1000.0 * this.launch_speed * Math.sin(this.launch_angle / 180.0 * 3.14159);
      }
    } else if (this.game_state == 4) {
      if (this.kaida.flying.y < 100) {
        this.kaida.flying.rotation += 5;
        var dt = 0.016;
        this.kaida.flying.y += -1.0 * this.vy * dt;
        if (this.naraka.x > -100) {
          this.naraka.x -= 1.0 * this.vx * dt;
          this.naraka.y = SCREEN_HEIGHT - ((SCREEN_HEIGHT - this.gridY.center(4)) * this.kaida.yscale);
        }
        this.bg1.x -= 1.0 * this.vx * dt * this.kaida.yscale;
        if ((this.bg1.x / this.kaida.yscale) < -2.0 * SCREEN_WIDTH) {
          this.bg1.x += 2.0 * SCREEN_WIDTH * this.kaida.yscale;
        }
        if (this.kaida.flying.y < SCREEN_HEIGHT) {
          var yscale = SCREEN_HEIGHT / (-1.0 * (this.kaida.flying.y - SCREEN_HEIGHT));
          if (yscale > 1.0) {
            this.kaida.yscale = 1.0;
          } else if (yscale < 0.25) {
            this.kaida.yscale = 0.25;
          } else {
            this.kaida.yscale = yscale;
          }
          console.log(this.kaida.yscale);
        }
        this.bg1.setScale(this.kaida.yscale, this.kaida.yscale);
        this.kaida.setScale(this.kaida.yscale, this.kaida.yscale);
        this.naraka.setScale(0.25 * this.kaida.yscale, 0.25 * this.kaida.yscale);
        this.vy += -100.0 * dt
      } else {
        this.vy *= -0.7;
        this.vx *= 0.7;
        this.kaida.flying.y = 99.0;
      }
    }
  },
  onpointstart: function(e) {
    if (this.game_state == 0) {
      this.game_state++;
      this.gauge_label.text = 'Release!';
      return;
    }
  },

  onpointend: function(e) {
    if (this.game_state == 1) {
      this.game_state++;
      this.gauge_label.remove();
      return;
    }
  },
});

phina.main(function() {
  var app = GameApp({
    query: '#mycanvas',
    fit: false,
    fps: 60,
    assets: ASSETS,
    startLabel: 'title',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  });
  app.run();
});
