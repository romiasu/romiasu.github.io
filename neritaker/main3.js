phina.globalize();

var ASSETS = {
  image: {
    'rock' : "./images/rock.png",
    'wall' : "./images/wall.png",
    'box' : "./images/box.png",
    'player' : "./images/player.png",
    'enemy' : "./images/enemy.png",
    'tile' : "./images/tile.png",
    'title_bg' : "./images/title_bg.png",
    'general_bg' : "./images/general_bg.png",
    'result_bg' : "./images/result_bg.png",
  },
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

phina.define('TitleScene', {
  superClass: 'DisplayScene',
  init: function() {
    this.superInit({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    });
    this.bg = DisplayElement().addChildTo(this);
    Sprite('title_bg').addChildTo(this.bg).setPosition(this.gridX.center(), this.gridY.center()).setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
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
    Sprite('general_bg').addChildTo(this.bg).setPosition(this.gridX.center(), this.gridY.center()).setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    this.on('pointend', function() {
      this.exit();
    });
  },

  update: function(app) {
    var key = app.keyboard;
    var command = 'none';
    if (key.getKeyDown('left')) { command = 'left'; }
    if (key.getKeyDown('right')) { command = 'right'; }
    if (key.getKeyDown('down')) { command = 'down'; }
  },
});

phina.define('WallBlock', {
  superClass: 'Sprite',
  init: function() {
    this.superInit('wall');
  },
});

phina.define('Player', {
  superClass: 'Sprite',
  init: function() {
    this.superInit('player');
    this.diffx = 0;
    this.diffy = 0;
  },
});

phina.define('Enemy', {
  superClass: 'Sprite',
  init: function() {
    this.superInit('enemy');
  },
});

phina.define('BoxBlock', {
  superClass: 'Sprite',
  init: function() {
    this.superInit('box');
  },
});

phina.define('RockBlock', {
  superClass: 'Sprite',
  init: function() {
    this.superInit('rock');
  },
});

phina.define('TileBlock', {
  superClass: 'Sprite',
  init: function() {
    this.superInit('tile');
  },
});

phina.define('Puzzle', {
  superClass: 'DisplayElement',
  init: function(stage_id) {
    this.superInit();
    this.group = DisplayElement().addChildTo(this);
    this.param = stage1_info;
    this.group.gridX = Grid(this.param.cell_size * this.param.width, this.param.width);
    this.group.gridY = Grid(this.param.cell_size * this.param.height, this.param.height);
    this.load_map();
    this.init_map();
  },
  load_map: function() {
    this.map_info = this.param.map_info;
  },
  init_map: function() {
    for (let i = 0; i < this.param.height; i++) {
      for (let j = 0; j < this.param.width; j++) {
        let tx = this.group.gridX.span(j) + this.param.cell_size * 0.5;
        let ty = this.group.gridY.span(i) + this.param.cell_size * 0.5;
        let obj_id = this.map_info[i][j];
        var block;
        switch (obj_id) {
          case 1:
            block = WallBlock().setPosition(tx, ty);
            break;
          case 2:
            block = Player().setPosition(tx, ty);
            this.player = block;
            break;
          case 3:
            block = Enemy().setPosition(tx, ty);
            break;
          case 4:
            block = RockBlock().setPosition(tx, ty);
            break;
          case 5:
            block = BoxBlock().setPosition(tx, ty);
            break;
          default:
            break;
        }
        block.addChildTo(this.group);
      }
    }
  },
  send_command: function(cmd) {
    if (cmd == 'left') {
      this.player.x -= this.param.cell_size;
    } else if (cmd == 'right') {
      this.player.x += this.param.cell_size;
    } else if (cmd == 'up') {
      this.player.y -= this.param.cell_size;
    } else if (cmd == 'down') {
      this.player.y += this.param.cell_size;
    }
  },
  
});

phina.define('Stage1', {
  superClass: 'DisplayScene',
  init: function() {
    this.superInit({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    });
    let bg = DisplayElement().addChildTo(this);
    Sprite('general_bg').addChildTo(bg).setPosition(this.gridX.center(), this.gridY.center()).setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    this.stage = Puzzle(1).addChildTo(this).setScale(1.2, 1.2).setPosition(this.gridX.span(4), this.gridY.span(1));
  },
  update: function(app) {
    var key = app.keyboard;
    var command = 'none';
    if (key.getKeyDown('left')) { command = 'left'; }
    if (key.getKeyDown('right')) { command = 'right'; }
    if (key.getKeyDown('down')) { command = 'down'; }
    if (key.getKeyDown('up')) { command = 'up'; }
    this.stage.send_command(command);
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
    fps: 60,
    assets: ASSETS,
    startLabel: 'title',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    scenes: [
      {
        className: 'TitleScene',
        label: 'title',
        nextLabel: 'stage1',
      },
      {
        className: 'MainScene',
        label: 'game',
        nextLabel: 'result',
      },
      {
        className: 'Stage1',
        label: 'stage1',
        nextLabel: 'result',
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
