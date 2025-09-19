phina.globalize();

var ASSETS = {
  image: {
    'mira' : "./mira_suika.png",
  },
};

var SCREEN_WIDTH = 640;
var SCREEN_HEIGHT = 960;

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
    this.superInit();
    var bg = DisplayElement().addChildTo(this);
    Sprite('mira').addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());

    this.on('pointend', function() {
      this.exit();
    });
  },
});


phina.define('MainScene', {
  superClass: 'DisplayScene',
  init: function() {
    this.superInit();
    var bg = DisplayElement().addChildTo(this);

    var engine = GameEngine();
    this.engine = engine;

    this.floor = RectObject(300, 700, 500, 30, 0, 'green', true, engine).addChildTo(this);
    this.wall1 = RectObject(50, 300, 800, 30, 90, 'green', true, engine).addChildTo(this);
    this.wall2 = RectObject(550, 300, 800, 30, 90, 'green', true, engine).addChildTo(this);

    this.engine.startsim();
  },

  update: function(app) {
    //もし衝突があれば合体処理を行う
  },
});
