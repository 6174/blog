/**
 * 场景类
 */
function Scene(stage, options) {
	this.stage = stage;
	this.sprites = [];
	for (attr in options) {
		this[attr] = options[attr];
	}
	this.init && this.init();
}

Scene.prototype = {
	initSprites: function(sprites) {
		var stage = this.stage;
		this.sprites = sprites;
		this.sprites.forEach(function(sprite){
			stage.addChild(sprite);
		});
	},
	releaseSprites: function() {
		var stage = this.stage;
		this.sprites.forEach(function(sprite){
			stage.removeChild(sprite);
		});
	}
}