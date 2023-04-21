phina.globalize();

var ASSETS = {
  image: {
    'mira1' : "mira/mira_1.png",
    'mira2' : "mira/mira_2.png",
    'mira3' : "mira/mira_3.png",
    'mira4' : "mira/mira_4.png",
    'shiena1' : "shiena/shiena_1.png",
    'shiena2' : "shiena/shiena_2.png",
    'shiena3' : "shiena/shiena_3.png",
    'shiena4' : "shiena/shiena_4.png",
    'tuna1' : "tuna/tuna_1.png",
    'tuna2' : "tuna/tuna_2.png",
    'tuna3' : "tuna/tuna_3.png",
    'tuna4' : "tuna/tuna_4.png",
    'chiko1' : "chiko/chiko_1.png",
    'chiko2' : "chiko/chiko_2.png",
    'chiko3' : "chiko/chiko_3.png",
    'chiko4' : "chiko/chiko_4.png",
    'hakana1' : "hakana/hakana_1.png",
    'hakana2' : "hakana/hakana_2.png",
    'hakana3' : "hakana/hakana_3.png",
    'hakana4' : "hakana/hakana_4.png",
    'kurine1' : "kurine/kurine_1.png",
    'kurine2' : "kurine/kurine_2.png",
    'kurine3' : "kurine/kurine_3.png",
    'kurine4' : "kurine/kurine_4.png",
  },
};

var SCREEN_WIDTH = 600;
var SCREEN_HEIGHT = 600;

phina.define('MiraScene', {
  superClass: 'DisplayScene',
  init: function() {
    this.superInit({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    });
    var bg = DisplayElement().addChildTo(this);

    this.dance1 = Sprite('mira1').addChildTo(bg).setPosition(this.gridX.center(), this.gridY.center()).hide();
    this.dance2 = Sprite('mira2').addChildTo(bg).setPosition(this.gridX.center(), this.gridY.center()).hide();
    this.dance3 = Sprite('mira3').addChildTo(bg).setPosition(this.gridX.center(), this.gridY.center()).hide();
    this.dance4 = Sprite('mira4').addChildTo(bg).setPosition(this.gridX.center(), this.gridY.center()).hide();
    this.cnt = 0;
    this.on('pointend', function() {
      this.exit();
    });
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
    } else if ((this.cnt < 16) && (this.cnt % 2 == 0)) {
      this.dance3.show();
    } else if ((this.cnt < 16) && (this.cnt % 2 == 1)) {
      this.dance4.show();
    } else {
      this.exit();
    }
    //this.cnt = (this.cnt + 1) % 16;
    this.cnt = this.cnt + 1;
  },
});


phina.define('ShienaScene', {
  superClass: 'DisplayScene',
  init: function() {
    this.superInit({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    });
    var bg = DisplayElement().addChildTo(this);

    this.dance1 = Sprite('shiena1').addChildTo(bg).setPosition(this.gridX.center(), this.gridY.center()).hide();
    this.dance2 = Sprite('shiena2').addChildTo(bg).setPosition(this.gridX.center(), this.gridY.center()).hide();
    this.dance3 = Sprite('shiena3').addChildTo(bg).setPosition(this.gridX.center(), this.gridY.center()).hide();
    this.dance4 = Sprite('shiena4').addChildTo(bg).setPosition(this.gridX.center(), this.gridY.center()).hide();
    this.cnt = 0;
    this.on('pointend', function() {
      this.exit();
    });
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
    } else if ((this.cnt < 16) && (this.cnt % 2 == 0)) {
      this.dance3.show();
    } else if ((this.cnt < 16) && (this.cnt % 2 == 1)) {
      this.dance4.show();
    } else {
      this.exit();
    }
    //this.cnt = (this.cnt + 1) % 16;
    this.cnt = this.cnt + 1;
  },
});

phina.define('TunaScene', {
  superClass: 'DisplayScene',
  init: function() {
    this.superInit({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    });
    var bg = DisplayElement().addChildTo(this);

    this.dance1 = Sprite('tuna1').addChildTo(bg).setPosition(this.gridX.center(), this.gridY.center()).hide();
    this.dance2 = Sprite('tuna2').addChildTo(bg).setPosition(this.gridX.center(), this.gridY.center()).hide();
    this.dance3 = Sprite('tuna3').addChildTo(bg).setPosition(this.gridX.center(), this.gridY.center()).hide();
    this.dance4 = Sprite('tuna4').addChildTo(bg).setPosition(this.gridX.center(), this.gridY.center()).hide();
    this.cnt = 0;
    this.on('pointend', function() {
      this.exit();
    });
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
    } else if ((this.cnt < 16) && (this.cnt % 2 == 0)) {
      this.dance3.show();
    } else if ((this.cnt < 16) && (this.cnt % 2 == 1)) {
      this.dance4.show();
    } else {
      this.exit();
    }
    //this.cnt = (this.cnt + 1) % 16;
    this.cnt = this.cnt + 1;
  },
});

