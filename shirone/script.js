phina.globalize();

var ASSETS = {
    image: {
        'head': "./head.png",
        'hand': "./hand.png",
        'body': "./body.png",
        'table': "./table.png",
        'wall': "./wall.png",
        'rightear': "./rightear.png",
        'leftear': "./leftear.png",
        'backhair': "./backhair.png",
        'lefteye': "./lefteye.png",
        'righteye': "./righteye.png",
        'eyemask': "./eyemask.png",
        'eyeblow': "./eyeblow.png",
        'mask2': "./mask2.png",
        'tail2': "./tail2.png",
        'smile': "./smile.png",
        'angry': "./angry2.png",
        'jail': "./jail.png",
        'myhand': "./myhand.png",
    },
};

var SCREEN_WIDTH = 600;
var SCREEN_HEIGHT = 800;

phina.define("MainScene", {
    superClass: 'DisplayScene',

    init: function(options) {
        this.superInit(options);


        // which is better?
        // this.shirone = DisplayElement().addChildTo(this);
        this.shirone = DisplayElement();
        this.tail = Sprite('tail2').addChildTo(this.shirone).setPosition(0, 360);
        this.backhair = Sprite('backhair').addChildTo(this.shirone);
        this.leftear = Sprite('leftear').addChildTo(this.shirone);
        this.rightear = Sprite('rightear').addChildTo(this.shirone);
        this.body = Sprite('body').addChildTo(this.shirone).setScale(1.05, 1.05);
        this.head = Sprite('head').addChildTo(this.shirone);

        this.mask = Sprite('mask2');
        this.mask.blendMode = 'destination-in'
        this.mask.addChildTo(this.shirone);
        this.eyeblow = Sprite('eyeblow').addChildTo(this.shirone);
        this.lefteye = Sprite('lefteye');
        this.lefteye.blendMode = 'destination-over';
        this.lefteye.addChildTo(this.shirone);
        this.righteye = Sprite('righteye');
        this.righteye.blendMode = 'destination-over';
        this.righteye.addChildTo(this.shirone);
        this.eyemask = Sprite('eyemask');
        this.eyemask.blendMode = 'destination-over';
        this.eyemask.addChildTo(this.shirone);
        this.smile = Sprite('smile');
        this.smile.visible = false;
        this.smile.addChildTo(this.shirone);

        this.shirone.addChildTo(this).setPosition(this.gridX.center(), this.gridY.center(8));

        this.table = Sprite('table').addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());
        this.hand = Sprite('hand').addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());
        this.wall = Sprite('wall');
        this.wall.blendMode = 'destination-over';
        this.wall.addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());

        this.angry = Sprite('angry').addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());
        this.angry.visible = false;
        this.jail = Sprite('jail').addChildTo(this).setPosition(this.gridX.center(), this.gridY.center(-16));

        this.myhand = Sprite('myhand').addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());
        this.myhand.visible = false;

        this.leftear.tweener.clear()
        .to({rotation: 2}, 500, "swing")
        .to({rotation: -1}, 500, "swing")
        .setLoop(true).play();
        this.rightear.tweener.clear()
        .to({rotation: -2}, 500, "swing")
        .to({rotation: 1}, 500, "swing")
        .setLoop(true).play();
        this.tail.tweener.clear()
        .to({rotation: 10}, 800, "swing")
        .to({rotation: 0}, 800, "swing")
        .setLoop(true).play();

        this.leyex = 340;
        this.reyex = 260;
        this.eyey = 350;
        this.eyediff = 5;
        this.radius = 250;

        this.state_cnt = 0;
    },

    move_reye: function(px, py) {
        let dx = px - this.reyex;
        let dy = py - this.eyey;
        let len = Math.sqrt(dx * dx + dy * dy);
        if (len >= this.radius) len = this.radius;
        let ratio = len / this.radius;
        let r = this.eyediff * ratio;
        let mx = r * dx / len;
        let my = r * dy / len;
        this.righteye.x = mx;
        this.righteye.y = my;
    },

    move_leye: function(px, py) {
        let dx = px - this.leyex;
        let dy = py - this.eyey;
        let len = Math.sqrt(dx * dx + dy * dy);
        if (len >= this.radius) len = this.radius;
        let ratio = len / this.radius;
        let r = this.eyediff * ratio;
        let mx = r * dx / len;
        let my = r * dy / len;
        this.lefteye.x = mx;
        this.lefteye.y = my;
    },

    move_eyes: function(x, y) {
        this.move_reye(x, y);
        this.move_leye(x, y);
    },

    switch_face: function(id) {
        this.mask.visible = false;
        this.eyeblow.visible = false;
        this.lefteye.visible = false;
        this.righteye.visible = false;
        this.eyemask.visible = false;
        this.smile.visible = false;
        this.angry.visible = false;
        if (id == 1) {
            this.smile.visible = true;
        } else if (id == 2) {
            this.angry.visible = true;
        } else {
            this.mask.visible = true;
            this.eyeblow.visible = true;
            this.lefteye.visible = true;
            this.righteye.visible = true;
            this.eyemask.visible = true;
        }
    },

    update: function(app) {
        let x = app.pointer.x;
        let y = app.pointer.y;
        let clk = app.pointer.getPointingEnd();

        this.myhand.setPosition(x, y);

        if (this.state_cnt == 0) {
            if (clk) {
                this.shirone.tweener.clear().to({y: this.gridY.center()}, 500, "swing");
                this.state_cnt = 1;
            }
        } else if (this.state_cnt == 1) {
            if (this.shirone.tweener.playing == false) {
                this.state_cnt = 2;
                this.shirone.tweener.clear()
                .by({y: -5}, 500, "swing")
                .to({y: this.gridY.center()}, 500, "swing")
                .setLoop(true).play();
            }
        } else if (this.state_cnt == 2) {
            if (clk && (x > 220) && (x < 380) && (y > 190) && (y < 320)) {
                this.lefteye.x = 0;
                this.lefteye.y = 0;
                this.righteye.x = 0;
                this.righteye.y = 0;
                this.switch_face(1);
                this.shirone.tweener.clear().by({y: 50}, 500, "swing")
                .to({y: this.gridY.center()}, 500, "swing");

                this.state_cnt = 3;
            } else if (clk && (x > 200) && (x < 400) && (y > 580) && (y < 630)) {
                this.lefteye.x = 0;
                this.lefteye.y = 0;
                this.righteye.x = 0;
                this.righteye.y = 0;
                this.switch_face(2);
                this.jail.tweener.clear().to({y: this.gridY.center()}, 500, "swing");

                this.state_cnt = 4;
            } else {
                this.move_eyes(x, y);
            }
        } else if (this.state_cnt == 3) {
            if (this.shirone.tweener.playing == false) {
                this.switch_face(0);
                this.shirone.tweener.clear()
                .by({y: -5}, 500, "swing")
                .to({y: this.gridY.center()}, 500, "swing")
                .setLoop(true).play();

                this.state_cnt = 2;
            }
        }
    },

});

phina.main(function () {
    var app = GameApp({
        qurey: '#mycanvas',
        fit: false,
        fps: 30,
        assets: ASSETS,
        startLabel: 'main',
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        scenes: [
            {
                className: 'MainScene',
                label: 'main',
                nextLabel: 'main',
            },
        ],
    });
    app.run();
});