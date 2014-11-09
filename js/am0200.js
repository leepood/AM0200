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
var postid,                 // current post id
    url;                    // ajax load url

var totalpost = 0,          // total post section
    position = 0;           // section position

var currenturl = window.document.location;

$(function($) {

    $(document).on('keydown', function(e) {
        switch (e.keyCode) {

            case 40:    // down
                if (url) toLoad();
                if (position < totalpost) {
                    position ++;
                    sectionMove(position * window.innerHeight)

                    log(url +'***'+ postid)
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

    toLoad()
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

            if (url) toLoad();
        })
    }

})
