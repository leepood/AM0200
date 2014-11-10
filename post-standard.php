    <section class="post standard" data-id="<?php the_ID(); ?>" id="post<?php the_ID(); ?>">

<?php $args = array('post_type' => 'attachment', 'numberposts' => -1, 'orderby' => 'menu_order', 'order' => 'ASC', 'post_mime_type' => 'image' ,'post_status' => null, 'post_parent' => $post->ID ); $attachments = get_posts($args); if ($attachments) { ?>
	<figure>
        <?php foreach ( $attachments as $attachment ) { ?><?php $img = wp_get_attachment_image_src($attachment->ID,'full');?><img width="<?php echo $img[1] ?>" height="<?php echo $img[2] ?>" src="<?php echo $img[0] ?>" /><?php } ?>

	</figure>
<?php } ?>

        <a class="entry" href="<?php the_permalink() ?>" title="<?php the_title(); ?>"></a>

        <?php echo get_post_meta( $post->ID, 'origin_url', true ); ?>

        <?php the_excerpt(); ?>

        <?php previous_post_link('%link'); ?>

    </section>