phina.define('ChikoScene', {
  superClass: 'DisplayScene',
  init: function() {
    this.superInit({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    });
    var bg = DisplayElement().addChildTo(this);

    this.dance1 = Sprite('chiko1').addChildTo(bg).setPosition(this.gridX.center(), this.gridY.center()).hide();
    this.dance2 = Sprite('chiko2').addChildTo(bg).setPosition(this.gridX.center(), this.gridY.center()).hide();
    this.dance3 = Sprite('chiko3').addChildTo(bg).setPosition(this.gridX.center(), this.gridY.center()).hide();
    this.dance4 = Sprite('chiko4').addChildTo(bg).setPosition(this.gridX.center(), this.gridY.center()).hide();
    this.cnt = 0;
    this.on('pointend', function() {
      this.exit();
    });
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
    } else if ((this.cnt < 16) && (this.cnt % 2 == 0)) {
      this.dance3.show();
    } else if ((this.cnt < 16) && (this.cnt % 2 == 1)) {
      this.dance4.show();
    } else {
      this.exit();
    }
    //this.cnt = (this.cnt + 1) % 16;
    this.cnt = this.cnt + 1;
  },
});

phina.define('HakanaScene', {
  superClass: 'DisplayScene',
  init: function() {
    this.superInit({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    });
    var bg = DisplayElement().addChildTo(this);

    this.dance1 = Sprite('hakana1').addChildTo(bg).setPosition(this.gridX.center(), this.gridY.center()).hide();
    this.dance2 = Sprite('hakana2').addChildTo(bg).setPosition(this.gridX.center(), this.gridY.center()).hide();
    this.dance3 = Sprite('hakana3').addChildTo(bg).setPosition(this.gridX.center(), this.gridY.center()).hide();
    this.dance4 = Sprite('hakana4').addChildTo(bg).setPosition(this.gridX.center(), this.gridY.center()).hide();
    this.cnt = 0;
    this.on('pointend', function() {
      this.exit();
    });
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
    } else if ((this.cnt < 16) && (this.cnt % 2 == 0)) {
      this.dance3.show();
    } else if ((this.cnt < 16) && (this.cnt % 2 == 1)) {
      this.dance4.show();
    } else {
      this.exit();
    }
    //this.cnt = (this.cnt + 1) % 16;
    this.cnt = this.cnt + 1;
  },
});

phina.define('KurineScene', {
  superClass: 'DisplayScene',
  init: function() {
    this.superInit({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    });
    var bg = DisplayElement().addChildTo(this);

    this.dance1 = Sprite('kurine1').addChildTo(bg).setPosition(this.gridX.center(), this.gridY.center()).hide();
    this.dance2 = Sprite('kurine2').addChildTo(bg).setPosition(this.gridX.center(), this.gridY.center()).hide();
    this.dance3 = Sprite('kurine3').addChildTo(bg).setPosition(this.gridX.center(), this.gridY.center()).hide();
    this.dance4 = Sprite('kurine4').addChildTo(bg).setPosition(this.gridX.center(), this.gridY.center()).hide();
    this.cnt = 0;
    this.on('pointend', function() {
      this.exit();
    });
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
    } else if ((this.cnt < 16) && (this.cnt % 2 == 0)) {
      this.dance3.show();
    } else if ((this.cnt < 16) && (this.cnt % 2 == 1)) {
      this.dance4.show();
    } else {
      this.exit();
    }
    //this.cnt = (this.cnt + 1) % 16;
    this.cnt = this.cnt + 1;
  },
});

phina.main(function() {
  var app = GameApp({
    query: '#mycanvas',
    fit: false,
    fps: 6,
    assets: ASSETS,
    startLabel: 'mira',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    scenes: [
      {
        className: 'MiraScene',
        label: 'mira',
        nextLabel: 'shiena',
      },
      {
        className: 'ShienaScene',
        label: 'shiena',
        nextLabel: 'tuna',
      },
      {
        className: 'TunaScene',
        label: 'tuna',
        nextLabel: 'chiko',
      },
      {
        className: 'ChikoScene',
        label: 'chiko',
        nextLabel: 'hakana',
      },
      {
        className: 'HakanaScene',
        label: 'hakana',
        nextLabel: 'kurine',
      },
      {
        className: 'KurineScene',
        label: 'kurine',
        nextLabel: 'mira',
      },
    ],
  });
  app.run();
});
