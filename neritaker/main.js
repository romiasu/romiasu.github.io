phina.globalize();

var ASSETS = {
  image: {
    'rock' : "./images/rock.png",
    'wall' : "./images/wall.png",
    'wall2' : "./images/wall2.png",
    'box' : "./images/box.png",
    'player' : "./images/player.png",
    'enemy' : "./images/enemy.png",
    'tile' : "./images/tile.png",
    'lock' : "./images/lock.png",
    'key' : "./images/key.png",
    'title_bg' : "./images/title_bg.png",
    'general_bg' : "./images/general_bg.png",
    'result_bg' : "./images/result_bg.png",
    'blood' : "./images/blood.png",
    'neriner_sheet' : "./images/neriner_sheet.png",
    'death_neriner' : "./images/death_neriner.png",
    'fire_sheet' : "./images/fire_sheet.png",
    'heroine_bg' : "./images/heroine_bg.png",
    'mira_sheet' : "./images/mira_sheet.png",
    'shiena_sheet' : "./images/shiena_sheet.png",
    'hakana_sheet' : "./images/hakana_sheet.png",
    'chiko_sheet' : "./images/chiko_sheet.png",
    'tuna_sheet' : "./images/tuna_sheet.png",
    'amami_sheet' : "./images/amami_sheet.png",
    'mira_A' : "./images/mira_color_A.png",
    'mira_B' : "./images/mira_color_B.png",
    'chiko_A' : "./images/chiko_color_A.png",
    'chiko_B' : "./images/chiko_color_B.png",
    'tsuna_A' : "./images/tuna_color_A.png",
    'tsuna_B' : "./images/tuna_color_B.png",
    'amami_A' : "./images/amami_color_A.png",
    'amami_B' : "./images/amami_color_B.png",
    'shiena_A' : "./images/shiena_color_A.png",
    'shiena_B' : "./images/shiena_color_B.png",
    'hakana_A' : "./images/hakana_color_A.png",
    'hakana_B' : "./images/hakana_color_B.png",
    'hakone_A' : "./images/hakone_color_A.png",
    'hakone_B' : "./images/hakone_color_B.png",
    'trap_sheet' : "./images/trap_sheet.png",
    'blood_sheet' : "./images/blood_sheet.png",
    'kick_sheet' : "./images/kick_sheet.png",
    'enemy_sheet' : "./images/enemy_sheet.png",
    'intro1' : "./images/neriner_intro1.png",
    'intro2' : "./images/neriner_intro2.png",
    'intro3' : "./images/neriner_intro3.png",
    'photo' : "./images/helltaker_all_photo.png",
    'instruction' : "./images/instruction.png",
  },
  spritesheet: {
    'neriner_ss' : "./spritesheet/neriner_ss.ss",
    'heroine_ss' : "./spritesheet/heroine_ss.ss",
    'fire_ss' : "./spritesheet/fire_ss.ss",
    'trap_ss' : "./spritesheet/trap_ss.ss",
    'blood_ss' : "./spritesheet/blood_ss.ss",
    'kickeffect_ss' : "./spritesheet/kickeffect_ss.ss",
    'enemy_ss' : "./spritesheet/enemy_ss.ss",
  }
};

var SCREEN_WIDTH = 1600;
var SCREEN_HEIGHT = 900;

window.onload = function() {
  window.addEventListener('keydown', keydownfunc, true);
}
var keydownfunc = function (event) {
  var code = event.keyCode;
  switch (code) {
    case 37:
    case 38:
    case 39:
    case 40:
      event.preventDefault();
  }
}

phina.define('Player', {
  superClass: 'Sprite',
  init: function(uid) {
    this.superInit('neriner_sheet');
    this.uid = uid;
    this.objtype = 2;
    this.ss = FrameAnimation('neriner_ss');
    this.ss.attachTo(this);
    this.ss.gotoAndPlay('stay');
    this.get_key_flag = false;
    this.damage_motion_flag = false;
  },

  stay: function() {
    this.ss.gotoAndPlay('stay');
  },

  kick: function(damage_flag) {
    if (damage_flag) this.damage_motion_flag = true;
    this.ss.gotoAndPlay('kick');
  },

  movemotion: function(diffx, diffy, damage_flag) {
    if (damage_flag) {
      this.damage_motion_flag = true;
      this.tweener
      .by({x: diffx, y: diffy}, 160, "swing")
      .play();
    } else {
      this.tweener
      .by({x: diffx, y: diffy}, 160, "swing")
      .play();
    }
  },

  update: function() {
    if ((this.tweener.playing == false) && this.damage_motion_flag) {
      this.damage_motion_flag = false;
      BloodSplash().addChildTo(this);
      //this.tweener.to({alpha: 0.5}, 1).wait(100).to({alpha: 1.0}, 1).play();
    }
  },
});

phina.define('Heroine', {
  superClass: 'Sprite',
  init: function(uid, sheet_name, ss_name) {
    this.superInit(sheet_name);
    this.uid = uid;
    this.objtype = 6;
    this.ss = FrameAnimation(ss_name);
    this.ss.attachTo(this);
    this.ss.gotoAndPlay('stay');
  },
});

phina.define('WallBlock', {
  superClass: 'Sprite',
  init: function(uid) {
    //this.superInit('wall');
    this.superInit('wall2');
    this.uid = uid;
    this.objtype = 1;
  },
});

phina.define('Enemy', {
  superClass: 'Sprite',
  init: function(uid, px, py) {
    this.superInit('enemy_sheet');
    this.uid = uid;
    this.objtype = 3;
    this.ss = FrameAnimation('enemy_ss');
    this.ss.attachTo(this);
    this.ss.gotoAndPlay('stay');
    this.destroy_flag = false;
    this.playing_destroy_flag = false;
    this.px = px;
    this.py = py;
  },

  destroy: function() {
    this.destroy_flag = true;
  },

  update: function() {
    if (this.destroy_flag && (this.tweener.playing == false) && (this.playing_destroy_flag == false)) {
      this.ss.gotoAndPlay('destroy');
      this.playing_destroy_flag = true;
    }
    if (this.playing_destroy_flag && this.ss.finished) {
      this.remove();
    }
  }
});

