<?php

$prev = get_adjacent_post(false,'',true);
if (is_object($prev)) {
    $previous = get_permalink($prev);
} else {
    $previous = '';
}

$args = array(
    'post_type' => 'attachment',
    'numberposts' => -1,
    'orderby' => 'menu_order',
    'order' => 'ASC',
    'post_mime_type' => 'image', 
    'post_status' => null, 
    'post_parent' => $post->ID
);

$url = get_post_meta( $post->ID, 'origin_url', true );
$background = get_post_meta( $post->ID, 'background', true );
$color = get_post_meta( $post->ID, 'color', true );

?>

    <section data-title="<?php the_title(); ?>" data-link="<?php the_permalink() ?>" data-prev="<?php echo $previous; ?>" class="post standard" data-id="<?php the_ID(); ?>" id="post<?php the_ID(); ?>">

        <header>
            <a style="color: <?php echo $color ?>" class="icon-logo" href="/" title="back to home"></a>
            <a style="color: <?php echo $color ?>" class="icon-share" href="javascript:void((function(s,d,e){try{}catch(e){}var f='http://v.t.sina.com.cn/share/share.php?',u=d.location.href,p=['url=',e(u),'&amp;title=',e(d.title),'&amp;appkey='].join('');function a(){if(!window.open([f,p].join(''),'mb',['toolbar=0,status=0,resizable=1,width=620,height=450,left=',(s.width-620)/2,',top=',(s.height-450)/2].join('')))u.href=[f,p].join('');};if(/Firefox/.test(navigator.userAgent)){setTimeout(a,0)}else{a()}})(screen,document,encodeURIComponent));" title="weibo"></a>
        </header>
    <?php $attachments = get_posts($args); if ($attachments) { ?>

        <ul style="background: <?php echo $background ?>; color: <?php echo $color ?>"><!--

        --><li>
                <div class="info">
                    <h2><?php the_title(); ?></h2>
                    <?php the_excerpt(); ?>
                    <a href="<?php echo $url ?>">- View Original -</a>
                </div>
           </li><!--

    <?php foreach ( $attachments as $attachment ) { $img = wp_get_attachment_image_src($attachment->ID,'full'); ?>
    --><li><div class="img"><img width="<?php echo $img[1] ?>" height="<?php echo $img[2] ?>" src="<?php echo $img[0] ?>" /></div></li><!--
    <?php } ?>--></ul>

    <?php } ?>
        
        <footer style="color: <?php echo $color ?>">&copy; AM02:00 &nbsp; swipe, tap, scroll or keyboard to navigator</footer>

    </section>
