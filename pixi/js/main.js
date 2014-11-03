/**
 * main.js
 * @author: 6174
 */
var renderer, stage, loader;
var vpx = window.innerWidth;
var vpy = window.innerHeight;
var avatars = [];

// 运动变量配置
var angleX = 0.001;
var angleY = 0.001;
var zstep = 1;
var zflag = 1;

// 场景
var Scenes = {};

init();
/**
 * 入口
 */
function init() {
	renderer = PIXI.autoDetectRenderer(vpx, vpy);
	stage = new PIXI.Stage();
	loader = new PIXI.AssetLoader(getAssetsToLoader())
	document.body.appendChild(renderer.view);

	loader.onComplete = function () {
		initScene();
		mainloop();
		renderer.view.addEventListener('mousemove', function (ev) {
			angleY = (ev.x - vpx) * .00001;
            angleX = (ev.y - vpy) * .00001;
            // console.log(angleY, angleX);
		});
	}
	loader.load();
}

/**
 * 动画主循环
 */
function mainloop() {
	// 每个场景的update
	for(var attr in Scenes) {
		var scene = Scenes[attr];
		scene.update();
	}

	//  调整z速度
	if (zstep > 2 || zstep < -2) {
		zflag *= -1;
	}
	zstep += zflag * 0.01;

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
			var sprites = this.sprites;
			sprites.forEach(function(sprite) {
				sprite.$3dPoint.rotateX(angleX);
				sprite.$3dPoint.rotateY(angleY);
				sprite.$3dPoint.zpos += zstep;
				sprite.$3dPoint.transform();
			});
		},
		leave: function() {

		},
		explode: function () {

		}
	});
	Scenes.tmall = tmallScene;
}

/**
 * 初始化sprites
 */
function createTmallSprites() {
	var sprites = [], a, b, r;
	for(var i = 0; i < 1000; i ++) {
		a = Math.PI * 2 * Math.random();
	    b = Math.PI * 2 * Math.random();
	    r = range(vpx, vpy);
	  	sprites.push(createSprite({
			textureSrc: avatars[range(0, avatars.length - 1) << 0],
			xpos: Math.sin(a) * Math.sin(b) * r,
			ypos: Math.cos(a) * Math.sin(b) * r,
			zpos: -Math.abs(Math.cos(b) * r),
			width: range(8, 15)
		}));
	}
	return sprites;
}

function createSprite(config) {
	var container = new PIXI.DisplayObjectContainer();

	// sprite with texture
	var spriteTexture = PIXI.Texture.fromImage(config.textureSrc);
	var sprite = new PIXI.Sprite(spriteTexture);
	sprite.anchor.x = 0.5;
	sprite.anchor.y = 0.5;

	// var mask = new PIXI.Graphics();
	// mask.beginFill();
	// mask.drawCircle(0, 0, 100);
	// mask.endFill();

	// container.addChild(mask);
	// container.mask = mask;

	container.addChild(sprite);
	transformTo3DSprite(container, function() {
	    this.xpos = config.xpos;
	    this.ypos = config.ypos;
	    this.zpos = config.zpos;
	    this.setVanishPoint(vpx/2, vpy/2);
		this.setCenterPoint(0, 0, 0);
	});

	container.$3dPoint.transform();
	return container;
}

function range(a, b) {
    return Math.floor(Math.random()*(b-a) + a);
}



