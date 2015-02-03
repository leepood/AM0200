/**
 * Version: 0.0
 * Author: LoeiFy
 * URL: http://lorem.in
 */

// define
var currentpostid,                  // current post id
    postid,                         // to load post id
    url,                            // ajax to load url

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

    setTimeout(resizePage, 0)
    if (touchDevice()) $('body').addClass('touch');

    // some tag
    $('.post').before('<div id="top"></div>').after('<div id="loading"></div><div id="bottom"></div><div id="pot"></div>')


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

    iconCk('.post')
    // logo tap or share tap
    function iconCk(id) {
        $(id).find('.icon-logo').hammer({prevent_default: true}).off('tap').on('tap', function() {
            location.href = '/';
            return false
        })
        $(id).find('.icon-share').hammer({prevent_default: true}).off('tap').on('tap', function() {
            location.href = $(this).attr('href');
            return false
        })
        $(id).find('.info').find('a').hammer({prevent_default: true}).off('tap').on('tap', function() {
            if (touchDevice()) {
                location.href = $(this).attr('href');
                return false
            }
        })
    }

    // get slider info
    function sliderInfo(tag) {
        sliderPos = 0;
        totalslider = $(tag).find('li').length;
        $(tag).find('ul').css('width', totalslider * window.innerWidth)
        $(tag).find('li').css('width', window.innerWidth)
        sliderMove(tag +' ul', 0)

        $('.dots').remove()
        var s = '<div id="dot'+ historystates[position][2] +'" class="dots">';
        for (var i = 0; i < totalslider; i ++) {
            s += '<span style="background-color: '+ $(tag +' ul').css('color') +'" class="'+ (i == 0 ? 'active' : '') +'"></span>';
        }
        s += '</div>';
        $(tag).append(s)
    }

    // resize page
    function resizePage() {
        $('.post').height(window.innerHeight)
        sectionMove(position * window.innerHeight)
        $('#post'+ historystates[position][2]).find('ul').css('width', totalslider * window.innerWidth)
        $('#post'+ historystates[position][2]).find('li').css('width', window.innerWidth)
        sliderMove('#post'+ historystates[position][2] +' ul', sliderPos)
    }

    // page move down
    function sectionDown() {
        if (canload && url && urlpath == '/' && ($('section').length > loadpost)) toLoad();
        if (position < totalpost) {
            position ++;
            sectionMove(position * window.innerHeight, function() {
                pState(historystates[position][0], historystates[position][1], position)

                var tag = '#post'+ historystates[position][2];
                if ($(tag).hasClass('standard')) sliderInfo(tag);

                iconCk(tag)
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

                var tag = '#post'+ historystates[position][2];
                if ($(tag).hasClass('standard')) sliderInfo(tag);

                iconCk(tag)
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
            $('#dot'+ historystates[position][2] +' span').removeClass('active').eq(sliderPos).addClass('active')
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
            $('#dot'+ historystates[position][2] +' span').removeClass('active').eq(sliderPos).addClass('active')
        } else {
            rightEnd(id, sliderPos * window.innerWidth)
        }
    }

    // mouse click or tap event
    function onTap(id) {
        tapPlot(id, '#pot', function(x, y) {
            x = x - Math.floor(x);
            y = y - Math.floor(y);

            var id = '#post'+ historystates[position][2];

            if ($(id).hasClass('standard')) {
                if (x > 0.7) {
                    sliderRight(id +' ul')

                } else  if (x < 0.3) {
                    sliderLeft(id +' ul')
                } else {
                    if (y > 0.7) sectionDown();
                    if (y < 0.3) sectionUp();
                }

            } else {
                if (y > 0.7) sectionDown();
                if (y < 0.3) sectionUp();
            }
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
            break;

            case 38:    // up
                sectionUp()
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

    // swipe event
    $('html').hammer({
        prevent_default: true
    }).on('swipe', function(e) {

        var id = '#post'+ historystates[position][2];

        switch (e.direction) {

            case 'up':
                sectionDown()
            break;

            case 'down':
                sectionUp()
            break;

            case 'right':
                if ($(id).hasClass('standard')) {
                    sliderLeft(id +' ul')
                }
            break;

            case 'left':
                if ($(id).hasClass('standard')) {
                    sliderRight(id +' ul')
                }
            break;

        }
    })

    console.info("https://github.com/LoeiFy")

})
