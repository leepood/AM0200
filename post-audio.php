<?php $img = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), 'full'); ?>
    <section class="post audio" data-id="<?php the_ID(); ?>" id="post<?php the_ID(); ?>">
        <img width="<?php echo $img[1] ?>" height="<?php echo $img[2] ?>" src="<?php echo $img[0] ?>" />

        <?php echo get_post_meta( $post->ID, 'name', true ); ?>
        <?php echo get_post_meta( $post->ID, 'author', true ); ?>
        <?php echo get_post_meta( $post->ID, 'album', true ); ?>
        <?php echo get_post_meta( $post->ID, 'audiourl', true ); ?>

        <?php previous_post_link('%link'); ?>
        <a class="entry" href="<?php the_permalink() ?>" title="<?php the_title(); ?>"></a>

    </section>
