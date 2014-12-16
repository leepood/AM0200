<?php 

$img = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), 'full');

$prev = get_adjacent_post(false,'',true);
if (is_object($prev)) {
    $previous = get_permalink($prev);
} else {
    $previous = '';
}

$name = get_post_meta( $post->ID, 'name', true );
$author = get_post_meta( $post->ID, 'author', true );

?>

    <section data-audio="<?php echo get_post_meta( $post->ID, 'audiourl', true ); ?>" data-title="<?php the_title(); ?>" data-link="<?php the_permalink() ?>" data-prev="<?php echo $previous; ?>" class="post audio" data-id="<?php the_ID(); ?>" id="post<?php the_ID(); ?>">

        <header>
            <a class="icon-logo" href="/" title="back to home"></a>
            <a class="icon-share" href="javascript:void((function(s,d,e){try{}catch(e){}var f='http://v.t.sina.com.cn/share/share.php?',u=d.location.href,p=['url=',e(u),'&amp;title=',e(d.title),'&amp;appkey='].join('');function a(){if(!window.open([f,p].join(''),'mb',['toolbar=0,status=0,resizable=1,width=620,height=450,left=',(s.width-620)/2,',top=',(s.height-450)/2].join('')))u.href=[f,p].join('');};if(/Firefox/.test(navigator.userAgent)){setTimeout(a,0)}else{a()}})(screen,document,encodeURIComponent));" title="weibo"></a>
        </header>

        <div id="player<?php the_ID() ?>" class="player loading">
            <img id="img<?php the_ID(); ?>" width="<?php echo $img[1] ?>" height="<?php echo $img[2] ?>" src="<?php echo $img[0] ?>" />
            <div class="canvas transition"><canvas id="blur<?php the_ID(); ?>" class="blur"></canvas></div>
            <h3><?php echo $name ?></h3>
            <p><?php echo $author ?></p>
        </div>

        <audio id="audio<?php the_ID(); ?>"></audio>
        <footer>&copy; AM02:00 &nbsp; swipe, tap, scroll or keyboard to navigator</footer>
    </section>
