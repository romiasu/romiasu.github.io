phina.globalize();

var ASSETS = {
  image: {
    'title_img' : "./title_img.png",
    'face_normal' : "./face_normal.png",
    'face_angry' : "./face_angry.png",
    'face_close' : "./face_close.png",
    'face_shame' : "./face_shame.png",
    'face_eat' : "./face_eat.png",
    'blood' : "./blood.png",
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
    Sprite('title_img').addChildTo(bg).setPosition(this.gridX.center(), this.gridY.center());
    this.on('pointend', function() {
      this.exit();
    });
  },
});

/*
phina.define('TextBox', {
  superClass: 'DisplayElement',
  init: function(_parent) {
    this.superInit();
    this.parent = _parent;
  },
});
*/

phina.define('CharaImg', {
  superClass: 'Sprite',
  init: function(img_name) {
    this.superInit(img_name);
    this.textbox = RectangleShape({
      width: 300,
      height: 100,
      stroke: "black",
      fill: "white",
      padding: 8,
      backgroundColor: "gray",
    }).addChildTo(this).setPosition(0, 150);
    this.text = Label({
      text: '▶',
      fontFamile: "'Monaco', 'Consolas', 'MS 明朝'",
      fontSize: 22,
      fill: 'black',
    }).addChildTo(this).setPosition(0, 150);
  },
});

phina.define('Scene1', {
  superClass: 'DisplayScene',
  init: function() {
    this.superInit({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    });
    this.img_list = [];
    this.img_list.push(CharaImg('face_normal').addChildTo(this).setPosition(this.gridX.center(), this.gridY.center()).hide());
    this.img_list.push(CharaImg('face_normal').addChildTo(this).setPosition(this.gridX.center(), this.gridY.center()).hide());

    this.img_list[0].text.text = '▶　お願いってなによわ？';
    this.img_list[1].text.text = '→『せいら様に噛みつかれたい！』';
    this.img_list[1].textbox.width = 350;

    this.cnt = 0;
    this.img_list[0].show();

    this.on('pointend', function() {
      this.cnt = this.cnt + 1;
      for (let i = 0; i < this.img_list.length; i++) {
        this.img_list[i].hide();
      }
      if (this.cnt == 0) {
        this.img_list[0].show();
      } else if (this.cnt == 1) {
        this.img_list[1].show();
      } else {
        this.exit();
      }
    });
  },
});

phina.define('Scene2', {
  superClass: 'DisplayScene',
  init: function() {
    this.superInit({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    });
    this.img_list = [];
    this.img_list.push(CharaImg('face_angry').addChildTo(this).setPosition(this.gridX.center(), this.gridY.center()).hide());

    this.img_list[0].text.text = '▶　…………は？';

    this.cnt = 0;
    this.img_list[0].show();

    this.on('pointend', function() {
      this.exit();
    });
  },
});

phina.define('Scene3', {
  superClass: 'DisplayScene',
  init: function() {
    this.superInit({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    });
    this.img_list = [];
    this.img_list.push(CharaImg('face_close').addChildTo(this).setPosition(this.gridX.center(), this.gridY.center()).hide());

    this.img_list[0].text.text = '▶　うーん……';

    this.cnt = 0;
    this.img_list[0].show();

    this.on('pointend', function() {
      this.exit();
    });
  },
});

phina.define('Scene4', {
  superClass: 'DisplayScene',
  init: function() {
    this.superInit({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    });
    this.img_list = [];
    this.img_list.push(CharaImg('face_shame').addChildTo(this).setPosition(this.gridX.center(), this.gridY.center()).hide());

    this.img_list[0].text.text = '▶　……まったくもう';

    this.cnt = 0;
    this.img_list[0].show();

    this.on('pointend', function() {
      this.exit();
    });
  },
});

phina.define('Scene5', {
  superClass: 'DisplayScene',
  init: function() {
    this.superInit({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    });
    this.backgroundColor = 'black';
    RectangleShape({
      width: 300,
      height: 100,
      stroke: "black",
      fill: "white",
      padding: 8,
      backgroundColor: "gray",
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());
    Label({
      text: '▶　じゃあ、いくよわ…',
      fontFamile: "'Monaco', 'Consolas', 'MS 明朝'",
      fontSize: 22,
      fill: 'black',
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());
    

    this.on('pointend', function() {
      this.exit();
    });
  },
});

phina.define('Scene6', {
  superClass: 'DisplayScene',
  init: function() {
    this.superInit({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    });
    this.img_list = [];
    this.img_list.push(CharaImg('face_eat').addChildTo(this).setPosition(this.gridX.center(), this.gridY.center()).hide());

    this.img_list[0].text.text = '▶　あー♡';

    this.cnt = 0;
    this.img_list[0].show();

    this.on('pointend', function() {
      this.exit();
    });
  },
});

phina.define('Scene7', {
  superClass: 'DisplayScene',
  init: function() {
    this.superInit({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    });
    this.img_list = [];
    this.img_list.push(CharaImg('blood').addChildTo(this).setPosition(this.gridX.center(), this.gridY.center()).hide());
    this.img_list[0].text.text = 'YOU DIED...';

    this.cnt = 0;
    this.img_list[0].show();

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
    
    this.face_eat = Sprite('face_eat').addChildTo(bg).setPosition(this.gridX.center(), this.gridY.center()).hide();

    this.cnt = 0;
    this.on('pointend', function() {
      this.cnt = (this.cnt + 1) % 5;
      this.face_normal.hide();
      this.face_angry.hide();
      this.face_close.hide();
      this.face_shame.hide();
      this.face_eat.hide();
      if (this.cnt == 0) {
        this.face_normal.show();
      } else if (this.cnt == 1) {
        this.face_angry.show();
      } else if (this.cnt == 2) {
        this.face_close.show();
      } else if (this.cnt == 3) {
        this.face_shame.show();
      } else if (this.cnt == 4) {
        this.face_eat.show();
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
    scenes: [
    {
      className: 'TitleScene',
      label: 'title',
      nextLabel: 'scene1',
    },
    {
      className: 'Scene1',
      label: 'scene1',
      nextLabel: 'scene2',
    },
    {
      className: 'Scene2',
      label: 'scene2',
      nextLabel: 'scene3',
    },
    {
      className: 'Scene3',
      label: 'scene3',
      nextLabel: 'scene4',
    },
    {
      className: 'Scene4',
      label: 'scene4',
      nextLabel: 'scene5',
    },
    {
      className: 'Scene5',
      label: 'scene5',
      nextLabel: 'scene6',
    },
    {
      className: 'Scene6',
      label: 'scene6',
      nextLabel: 'scene7',
    },
    {
      className: 'Scene7',
      label: 'scene7',
      nextLabel: 'title',
    },
    ],
  });
  app.run();
});