phina.define('RockBlock', {
  superClass: 'Sprite',
  init: function(uid) {
    this.superInit('rock');
    this.uid = uid;
    this.objtype = 4;
  },
});

phina.define('BoxBlock', {
  superClass: 'Sprite',
  init: function(uid) {
    this.superInit('box');
    this.uid = uid;
    this.objtype = 5;
  },
});

phina.define('LockBlock', {
  superClass: 'Sprite',
  init: function(uid) {
    this.superInit('lock');
    this.uid = uid;
    this.objtype = 6;
  },
});

phina.define('KeyBlock', {
  superClass: 'Sprite',
  init: function(uid) {
    this.superInit('key');
    this.uid = uid;
    this.objtype = 7;
  },
});

phina.define('TrapBlock', {
  superClass: 'Sprite',
  init: function(uid, type, px, py) {
    this.superInit('trap_sheet');
    this.uid = uid;
    this.objtype = 8;
    this.ss = FrameAnimation('trap_ss');
    this.ss.attachTo(this);
    this.up_flag = 1;
    this.type = 'static';
    this.px = px;
    this.py = py;
    if (type == 'up') {
      this.type = 'move';
      this.up_flag = 1;
      this.ss.gotoAndPlay('upstate');
    }
    if (type == 'down') {
      this.type = 'move';
      this.up_flag = 0;
      this.ss.gotoAndPlay('downstate');
    }
    if (type == 'static') {
      this.up_flag = 1;
      this.ss.gotoAndPlay('upstate');
    }
  },

  move: function() {
    if (this.type == 'static') return;
    if (this.up_flag == 1) {
      this.up_flag = 0;
      this.ss.gotoAndPlay('downmotion');
    } else {
      this.up_flag = 1;
      this.ss.gotoAndPlay('upmotion');
    }
  },
});

phina.define('BloodSplash', {
  superClass: 'Sprite',
  init: function() {
    this.superInit('blood_sheet');
    this.setScale(1.2, 1.2);
    this.ss = FrameAnimation('blood_ss').attachTo(this);
    this.ss.gotoAndPlay('splash');
  },

  update: function() {
    if (this.ss.finished) {
      this.remove();
    }
  }
});

phina.define('KickEffect', {
  superClass: 'Sprite',
  init: function() {
    this.superInit('kick_sheet');
    this.ss = FrameAnimation('kickeffect_ss').attachTo(this);
    this.ss.gotoAndPlay('kick');
  },

  update: function() {
    if (this.ss.finished) {
      this.remove();
    }
  }
});

phina.define('DeathMotion', {
  superClass: 'DisplayElement',
  init: function() {
    this.superInit();
    let fire = Sprite("fire_sheet").addChildTo(this).setPosition(0, -96);
    let neriner = Sprite("death_neriner").addChildTo(this);
    this.ss = FrameAnimation('fire_ss');
    this.ss.attachTo(fire);
    this.ss.gotoAndPlay('fire1');
    neriner.tweener.by({x: 5, y: 10}, 70)
                   .by({x: -5, y: -15}, 70)
                   .by({x: -5, y: 10}, 70)
                   .by({x: 5, y: -5}, 70)
                   .setLoop(true).play();
  },
});

phina.define('SuccessMotion', {
  superClass: 'DisplayElement',
  init: function() {
    this.superInit();
    let lbl = Label({
      text: "† SUCCESS †",
      fontFamily: "'Times New Roman'",
      fontWeight: "bold",
      fontSize: 120,
      fill: "white",
      shadow: "white",
      shadowBlur: 40,
      alpha: 0.0,
      scaleY: 0.0,
    }).addChildTo(this);
    lbl.tweener.clear().to({alpha: 1.0, scaleY: 1.0}, 200).to({shadowBlur: 0}, 300);
  },
});

phina.define('ChangeSceneMotion', {
  superClass: 'DisplayElement',
  init: function(mode, delay_ms) {
    this.superInit();
    let startx = 1.5 * SCREEN_WIDTH;
    if (mode == 'open') startx = 0.5 * SCREEN_WIDTH;
    this.bar1 = RectangleShape({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT * 0.2,
      fill: '#770000',
      stroke: '#770000',
    }).addChildTo(this).setPosition(startx, SCREEN_HEIGHT * 0.1);
    this.bar2 = RectangleShape({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT * 0.2,
      fill: '#440000',
      stroke: '#440000',
    }).addChildTo(this).setPosition(startx, SCREEN_HEIGHT * 0.3);
    this.bar3 = RectangleShape({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT * 0.2,
      fill: 'black',
      stroke: 'black',
    }).addChildTo(this).setPosition(startx, SCREEN_HEIGHT * 0.5);
    this.bar4 = RectangleShape({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT * 0.2,
      fill: '#440000',
      stroke: '#440000',
    }).addChildTo(this).setPosition(startx, SCREEN_HEIGHT * 0.7);
    this.bar5 = RectangleShape({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT * 0.2,
      fill: '#770000',
      stroke: '#770000',
    }).addChildTo(this).setPosition(startx, SCREEN_HEIGHT * 0.9);
    Label({
      text: "NeriTaker",
      fontFamily: "'Times New Roman'",
      fontSize: 160,
      fontWeight: "bold",
      fill: 'white',
    }).addChildTo(this.bar3);

    let diffx = -1.0 * SCREEN_WIDTH;
    if (mode == 'open') diffx = 1.0 * SCREEN_WIDTH;
    this.bar1.tweener.clear().wait(delay_ms).by({x: diffx}, 500, "swing");
    this.bar2.tweener.clear().wait(delay_ms + 200).by({x: diffx}, 500, "swing");
    this.bar3.tweener.clear().wait(delay_ms + 400).by({x: diffx}, 500, "swing");
    this.bar4.tweener.clear().wait(delay_ms + 600).by({x: diffx}, 500, "swing");
    this.bar5.tweener.clear().wait(delay_ms + 800).by({x: diffx}, 500, "swing");

    this.wait_time = 1300 + delay_ms;
  },

  is_playing: function() {
    return this.bar5.tweener.playing;
  }
});

