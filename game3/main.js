phina.globalize();

var ASSETS = {
  image: {
    'title_img' : "./title_img.png",
    'face_normal' : "./face_normal.png",
    'face_angry' : "./face_angry.png",
    'face_close' : "./face_close.png",
    'face_shame' : "./face_shame.png",
  },
};

var SCREEN_WIDTH = 600;
var SCREEN_HEIGHT = 800;

phina.define('TitleScene', {
  superClass: 'DisplayScene',
  init: function() {
    this.superInit({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    });
    var bg = DisplayElement().addChildTo(this);
    Sprite('title_img').addChildTo(bg).setPosition(this.gridX.center(), this.gridY.center());
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
    var bg = DisplayElement().addChildTo(this);
    this.face_normal = Sprite('face_normal').addChildTo(bg).setPosition(this.gridX.center(), this.gridY.center());
    RectangleShape({
      width: 300,
      height: 100,
      stroke: "black",
      fill: "white",
      padding: 8,
      backgroundColor: "gray",
    }).addChildTo(this.face_normal).setPosition(0, 150);
    Label({
      text: '▶　話ってなによわ？',
      fontFamile: "'Monaco', 'Consolas', 'MS 明朝'",
      fontSize: 22,
      fill: 'black',
    }).addChildTo(this.face_normal).setPosition(0, 150);
    
    this.face_angry = Sprite('face_angry').addChildTo(bg).setPosition(this.gridX.center(), this.gridY.center()).hide();
    RectangleShape({
      width: 300,
      height: 100,
      stroke: "black",
      fill: "transparent",
      padding: 8,
      backgroundColor: "gray",
    }).addChildTo(this.face_angry).setPosition(0, 150);
    Label({
      text: '▶　…………は？',
      fontFamile: "'Monaco', 'Consolas', 'MS 明朝'",
      fontSize: 22,
      fill: 'black',
    }).addChildTo(this.face_angry).setPosition(0, 150);
    
    this.face_close = Sprite('face_close').addChildTo(bg).setPosition(this.gridX.center(), this.gridY.center()).hide();
    RectangleShape({
      width: 300,
      height: 100,
      stroke: "black",
      fill: "white",
      padding: 8,
      backgroundColor: "gray",
    }).addChildTo(this.face_close).setPosition(0, 150);
    Label({
      text: '▶　うーん……',
      fontFamile: "'Monaco', 'Consolas', 'MS 明朝'",
      fontSize: 22,
      fill: 'black',
    }).addChildTo(this.face_close).setPosition(0, 150);
    
    this.face_shame = Sprite('face_shame').addChildTo(bg).setPosition(this.gridX.center(), this.gridY.center()).hide();
    RectangleShape({
      width: 300,
      height: 100,
      stroke: "black",
      fill: "white",
      padding: 8,
      backgroundColor: "gray",
    }).addChildTo(this.face_shame).setPosition(0, 150);
    Label({
      text: '▶　まったくもう……',
      fontFamile: "'Monaco', 'Consolas', 'MS 明朝'",
      fontSize: 22,
      fill: 'black',
    }).addChildTo(this.face_shame).setPosition(0, 150);
    

    this.cnt = 0;
    this.on('pointend', function() {
      this.cnt = (this.cnt + 1) % 4;
      this.face_normal.hide();
      this.face_angry.hide();
      this.face_close.hide();
      this.face_shame.hide();
      if (this.cnt == 0) {
        this.face_normal.show();
      } else if (this.cnt == 1) {
        this.face_angry.show();
      } else if (this.cnt == 2) {
        this.face_close.show();
      } else if (this.cnt == 3) {
        this.face_shame.show();
      }
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
  });
  app.run();
});
