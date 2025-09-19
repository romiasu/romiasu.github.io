var Engine = Matter.Engine;
var Render = Matter.Render;
var Composite = Matter.Composite;
var Bodies = Matter.Bodies;
var Body = Matter.Body;
var Vector = Matter.Vector;
var Events = Matter.Events;
var Runner = Matter.Runner;
var Detector = Matter.Detector;

phina.globalize();

var name_list = ['amami_fm', 'hakana_fm', 'chiko_fm', 'tuna_fm', 'shiena_fm', 'mira_fm','amami', 'hakana', 'chiko', 'tuna', 'shiena', 'mira'];
var base_scale = 0.1;
var scale_ratio = 1.25;
var scale_list = {'amami': 0.1, 'hakana': 0.15, 'chiko': 0.23, 'tuna': 0.35, 'shiena': 0.52, 'mira': 0.77};
var shinka_ring = {'amami': 'hakana', 'hakana': 'chiko', 'chiko': 'tuna', 'tuna': 'shiena', 'shiena': 'mira', 'mira': 'mira'};

function get_type_index(type) {
  for (let i = 0; i < name_list.length; i++) {
    if (name_list[i] == type) {
      return i;
    }
  }
  return -1;
}

function get_scale(type) {
  let name_idx = get_type_index(type);
  let scale = base_scale;
  for (let i = 0; i < name_idx; i++) {
    scale = scale * scale_ratio;
  }
  return scale;
}

function get_typeinfo(type) {
  var image_name = type;
  var scale = get_scale(type);
  var size = 400;
  var shape = [];
  if (type == 'mira') {
    for (var i = 0; i < mira_vertices.length; i++) {
      shape.push({x: mira_vertices[i].x * scale, y: mira_vertices[i].y * scale});
    }
  }
  if (type == 'hakana') {
    for (var i = 0; i < hakana_vertices.length; i++) {
      shape.push({x: hakana_vertices[i].x * scale, y: hakana_vertices[i].y * scale});
    }
  }
  if (type == 'chiko') {
    for (var i = 0; i < chiko_vertices.length; i++) {
      shape.push({x: chiko_vertices[i].x * scale, y: chiko_vertices[i].y * scale});
    }
  }
  if (type == 'shiena') {
    for (var i = 0; i < shiena_vertices.length; i++) {
      shape.push({x: shiena_vertices[i].x * scale, y: shiena_vertices[i].y * scale});
    }
  }
  if (type == 'tuna') {
    for (var i = 0; i < tuna_vertices.length; i++) {
      shape.push({x: tuna_vertices[i].x * scale, y: tuna_vertices[i].y * scale});
    }
  }
  if (type == 'amami') {
    for (var i = 0; i < amami_vertices.length; i++) {
      shape.push({x: amami_vertices[i].x * scale, y: amami_vertices[i].y * scale});
    }
  }
  if (type == 'mira_fm') {
    for (var i = 0; i < mira_fm_vertices.length; i++) {
      shape.push({x: mira_fm_vertices[i].x * scale, y: mira_fm_vertices[i].y * scale});
    }
  }
  if (type == 'hakana_fm') {
    for (var i = 0; i < hakana_fm_vertices.length; i++) {
      shape.push({x: hakana_fm_vertices[i].x * scale, y: hakana_fm_vertices[i].y * scale});
    }
  }
  if (type == 'chiko_fm') {
    for (var i = 0; i < chiko_fm_vertices.length; i++) {
      shape.push({x: chiko_fm_vertices[i].x * scale, y: chiko_fm_vertices[i].y * scale});
    }
  }
  if (type == 'shiena_fm') {
    for (var i = 0; i < shiena_fm_vertices.length; i++) {
      shape.push({x: shiena_fm_vertices[i].x * scale, y: shiena_fm_vertices[i].y * scale});
    }
  }
  if (type == 'tuna_fm') {
    for (var i = 0; i < tuna_fm_vertices.length; i++) {
      shape.push({x: tuna_fm_vertices[i].x * scale, y: tuna_fm_vertices[i].y * scale});
    }
  }
  if (type == 'amami_fm') {
    for (var i = 0; i < amami_fm_vertices.length; i++) {
      shape.push({x: amami_fm_vertices[i].x * scale, y: amami_fm_vertices[i].y * scale});
    }
  }
  var info = {image: image_name, scale: scale, shape: shape, size: size};
  return info;
};