phina.define('TitleScene', {
  superClass: 'DisplayScene',
  init: function(param) {
    this.superInit({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    });
    RectangleShape({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
      fill: 'maroon',
      stroke: 'maroon',
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());
    RectangleShape({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT * 0.24,
      fill: '#440000',
      stroke: '#440000',
    }).addChildTo(this).setPosition(this.gridX.center(), SCREEN_HEIGHT * 0.12);
    RectangleShape({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT * 0.24,
      fill: '#440000',
      stroke: '#440000',
    }).addChildTo(this).setPosition(this.gridX.center(), SCREEN_HEIGHT * 0.88);
    Label({
        text: "NeriTaker",
        fontFamily: "'Times New Roman'",
        fontSize: 260,
        fontWeight: "bold",
        fill: 'white',
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());

    var press_enter = Label({
        text: "Press Enter to start",
        fontFamily: "'Times New Roman'",
        fontSize: 60,
        fontWeight: "italic",
        fill: 'white',
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.center(6));
    press_enter.tweener.to({scaleX: 1.1, scaleY: 1.1}, 600, "swing").to({scaleX: 1.0, scaleY: 1.0}, 600, "swing").setLoop(true).play();

    //this.bg = DisplayElement().addChildTo(this);
    //Sprite('title_bg').addChildTo(this.bg).setPosition(this.gridX.center(), this.gridY.center()).setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    if (param.clear_flg == 1) {
      var thx = DisplayElement().addChildTo(this);
      RectangleShape({
        width: SCREEN_WIDTH * 0.4,
        height: SCREEN_HEIGHT * 0.1,
        fill: 'maroon',
        stroke: 'white',
      }).addChildTo(thx);
      Label({
        text: "Thank you for Playing!",
        fontFamily: "'Times New Roman'",
        fontSize: 60,
        fontWeight: "bold",
        fill: 'white',
      }).addChildTo(thx);
      thx.setPosition(this.gridX.center(4), this.gridY.center(3)).setRotation(-5);
    }
    this.time_count = 0;
    this.wait_time = 0;
    this.game_state = 0;
  },
  update: function(app) {
    var key = app.keyboard;
    var command = 'none';
    if (key.getKeyDown('left')) { command = 'left'; }
    if (key.getKeyDown('right')) { command = 'right'; }
    if (key.getKeyDown('down')) { command = 'down'; }
    if (key.getKeyDown('up')) { command = 'up'; }
    if (key.getKeyDown('enter')) { command = 'enter'; }
    switch (this.game_state) {
      case 0:
        if (command == 'enter') {
          this.time_count = 0;
          this.game_state = 1;
          let csm = ChangeSceneMotion('close', 0).addChildTo(this);
          this.wait_time = csm.wait_time;
        }
        break;
      case 1:
        this.time_count += app.deltaTime;
        if (this.time_count > this.wait_time) {
          this.exit();
        }
        break;
      default:
        break;
    }
  },
});

phina.define('IntroScene', {
  superClass: 'DisplayScene',
  init: function() {
    this.superInit({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    });
    Sprite('heroine_bg').addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());
    this.game_state = 0;
    this.intro_count = 0;
    this.intro_img = Sprite('intro1').addChildTo(this).setPosition(this.gridX.center(), this.gridY.center(-2)).setRotation(-5).setScale(0.7, 0.7);
    RectangleShape({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT * 0.3,
      fill: 'black',
      stroke: 'black',
    }).addChildTo(this).setPosition(SCREEN_WIDTH * 0.5, SCREEN_HEIGHT - 0.15 * SCREEN_HEIGHT);

    var ypos = SCREEN_HEIGHT - 0.3 * SCREEN_HEIGHT + 70;

    this.talklabel = Label({
      text: 'ぎりぎり午前中に目覚めた貴方の頭に天啓が舞い降りた\nねりね組のハーレムを築くのだ',
      fontFamile: "'Monaco', 'Consolas', 'MS 明朝'",
      fontSize: 28,
      fill: 'white',
    }).addChildTo(this).setPosition(this.gridX.center(), ypos);

    this.press_enter = Label({
      text: "〈 Enter 〉",
      fontFamily: "'Times New Roman'",
      fontSize: 28,
      fill: 'red',
    }).addChildTo(this).setPosition(this.gridX.center(), ypos + 100);

    this.press_enter.tweener.to({scaleX: 1.1, scaleY: 1.1}, 300, "swing").to({scaleX: 1.0, scaleY: 1.0}, 300, "swing").setLoop(true).play();
    this.time_count = 0;
    this.wait_time = 0;
    let csm = ChangeSceneMotion('open', 0).addChildTo(this);
    csm.tweener.clear().wait(csm.wait_time).call(function(){ csm.remove(); });
  },
  update: function(app) {
    if (this.game_state == 0) {
      var key = app.keyboard;
      if (key.getKeyDown('enter')) {
        this.intro_count += 1;
        switch (this.intro_count) {
          case 1:
            this.intro_img.image = 'intro2';
            this.intro_img.setRotation(-8);
            this.talklabel.text = 'まあ簡単に実現できることではない\nきっと困難な挑戦になる'
            break;
          case 2:
            this.intro_img.image = 'intro3';
            this.talklabel.text = '「ねりね組とイチャつけるんだ、\nねりなーとして諦めてなるものか」\nと貴方は言い、事務所に降り立った'
            this.intro_img.setRotation(-3);
            break;
          default:
            this.time_count = 0;
            this.game_state = 1;
            let csm = ChangeSceneMotion('close', 0).addChildTo(this);
            this.wait_time = csm.wait_time;
            break;
        }
      }
    } else if (this.game_state == 1) {
        this.time_count += app.deltaTime;
        if (this.time_count > this.wait_time) {
          this.exit('stage', {stage_id: 1});
        }
    }
  },
});

phina.define('HakoneChann', {
  superClass: 'DisplayElement',
  init: function() {
    this.superInit();
    this.img1 = Sprite('hakone_B').addChildTo(this);
    this.img1.alpha = 0.0;
    this.img2 = Sprite('hakone_A').addChildTo(this);
  },
  showmotion: function() {
    this.img1.alpha = 1.0;
    this.img2.tweener.to({alpha: 0.0}, 500).play();
  },
});

phina.define('EpilogueScene', {
  superClass: 'DisplayScene',
  init: function() {
    this.superInit({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    });
    Sprite('heroine_bg').addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());
    this.game_state = 0;
    this.intro_count = 0;
    this.hakone = HakoneChann().addChildTo(this).setScale(0.7, 0.7).setPosition(this.gridX.center(6), this.gridY.center(-2));
    this.hakone.alpha = 0.0;
    this.intro_img = Sprite('photo').addChildTo(this).setPosition(this.gridX.center(), this.gridY.center(-2)).setRotation(-5).setScale(0.7, 0.7);
    RectangleShape({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT * 0.3,
      fill: 'black',
      stroke: 'black',
    }).addChildTo(this).setPosition(SCREEN_WIDTH * 0.5, SCREEN_HEIGHT - 0.15 * SCREEN_HEIGHT);

    var ypos = SCREEN_HEIGHT - 0.3 * SCREEN_HEIGHT + 70;

    this.talklabel = Label({
      text: 'こうしてあなたの旅は幕を閉じた',
      fontFamile: "'Monaco', 'Consolas', 'MS 明朝'",
      fontSize: 28,
      fill: 'white',
    }).addChildTo(this).setPosition(this.gridX.center(), ypos);

    this.press_enter = Label({
      text: "〈 Enter 〉",
      fontFamily: "'Times New Roman'",
      fontSize: 28,
      fill: 'red',
    }).addChildTo(this).setPosition(this.gridX.center(), ypos + 100);

    this.press_enter.tweener.to({scaleX: 1.1, scaleY: 1.1}, 300, "swing").to({scaleX: 1.0, scaleY: 1.0}, 300, "swing").setLoop(true).play();
    this.time_count = 0;
    this.wait_time = 0;
    let csm = ChangeSceneMotion('open', 0).addChildTo(this);
    csm.tweener.clear().wait(csm.wait_time).call(function(){ csm.remove(); });
  },
  update: function(app) {
    if (this.game_state == 0) {
      var key = app.keyboard;
      if (key.getKeyDown('enter')) {
        this.intro_count += 1;
        switch (this.intro_count) {
          case 1:
            this.talklabel.text = 'ねりね組を連れ帰ってきたあなたはいつしか、\nねりねを連れし者『NeriTaker』と呼ばれるようになった';
            break;
          case 2:
            this.talklabel.text = 'この後もあなたはいろいろなトラブルに襲われることになるのだが\nそれはまた別のお話……\n ---END---';
            break;
          case 3:
            this.intro_img.hide();
            this.talklabel.text = '「…………」';
            break;
          case 4:
            this.hakone.tweener.to({x: 0.5 * SCREEN_WIDTH, alpha: 1.0}, 300).play();
            this.talklabel.text = '「……………………」';
            break;
          case 5:
            this.talklabel.text = '「ハコネクトには素敵なライバーがまだまだたくさんいますよ？」';
            break;
          case 6:
            this.hakone.showmotion();
            this.talklabel.text = '「あなたはねりね組だけで満足してしまうのですか？」';
            break;
          case 7:
            this.talklabel.text = 'あなたがHacoTakerを目指す日も遠くないのかもしれない……\n --- END ---';
            break;
          default:
            this.time_count = 0;
            this.game_state = 1;
            let csm = ChangeSceneMotion('close', 0).addChildTo(this);
            this.wait_time = csm.wait_time;
            break;
        }
      }
    } else if (this.game_state == 1) {
        this.time_count += app.deltaTime;
        if (this.time_count > this.wait_time) {
          this.exit('title', {clear_flg: 1});
        }
    }
  },
});

