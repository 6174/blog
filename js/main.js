/**
 * main.js
 * @author: 6174
 */
var renderer, stage, loader;
var vpx = window.innerWidth;
var vpy = window.innerHeight;
var avatars = [];
// 场景
var Scenes = {
	'tmall': null
};

init();

/**
 * 入口
 */
function init() {
	renderer = PIXI.autoDetectRenderer(vpx, vpy);
	stage = new PIXI.Stage(0x66FF99FF);
	loader = new PIXI.AssetLoader(getAssetsToLoader())
	document.body.appendChild(renderer.view);

	loader.onComplete = function () {
		initScene();
		mainloop();
	}
	loader.load();
}

/**
 * 动画主循环
 */
function mainloop() {
  renderer.render(stage);
  requestAnimationFrame(mainloop);
}

/**
 * 初始化资源
 */
function getAssetsToLoader() {
	var assets = ['./resources/zombie.png'];
	var src;
	for (var i = 2; i <= 10; i ++) {
		src = './resources/avatar/' + i + '.png';
		assets.push(src);
		avatars.push(src);
	}
	return	assets;
}

/**
 * 初始化场景
 */
function initScene() {
	// tmall 场景
	var tmallScene = new Scene(stage, {
		init: function () {
			this.initSprites(createTmallSprites());
		},
		update: function() {

		},
		leave: function() {

		},
		explode: function () {

		}
	});
	Scene.tmall = tmallScene;
}

/**
 * 初始化sprites
 */
function createTmallSprites() {
	var sprites = [], a, b, r;
	for(var i = 0; i < 100; i ++) {
		a = Math.PI * 2 * Math.random();
	    b = Math.PI * 2 * Math.random();
	    r = range(vpx, vpy);
	  	sprites.push(createSprite({
			textureSrc: avatars[range(0, avatars.length - 1) << 0],
			xpos: Math.sin(a) * Math.sin(b) * r,
			ypos: Math.cos(a) * Math.sin(b) * r,
			zpos: -Math.abs(Math.cos(b) * r)
		}));
	}
	return sprites;
}

function createSprite(config) {
	// sprite with texture
	var spriteTexture = PIXI.Texture.fromImage(config.textureSrc);
	var sprite = new PIXI.Sprite(spriteTexture);
	sprite.anchor.x = 0.5;
	sprite.anchor.y = 0.5;
	transformTo3DSprite(sprite, function() {
	    this.xpos = config.xpos;
	    this.ypos = config.ypos;
	    this.zpos = config.zpos;
	    this.setVanishPoint(vpx/2, vpy/2);
		this.setCenterPoint(0, 0, 0);
	});
	sprite.$3dPoint.transform();
	return sprite;
}
function range(a, b) {
    return Math.floor(Math.random()*(b-a) + a);
}



