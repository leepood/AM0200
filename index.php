<?php get_header(); ?>
<div id="top"></div>
<?php if (have_posts()) : $count = 0;  while (have_posts()) : the_post(); $count++; if( $count <= 1 ): ?>
<?php $format = get_post_format(); if( false === $format ) { $format = 'standard'; } ?>
<?php get_template_part( 'post', $format ); ?>
<?php endif; endwhile; endif; ?>
<div id="bottom"></div>
<div id="pot"></div>

<?php get_footer(); ?>
