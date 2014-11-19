<?php 
$img = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), 'full');

$prev = get_adjacent_post(false,'',true);
if (is_object($prev)) {
    $previous = get_permalink($prev);
} else {
    $previous = '';
}
?>

    <section data-title="<?php the_title(); ?>" data-link="<?php the_permalink() ?>" data-prev="<?php echo $previous; ?>" class="post audio" data-id="<?php the_ID(); ?>" id="post<?php the_ID(); ?>">
        <img width="<?php echo $img[1] ?>" height="<?php echo $img[2] ?>" src="<?php echo $img[0] ?>" />

        <?php echo get_post_meta( $post->ID, 'name', true ); ?>
        <?php echo get_post_meta( $post->ID, 'author', true ); ?>
        <?php echo get_post_meta( $post->ID, 'album', true ); ?>

        <canvas class="blur"></canvas>

        <audio class="hide" preload="auto" id="audio<?php the_ID(); ?>" src="<?php echo get_post_meta( $post->ID, 'audiourl', true ); ?>"></audio>

    </section>
