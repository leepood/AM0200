/**
 * Version: 0.0
 * Author: LoeiFy
 * URL: http://lorem.in
 */

function ajaxLoad(url, f) {
	$.ajax({
		type: 'GET',
		url: url,
		timeout: 7000,
		success: function(data) {f(data)},
		error: function() {window.location.href = url}
	})
}

function log(s) {
    console.log(s)
}

function sectionMove(position, f) {
    var f = f || function() {};
    $('body, html').animate({'scrollTop': position}, 700, 'easeInOutQuint', function() {
        f()
    })
}

function sectionBottom(position, f) {
    var f = f || function() {};
    $('body, html').animate({'scrollTop': position}, 250, 'easeInOutQuad', function() {
        f()
    })
}

// define
var postid,                         // current post id
    url;                            // ajax load url

var totalpost = 0,                  // total post section
    position = 0;                   // section position

var hometitle;
var currentstate = [],              // current url title
    historystates = new Array;      // history states

$(function($) {

    $(document).on('keydown', function(e) {
        switch (e.keyCode) {

            case 40:    // down
                if (url) toLoad();
                if (position < totalpost) {
                    position ++;
                    sectionMove(position * window.innerHeight)

                    history.pushState({ url: historystates[position][0], title: historystates[position][1] }, historystates[position][1], historystates[position][0])
                    document.title = historystates[position][1];

                } else {
                    $('#bottom').height(70)
                    sectionBottom(position * window.innerHeight + 30, function() {
                        sectionBottom(position * window.innerHeight, function() {
                            $('#bottom').height(0)
                        })
                    })
                }
            break;

            case 38:    // up
                if (position >= 1) { 
                    position --;
                    sectionMove(position * window.innerHeight)

                    history.pushState({ url: historystates[position][0], title: historystates[position][1] }, historystates[position][1], historystates[position][0])
                    document.title = historystates[position][1];
                } else {
                    $('#top').height(0)     /* need to define 0px */
                    $('#top').animate({'height': 30}, 250, 'easeInOutQuad', function() {
                        $('#top').animate({'height': 0}, 250, 'easeInOutQuad')
                    })
                }
            break;

            case 39:    // right
            break;

            case 37:    // left
            break;

        }
    })

    postid = $('.post').data('id');
    url = $('#post'+ postid).find('.link').attr('href');

    hometitle = document.title.indexOf(' ') != -1 ? document.title.split(' ')[0] : document.title;
    currentstate.url = $('.post').find('.entry').attr('href');
    currentstate.title = hometitle +' - '+ $('.post').find('.entry').attr('title');
    history.replaceState({ url: currentstate.url, title: currentstate.title }, currentstate.title, currentstate.url)
    document.title = currentstate.title;

    historystates.push([currentstate.url, currentstate.title])

    if (url) toLoad();
    var num = 0;
    function toLoad() {
        
        if (num > 2) { 
            num --;
            return;
        }

        ajaxLoad(url, function(data) {
            num ++;
            totalpost ++;

            var data = $(data).filter('section');
            $('#post'+ postid).after(data)

            postid = data.data('id');
            url = $('#post'+ postid).find('.link').attr('href') || '';

            var posturl = $('#post'+ postid).find('.entry').attr('href'),
                posttitle = hometitle +' - '+ $('#post'+ postid).find('.entry').attr('title');
            historystates.push([posturl, posttitle])

            if (url) toLoad();
        })
    }

})
