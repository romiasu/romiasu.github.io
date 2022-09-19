phina.globalize();

var ASSETS = {
  image: {
    'title_bg' : "./images/titleimage.png",
//    'main_bg': "./background.png",
    'main_bg': "./images/aozora.jpg",
    'gauge_frame' : "./images/gauge3.png",
    'gauge_speed' : "./images/gauge4.png",
    'gauge_arrow' : "./images/gauge5.png",
    'standingkaida' : "./images/standingkaida.png",
    'flyingkaida' : "./images/kaida.png",
    'naraka' : "./images/naraka3.png",
    'smash' : "./images/smash.png",
    'moving_bg1' : "./images/background1.png",
    'moving_bg2' : "./images/background2.png",
    'mashiro' : "./images/mashiro.png",
    'standingmashiro' : "./images/standingmashiro.png",
    'natume' : "./images/natume2.png",
    'standingnatume' : "./images/standingnatume.png",
    'nishizono' : './images/nishizono2.png',
    'standingnishizono' : './images/standingnishizono.png',
    'nagao' : './images/nagao.png',
    'standingnagao' : './images/standingnagao.png',
    'genzuki' : './images/genzuki.png',
    'standinggenzuki' : './images/standinggenzuki.png',
    'aka' : './images/aka.png',
    'kuro' : './images/kuro.png',
    'mashiro_face' : './images/mashiro_face.png',
    'natume_face' : './images/natume_face.png',
    'nagao_face' : './images/nagao_face.png',
    'genzuki_face' : './images/genzuki_face.png',
    'nishizono_face' : './images/nishizono_face.png',
    'collisioneffect1' : './images/attackeffect.png',
    'collisioneffect2' : './images/attackeffect2.png',
    'instruction1' : './images/instruction.png',
    'instruction2' : './images/instruction2.png',
    'credits' : './images/credits.png',
  },
  sound: {
    'konnyara' : "./sounds/konnyara.mp3",
    'nagao' : "./sounds/nagao_damage.mp3",
    'natume' : "./sounds/natume.mp3",
    'genzuki' : './sounds/genzuki.mp3',
    'kaida1' : './sounds/kaida1.mp3',
    'kaida2' : './sounds/kaida2.mp3',
    'hit' : "./sounds/hit.wav",
    'hit2' : "./sounds/Hit08-1.mp3",
    'select' : './sounds/Onmtp-Click03-1.mp3',
    'poyon' : "./sounds/poyon.mp3",
    'bgm' : "./sounds/heaven_and_hell.mp3",
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
    let bg = DisplayElement().addChildTo(this);
    Sprite('title_bg').addChildTo(bg).setPosition(this.gridX.center(), this.gridY.center()).setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    this.title_label = Label({
      text: "NARAKA\nCRASH!",
      fontWeight: "bold",
      fontFamile: "'Monaco', 'Consolas', 'MS 明朝'",
      fontSize: 56,
      fill: 'gray',
    }).addChildTo(this).setPosition(this.gridX.center(8) + 1000, this.gridY.center(-4));
    Label({
      text: "NARAKA\nCRASH!",
      fontWeight: "bold",
      fontFamile: "'Monaco', 'Consolas', 'MS 明朝'",
      fontSize: 56,
      fill: 'black',
    }).addChildTo(this.title_label).setPosition(-5, -5);

    this.start_label = Label({
      text: "START",
      fontWeight: "bold",
      fontFamile: "'Monaco', 'Consolas', 'MS 明朝'",
      fontSize: 32,
      fill: 'black',
      shadow: "gray",
      shadowBlur: 10,
    }).addChildTo(this).setPosition(this.gridX.center(8) + 1000, this.gridY.center(1));

    this.howtoplay_label = Label({
      text: "HOW TO PLAY",
      fontWeight: "bold",
      fontFamile: "'Monaco', 'Consolas', 'MS 明朝'",
      fontSize: 32,
      fill: 'black',
      shadow: "gray",
      shadowBlur: 10,
    }).addChildTo(this).setPosition(this.gridX.center(8) + 1000, this.gridY.center(3));

    this.credits_label = Label({
      text: "CREDITS",
      fontWeight: "bold",
      fontFamile: "'Monaco', 'Consolas', 'MS 明朝'",
      fontSize: 32,
      fill: 'black',
      shadow: "gray",
      shadowBlur: 10,
    }).addChildTo(this).setPosition(this.gridX.center(8) + 1000, this.gridY.center(5));

    this.credits_image = Sprite('credits').addChildTo(this).setPosition(this.gridX.center(), this.gridY.center()).setScale(0.7, 0.0).hide();

    this.title_label.setInteractive(true);
    this.start_label.setInteractive(true);
    this.howtoplay_label.setInteractive(true);
    this.credits_label.setInteractive(true);
    this.credits_image.setInteractive(true);

    this.start_label.onpointend = () => {
      SoundManager.play('select');
      this.exit();
    };

    this.howtoplay_label.onpointend = () => {
      SoundManager.play('select');
      this.exit('instruction');
    };

    this.credits_label.onpointend = () => {
      SoundManager.play('select');
      this.title_label.setInteractive(false);
      this.start_label.setInteractive(false);
      this.howtoplay_label.setInteractive(false);
      this.credits_label.setInteractive(false);
      this.credits_image.show();
      this.credits_image.tweener.clear()
      .to({scaleY: 0.7}, 500)
      .play();
    };

    this.credits_image.onpointend = () => {
      this.title_label.setInteractive(true);
      this.start_label.setInteractive(true);
      this.howtoplay_label.setInteractive(true);
      this.credits_label.setInteractive(true);
      this.credits_image.tweener.clear()
      .to({scaleY: 0.0}, 500)
      .call(function() {
        this.target.hide();
      })
      .play();
    };

    this.title_label.tweener.clear()
    .to({x: this.gridX.center()}, 1000)
    .play();
    this.start_label.tweener.clear()
    .wait(200)
    .to({x: this.gridX.center()}, 1000)
    .play();
    this.howtoplay_label.tweener.clear()
    .wait(400)
    .to({x: this.gridX.center()}, 1000)
    .play();
    this.credits_label.tweener.clear()
    .wait(600)
    .to({x: this.gridX.center()}, 1000)
    .play();

    //this.on('pointend', function() {
    //  this.exit();
    //});
  },
});