phina.define('DropObject', {
  superClass: 'Sprite',
  init: function (x, y, theta, type, engine) {
    var info = get_typeinfo(type);
    this.superInit(info.image);
    this.x = x;
    this.y = y;
    this.rotation = theta;
    this.setScale(info.scale, info.scale);

    var obj = engine.createObj(x, y, theta, info.shape, info.scale, info.image, type);
    this.obj = obj;
    var size = info.size * info.scale;
    var xoffset = size * (0.5 - obj.render.sprite.xOffset);
    var yoffset = size * (0.5 - obj.render.sprite.yOffset);
    this.xoffset = xoffset;
    this.yoffset = yoffset;
    this.engine = engine;
    var pre_command = 'none';
    this.pre_command = pre_command;
    this.min_x = this.engine.min_x;
    this.max_x = this.engine.max_x;
  },
  update: function() {
    this.rotation = this.obj.angle / 3.14159 * 180.0;
    var theta = this.obj.angle;
    var x = Math.cos(theta) * this.xoffset - Math.sin(theta) * this.yoffset + this.obj.position.x;
    var y = Math.sin(theta) * this.xoffset + Math.cos(theta) * this.yoffset + this.obj.position.y;
    this.x = x + this.engine.xoffset;
    this.y = y + this.engine.yoffset;
  },
  setStatic: function(is_static) {
    Body.setStatic(this.obj, is_static);
  },

  moveObj: function(command) {
    if (command != this.pre_command) {
      if (command == 'left') {
        Body.translate(this.obj, Vector.create(-6, 0));
      } else if (command == 'right') {
        Body.translate(this.obj, Vector.create(6, 0));
      } else if (command == 'down') {
        this.setStatic(false);
      } 
    } else {
      let move_dist = 8;
      if (command == 'left') {
        let dist = this.obj.position.x - this.min_x;
        if (dist < move_dist) {
          Body.translate(this.obj, Vector.create(-dist, 0));
        } else {
          Body.translate(this.obj, Vector.create(-move_dist, 0));
        }
      } else if (command == 'right') {
        let dist = this.max_x - this.obj.position.x;
        if (dist < move_dist) {
          Body.translate(this.obj, Vector.create(dist, 0));
        } else {
          Body.translate(this.obj, Vector.create(move_dist, 0));
        }
      }
    }
    this.pre_command = command;
  },
  moveObjXpos: function(x) {
    Body.translate(this.obj, Vector.create(x, 0));
  }
});


phina.define("RectObject", {
  superClass: 'Shape',
  init: function (x, y, w, h, theta, color, isStatic, engine) {
    this.superInit();
    this.x = x;
    this.y = y;
    this.rotation = theta;
    this.width = w;
    this.height = h;
    this.padding = 0;
    this.strokeWidth = 0;
    this.backgroundColor = color;
    var obj = engine.createRect(x, y, w, h, theta, isStatic);
    this.obj = obj;
    this.engine = engine;
  },
  update: function() {
    this.x = this.obj.position.x + this.engine.xoffset;
    this.y = this.obj.position.y + this.engine.yoffset;
    this.rotation = this.obj.angle / 3.14159 * 180.0;
  },
});



phina.define("GameEngine", {
  init: function () {
    var engine = Engine.create({
      density: 0.005,
      frictionAir: 0.06,
      restitution: 0.3,
      friction: 0.5,
      frictionStatic: 0.5,
    });
    this.engine = engine;
    this.runner = Runner.create();
    this.xoffset = 0;
    this.yoffset = 0;
    this.stop_count = 0;

    this.min_x = 0;
    this.max_x = 10000;

    this.left_limit_x = 0;
    this.right_limit_x = 10000;
  },

  startsim: function() {
    Runner.run(this.runner, this.engine);
  },
  stopsim: function() {
    Runner.stop(this.runner);
  },

  setMinMaxXpos: function(minx, maxx) {
    this.min_x = minx;
    this.max_x = maxx;
  },

  createObj: function (x, y, theta, shape, scale, image, type) {
    var obj = Bodies.fromVertices(x, y, shape, {
      isStatic: false,
      mass: 10.0 * get_scale(type) * get_scale(type),
      friction: 0.05,
      frictionStatic: 0.05,
    render: {
      sprite: {
        texture: image,
        xScale: scale,
        yScale: scale
      }
    }
    });
    Body.setStatic(obj, true);
    Body.rotate(obj, theta * 3.14159 / 180.0);
    obj.label = type;
    Composite.add(this.engine.world, [obj]);
    return obj;
  },

  createRect: function (x, y, w, h, theta, is_static) {
    var obj = Bodies.rectangle(x, y, w, h, {
      isStatic: is_static,
      friction: 0.1,
      frictionStatic: 0.1,
    });
    Body.rotate(obj, theta * 3.14159 / 180.0);
    Composite.add(this.engine.world, [obj]);
    return obj;
  },

  removeObj: function(id) {
    Composite.remove(this.engine.world, Composite.get(this.engine.world, id, "body"));
  },

  collisionCheck: function () {
    let collision_pair_ids = [];
    let collisions = Detector.collisions(this.engine.detector);
    for (let i = 0; i < collisions.length; i++) {
      const col = collisions[i];
      if ((col.bodyA.label == col.bodyB.label) && (col.bodyA.label != name_list.last)) {
        collision_pair_ids = [col.bodyA.id, col.bodyB.id];
        break;
      }
    }
    return collision_pair_ids;
  },

  gameOverCheck: function () {
    let bodies  = Matter.Composite.allBodies(this.engine.world);
    for (body of bodies) {
      if (!body.isStatic) {
        if (body.position.x < this.left_limit_x || body.position.x > this.right_limit_x) {
          this.stopsim();
          return 1;
        }
      }
    }
    return 0;
  },

  moveComposite: function (x, y) {
    this.xoffset += x;
    this.yoffset += y;
  },
});