phina.define('Counter', {
  superClass: 'DisplayElement',
  init: function(cnt) {
    this.superInit();
    CircleShape({
      radius: 100,
      stroke: "black",
      fill: "white",
    }).addChildTo(this);
    CircleShape({
      radius: 90,
      stroke: "black",
      fill: "black",
    }).addChildTo(this);
    this.lbl = Label({
      text: cnt,
      fontFamily: "'Times New Roman'",
      fontSize: 96,
      fill: 'white',
    }).addChildTo(this);
  },

  set_count: function(cnt) {
    if (cnt <= 0) this.lbl.text = "X";
    else this.lbl.text = cnt;
    this.lbl.tweener.to({scaleX: 1.2, scaleY: 1.2}, 80, "swing")
                    .to({scaleX: 1.0, scaleY: 1.0}, 80, "swing")
                    .play();
  },
});

phina.define('Puzzle', {
  superClass: 'DisplayElement',
  init: function(stage_param) {
    this.superInit();
    this.param = stage_param;
    this.first_time_flag = true;
    RectangleShape({
      width: this.param.width * this.param.cell_size,
      height: this.param.height * this.param.cell_size,
      fill: '#B3334A',
      stroke: '#B3334A',
    }).addChildTo(this).setPosition(this.param.width * this.param.cell_size * 0.5, this.param.height * this.param.cell_size * 0.5).setScale(0.97, 0.97);
    this.group = DisplayElement().addChildTo(this);
    this.group.gridX = Grid(this.param.cell_size * this.param.width, this.param.width);
    this.group.gridY = Grid(this.param.cell_size * this.param.height, this.param.height);
    this.obj_map = [];
    this.trap_map = [];
    for (let i = 0; i < this.param.height; i++) {
      this.obj_map[i] = [];
      this.trap_map[i] = [];
      for (let j = 0; j < this.param.width; j++) {
        this.obj_map[i][j] = 0;
        this.trap_map[i][j] = 0;
      }
    }
    this.trap_list = [];
    this.px = this.param.px;
    this.py = this.param.py;
    this.key_exist_flag = false;
    if (this.param.keyy >= 0 && this.param.keyx >= 0) this.key_exist_flag = true;
    this.move_count = 0;
    this.init_map();
  },
  init_map: function() {
    let tx = 0;
    let ty = 0;
    let obj_unique_id = 1;
    for (let i = 0; i < this.param.height; i++) {
      for (let j = 0; j < this.param.width; j++) {
        tx = this.group.gridX.span(j) + this.param.cell_size * 0.5;
        ty = this.group.gridY.span(i) + this.param.cell_size * 0.5;
        let obj_id = this.param.map_info[i][j];
        var block;
        switch (obj_id) {
          case 8:
            block = TrapBlock(obj_unique_id, 'static', j, i).addChildTo(this.group).setPosition(tx, ty);
            this.trap_list.push(block);
            this.obj_map[i][j] = 0;
            break;
          case 9:
            block = TrapBlock(obj_unique_id, 'up', j, i).addChildTo(this.group).setPosition(tx, ty);
            this.trap_list.push(block);
            this.trap_map[i][j] = 1;
            this.obj_map[i][j] = 0;
            break;
          case 10:
            block = TrapBlock(obj_unique_id, 'down', j, i).addChildTo(this.group).setPosition(tx, ty);
            this.trap_list.push(block);
            this.obj_map[i][j] = 0;
            break;
          default:
            break;
        }
        obj_unique_id++;
      }
    }

    for (let i = 0; i < this.param.height; i++) {
      for (let j = 0; j < this.param.width; j++) {
        tx = this.group.gridX.span(j) + this.param.cell_size * 0.5;
        ty = this.group.gridY.span(i) + this.param.cell_size * 0.5;
        let obj_id = this.param.map_info[i][j];
        var block;
        switch (obj_id) {
          case 0:
            if (this.key_exist_flag && j == this.param.keyx && i == this.param.keyy) {
              this.key = KeyBlock(obj_unique_id).addChildTo(this.group).setPosition(tx, ty - 10);
              this.key.tweener.by({y: -10}, 400, "swing").by({y: 10}, 400, "swing").setLoop(true).play();
            }
            break;
          case 1://wall
            block = WallBlock(obj_unique_id).addChildTo(this.group).setPosition(tx, ty);
            this.obj_map[i][j] = obj_unique_id;
            break;
          case 3://enemy
            block = Enemy(obj_unique_id, j, i).addChildTo(this.group).setPosition(tx, ty);
            this.obj_map[i][j] = obj_unique_id;
            break;
          case 4://rock
            block = RockBlock(obj_unique_id).addChildTo(this.group).setPosition(tx, ty);
            this.obj_map[i][j] = obj_unique_id;
            break;
          case 5://box
            block = BoxBlock(obj_unique_id).addChildTo(this.group).setPosition(tx, ty);
            this.obj_map[i][j] = obj_unique_id;
            break;
          case 6:
            block = LockBlock(obj_unique_id).addChildTo(this.group).setPosition(tx, ty);
            this.obj_map[i][j] = obj_unique_id;
            break;
          default:
            break;
        }
        obj_unique_id++;
      }
    }
    tx = this.group.gridX.span(this.px) + this.param.cell_size * 0.5;
    ty = this.group.gridY.span(this.py) + this.param.cell_size * 0.5 - 10;
    this.player = Player(obj_unique_id).addChildTo(this.group).setPosition(tx, ty);
    obj_unique_id++;
    tx = this.group.gridX.span(this.param.gx) + this.param.cell_size * 0.5;
    ty = this.group.gridY.span(this.param.gy) + this.param.cell_size * 0.5 - 20;
    this.heroine = Heroine(obj_unique_id, this.param.heroine_sheet, this.param.heroine_ss).addChildTo(this.group).setPosition(tx, ty);
  },

  is_in_field: function(x, y) {
    if (x < 0 || x >= this.param.width || y < 0 || y >= this.param.height) return false;
    return true;
  },

  get_type_from_uid: function(uid) {
    if (uid == 0) return 0;
    for (let i = 0; i < this.group.children.length; i++) {
      if (this.group.children[i].uid == uid) {
        return this.group.children[i].objtype;
      }
    }
    return -1;
  },

  get_obj_from_uid: function(uid) {
    for (let i = 0; i < this.group.children.length; i++) {
      if (this.group.children[i].uid == uid) {
        return this.group.children[i];
      }
    }
    return null;
  },

  enemy_check: function() {
    for (let i = 0; i < this.group.children.length; i++) {
      if (this.group.children[i].objtype == 3) {
        var enemy = this.group.children[i];
        if (this.trap_map[enemy.py][enemy.px] == 1) {
          this.obj_map[enemy.py][enemy.px] = 0;
          enemy.destroy();
        }
      }
    }
  },

  send_command: function(cmd) {
    if ((this.first_time_flag == false) && this.player.tweener.playing) return 0;
    if (this.first_time_flag) this.first_time_flag = false;

    if (cmd == 'left') {
      return this.do_action(-1, 0);
    } else if (cmd == 'right') {
      return this.do_action(1, 0);
    } else if (cmd == 'up') {
      return this.do_action(0, -1);
    } else if (cmd == 'down') {
      return this.do_action(0, 1);
    } else if (cmd == 'r') {
      return -2;
    }
  },

  do_action: function(dx, dy) {
    let nx = this.px + dx;
    let ny = this.py + dy;
    if (this.is_in_field(nx, ny) == false) return 0;

    let objtype = this.get_type_from_uid(this.obj_map[ny][nx]);
    if (objtype == 0) { //move
      if (this.move_count >= this.param.max_count) {
        this.gameover_func();
        return -1;
      }
      this.update_trap();
      this.player_move(dx, dy);
    } else if (objtype == 3) { //enemy
      if (this.move_count >= this.param.max_count) {
        this.gameover_func();
        return -1;
      }
      this.update_trap();
      this.player_kick(dx, dy);
      this.kick_effect(nx, ny);
      this.kick_enemy(nx, ny, dx, dy);
    } else if (objtype == 5) { //block
      if (this.move_count >= this.param.max_count) {
        this.gameover_func();
        return -1;
      }
      this.update_trap();
      this.player_kick(dx, dy);
      this.kick_effect(nx, ny);
      this.kick_box(nx, ny, dx, dy);
    } else if (objtype == 6) { //lock
      if (this.player.get_key_flag) {
        if (this.move_count >= this.param.max_count) {
          this.gameover_func();
          return -1;
        }
        this.update_trap();
        var lock_obj = this.get_obj_from_uid(this.obj_map[ny][nx]);
        lock_obj.hide();
        this.player_move(dx, dy);
      }
    }
    this.enemy_check();
    return this.judge_gamestate();
  },

  kick_effect: function(px, py) {
    let tx = this.group.gridX.span(px) + this.param.cell_size * 0.5;
    let ty = this.group.gridY.span(py) + this.param.cell_size * 0.5;
    KickEffect().addChildTo(this.group).setPosition(tx, ty);
  },

  update_trap: function() {
    for (let i = 0; i < this.trap_list.length; i++) {
      let trap = this.trap_list[i];
      trap.move();
      this.trap_map[trap.py][trap.px] = trap.up_flag;
    }
  },

  player_move: function(dx, dy) {
    let diffx = dx * this.param.cell_size;
    let diffy = dy * this.param.cell_size;
    this.px += dx;
    this.py += dy;
    if (this.key_exist_flag) {
      if (this.px == this.param.keyx && this.py == this.param.keyy) {
        this.player.get_key_flag = true;
        this.key.hide();
      }
    }
    if (dx > 0) this.player.scaleX = 1.0;
    if (dx < 0) this.player.scaleX = -1.0;
    this.move_count++;
    if (this.trap_map[this.py][this.px] == 1) {
      this.move_count++;
      this.player.movemotion(diffx, diffy, true);
    } else {
      this.player.movemotion(diffx, diffy, false);
    }
  },

  player_kick: function(dx, dy) {
    //kick motion
    this.move_count++;
    if (dx > 0) this.player.scaleX = 1.0;
    if (dx < 0) this.player.scaleX = -1.0;
    if (this.trap_map[this.py][this.px] == 1) {
      this.move_count++;
      this.player.kick(true);
    } else {
      this.player.kick(false);
    }
  },

  kick_enemy: function(nx, ny, dx, dy) {
    var target_obj = this.get_obj_from_uid(this.obj_map[ny][nx]);
    if (target_obj == null) {
      console.log('kick_enemy_null_error');
      return;
    }
    let nnx = nx + dx;
    let nny = ny + dy;
    let destroy_flag = false;
    if (this.is_in_field(nnx, nny) == false) destroy_flag = true;
    else {
      let objtype = this.get_type_from_uid(this.obj_map[nny][nnx]);
      if (objtype != 0) destroy_flag = true;
      if (nnx == this.param.gx && nny == this.param.gy) destroy_flag = true;
    }

    if(destroy_flag) {
      target_obj.destroy();
      this.obj_map[ny][nx] = 0;
    } else {
      let diffx = dx * this.param.cell_size;
      let diffy = dy * this.param.cell_size;
      target_obj.tweener.clear()
      .by({x: diffx, y: diffy}, 150);
      target_obj.px = nnx;
      target_obj.py = nny;
      this.obj_map[nny][nnx] = this.obj_map[ny][nx];
      this.obj_map[ny][nx] = 0;
    }
  },

  kick_box: function(nx, ny, dx, dy) {
    var target_obj = this.get_obj_from_uid(this.obj_map[ny][nx]);
    if (target_obj == null) {
      console.log('kick_box_null_error');
      return;
    }
    let nnx = nx + dx;
    let nny = ny + dy;
    let move_flag = true;
    if (this.is_in_field(nnx, nny) == false) move_flag = false;
    else {
      let objtype = this.get_type_from_uid(this.obj_map[nny][nnx]);
      if (objtype != 0) move_flag = false;
      if (nnx == this.param.gx && nny == this.param.gy) move_flag = false;
    }

    if(move_flag == true) {
      let diffx = dx * this.param.cell_size;
      let diffy = dy * this.param.cell_size;
      target_obj.tweener.clear()
      .by({x: diffx, y: diffy}, 150);
      this.obj_map[nny][nnx] = this.obj_map[ny][nx];
      this.obj_map[ny][nx] = 0;
    }
  },
  
  judge_gamestate: function() {
    let diff = Math.abs(this.px - this.param.gx) + Math.abs(this.py - this.param.gy);
    if (diff <= 1) { //success
      this.success_func();
      return 1;
    }
    return 0;
  },

  success_func: function() {
  },

  gameover_func: function() {
    RectangleShape({
      width: SCREEN_WIDTH * 2,
      height: SCREEN_HEIGHT * 2,
      fill: 'black',
      stroke: 'black',
    }).addChildTo(this);
    this.player.remove();
    let tx = this.group.gridX.span(this.px) + this.param.cell_size * 0.5;
    let ty = this.group.gridY.span(this.py) + this.param.cell_size * 0.5 - 10;
    DeathMotion().addChildTo(this).setPosition(tx, ty);
  },
});