phina.define('InstructionScene', {
  superClass: 'DisplayScene',
  init: function() {
    this.superInit({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    });
    let bg = DisplayElement().addChildTo(this);
    Sprite('title_bg').addChildTo(bg).setPosition(this.gridX.center(), this.gridY.center()).setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    this.page1 = Sprite('instruction1').addChildTo(this).setPosition(this.gridX.center(), this.gridY.center()).setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    this.page2 = Sprite('instruction2').addChildTo(this).setPosition(this.gridX.center(), this.gridY.center()).setSize(SCREEN_WIDTH, SCREEN_HEIGHT).hide();
    this.text_label = Label({
      text: 'Next Page->',
      fontWeight: "bold",
      fontFamile: "'Monaco', 'Consolas', 'MS 明朝'",
      fontSize: 32,
      fill: 'red',
    }).addChildTo(this).setPosition(this.gridX.center(-4), this.gridY.center(6));;

    this.page_number = 1;
  },

  onpointend: function() {
    switch (this.page_number) {
      case 1:
        this.page1.hide();
        this.page2.show();
        this.text_label.text = 'Back to Title';
        this.text_label.setPosition(this.gridX.center(6), this.gridY.center(6));
        this.page_number++;
        break;
      case 2:
        this.exit();
        break;
      default:
        break;
    }
  },
});

phina.define('PowerGauge', {
  init: function(_parent) {
    this.parent = _parent;
    this.gauge_frame = Sprite('gauge_frame').addChildTo(this.parent).setPosition(this.parent.gridX.center(-2), this.parent.gridY.center(-2));
    this.gauge_speed = Sprite('gauge_speed').addChildTo(this.gauge_frame).setScale(0.0, 0.0);
    this.gauge_arrow = Sprite('gauge_arrow').addChildTo(this.gauge_frame).setScale(1.5, 1.5);
    this.gauge_label = Label({
      text: 'Press!',
      fontWeight: "bold",
      fontFamile: "'Monaco', 'Consolas', 'MS 明朝'",
      fontSize: 32,
      fill: 'red',
    }).addChildTo(this.gauge_frame).setPosition(50, 30);
  },
  start_speed: function() {
    this.gauge_label.text = 'Release!';
    this.gauge_speed.tweener.clear()
    .to({scaleX: 1.0, scaleY: 1.0}, 400)
    .to({scaleX: 0.0, scaleY: 0.0}, 400)
    .setLoop(true).play();
  },
  stop_speed: function() {
    this.gauge_speed.tweener.stop();
  },
  start_angle: function() {
    this.gauge_label.text = 'Press!';
    this.gauge_arrow.tweener.clear()
    .to({rotation: -90}, 400)
    .to({rotation: 0}, 400)
    .setLoop(true).play();
  },
  stop_angle: function() {
    this.gauge_arrow.tweener.stop();
  },
  get_angle: function() {
    return this.gauge_arrow.rotation * -1.0;
  },
  get_speed: function() {
    return this.gauge_speed.scaleX;
  },
  fadeout: function() {
    this.gauge_frame.tweener.clear()
    .to({scaleX: 0.0, scaleY: 0.0}, 500);
  }
});

