<?php 
$img = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), 'full');

$prev = get_adjacent_post(false,'',true);
if (is_object($prev)) {
    $previous = get_permalink($prev);
} else {
    $previous = '';
}
?>

    <section data-audio="<?php echo get_post_meta( $post->ID, 'audiourl', true ); ?>" data-title="<?php the_title(); ?>" data-link="<?php the_permalink() ?>" data-prev="<?php echo $previous; ?>" class="post audio" data-id="<?php the_ID(); ?>" id="post<?php the_ID(); ?>">

        <div id="player<?php the_ID() ?>" class="player playing">
            <img id="img<?php the_ID(); ?>" width="<?php echo $img[1] ?>" height="<?php echo $img[2] ?>" src="<?php echo $img[0] ?>" />
            <div class="canvas"><canvas id="blur<?php the_ID(); ?>" class="blur"></canvas></div>
            <h3><?php echo get_post_meta( $post->ID, 'name', true ); ?></h3>
            <p><?php echo get_post_meta( $post->ID, 'author', true ); ?></p>
        </div>

        <audio id="audio<?php the_ID(); ?>"></audio>
    </section>
