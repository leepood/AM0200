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

function sliderMove(tag, position, f) {
    var f = f || function() {};
    $(tag).animate({'left': - position * window.innerWidth}, 1000, 'easeInOutCirc', function() {
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

function arrowFlash(id) {
    $('#arrow div').removeClass('active')
    $(id).addClass('active')
    setTimeout(function() {
        $(id).removeClass('active')
    }, 200)
}

function canvasBlur(ele, img) {
    this.element = ele;
    this.image = img;

    /*
    this.element.width = this.image.width;
    this.element.height = this.image.height;
    */

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

function playAudio(id, audio, callback) {
    var callback = callback || function() {};

    var playid = $('#audio'+ id);

    $('#blur'+ id).parent().width(0)

    setTimeout(function() {
        $('#blur'+ id).parent().removeClass('transition')

        playid.attr('src', audio).on('canplay', function() {
            $('#player'+ id).removeClass('loading').addClass('playing')
        }).on('timeupdate', function() {
            $('#blur'+ id).parent().width(playid[0].currentTime / playid[0].duration * 300)
        }).on('ended', function() {
            $('#blur'+ id).parent().addClass('transition').width(0)
            $('#player'+ id).removeClass('playing')
        }).on('play', function() {
            $('#player'+ id).addClass('playing')
        }).on('pause', function() {
            $('#player'+ id).removeClass('playing')
        }).on('waiting', function() {
            $('#player'+ id).removeClass('playing').addClass('loading')
        })
    }, 1000)

    $('#player'+ id).hammer({prevent_default: true}).on('tap', function() {
        if (playid[0].paused || playid[0].ended) {
            playid[0].play()
            $('#player'+ id).addClass('playing')
        } else {
            playid[0].pause()
            $('#player'+ id).removeClass('playing')
        }
    })

    callback()
}

// define
var currentpostid,                  // current post id
    postid,                         // to load post id
    url,                            // ajax to load url

    playerid = 0,                   // now playing audio id

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

    sliderPos = 0,                  // slider position
    totalslider = 0,                // total sliders

    mousemark = true,               // mousemove mark
    scrollmark = true;              // can scroll mark

// ready !
$(function($) {

    // some tag
    $('.post').before('<div id="top"></div>').after('<div id="loading"></div><div id="bottom"></div><div id="pot"></div><div id="arrow"><div class="top"></div><div class="bottom"></div><div class="left"></div><div class="right"></div></div>')

    // to top
    window.scrollTo(0, 0)
    $('.post').css('top', 0)
    setTimeout(resizePage, 0)

    // replace current history state
    currenturl = $('.post').data('link') || window.location.href;
    currenttitle = hometitle +' - '+ $('.post').data('title');
    history.replaceState({ url: currenturl, title: currenttitle, position: 0 }, currenttitle, currenturl)
    document.title = currenttitle;

    // get current post id and to load url 
    postid = $('.post').data('id');
    currentpostid = postid;
    url = $('#post'+ postid).data('prev');

    // save current history state
    historystates.push([currenturl, currenttitle, currentpostid])

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
                    setTimeout(function() {
                        $('.post').animate({'opacity': 1}, 200, 'ease')

                        // blur img
                        if ($('.post').hasClass('audio')) {
                            var bg = new canvasBlur($('#blur'+ postid)[0], $('#img'+ postid)[0]);
			                bg.blur(5)

                            playAudio(postid, $('#post'+ postid).data('audio'), function() {
                                $('#audio'+ postid)[0].play()

                                playerid = postid;
                            })
                        }

                        // ajax load post
                        if (url && urlpath == '/') toLoad();
                    }, 1000)
                }
            }).error(function() {
                imgloaded ++;
            })
        })
    } else {
        setTimeout(function() {
            $('.post').animate({'opacity': 1}, 200, 'ease')
            // ajax load post
            if (url && urlpath == '/') toLoad();
        }, 1000)
    }

    // get current sliders number
    if ($('.standard').length) {
        sliderInfo('#post'+ historystates[position][2])
    }

    // on screen size change
    $(window).on('resize orientationchange', function(){
        setTimeout(resizePage, 0)
    })

    // tap or click
    onTap('.post')

    // get slider info
    function sliderInfo(tag) {
        sliderPos = 0;
        totalslider = $(tag).find('li').length;
        $(tag).find('ul').css('width', totalslider * window.innerWidth)
        $(tag).find('li').css('width', window.innerWidth)
        sliderMove(tag +' ul', 0)
    }

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

                playControl()

                var tag = '#post'+ historystates[position][2];
                if ($(tag).hasClass('standard')) sliderInfo(tag);
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

                playControl()

                var tag = '#post'+ historystates[position][2];
                if ($(tag).hasClass('standard')) sliderInfo(tag);
            })
        } else {
            sectionTop()
        }
    }

    // slider move left
    function sliderLeft(id) {
        if (sliderPos >= 1) {
            sliderPos --;
            sliderMove(id, sliderPos)
        } else {
            leftEnd(id)
        }
    }

    // slider move right
    function sliderRight(id) {
        if (sliderPos < totalslider - 1) {
            sliderPos ++;
            sliderMove(id, sliderPos, function() {
                //load image
            })
        } else {
            rightEnd(id, sliderPos * window.innerWidth)
        }
    }

    // audio play control
    function playControl() {
        if (playerid) $('#audio'+ playerid)[0].pause();

        if ($('#post'+ historystates[position][2]).hasClass('audio')) {
            $('#audio'+ historystates[position][2])[0].play()
            playerid = historystates[position][2];
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
            url = $('#post'+ postid).data('prev');

            onTap('#post'+ postid)

            $('#post'+ postid).height(window.innerHeight).css('opacity', 1)

            var posturl = $('#post'+ postid).data('link'),
                posttitle = hometitle +' - '+ $('#post'+ postid).data('title');

            historystates.push([posturl, posttitle, postid])    // save post state

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

                            // blur img
                            if ($('#post'+ postid).hasClass('audio')) {
                                var bg = new canvasBlur($('#blur'+ postid)[0], $('#img'+ postid)[0]);
			                    bg.blur(5)

                                playAudio(postid, $('#post'+ postid).data('audio'))
                            }

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

        var id = '#post'+ historystates[position][2];
        switch (e.keyCode) {

            case 40:    // down
                sectionDown()
                arrowFlash('#arrow .bottom')
            break;

            case 38:    // up
                sectionUp()
                arrowFlash('#arrow .top')
            break;

            case 39:    // right
                if ($(id).hasClass('standard')) {
                    sliderRight(id +' ul')
                }
            break;

            case 37:    // left
                if ($(id).hasClass('standard')) {
                    sliderLeft(id +' ul')
                }
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

        position = states.position;
        
        // if audio
        playControl()

        // if standard
        var tag = '#post'+ historystates[position][2];
        if ($(tag).hasClass('standard')) sliderInfo(tag);
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
