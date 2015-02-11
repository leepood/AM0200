<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
<meta name="google" content="notranslate" />
<meta name="author" content="LoeiFy">
<title><?php bloginfo('name'); ?><?php wp_title( '-', true, 'left' ); ?></title>
<meta name="keywords" content="design, picture, am0200, inspiration, illustrator, web design, music, jazzy" />
<meta name="description" content="<?php bloginfo('description') ?>" />
<link rel="icon" type="image/png" href="<?php echo get_template_directory_uri(); ?>/images/favicon.png" />
<link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/css/base.css" />
<link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/css/font.css" />
<link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/css/icon.css" />
<link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/css/am0200.css" />
<script src="<?php echo get_template_directory_uri(); ?>/js/jquery.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/js/plugin.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/js/function.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/js/am0200.js"></script>
<!--
<style>
body,div,h1,h2,p,ul,li{margin:0;padding:0;font-weight:normal}ul,li{list-style:none}a,a:hover{text-decoration:none}img,button,input{border:0}button:focus,input:focus,textarea:focus{outline:0}header,footer,section,figure{display:block;margin:0;padding:0}img{display:block;max-width:100%;height:auto}audio{display:none}html,body{background:#f7f7f7;height:100%;font-size:100%;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-font-smoothing:antialiased}body{overflow:hidden;position:relative;font-family:'open_sans'}body:before,body:after{content:'';width:30px;height:30px;display:block;border:3px solid #d2d2d2;border-radius:50%;-webkit-border-radius:50%;-moz-border-radius:50%;position:absolute;left:50%;margin-left:-18px;top:50%;margin-top:-18px}body:after{border:3px solid transparent;border-top-color:grey;-webkit-animation:rotate 1s infinite linear;-moz-animation:rotate linear 1s;-moz-animation-iteration-count:infinite}@-webkit-keyframes rotate{from{-webkit-transform:rotate(0deg)}to{-webkit-transform:rotate(360deg)}}@-moz-keyframes rotate{from{-moz-transform:rotate(0deg)}to{-moz-transform:rotate(360deg)}}section{height:100%;background:#f7f7f7;position:relative;overflow:hidden;opacity:0;z-index:1}
</style>
<script src="<?php echo get_template_directory_uri(); ?>/js/basket.js"></script>
<script>
	basket.require({ url: '<?php echo get_template_directory_uri(); ?>/dist/am0200.css', unique: 4,  execute: false })
	.then(function(responses) {
        _stylesheet.appendStyleSheet(responses[0], function() {});
		basket.require({ url: '<?php echo get_template_directory_uri(); ?>/js/jquery.js' })
		.then(function() {
			basket.require({ url: '<?php echo get_template_directory_uri(); ?>/js/plugin.js', unique: 0 })
			.then(function() {
        		basket.require({ url: '<?php echo get_template_directory_uri(); ?>/dist/am0200.js', unique: 6 })
			})
		})
	});
</script>
-->
</head>
<body data-posts="<?php $count_posts = wp_count_posts(); echo $published_posts = $count_posts->publish;?>">
