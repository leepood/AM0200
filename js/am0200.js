function full(id, w, h) {

	var _height = window.innerHeight,
	    _width = window.innerWidth,
        ratio = h / w;

	if (_height / _width > ratio) {
        id.style.height = _height +'px';
        id.style.width = _height / ratio +'px';
        w = _height / ratio;
        h = _height;
	} else {
        id.style.height = _width * ratio +'px';
        id.style.width = _width +'px';
        w = _width;
        h = _width * ratio;
	}


    id.style.position = 'relative';

    id.style.left = _width - w / 2 +'px';
    id.style.top = _height - h / 2 +'px';

}

var canvasBlur = function(ele, img) {

    this.element = ele;
    this.image = img;

    this.element.width = this.image.width;
    this.element.height = this.image.height;

    this.context = this.element.getContext('2d');
    
    this.context.drawImage(this.image,0,0)

}

canvasBlur.prototype.blur = function(i) {

    this.context.globalAlpha = 0.5;

    for (var y = -i; y <= i; y += 2) {
        for (var x = -i; x <= i; x += 2) {
            this.context.drawImage(this.element, x + 1, y + 1)

            if (x >= 0 && y >= 0) {
                this.context.drawImage(this.element, -(x-1), -(y-1))
            }
        }
    }

    this.context.globalAlpha = 1;

}
