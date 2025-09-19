phina.globalize();

var ASSETS = {
  image: {
    'mira' : "imgs/mira_suika.png",
    'hakana' : "imgs/hakana_suika.png",
    'amami' : "imgs/amami_suika.png",
    'shiena' : "imgs/shiena_suika.png",
    'tuna' : "imgs/tuna_suika.png",
    'chiko' : "imgs/chiko_suika.png",
    'mira_fm' : "imgs/mira_fm.png",
    'hakana_fm' : "imgs/hakana_fm.png",
    'amami_fm' : "imgs/amami_fm.png",
    'shiena_fm' : "imgs/shiena_fm.png",
    'tuna_fm' : "imgs/tuna_fm.png",
    'chiko_fm' : "imgs/chiko_fm.png",
    'next_circle' : "imgs/next_circle.png",
    'score_board' : "imgs/score_board.png",
    'gameover' : "imgs/gameover.png",
    'title' : "imgs/title.png",
    'wallpaper' : "imgs/wallpaper.png",
    'retry' : "imgs/retry.png",
  },
};

var SCREEN_WIDTH = 1000 * 2;
var SCREEN_HEIGHT = 600 * 2;

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

phina.define('TitleScene', {
  superClass: 'DisplayScene',
  init: function() {
    this.superInit({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    });
    this.bg = DisplayElement().addChildTo(this);
    Sprite('wallpaper').addChildTo(this.bg).setPosition(this.gridX.center(), this.gridY.center()).setScale(2, 2);
    Sprite('title').addChildTo(this.bg).setPosition(this.gridX.center(), this.gridY.center()).setScale(1.2, 1.2).tweener
    .to({
      scaleX: 1.3,
      scaleY: 1.3,
    }, 700, "linear")
    .to({
      scaleX: 1.2,
      scaleY: 1.2,
    }, 700, "linear").setLoop(true);

    Label({
      text: "Click to start",
      fontWeight: "bold",
      fontFamile: "'Monaco', 'Consolas', 'MS 明朝'",
      fontSize: 60,
      fill: 'pink',
      stroke: 'white',
      strokeWidth: 6,
    }).addChildTo(this.bg).setPosition(this.gridX.center(), this.gridY.center(6));

    Sprite('amami').addChildTo(this.bg).setPosition(this.gridX.center(-6), this.gridY.center(-4)).setScale(0.7, 0.7);
    Sprite('hakana').addChildTo(this.bg).setPosition(this.gridX.center(-6), this.gridY.center()).setScale(0.7, 0.7);
    Sprite('chiko').addChildTo(this.bg).setPosition(this.gridX.center(-6), this.gridY.center(4)).setScale(0.7, 0.7);
    Sprite('tuna').addChildTo(this.bg).setPosition(this.gridX.center(6), this.gridY.center(-4)).setScale(0.7, 0.7);
    Sprite('shiena').addChildTo(this.bg).setPosition(this.gridX.center(6), this.gridY.center()).setScale(0.7, 0.7);
    Sprite('mira').addChildTo(this.bg).setPosition(this.gridX.center(6), this.gridY.center(4)).setScale(0.7, 0.7);

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
    this.bg = DisplayElement().addChildTo(this);
    Sprite('wallpaper').addChildTo(this.bg).setPosition(this.gridX.center(), this.gridY.center()).setScale(2, 2);
    this.group = DisplayElement().addChildTo(this);
    
    var engine = GameEngine();
    this.engine = engine;

    var box_height = 800;
    var box_width = 800;
    var box_center = 1000;
    var box_bottom = 1150;
    var box_thickness = 60;
    var box_color = 'pink';

    this.wall1 = RectObject(box_center, box_bottom - 0.5 * box_thickness, box_width, box_thickness, 0, box_color, true, engine).addChildTo(this);
    this.wall2 = RectObject(box_center - 0.5 * box_width, box_bottom - 0.5 * box_height, box_height, box_thickness, 90, box_color, true, engine).addChildTo(this);
    this.wall3 = RectObject(box_center + 0.5 * box_width, box_bottom - 0.5 * box_height, box_height, box_thickness, 90, box_color, true, engine).addChildTo(this);
    this.engine.setMinMaxXpos(box_center - 0.5 * box_width + 0.5 * box_thickness + 30, box_center + 0.5 * box_width - 0.5 * box_thickness - 30);

    this.droppos_x = box_center;
    this.droppos_y = 100;

    this.next_chara = Math.floor(Math.random() * 5);
    this.next_chara_group = DisplayElement().addChildTo(this).setPosition(this.gridX.center(6), this.gridY.center(-6));
    Sprite('next_circle').addChildTo(this.next_chara_group).setScale(0.7, 0.7);
    Sprite(name_list[this.next_chara]).addChildTo(this.next_chara_group).setScale(0.3, 0.3);

    this.score_board = DisplayElement().addChildTo(this).setPosition(this.gridX.center(-6), this.gridY.center(-5));
    Sprite('score_board').addChildTo(this.score_board).setScale(1.2, 1.2);
    this.score = 0;
    this.score_label = Label({
      text: 0,
      fontWeight: "bold",
      fontFamile: "'Monaco', 'Consolas', 'MS 明朝'",
      fontSize: 80,
      fill: 'pink',
      stroke: 'white',
      strokeWidth: 6,
    }).addChildTo(this.score_board).setPosition(0, 25);

    Label({
      text: '←→キーで左右移動\n↓キーで落とす',
      fontWeight: "bold",
      fontFamile: "'Monaco', 'Consolas', 'MS 明朝'",
      fontSize: 40,
      fill: 'pink',
      stroke: 'white',
      strokeWidth: 6,
    }).addChildTo(this).setPosition(this.gridX.center(-6), this.gridY.center(-2));

    this.evolution_ring = DisplayElement().addChildTo(this).setPosition(this.gridX.center(6), this.gridY.center());
    CircleShape({
      radius: 180,
      fill: 'transparent',
      stroke: 'pink',
      strokeWidth: 15,
    }).addChildTo(this.evolution_ring);
    for (let i = 0; i < 12; i++) {
      let theta = (-90 + 30 * i) / 180.0 * 3.14159
      Sprite(name_list[i]).addChildTo(this.evolution_ring).setScale(0.2, 0.2).setPosition(Math.floor(180 * Math.cos(theta)), Math.floor(180 * Math.sin(theta)));
    }

    this.game_over_flag = false;
    this.engine.left_limit_x = box_center - 0.5 * box_width - box_thickness;
    this.engine.right_limit_x = box_center + 0.5 * box_width + box_thickness;

    this.game_state = 0;
    this.engine.startsim();

  },

  collisionProcess: function() {
    let collision_pair = this.engine.collisionCheck();
    if (collision_pair.length != 2) return;

    let obj_pos = [];
    let obj_theta = [];
    let chara = '';
    for (const col_id of collision_pair) {
      for (let i = 0; i < this.group.children.length; i++) {
        let id = this.group.children[i].obj.id;
        if (id == col_id) {
          chara = this.group.children[i].obj.label;
          obj_pos.push(this.group.children[i].obj.position);
          obj_theta.push(this.group.children[i].obj.angle * 180.0 / 3.14159);
          this.engine.removeObj(col_id);
          this.group.children.splice(i, 1);
          break;
        }
      }
    }

    let idx = get_type_index(chara);
    let score_diff = 2;
    for (let i = 0; i < idx; i++) {
      score_diff = score_diff * scale_ratio;
    }
    score_diff = score_diff * score_diff;
    score_diff = Math.floor(score_diff);
    this.score = this.score + score_diff;
    this.score_label.text = this.score;

    let x = obj_pos[0].x * 0.5 + obj_pos[1].x * 0.5;
    let y = obj_pos[0].y * 0.5 + obj_pos[1].y * 0.5;
    let theta = obj_theta[0] * 0.5 + obj_theta[1] * 0.5;
    let next_chara_index = get_type_index(chara) + 1;
    if (next_chara_index < name_list.length) {
      DropObject(x, y, theta, name_list[next_chara_index], this.engine).addChildTo(this.group).setStatic(false);
    }
  },

  gameOverCheck: function() {
    if (this.engine.gameOverCheck()) {
      Sprite('gameover').addChildTo(this).setPosition(this.gridX.center(), -400).setRotation(10).tweener
      .to({
        y: 600,
      }, 2000, "easeOutBounce")
      .wait(2000)
      .to({
        y: -400,
      }, 500, "swing");

      this.retry = Sprite('retry').addChildTo(this).setPosition(this.gridX.center(-6), this.gridY.center(6));
      this.retry.setInteractive(true);
      this.retry.onpointend = () => {
        this.exit();
      };

      this.game_over_flag = true;
    }
  },

  update: function(app) {
    if (this.game_over_flag) {
      return;
    }

    this.collisionProcess();

    if (this.game_state == 0) {
      var chara_name = name_list[this.next_chara];
      this.current = DropObject(this.droppos_x, this.droppos_y, 0, chara_name, this.engine).addChildTo(this.group);
      this.next_chara = Math.floor(Math.random() * 5);
      this.next_chara_group.children.last.remove();
      Sprite(name_list[this.next_chara]).addChildTo(this.next_chara_group).setScale(0.3, 0.3);
      this.game_state++;
    } else if (this.game_state == 1) {
      var key = app.keyboard;
      var command = 'none';
      if (key.getKey('left')) { command = 'left'; }
      if (key.getKey('right')) { command = 'right'; }
      if (key.getKey('down')) {
        command = 'down';
        this.game_state++;
        this.obj_dropped_time = app.elapsedTime / 1000.0;
      }
      this.current.moveObj(command);
      this.droppos_x = this.current.obj.position.x;
    } else if (this.game_state == 2) {
      current_time = app.elapsedTime / 1000.0;
      if (current_time - this.obj_dropped_time > 0.5) {
        this.game_state = 0;
      }
    }
    this.gameOverCheck();
  },
});

phina.main(function() {
  var app = GameApp({
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: '#fff5f5',
    query: '#mycanvas',
    fit: false,
    assets: ASSETS,
    startLabel: 'title',
    scenes: [
      {
        className: 'TitleScene',
        label: 'title',
        nextLabel: 'game',
      },
      {
        className: 'MainScene',
        label: 'game',
        nextLabel: 'title',
      },
    ]
  });
  app.run();
});
