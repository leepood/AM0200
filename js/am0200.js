/**
 * Version: 0.0
 * Author: LoeiFy
 * URL: http://lorem.in
 */

function ajaxLoad(url, callback, error) {
    $.ajax({
        type: 'GET',
        url: url,
        timeout: 7000,
        success: function(data) {callback(data)},
        error: function() {error()}
    })
}

function log(s) {
    console.log(s)
}

function sectionMove(position, f) {
    var f = f || function() {};
    $('body, html').animate({'scrollTop': position}, 1000, 'easeInOutQuint', function() {
        f()
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

        //if (!e.target.id) return;

        f(ey / window.innerHeight)
    })
}

function cursorChange(dir) {
    var cursor = 'default';
    switch (dir) {
        case 'up':
            cursor = 'n-resize';
        break;
        case 'down':
            cursor = 's-resize';
        break;
        case 'left':
            cursor = 'w-resize';
        break;
        case 'right':
            cursor = 'e-resize';
        break;
    }
    $('body').css('cursor', cursor)
} 

// define
var postid,                         // current post id
    url,                            // ajax load url

    loadpost = 3,                   // define preload posts

    canload = true,                 // ajax can load mark

    totalpost = 0,                  // total post section
    position = 0,                   // section position

    currenturl,                     // current url
    currenttitle,                   // current title

    historystates = new Array,      // history states

    hometitle = document.title.indexOf(' ') != -1 ? document.title.split(' ')[0] : document.title,
    urlpath = location.pathname,    // if to load more

    postnumber = 0,                 // load post number

    mousemark = true,               // mousemove mark
    scrollmark = true;              // can scroll mark

// ready !
$(function($) {

    // some tag
    $('.post').before('<div id="top"></div>').after('<div id="loading"></div><div id="bottom"></div><div id="pot"></div>')

    // to top
    window.scrollTo(0, 0)
    $('.post').css('top', 0)
    setTimeout(resizePage, 0)

    // show content
    var imgs = $('.post').find('img');
    if (imgs.length) {
        var imgloaded = 0;
        imgs.each(function() {
            var img = $(this);
            $('<img/>').attr("src", img.attr('src')).load(function() {
                img.animate({'opacity': 1}, 200, 'ease')
                imgloaded ++;
                if (imgloaded >= imgs.length) {
                    $('.post').css('visibility', 'visible')
                }
            })
        })
    } else {
        $('.post').css('visibility', 'visible')
    }

    // replace current history state
    currenturl = $('.post').find('.entry').attr('href');
    currenttitle = hometitle +' - '+ $('.post').find('.entry').attr('title');
    history.replaceState({ url: currenturl, title: currenttitle, position: 0 }, currenttitle, currenturl)
    document.title = currenttitle;

    // save current history state
    historystates.push([currenturl, currenttitle])

    // get current post id and to load url 
    postid = $('.post').data('id');
    url = $('#post'+ postid).find('.link').attr('href');
    // ajax load post
    if (url && urlpath == '/') toLoad();

    // on screen size change
    $(window).on('resize orientationchange', function(){
        setTimeout(resizePage, 0)
    })

    // tap or click
    onTap('#post'+ postid)

    // resize page
    function resizePage() {
        $('.post').height(window.innerHeight)
        sectionMove(position * window.innerHeight)
    }

    // page move down
    function sectionDown() {
        if (canload && url && urlpath == '/' && ($('section').length > loadpost)) toLoad();
        if (position < totalpost) {
            position ++;
            sectionMove(position * window.innerHeight, function() {
                pState(historystates[position][0], historystates[position][1], position)
            })
        } else {
            sectionBottom(position * window.innerHeight)
        }
    }

    // page move up
    function sectionUp() {
        if (position >= 1) { 
            position --;
            sectionMove(position * window.innerHeight, function() {
                pState(historystates[position][0], historystates[position][1], position)
            })
        } else {
            sectionTop()
        }
    }

    // mouse click or tap event
    function onTap(id) {
        tapPlot(id, '#pot', function(e) {
            e = e - Math.floor(e);
            if (e > 0.7) sectionDown();
            if (e < 0.3) sectionUp();
        })
    }

    // ajax load post
    function toLoad() {
        if (!canload) return;
        canload = false; 

        if (postnumber > (loadpost - 1)) { 
            postnumber --;
            canload = true;
            return;
        }

        $('#loading').show()
        ajaxLoad(url, function(data) {
            postnumber ++;

            var data = $(data).filter('section');
            $('#post'+ postid).after(data)

            totalpost ++;
            
            canload = true;

            postid = data.data('id');
            url = $('#post'+ postid).find('.link').attr('href') || '';

            onTap('#post'+ postid)

            $('#post'+ postid).height(window.innerHeight).css('visibility', 'visible')

            var posturl = $('#post'+ postid).find('.entry').attr('href'),
                posttitle = hometitle +' - '+ $('#post'+ postid).find('.entry').attr('title');

            historystates.push([posturl, posttitle])    // save post state

            var imgs = $('#post'+ postid).find('img');
            if (imgs.length) {
                var imgloaded = 0;
                imgs.each(function() {
                    var img = $(this);
                    $('<img/>').attr("src", img.attr('src')).load(function() {
                        img.animate({'opacity': 1}, 200, 'ease')
                        imgloaded ++;
                        if (imgloaded >= imgs.length) {
                            setTimeout(function() {$('#loading').hide()}, 1000)
                        }
                    })
                })
            } else {
                setTimeout(function() {$('#loading').hide()}, 1000)
            }

            if (url) toLoad();
        }, function() {
            canload = true;
            toLoad()
        })
    }

    // keyboard event
    $(document).on('keydown', function(e) {
        switch (e.keyCode) {

            case 40:    // down
                sectionDown()
            break;

            case 38:    // up
                sectionUp()
            break;

            case 39:    // right
            break;

            case 37:    // left
            break;

            case 9:     // tab
                return false;
            break;

        }
    })

    // popstate event
    window.addEventListener('popstate', function(e) {
        var states = e.state;

        if (!states) return;    // chrome

        if (urlpath != '/') location.href = '/';    // not home page reload

        document.title = states.title;

        sectionMove(states.position * window.innerHeight)
    })

    // mousescroll event
    $('body').on('mousewheel DOMMouseScroll', function(e) {
        e.preventDefault()
        var data = e.originalEvent.wheelDelta || e.originalEvent.detail * -1;

        var time = 500;
        if (navigator.platform == 'MacIntel' || navigator.platform == 'MacPPC') time = 1500;

        if (scrollmark) {
            scrollmark = false;

            if (data < 0) {     // down
                sectionDown()
            }
            if (data > 0) {     // up
                sectionUp()
            }

            setTimeout(function() {scrollmark = true}, time)
        }
    })

    // mouse move event
    $(document).on('mousemove', function(e) {
        if (urlpath != '/') return;
        if (mousemark) {
            mousemark = false;
            setTimeout(function() {mousemark = true;}, 100)

            var e = e.offsetY / window.innerHeight;
            if (e > 0.7) {
                if (position == totalpost) {
                    cursorChange('default')
                } else {
                    cursorChange('down')
                }
            } else if (e < 0.3) {
                if (position == 0) {
                    cursorChange('default')
                } else {
                    cursorChange('up')
                }
            } else {
                cursorChange('default')
            }
        }
    })

    // swipe event
    $('html').hammer({
        prevent_default: true
    }).on('swipe', function(e) {
        switch (e.direction) {

            case 'up':
                sectionDown()
            break;

            case 'down':
                sectionUp()
            break;

            case 'left':
            break;

            case 'right':
            break;

        }
    })

})
