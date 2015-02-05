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

function sectionTop() {
    $('#wrapper').animate({'top': 30}, 250, 'easeInOutQuad', function() {
        $('#wrapper').animate({'top': 0}, 250, 'easeInOutQuad')
    })
}

function sectionBottom(position) {
    $('#wrapper').animate({'top': - position * window.innerHeight - 30}, 250, 'easeInOutQuad', function() {
        $('#wrapper').animate({'top': - position * window.innerHeight}, 250, 'easeInOutQuad')
    })
}

function sliderMove(tag, position, f) {
    var f = f || function() {};
    $(tag).animate({'left': - position * window.innerWidth}, 700, 'easeInOutCirc', function() {
        f()
    })
}

function leftEnd(tag) {
    $(tag).animate({'left': 30}, 250, 'easeInOutQuad', function() {
        $(tag).animate({'left': 0}, 250, 'easeInOutQuad')
    })
}

function rightEnd(tag, position) {
    $(tag).animate({'left': - position * window.innerWidth - 30}, 250, 'easeInOutQuad', function() {
        $(tag).animate({'left': - position * window.innerWidth}, 250, 'easeInOutQuad')
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