phina.define('Mashiro', {
  superClass: 'DisplayElement',
  init: function(_parent) {
    this.superInit();
    this.parent = _parent;
    this.standing = Sprite('standingmashiro').addChildTo(this).setScale(0.2, 0.2);
    this.attacking = Sprite('mashiro').addChildTo(this).setOrigin(0.5, 0.8).setScale(0.30, 0.30);
    this.attacking.hide();
    this.collision = false;
    this.id = 0;
  },
  collide: function() {
    if (this.collision) {
      return false;
    }
    SoundManager.play('hit');
    this.collision = true;
    this.standing.hide();
    this.attacking.show();
    //this.tweener.clear()
    //.to({scaleX: -1.0}, 500)
    //.to({scaleX: 1.0}, 500)
    //.setLoop(true);
    return true;
  },
  ability: function(vx, vy) {
    let v = Math.sqrt(vx * vx + vy * vy) + 800;
    return [v * Math.cos(45.0 / 180.0 * 3.14159), v * Math.sin(45.0 / 180.0 * 3.14159)];
  },
});

phina.define('Natume', {
  superClass: 'DisplayElement',
  init: function(_parent) {
    this.superInit();
    this.parent = _parent;
    this.standing = Sprite('standingnatume').addChildTo(this).setScale(0.22, 0.22);
    this.attacking = Sprite('natume').addChildTo(this).setOrigin(0.5, 0.8).setScale(0.35, 0.35);
    this.attacking.hide();
    this.collision = false;
    this.id = 4;
  },
  collide: function() {
    if (this.collision) {
      return false;
    }
    let vol = SoundManager.getVolume();
    SoundManager.setVolume(1.0);
    SoundManager.play('natume');
    SoundManager.setVolume(vol);
    SoundManager.play('hit');
    this.collision = true;
    this.standing.hide();
    this.attacking.show();
    this.tweener.clear()
    .wait(300)
    .play();
    //.set({scaleX: -1.0})
    //.to({scaleX: 1.0, y: -30}, 200)
    //.to({y: 0}, 400)
    //.setLoop(false);
    return true;
  },
  ability: function(vx, vy) {
    let v = Math.sqrt(vx * vx + vy * vy) + 1000;
    return [v * Math.cos(20.0 / 180.0 * 3.14159), v * Math.sin(20.0 / 180.0 * 3.14159)];
  },
});

phina.define('Nagao', {
  superClass: 'DisplayElement',
  init: function(_parent) {
    this.superInit();
    this.parent = _parent;
    this.standing = Sprite('standingnagao').addChildTo(this).setScale(0.27, 0.27);
    this.attacking = Sprite('nagao').addChildTo(this).setOrigin(0.5, 0.8).setScale(0.3, 0.3);
    this.attacking.hide();
    this.collision = false;
    this.id = 2;
  },
  collide: function() {
    if (this.collision) {
      return false;
    }
    SoundManager.play('hit');
    SoundManager.play('nagao');
    this.collision = true;
    this.standing.hide();
    this.attacking.rotation = 20;
    this.attacking.show();
    this.tweener.clear()
    .to({rotation: 30}, 250)
    .setLoop(false);
    return true;
  },
  ability: function(vx, vy) {
    if (vy < 0.0) vy *= -1.0;
    let power = Math.sqrt(vx * vx + vy * vy);
    let newvx = power * 0.5 * Math.cos(45.0 / 180.0 * 3.14159);
    let newvy = power * 0.5 * Math.sin(45.0 / 180.0 * 3.14159);
    return [newvx, newvy];
  },
});

