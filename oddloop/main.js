phina.globalize();

var ASSETS = {
  image: {
    'dance1' : "mira/mira_1.png",
    'dance2' : "mira/mira_2.png",
    'dance3' : "mira/mira_3.png",
    'dance4' : "mira/mira_4.png",
  },
};

var SCREEN_WIDTH = 600;
var SCREEN_HEIGHT = 600;

phina.define('TitleScene', {
  superClass: 'DisplayScene',
  init: function() {
    this.superInit({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    });
    var bg = DisplayElement().addChildTo(this);

    this.dance1 = Sprite('dance1').addChildTo(bg).setPosition(this.gridX.center(), this.gridY.center()).hide();
    this.dance2 = Sprite('dance2').addChildTo(bg).setPosition(this.gridX.center(), this.gridY.center()).hide();
    this.dance3 = Sprite('dance3').addChildTo(bg).setPosition(this.gridX.center(), this.gridY.center()).hide();
    this.dance4 = Sprite('dance4').addChildTo(bg).setPosition(this.gridX.center(), this.gridY.center()).hide();
    this.cnt = 0;
  },

  hide_all: function() {
    this.dance1.hide();
    this.dance2.hide();
    this.dance3.hide();
    this.dance4.hide();
  },

  update: function() {
    this.hide_all();
    if ((this.cnt < 8) && (this.cnt % 2 == 0)) {
      this.dance1.show();
    } else if ((this.cnt < 8) && (this.cnt % 2 == 1)) {
      this.dance2.show();
    } else if ((this.cnt >= 8) && (this.cnt % 2 == 0)) {
      this.dance3.show();
    } else if ((this.cnt >= 8) && (this.cnt % 2 == 1)) {
      this.dance4.show();
    }
    this.cnt = (this.cnt + 1) % 16;
  },
});

phina.main(function() {
  var app = GameApp({
    query: '#mycanvas',
    fit: false,
    fps: 6,
    assets: ASSETS,
    startLabel: 'title',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    scenes: [
      {
        className: 'TitleScene',
        label: 'title',
        nextLabel: 'title',
      },
    ],
  });
  app.run();
});
