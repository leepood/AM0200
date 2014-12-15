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
<link rel="alternate" type="application/rss+xml" title="<?php bloginfo('name'); ?> rss feed" href="<?php bloginfo('rss2_url') ?>" />
<link rel="icon" type="image/png" href="<?php echo get_template_directory_uri(); ?>/images/favicon.png" />
<link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/css/font.css" />
<link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/css/icon.css" />
<link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/css/am0200.css" />
<script src="<?php echo get_template_directory_uri(); ?>/js/jquery.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/js/plugin.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/js/am0200.js"></script>
</head>
<body data-posts="<?php $count_posts = wp_count_posts(); echo $published_posts = $count_posts->publish;?>">
