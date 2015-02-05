function ajaxLoad(url, callback, error) {
    $.ajax({
        type: 'GET',
        url: url,
        timeout: 7000,
        success: function(data) {callback(data)},
        error: function() {error()}
    })
}

function touchDevice() {
	return !!('ontouchstart' in window)
}

function sectionMove(position, f) {
    var f = f || function() {};
    $('#wrapper').animate({'top': - position * window.innerHeight}, 700, 'easeInOutQuint', function() {
        f()
    })
}

function sliderMove(tag, position, f) {
    var f = f || function() {};
    $(tag).animate({'left': - position * window.innerWidth}, 700, 'easeInOutCirc', function() {
        if (position == 0) $(tag).css('left', 0);
        f()
    })
}

function leftEnd(tag) {
    $('<li id="leftli" style="width: 0; height: 100%; display: inline-block"></li>').prependTo(tag)
    $('#leftli').animate({'width': 30 }, 250, 'easeInOutQuad', function() {
        $('#leftli').animate({'width': 0 }, 250, 'easeInOutQuad', function() {
            $('#leftli').remove()
        })
    })
}

function sectionBottom(position) {
    $('#bottom').height(70)
    $('body, html').animate({'scrollTop': position + 30}, 250, 'easeInOutQuad', function() {
        $('body, html').animate({'scrollTop': position}, 250, 'easeInOutQuad', function() {
            $('#bottom').height(0)
        })
    })
}

function rightEnd(tag, position) {
    var w = $(tag).width();
    $('<li id="rightli" style="width: 30px; height: 100%; display: inline-block"></li>').appendTo(tag)
    $(tag).width(w + 30)
    $(tag).animate({'left': - position - 30}, 250, 'easeInOutQuad', function() {
        $(tag).animate({'left': - position}, 250, 'easeInOutQuad', function() {
            $('#rightli').remove()
            $(tag).width(w)
        })
    })
}

function sectionTop() {
    $('#top').height(0)     /* need to define 0px */
    $('#top').animate({'height': 30}, 250, 'easeInOutQuad', function() {
        $('#top').animate({'height': 0}, 250, 'easeInOutQuad')
    })
}

function pState(url, title, position) {
    history.pushState({ url: url, title: title, position: position }, title, url)
    document.title = title;
}

function tapPlot(tag, target, f) {
    $(tag).hammer({
        prevent_default: true
    }).on('tap', function(e) {
        var ex = e.position[0].x,
            ey = e.position[0].y;
        
        $(target).css({
            'visibility': 'visible',
            'width': '30px',
            'height': '30px',
            'left': ex - 15 +'px',
            'top': ey - 15 +'px',
            opacity: 0.4
        }).animate({
            height: '40px',
            width: '40px',
            opacity: 0,
            left: '-='+ 5 +'px',
            top: '-='+ 5 +'px'
        }, 300, function() {
            $(target).css('visibility', 'hidden')
        })

        f(ex / window.innerWidth, ey / window.innerHeight)
    })
}

function canvasBlur(ele, img) {
    this.element = ele;
    this.image = img;

    this.element.width = this.image.getAttribute('width');
    this.element.height = this.image.getAttribute('height');

    this.context = this.element.getContext('2d');
    
    this.context.drawImage(this.image,0,0)
}

canvasBlur.prototype.blur = function(i) {
    this.context.globalAlpha = 0.5;

    for (var y = -i; y <= i; y += 3) {
        for (var x = -i; x <= i; x += 3) {
            this.context.drawImage(this.element, x + 1, y + 1)

            if (x >= 0 && y >= 0) {
                this.context.drawImage(this.element, -(x-1), -(y-1))
            }
        }
    }

    this.context.globalAlpha = 1;
}

function loadImg(tag) {
    var t = $(tag),
        w = t.data('w'),
        h = t.data('h'),
        u = t.data('u'),
        img = '<img src="'+ u +'" width="'+ w +'" height="'+ h +'" />';

    function getImg() {
        if ($(img).prop('complete')) {
            $(img).appendTo(tag)
            t.parent().addClass('loaded')
            return;
        }
        $('<img/>').attr({
            src: u,
            width: w,
            height: h
        }).load(function() {
            $(this).appendTo(tag)
            t.parent().addClass('loaded')
        }).error(function() {
            u = u +'?'+ +new Date;
            getImg()
        })
    }

    getImg()
}