phina.define('Genzuki', {
  superClass: 'DisplayElement',
  init: function(_parent) {
    this.superInit();
    this.parent = _parent;
    this.standing = Sprite('standinggenzuki').addChildTo(this).setScale(0.17, 0.17);
    this.attacking = Sprite('genzuki').addChildTo(this).setOrigin(0.5, 0.7).setScale(0.4, 0.4);
    this.attacking.hide();
    this.collision = false;
    this.id = 3;
  },
  collide: function() {
    if (this.collision) {
      return false;
    }
    SoundManager.play('hit');
    let vol = SoundManager.getVolume();
    SoundManager.setVolume(1.0);
    SoundManager.play('genzuki');
    SoundManager.setVolume(vol);
    this.collision = true;
    this.standing.hide();
    this.attacking.show();
    //this.tweener.clear()
    //.to({rotation: 60}, 250)
    //.setLoop(false);
    return true;
  },
  ability: function(vx, vy) {
    if (vy < 0.0) vy *= -1.0;
    let power = Math.sqrt(vx * vx + vy * vy);
    let newvx = 0.0;
    let newvy = 0.0;
    if (vy / vx > 1.0) {
      newvx = power * Math.cos(20.0 / 180.0 * 3.14159);
      newvy = power * Math.sin(20.0 / 180.0 * 3.14159);
    } else {
      newvx = power * Math.cos(70.0 / 180.0 * 3.14159);
      newvy = power * Math.sin(70.0 / 180.0 * 3.14159);
    }
    return [newvx, newvy];
  },
});

phina.define('Nishizono', {
  superClass: 'DisplayElement',
  init: function(_parent) {
    this.superInit();
    this.parent = _parent;
    this.standing = Sprite('standingnishizono').addChildTo(this).setScale(0.17, 0.17);
    this.attacking = Sprite('nishizono').addChildTo(this).setOrigin(0.5, 0.8).setScale(0.35, 0.35);
    this.attacking.hide();
    this.collision = false;
    this.id = 1;
  },
  collide: function() {
    if (this.collision) {
      return false;
    }
    SoundManager.play('poyon');
    this.collision = true;
    this.standing.hide();
    this.attacking.show();
    this.tweener.clear()
    .by({y: 70}, 1000);
    return true;
  },
  ability: function(vx, vy) {
    return [0.0, 0.0];
  },
});

phina.define('NextCharactersWindow', {
  superClass: 'DisplayElement',
  init: function() {
    this.superInit();
    this.chara_list = [];
  },
  addCharaById: function(id) {
    let chara_name;
    switch (id) {
      case 0:
        chara_name = 'mashiro_face';
        break;
      case 1:
        chara_name = 'nishizono_face';
        break;
      case 2:
        chara_name = 'nagao_face';
        break;
      case 3:
        chara_name = 'genzuki_face';
        break;
      case 4:
        chara_name = 'natume_face';
        break;
    }
    this.chara_list.push(Sprite(chara_name).addChildTo(this));
  },
  removeFirstChara: function() {
    this.chara_list[0].remove();
    this.chara_list.shift();
  },
  showFirstChara: function(idx) {
    for (let i = 0; i < this.chara_list.length; i++) {
      if (i >= idx && i < idx + 3) {
        this.chara_list[i].show();
        this.chara_list[i].setPosition((i - idx) * 220, 0);
      } else {
        this.chara_list[i].hide();
      }
    }
  },
});

/*
gamestate:
0: initial
1: stop gauge angle, start gauge power
2: stop gauge power, and smash
3: flying
4: gameover
5: collision
*/

