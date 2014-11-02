/**
 * main.js
 * @author: 6174
 */
var renderer, stage, loader;
var vpx = window.innerWidth;
var vpy = window.innerHeight;

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
		createSprite();
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
 * 画一个sample
 */
function createSprite() {
	// sprite with texture
	var zombieTexture = PIXI.Texture.fromImage('./resources/zombie.png');
	var zombie = new PIXI.Sprite(zombieTexture);

	// zombie.position.x = window.innerWidth / 2 - 150;
	// zombie.position.y = window.innerHeight / 2 - 150;
	zombie.anchor.x = 0.5;
	zombie.anchor.y = 0.5;

	transformTo3DSprite(zombie, function() {
		var a = Math.PI * 2 * Math.random();
	    var b = Math.PI * 2 * Math.random();
	    var r = range(vpx, vpy);

	    this.xpos = Math.sin(a) * Math.sin(b) * r;
	    this.ypos = Math.cos(a) * Math.sin(b) * r;
	    this.zpos = -Math.abs(Math.cos(b) * r);
	    this.xpos = 0;
	    this.ypos = 0;
	    this.zpos = -100;
	    this.setVanishPoint(vpx/2, vpy/2);
		this.setCenterPoint(0, 0, 0);
	});
	zombie.$3dPoint.transform();
	window.zombie = zombie;
	console.log(zombie.position, vpx/4, vpy/4);
	stage.addChild(zombie);
}

/**
 * 初始化资源
 */
function getAssetsToLoader() {
	var assets = ['./resources/zombie.png'];
	for (var i = 2; i <= 100; i ++) {
		assets.push('./resources/avatar/' + i + '.png');
	}
	console.log(assets);
	return	assets;
}

/**
 * 初始化场景
 */
function initScene() {
	var tmallScene = new Scene(stage, {});
}


function range(a, b) {
    return Math.floor(Math.random()*(b-a) + a);
}