phina.define('StageScene', {
  superClass: 'DisplayScene',
  init: function(param) {
    this.superInit({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    });
    this.stage_id = param.stage_id;
    if (this.stage_id == 1) this.stage_param = stage1_info;
    if (this.stage_id == 2) this.stage_param = stage2_info;
    if (this.stage_id == 3) this.stage_param = stage3_info;
    if (this.stage_id == 4) this.stage_param = stage4_info;
    if (this.stage_id == 5) this.stage_param = stage5_info;
    if (this.stage_id == 6) this.stage_param = stage6_info;
    RectangleShape({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
      fill: '#440000',
      stroke: '#440000',
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());
    let bg = DisplayElement().addChildTo(this);
    //Sprite('general_bg').addChildTo(bg).setPosition(this.gridX.center(), this.gridY.center()).setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    this.stage = Puzzle(this.stage_param).addChildTo(this).setScale(1.3, 1.3).setPosition(this.gridX.span(4), this.gridY.span(1));

    for (let i = 0; i < 4; i++) {
      let grx = (i < 2) ? -9 : 9;
      let gry = (i % 2) ? -7 : 7;
      let deg = (i == 0 || i == 3) ? 45 : -45;
      RectangleShape({
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT * 0.5,
        fill: 'maroon',
        stroke: 'maroon',
      }).addChildTo(this).setRotation(deg).setPosition(this.gridX.center(grx), this.gridY.center(gry));
    }

    let explain = RectangleShape({
      width: SCREEN_WIDTH * 0.2,
      height: SCREEN_HEIGHT * 0.2,
      fill: 'black',
      stroke: 'white',
      strokeWidth: 10,
    }).addChildTo(this).setPosition(this.gridX.center(-6), this.gridY.center(-3));
    Label({
      text: 'Move: ←↑↓→\nRetry: R',
      fontFamile: "'Times New Roman', 'Times New Roman', 'MS 明朝'",
      fontSize: 30,
      fill: 'white',
      align: 'left',
    }).addChildTo(explain).setPosition(-130, 0);

    this.max_count = this.stage_param.max_count;
    this.counter = Counter(this.max_count).addChildTo(this).setPosition(this.gridX.center(-6), this.gridY.center(5)).setScale(1.2, 1.2);

    this.game_state = 0;
    this.time_count = 0;
    this.wait_time = 0;
    let csm = ChangeSceneMotion('open', 0).addChildTo(this);
    csm.tweener.clear().wait(csm.wait_time).call(function(){ csm.remove(); });
  },

  update_stage: function(command) {
    if (command != 'none') {
      let result = this.stage.send_command(command);
      this.counter.set_count(this.max_count - this.stage.move_count);
      switch (result) {
        case 1:
          this.game_state = 1;
          this.time_count = 0;
          this.start_closing_motion();
          break;
        case -1:
          this.game_state = 3;
          let csm = ChangeSceneMotion('close', 1000).addChildTo(this);
          this.wait_time = csm.wait_time;
          this.time_count = 0;
          break;
        case -2:
          this.game_state = 3;
          let csm2 = ChangeSceneMotion('close', 0).addChildTo(this);
          this.wait_time = csm2.wait_time;
          this.time_count = 0;
          break;
        default:
          break;
      }
    }
  },

  start_closing_motion: function() {
    let shutter1 = RectangleShape({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
      fill: 'black',
      stroke: 'black',
    }).addChildTo(this).setPosition(this.gridX.center(), - 0.5 * SCREEN_HEIGHT);
    let shutter2 = RectangleShape({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
      fill: 'black',
      stroke: 'black',
    }).addChildTo(this).setPosition(this.gridX.center(), SCREEN_HEIGHT + 0.5 * SCREEN_HEIGHT);
    shutter1.tweener.clear().wait(400).by({y: SCREEN_HEIGHT * 0.6}, 300, "swing");
    shutter2.tweener.clear().wait(400).by({y: SCREEN_HEIGHT * -0.6}, 300, "swing");
  },

  wait_until: function(app, wait_time) {
    this.time_count += app.deltaTime;
    if (this.time_count > wait_time) {
      return true;
    }
    return false;
  },

  update: function(app) {
    var key = app.keyboard;
    var command = 'none';
    if (key.getKeyDown('left')) { command = 'left'; }
    if (key.getKeyDown('right')) { command = 'right'; }
    if (key.getKeyDown('down')) { command = 'down'; }
    if (key.getKeyDown('up')) { command = 'up'; }
    if (key.getKeyDown('r')) { command = 'r'; }

    switch(this.game_state) {
      case 0:
        this.update_stage(command);
        break;
      case 1:
        if (this.wait_until(app, 800)) {
          this.game_state = 2;
        }
        break;
      case 2:
        this.success_exit();
        break;
      case 3:
        if (this.wait_until(app, this.wait_time)) {
          this.game_state = 4;
        }
        break;
      case 4:
        this.gameover_exit();
        break;
      default:
        break;
    }
  },

  success_exit: function() {
    this.exit('heroine', {stage_id: this.stage_id});
  },

  gameover_exit: function() {
    this.exit('stage', {stage_id: this.stage_id});
  },

});

phina.define('ChoiceBox', {
  superClass: 'RectangleShape',
  init: function(choice_text, uid) {
    this.superInit({
      width: SCREEN_WIDTH * 0.6,
      height: 36,
      fill: 'black',
      stroke: 'white',
    });
    this.textlabel = Label({
      text: choice_text,
      fontFamile: "'Monaco', 'Consolas', 'MS 明朝'",
      fontSize: 28,
      fill: 'white',
    }).addChildTo(this);
    this.uid = uid;
  },

  select: function(id) {
    if (id == this.uid) {
      this.stroke = 'red';
      this.setScale(1.1, 1.1);
      this.textlabel.fill = 'white';
    } else {
      this.stroke = 'white';
      this.setScale(1.0, 1.0);
      this.textlabel.fill = 'gray'
    }
  },

});

phina.define('HeroineScene', {
  superClass: 'DisplayScene',
  init: function(param) {
    this.superInit({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    });
    this.stage_id = param.stage_id;
    this.param = mira_talk_info;
    if (this.stage_id == 1) this.param = mira_talk_info;
    if (this.stage_id == 2) this.param = shiena_talk_info;
    if (this.stage_id == 3) this.param = hakana_talk_info;
    if (this.stage_id == 4) this.param = chiko_talk_info;
    if (this.stage_id == 5) this.param = tsuna_talk_info;
    if (this.stage_id == 6) this.param = amami_talk_info;
    let bg = DisplayElement().addChildTo(this);
    Sprite('heroine_bg').addChildTo(bg).setPosition(this.gridX.center(), this.gridY.center()).setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    this.heroine = Sprite(this.param.chara_image1).addChildTo(this).setScale(0.8, 0.8).setPosition(this.gridX.center(), this.gridY.center(-1));
    RectangleShape({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT * 0.36,
      fill: 'black',
      stroke: 'black',
    }).addChildTo(this).setPosition(SCREEN_WIDTH * 0.5, SCREEN_HEIGHT - 0.18 * SCREEN_HEIGHT);
    this.heroine.alpha = 0.0;
    this.heroine.x = SCREEN_WIDTH * 0.7;
    this.heroine.tweener.to({x: SCREEN_WIDTH * 0.5, alpha: 1.0}, 300, "swing").play();

    let ypos = SCREEN_HEIGHT * 0.64 + 25
    this.namelabel = Label({
      text: this.param.chara_name,
      fontFamile: "'Monaco', 'Consolas', 'MS 明朝'",
      fontSize: 32,
      fill: 'red',
    }).addChildTo(this).setPosition(this.gridX.center(), ypos);

    ypos += 50;
    this.talklabel = Label({
      text: this.param.talkA,
      fontFamile: "'Monaco', 'Consolas', 'MS 明朝'",
      fontSize: 28,
      fill: 'white',
    }).addChildTo(this).setPosition(this.gridX.center(), ypos);

    this.press_enter = Label({
      text: "〈 Enter 〉",
      fontFamily: "'Times New Roman'",
      fontSize: 28,
      fill: 'red',
    }).addChildTo(this).setPosition(this.gridX.center(), ypos + 100);
    this.press_enter.tweener.to({scaleX: 1.1, scaleY: 1.1}, 300, "swing").to({scaleX: 1.0, scaleY: 1.0}, 300, "swing").setLoop(true).play();

    ypos += 100;
    this.selected_choice = 0;
    this.choice1 = ChoiceBox(this.param.choice1, 0).addChildTo(this).setPosition(this.gridX.center(), ypos + 0.5 * SCREEN_HEIGHT);
    ypos += 70;
    this.choice2 = ChoiceBox(this.param.choice2, 1).addChildTo(this).setPosition(this.gridX.center(), ypos + 0.5 * SCREEN_HEIGHT);
    this.select_choice(0);
    this.choice1.visible = false;
    this.choice2.visible = false;

    this.game_state = 0;
    this.next_stage_id = 1;
    this.time_count = 0;
    this.scene_change_wait = 0;
  },

  select_choice: function(i) {
    this.selected_choice = i;
    this.choice1.select(i);
    this.choice2.select(i);
  },

  update: function(app) {
    var key = app.keyboard;
    var command = 'none';
    if (key.getKeyDown('down')) { command = 'down'; }
    if (key.getKeyDown('up')) { command = 'up'; }
    if (key.getKeyDown('enter')) { command = 'enter'; }
    switch (this.game_state) {
      case 0:
        if (command == 'enter') {
          this.press_enter.visible = false;
          this.choice1.visible = true;
          this.choice2.visible = true;
          this.choice1.clear().tweener.by({y: -0.5 * SCREEN_HEIGHT}, 400, "swing");
          this.choice2.clear().tweener.by({y: -0.5 * SCREEN_HEIGHT}, 400, "swing");
          this.game_state = 1;
        }
        break;
      case 1:
        if (command == 'up') {
          this.select_choice(0);
          return;
        }
        if (command == 'down') {
          this.select_choice(1);
          return;
        }
        if (command == 'enter') {
          this.final_answer();
          return;
        }
        break;
      case 2://wait enter->scence change
        if (command == 'enter') {
          this.time_count = 0;
          this.game_state = 4;
          let csm = ChangeSceneMotion('close', 0).addChildTo(this);
          this.scene_change_wait = csm.wait_time;
          return;
        }
        break;
      case 3:
        if (command == 'enter') {
          this.game_state = 2;
          this.next_stage_id = this.stage_id;
          this.bad_end();
          return;
        }
        break;
      case 4://scene change
        this.time_count += app.deltaTime;
        if (this.time_count > this.scene_change_wait) {
          if (this.next_stage_id <= 6) {
            this.exit("stage", {stage_id: this.next_stage_id});
          } else {
            this.exit("epilogue");
          }
        }
        return;
        break;
      default:
        break;
    }
  },

  final_answer: function() {
    if (this.param.answer == this.selected_choice) {
      this.next_stage_id = this.stage_id + 1;
      this.game_state = 2;
      this.good_end();
    } else {
      this.game_state = 3;
      this.press_enter.visible = true;
      this.choice1.visible = false;
      this.choice2.visible = false;
      this.talklabel.text = this.param.talkNG;
    }
  },

  good_end: function() {
    this.choice1.visible = false;
    this.choice2.visible = false;
    this.talklabel.text = this.param.talkOK;
    this.heroine.image = this.param.chara_image2;
    SuccessMotion().addChildTo(this).setPosition(this.gridX.center(), this.gridY.center(6));
  },

  bad_end: function() {
    let badend_bg = RectangleShape({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
      fill: 'black',
      stroke: 'black',
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());
    Sprite("blood").addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());
    Label({
      text: "BAD END",
      //fontFamile: "'Times New Roman', 'Consolas', 'MS 明朝'",
      fontFamily: "'Times New Roman'",
      fontSize: 108,
      fontWeight: "bold",
      stroke: "black",
      strokeWidth: 10,
      fill: 'red',
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());
    Label({
      text: this.param.badendtext,
      fontFamile: "'Monaco', 'Consolas', 'MS 明朝'",
      fontSize: 32,
      stroke: "black",
      strokeWidth: 5,
      fill: 'red',
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.center(2));
  },
});

phina.define('ResultScene', {
  superClass: 'DisplayScene',
  init: function() {
    this.superInit({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    });
    let bg = DisplayElement().addChildTo(this);
    Sprite('result_bg').addChildTo(bg).setPosition(this.gridX.center(), this.gridY.center()).setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    this.on('pointend', function() {
      this.exit();
    });
  },
});

phina.main(function() {
  var app = GameApp({
    query: '#mycanvas',
    fit: false,
    fps: 30,
    assets: ASSETS,
    startLabel: 'title',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    scenes: [
      {
        className: 'TitleScene',
        label: 'title',
        nextLabel: 'intro',
      },
      {
        className: 'IntroScene',
        label: 'intro',
        nextLabel: 'stage',
      },
      {
        className: 'StageScene',
        label: 'stage',
        nextLabel: 'result',
      },
      {
        className: 'HeroineScene',
        label: 'heroine',
        nextLabel: 'title',
      },
      {
        className: 'EpilogueScene',
        label: 'epilogue',
        nextLabel: 'title',
      },
      {
        className: 'ResultScene',
        label: 'result',
        nextLabel: 'title',
      },
    ],
  });
  app.run();
});