phina.define('MainScene', {
  superClass: 'DisplayScene',
  init: function() {
    this.superInit({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    });
    
    SoundManager.setVolume(0.5);
    //set background image
    Sprite('main_bg').addChildTo(this).setPosition(this.gridX.center(), this.gridY.center()).setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

    //Base frame for game objects
    this.game_display = DisplayElement().addChildTo(this).setOrigin(0.5, 1).setPosition(this.gridX.center(), this.gridY.center(8));

    //Initialize moving background
    this.moving_bg1 = Sprite('moving_bg1').addChildTo(this.game_display).setOrigin(0.5, 1).setPosition(0, 0).setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    Sprite('moving_bg2').addChildTo(this.moving_bg1).setOrigin(0.5, 1).setPosition(SCREEN_WIDTH, 0).setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    Sprite('moving_bg1').addChildTo(this.moving_bg1).setOrigin(0.5, 1).setPosition(2 * SCREEN_WIDTH, 0).setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    Sprite('moving_bg2').addChildTo(this.moving_bg1).setOrigin(0.5, 1).setPosition(3 * SCREEN_WIDTH, 0).setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    Sprite('moving_bg1').addChildTo(this.moving_bg1).setOrigin(0.5, 1).setPosition(4 * SCREEN_WIDTH, 0).setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    Sprite('moving_bg2').addChildTo(this.moving_bg1).setOrigin(0.5, 1).setPosition(5 * SCREEN_WIDTH, 0).setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    Sprite('moving_bg1').addChildTo(this.moving_bg1).setOrigin(0.5, 1).setPosition(6 * SCREEN_WIDTH, 0).setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    Sprite('moving_bg2').addChildTo(this.moving_bg1).setOrigin(0.5, 1).setPosition(7 * SCREEN_WIDTH, 0).setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

    //Initialize gauge
    this.gauge = PowerGauge(this);

    //Initialize naraka
    this.naraka = Sprite('naraka').addChildTo(this.game_display).setScale(0.25, 0.25).setPosition(-600, -0.25 * SCREEN_HEIGHT);
    this.naraka.hide();

    //Initialize  kaida
    this.kaida = DisplayElement().addChildTo(this.game_display).setPosition(-200, 0);
    this.kaida.standing = Sprite('standingkaida').addChildTo(this.kaida).setScale(0.2, 0.2);
    this.kaida.flying = Sprite('flyingkaida').addChildTo(this.kaida).setScale(0.22, 0.22);
    this.kaida.flying.hide();
    this.kaida.smash = Sprite('smash').addChildTo(this.kaida).setScale(0.0, 0.0).setRotation(90);

    //Initialize height indicator
    this.height_arrow = Label({
      text: "0.0m",
      fontWeight: "bold",
      fontFamile: "'Monaco', 'Consolas', 'MS 明朝'",
      fontSize: 24,
      fill: 'black',
    }).addChildTo(this).setPosition(this.gridX.center(0), this.gridY.center(-6));
    Sprite('flyingkaida').addChildTo(this.height_arrow).setRotation(90).setPosition(0, 80).setScale(0.1, 0.1);
    this.height_arrow.hide();
    this.distance_label = Label({
        text: "飛距離：" + "0.0" + "m",
        fontWeight: "bold",
        fontFamile: "'Monaco', 'Consolas', 'MS 明朝'",
        fontSize: 24,
        fill: 'black',
    }).addChildTo(this).setPosition(this.gridX.center(6), this.gridY.center(-6));

    this.upper_shot_count = 3;
    this.upper_shot_gauge = [];
    this.upper_shot_gauge.push(Sprite('aka').addChildTo(this).setPosition(this.gridX.center(-7), this.gridY.center(-6)).setScale(0.1, 0.1));
    this.upper_shot_gauge.push(Sprite('aka').addChildTo(this.upper_shot_gauge[0]).setPosition(600, 0));
    this.upper_shot_gauge.push(Sprite('aka').addChildTo(this.upper_shot_gauge[1]).setPosition(600, 0));
    this.lower_shot_gauge = [];
    this.lower_shot_gauge.push(Sprite('kuro').addChildTo(this).setPosition(this.gridX.center(-7), this.gridY.center(-4)).setScale(0.1, 0.1));
    this.lower_shot_charge = 100;
    this.lower_shot_label = Label({
      text: this.lower_shot_charge + "%",
      fontWeight: "bold",
      fontFamile: "'Monaco', 'Consolas', 'MS 明朝'",
      fontSize: 24,
      fill: 'black',
    }).addChildTo(this).setPosition(this.gridX.center(-6), this.gridY.center(-4));

    this.next_characters_window_bg = RectangleShape({
      width: 680,
      height: 240,
      fill: "red",
    }).addChildTo(this).setPosition(this.gridX.center(6), this.gridY.center(0)).setScale(0.3, 0.3).hide();
    this.next_characters_window = NextCharactersWindow().addChildTo(this.next_characters_window_bg).setPosition(-220, 0);
    Label({
      text: "NEXT",
      fontWeight: "bold",
      fontFamile: "'Monaco', 'Consolas', 'MS 明朝'",
      fontSize: 72,
      fill: 'red',
    }).addChildTo(this.next_characters_window_bg).setPosition(-220, -150);

    this.naraka.collisioneffect = Sprite('collisioneffect2').addChildTo(this.naraka).setScale(2.0, 2.0).hide();

    this.game_state = 0;
    this.gauge_angle = 0.0;
    this.gauge_speed = 0.0;
    this.vx = 0.0;
    this.vy = 0.0;
    this.flying_distance = 0.0;
    this.game_display_scale = 1.0;
    this.chara_list = [];

    this.view_scale_factor = 160.0;
    this.ground_y = 30;

    this.gauge.start_angle();
  },

  getKaidaHeight: function() {
    return Math.floor((-this.kaida.y - this.ground_y) / this.view_scale_factor * 10.0) / 10.0;
  },

  genrandomCharacter: function() {
    let rnd = Math.random();
    if (rnd < 0.2) {
      this.chara_list.push(Mashiro(this.game_display).addChildTo(this.game_display).setPosition(2000, 0));
    } else if (rnd < 0.4) {
      this.chara_list.push(Nishizono(this.game_display).addChildTo(this.game_display).setPosition(2000, 0));
    } else if (rnd < 0.6) {
      this.chara_list.push(Nagao(this.game_display).addChildTo(this.game_display).setPosition(2000, 0));
    } else if (rnd < 0.8) {
      this.chara_list.push(Genzuki(this.game_display).addChildTo(this.game_display).setPosition(2000, 0));
    } else {
      this.chara_list.push(Natume(this.game_display).addChildTo(this.game_display).setPosition(2000, 0));
    }
  },

  genCharacter: function(id, xpos) {
    this.next_characters_window.addCharaById(id);
    if (id == 0) {
      this.chara_list.push(Mashiro(this.game_display).addChildTo(this.game_display).setPosition(xpos, 0));
    } else if (id == 1) {
      this.chara_list.push(Nishizono(this.game_display).addChildTo(this.game_display).setPosition(xpos, 0));
    } else if (id == 2) {
      this.chara_list.push(Nagao(this.game_display).addChildTo(this.game_display).setPosition(xpos, 0));
    } else if (id == 3) {
      this.chara_list.push(Genzuki(this.game_display).addChildTo(this.game_display).setPosition(xpos, 0));
    } else if (id == 4) {
      this.chara_list.push(Natume(this.game_display).addChildTo(this.game_display).setPosition(xpos, 0));
    }
  },

  loop_process_for_each_state: function() {
    if (this.game_state == 2) {
      if (!this.tweener.playing) {
        this.kaida.smash.hide();
        this.game_state++;

        //velocity scale factor is 2000
        this.vx = 2000.0 * this.gauge_speed * Math.cos(this.gauge_angle / 180.0 * 3.14159);
        this.vy = 2000.0 * this.gauge_speed * Math.sin(this.gauge_angle / 180.0 * 3.14159);
        this.gauge.fadeout();
        this.naraka.collisioneffect.hide();
        this.next_characters_window_bg.show();
        SoundManager.play('kaida2');

        SoundManager.setVolumeMusic(0.2);
        SoundManager.playMusic('bgm');

      }
    } else if (this.game_state == 3) {
      if (this.kaida.y < -(SCREEN_HEIGHT - 100)) {
        this.game_display_scale = (SCREEN_HEIGHT - 100) * -1.0 / this.kaida.y;
        if (this.game_display_scale < 0.25) {
          this.game_display_scale = 0.25;
        }
      } else {
        this.game_display_scale = 1.0;
      } 
      this.game_display.setScale(this.game_display_scale, this.game_display_scale);

      if (this.kaida.y < -this.ground_y) { //in air
        this.kaida.flying.rotation += 5;
        let dt = 0.03;

        //update height
        this.kaida.y += -1.0 * this.vy * dt;
        this.vy += -200.0 * dt
        if (-this.kaida.y > (SCREEN_HEIGHT / this.game_display_scale)) {
          let height = this.getKaidaHeight();
          this.height_arrow.text = "↑" + height + "m";
          this.height_arrow.show();
        } else {
          this.height_arrow.hide();
        }


        //apply vx
        if (this.kaida.x - this.naraka.x < 10000) {
          this.naraka.x -= 1.0 * this.vx * dt;
        }
        this.moving_bg1.x -= 1.0 * this.vx * dt;
        this.flying_distance += 1.0 * this.vx * dt / this.view_scale_factor;
        let record = Math.floor(this.flying_distance * 10.0) / 10.0;
        this.distance_label.text = "飛距離：" + record + "m";
        
        //Character move and collision check
        let id_of_first_out_of_window_chara = -1;
        if (this.chara_list.length > 0) {
          for (let i = 0; i < this.chara_list.length; i++) {
            this.chara_list[i].x -= 1.0 * this.vx * dt;
            //Next characters window process
            if (id_of_first_out_of_window_chara == -1 && (this.chara_list[i].x > (0.5 * SCREEN_WIDTH / this.game_display_scale))) {
              id_of_first_out_of_window_chara = i;
              this.next_characters_window.showFirstChara(i);
            }

            let dx = this.chara_list[i].x - this.kaida.x;
            let dy = this.chara_list[i].y - this.ground_y - this.kaida.y;
            if ((dx < 100) && (dx > -100) && (dy < 250) && (dy > -250)) {
              if (this.chara_list[i].collide()) {
                let vel = this.chara_list[i].ability(this.vx, this.vy);
                this.vx = vel[0];
                this.vy = vel[1];
                this.game_state = 5;
                if (this.vx == 0 && this.vy == 0) {
                  this.kaida.flying.hide();
                }
              }
            }
          }
          if (this.chara_list[0].x < -2000) {
            this.chara_list[0].remove();
            this.chara_list.shift();
            this.next_characters_window.removeFirstChara();
          }
        }

        let height = this.getKaidaHeight();
        if (height >= 2.0 && height <= 12.0) {
          if (this.vy < 0) {
            this.upper_shot_gauge[0].alpha = 1.0;
            this.lower_shot_gauge[0].alpha = 0.5;
          } else {
            this.upper_shot_gauge[0].alpha = 0.5;
            this.lower_shot_gauge[0].alpha = 1.0;
          }
          if (this.lower_shot_charge < 100.0) {
            this.lower_shot_charge += 0.1;
            if (this.lower_shot_charge > 100.0) this.lower_shot_charge = 100.0;
            this.lower_shot_label.text = Math.floor(this.lower_shot_charge) + "%";
          }
        } else {
          this.upper_shot_gauge[0].alpha = 0.5;
          this.lower_shot_gauge[0].alpha = 0.5;
        }
      } else { //onground
        if (this.vx < 100.0) { //stop
          this.vy = 0.0;
          this.vx = 0.0;
          let record = Math.floor(this.flying_distance * 10.0) / 10.0;
          Label({
            text: "RECORD：" + record + "m",
            fontWeight: "bold",
            fontFamile: "'Monaco', 'Consolas', 'MS 明朝'",
            fontSize: 32,
            fill: 'orange',
            stroke: "red",
            strokeWidth: 4,
          }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.center(-4));
          SoundManager.stopMusic(32.0);
          this.game_state++;
        } else {
          SoundManager.play('hit2');
          this.vy *= -0.7;
          this.kaida.y = -(this.ground_y + 1);
          this.vx *= 0.7;
        }
      }
    //} else if (this.game_state == 4) {
    } else if (this.game_state == 5) {
      if (!this.tweener.playing) {
        this.tweener.clear()
        .wait(300)
        .call(function() {
          this.target.game_state = 3;
          if (this.target.vx != 0.0) {
            if (Math.random() < 0.5) {
              SoundManager.play('kaida1');
            } else {
              SoundManager.play('kaida2');
            }
          }
        }).play();
      }
    } else if (this.game_state == 6) {
      if (!this.tweener.playing) {
        this.tweener.clear()
        .wait(1000)
        .call(function() {
          this.target.game_state = 3;
        }).play();
      }
    }
  },

  one_time_process_for_each_state: function(st) {
    if (this.game_state == 0) {
      if (st == 'onpointstart') {
        this.gauge.stop_angle();
        this.gauge.start_speed();
        this.game_state++;
      }
    } else if (this.game_state == 1) {
      if (st == 'onpointend') {
        this.gauge.stop_speed();
        this.gauge_angle = this.gauge.get_angle();
        this.gauge_speed = this.gauge.get_speed();

        //Naraka Attack!
        this.attack = this.tweener.clear()
        .wait(300)
        .call(function() {
          this.target.naraka.show();
        })
        .call(function() {
          SoundManager.play('konnyara');
          this.target.naraka.tweener.clear()
            .to({x: this.target.kaida.x - 100}, 500)
        })
        .wait(500)
        .call(function() {
          SoundManager.play('hit');
          this.target.kaida.standing.hide();
          this.target.kaida.y = -100;
          this.target.kaida.flying.show();

          this.target.naraka.collisioneffect.setPosition(300, 0).show();

          this.target.kaida.tweener.clear()
            .to({x: 0, y: -200}, 500);
          this.target.kaida.flying.tweener.clear()
            .to({rotation: 30}, 500);
          this.target.kaida.smash.tweener.clear()
            .to({y: 100, scaleX: 0.5, scaleY: 0.5, rotation: 0}, 500);
        }).wait(1000);

        this.game_state++;
      }
    } else if (this.game_state == 3) {
      let height = this.getKaidaHeight();
      if (st == 'onpointstart' && this.vx > 0.0 && height >= 2.0 && height <= 12.0) {
        if (this.vy > 0 && this.lower_shot_charge == 100.0) {
          this.lower_shot_charge = 0.0;
          this.lower_shot_label.text = Math.floor(this.lower_shot_charge) + "%";
          this.naraka.x = this.kaida.x - 700;
          this.naraka.y = this.kaida.y - 400;
          this.naraka.rotation = 45;

          SoundManager.play('konnyara');
          this.naraka.show();
          this.naraka.tweener.clear()
          .by({x: 550, y: 400}, 500)
          .call(function() {
            SoundManager.play('hit');
            this.target.collisioneffect.show();
          })
          .wait(500)
          .call(function() {
            SoundManager.play('kaida2');
            this.target.collisioneffect.hide();
            this.target.hide();
          });
          let v = Math.sqrt(this.vx * this.vx + this.vy * this.vy) + 600;
          this.vx = v * Math.cos(-45.0 / 180.0 * 3.14159);
          this.vy = v * Math.sin(-45.0 / 180.0 * 3.14159);
          this.game_state = 6;
        } else if (this.vy < 0 && this.upper_shot_count > 0) {
          this.upper_shot_gauge[this.upper_shot_count - 1].hide();
          this.upper_shot_count--;

          this.naraka.x = this.kaida.x - 700;
          this.naraka.y = this.kaida.y + 400;
          this.naraka.rotation = -45;

          SoundManager.play('konnyara');
          this.naraka.show();
          this.naraka.tweener.clear()
          .by({x: 550, y: -400}, 500)
          .call(function() {
            SoundManager.play('hit');
            this.target.collisioneffect.show();
          })
          .wait(500)
          .call(function() {
            SoundManager.play('kaida1');
            this.target.collisioneffect.hide();
            this.target.hide();
          });
          let v = Math.sqrt(this.vx * this.vx + this.vy * this.vy) + 600;
          this.vx = v * Math.cos(45.0 / 180.0 * 3.14159);
          this.vy = v * Math.sin(45.0 / 180.0 * 3.14159);
          this.game_state = 6;
        }
      }
    } else if (this.game_state == 4) {
      if (st == 'onpointstart') {
        this.exit();
      }
    }
  },

  update: function() {
    this.loop_process_for_each_state();
    if (this.moving_bg1.x < -4.0 * SCREEN_WIDTH) {
      this.moving_bg1.x += 2.0 * SCREEN_WIDTH;
    }
    if (this.chara_list.length == 0) {
      this.genCharacter(Math.floor(Math.random() * 5.0), 10.0 * this.view_scale_factor);
    } else if (this.chara_list.length == 1) {
      let px = this.chara_list[this.chara_list.length - 1].x;
      let id = this.chara_list[this.chara_list.length - 1].id;
      let id_array = [0, 1, 2, 3, 4];
      id_array.splice(id, 1);
      id = id_array[Math.floor(Math.random() * id_array.length)];
      px += 10.0 * this.view_scale_factor;
      this.genCharacter(id, px);
    } else if (this.chara_list.length < 8) {
      let px = this.chara_list[this.chara_list.length - 1].x;
      let id1 = this.chara_list[this.chara_list.length - 1].id;
      let id2 = this.chara_list[this.chara_list.length - 2].id;
      let id_array = [0, 1, 2, 3, 4];
      for (let i = 0; i < id_array.length; i++) {
        if (id_array[i] == id1) {
          id_array.splice(i, 1);
        }
      }
      for (let i = 0; i < id_array.length; i++) {
        if (id_array[i] == id2) {
          id_array.splice(i, 1);
        }
      }
      id = id_array[Math.floor(Math.random() * id_array.length)];
      px += 10.0 * this.view_scale_factor;
      this.genCharacter(id, px);
    }
  },

  onpointstart: function(e) {
    this.one_time_process_for_each_state('onpointstart');
  },

  onpointend: function(e) {
    this.one_time_process_for_each_state('onpointend');
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
    startLabel: 'title',
    scenes: [
    {
      className: 'TitleScene',
      label: 'title',
      nextLabel: 'game',
    },
    {
      className: 'InstructionScene',
      label: 'instruction',
      nextLabel: 'title',
    },
    {
      className: 'MainScene',
      label: 'game',
      nextLabel: 'title',
    },
    ],
  });
  app.run();
});
