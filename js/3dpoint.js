/**
 * 通过sprite 构造3dPoint
 */
function $3DPoint(sprite, options) {
    var self = this;
	this.sprite = sprite;
    // viewport size
    this._vpx = 0;
    this._vpy = 0;

    // center point
    this._cx = 0;
    this._cy = 0;
    this._cz = 0;
    this.focalLength = 50;

    if (typeof options == 'function') {
        options.call(this);
    } else {
    	for (attr in options) {
    		this[attr] = options[attr];
        }
	}
}

$3DPoint.prototype = {
	// 将2D坐标转换为3D
	transform: function () {
		var screenXY = this.getScreenXY();
        var scale = this.getScale()
		this.sprite.position.x = screenXY.x;
		this.sprite.position.y = screenXY.y;
        this.sprite.scale.x = scale;
        this.sprite.scale.y = scale;
	},
	setVanishPoint: function (vpx, vpy) {
        this._vpx = vpx;
        this._vpy = vpy;
    },
    // 设定坐标中心点
    setCenterPoint: function (x, y, z) {
        this._cx = x;
        this._cy = y;
        this._cz = z;
    },
    // 绕x轴旋转
    rotateX: function (angleX) {
        var cosx = Math.cos(angleX),
            sinx = Math.sin(angleX),
            y1 = this.ypos * cosx - this.zpos * sinx,
            z1 = this.zpos * cosx + this.ypos * sinx;
        this.ypos = y1;
        this.zpos = z1;
    },
    // 绕y轴旋转
    rotateY: function (angleY) {
        var cosy = Math.cos(angleY),
            siny = Math.sin(angleY),
            x1 = this.xpos * cosy - this.zpos * siny,
            z1 = this.zpos * cosy + this.xpos * siny;
        this.xpos = x1;
        this.zpos = z1;
    },
    // 绕z轴旋转
    rotateZ: function (angleZ) {
        var cosz = Math.cos(angleZ),
            sinz = Math.sin(angleZ),
            x1 = this.xpos * cosz - this.ypos * sinz,
            y1 = this.ypos * cosz + this.xpos * sinz;
        this.xpos = x1;
        this.ypos = y1;
    },
    // 获取缩放scale
    getScale: function () {
        return (this.focalLength / (this.focalLength + this.zpos + this._cz));		  
    },
    // 获取z轴扁平化的 x，y值
    getScreenXY: function () {
        var scale = this.getScale();
        return {
            x: this._vpx + (this._cx + this.xpos) * scale,
            y: this._vpy + (this._cy + this.ypos) * scale
        };
    }    
};


function transformTo3DSprite(sprite, options) {
    var point = new $3DPoint(sprite, options);
    sprite.$3dPoint = point;
    return sprite;
}

// example
// var point = new $3DPoint(null, function () {
//     var color = 'rgb('+ range(200, 255) +', '+ range(200, 255) +', '+ range(200, 255) +')';
//     var a = Math.PI * 2 * Math.random();
//     var b = Math.PI * 2 * Math.random();
//     var r = range(vpx, vpy);

//     this.xpos = Math.sin(a) * Math.sin(b) * r;
//     this.ypos = Math.cos(a) * Math.sin(b) * r;
//     this.zpos = -Math.abs(Math.cos(b) * r);
// });

