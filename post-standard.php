<?php $img = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), 'full'); ?>
    <section>
        <a href="<?php the_permalink() ?>" title="<?php the_title(); ?>">
            <img width="<?php echo $img[1] ?>" height="<?php echo $img[2] ?>" src="<?php echo $img[0] ?>" />
        </a>

        <?php echo get_post_meta( $post->ID, 'origin_url', true ); ?>

        <?php the_excerpt(); ?>

        <p class="hide prev"><?php previous_post_link('%link'); ?></p>
        <p class="hide next"><?php next_post_link('%link'); ?></p>
    </section>
