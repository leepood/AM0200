<?php

// ORIGIN URL
add_action( 'add_meta_boxes', 'url_box' );
function url_box() {
    add_meta_box( 'url_box_id', 'Post Info', 'url_box_input', 'post', 'normal', 'high' );
}
function url_box_input($post) {
    $values = get_post_custom( $post->ID );
    $url = isset( $values['origin_url'] ) ? esc_attr( $values['origin_url'][0] ) : '';
    $background = isset( $values['background'] ) ? esc_attr( $values['background'][0] ) : '';
    $color = isset( $values['color'] ) ? esc_attr( $values['color'][0] ) : '';
    print '<p><label style="display: inline-block; width: 100px;" for="origin_url">URL : </label><input size="50" type="url" value="'.get_post_meta($post->ID, 'origin_url', true).'" name="origin_url" /></p>'.
          '<p><label style="display: inline-block; width: 100px;" for="background">Background : </label><input size="50" type="text" value="'.get_post_meta($post->ID, 'background', true).'" name="background" /></p>'.
          '<p><label style="display: inline-block; width: 100px;" for="color">Color : </label><input size="50" type="text" value="'.get_post_meta($post->ID, 'color', true).'" name="color" /></p>';
}
add_action( 'save_post', 'url_box_save' );
function url_box_save($post_id) {
    update_post_meta($post_id, 'origin_url', $_POST['origin_url']);
    update_post_meta($post_id, 'background', $_POST['background']);
    update_post_meta($post_id, 'color', $_POST['color']);
}

// JAZZY
add_action( 'add_meta_boxes', 'jazzy' );
function jazzy() {
    add_meta_box( 'jazzy_id', 'INFO', 'jazzy_input', 'post', 'normal', 'high' );
}
function jazzy_input($post) {
    $values = get_post_custom( $post->ID );
    $author = isset( $values['author'] ) ? esc_attr( $values['author'][0] ) : '';
    $name = isset( $values['name'] ) ? esc_attr( $values['name'][0] ) : '';
    $audiourl = isset( $values['audiourl'] ) ? esc_attr( $values['audiourl'][0] ) : '';
    print '<p><label style="display: inline-block; width: 60px;" for="author">Author : </label><input size="50" type="text" value="'.get_post_meta($post->ID, 'author', true).'" name="author" /></p>'.
          '<p><label style="display: inline-block; width: 60px;" for="name"> Name : </label><input size="50" type="text" value="'.get_post_meta($post->ID, 'name', true).'" name="name" /></p>'.
          '<p><label style="display: inline-block; width: 60px;" for="audiourl">Audio : </label><input size="50" type="text" value="'.get_post_meta($post->ID, 'audiourl', true).'" name="audiourl" /></p>';
}
add_action( 'save_post', 'jazzy_save' );
function jazzy_save($post_id) {
    update_post_meta($post_id, 'author', $_POST['author']);
    update_post_meta($post_id, 'name', $_POST['name']);
    update_post_meta($post_id, 'audiourl', $_POST['audiourl']);
}

// IGNORE STICKY POSTS
function dangopress_alter_main_loop($query)
{
    /* Only for main loop in home page */
    if (!$query->is_home() || !$query->is_main_query())
        return;

    // ignore sticky posts, don't show them in the start
    $query->set('ignore_sticky_posts', 1);
}
add_action('pre_get_posts', 'dangopress_alter_main_loop'); 

// ADMIN PANL META BOX TOGGLE
function customadmin() {
    if ( is_admin() ) {
        $script = <<< EOF
<script type='text/javascript'>
    jQuery(document).ready(function($) {
        jQuery('#jazzy_id').hide()
        jQuery('#postexcerpt').show()
        jQuery('#post-formats-select input').on('change', function() {
            toshow()
        })
        toshow()
        function toshow() {
            if (jQuery('#post-format-0').is(':checked')) {
                jQuery('#jazzy_id').hide()
                jQuery('#url_box_id').show()
                jQuery('#postexcerpt').show()
                jQuery('#postimagediv').hide()
                jQuery('#postdivrich').show()
                jQuery('#wp-content-editor-container').hide()
                jQuery('#wp-content-editor-tools .wp-editor-tabs').hide()
                jQuery('#post-status-info').hide()
            }
            if (jQuery('#post-format-audio').is(':checked')) {
                jQuery('#jazzy_id').show()
                jQuery('#url_box_id').hide()
                jQuery('#postexcerpt').hide()
                jQuery('#postdivrich').hide()
                jQuery('#postimagediv').show()
            }
        }
    });
</script>
EOF;
        echo $script;
    }
}
add_action('admin_footer', 'customadmin');

// REMOVE FONT
function remove_open_sans() {   
    wp_deregister_style( 'open-sans' );   
    wp_register_style( 'open-sans', false );   
    wp_enqueue_style('open-sans','');   
}   
add_action( 'init', 'remove_open_sans' );

// MENU SUPPORT
function register_menu() {
	register_nav_menu('primary-menu', __('Primary Menu'));
}
add_action('init', 'register_menu');

// FEATURED IMAGE SUPPORT
add_theme_support( 'post-thumbnails', array( 'post' ) );  

// POSTVIEW 
function getPostViews($postID){
    $count_key = 'post_views_count';
    $count = get_post_meta($postID, $count_key, true);
    if($count==''){
        delete_post_meta($postID, $count_key);
        add_post_meta($postID, $count_key, '0');
        return "0";
    }
    return $count;
}
 
function setPostViews($postID) {
    $count_key = 'post_views_count';
    $count = get_post_meta($postID, $count_key, true);
    if($count==''){
        $count = 0;
        delete_post_meta($postID, $count_key);
        add_post_meta($postID, $count_key, '0');
    }else{
        $count++;
        update_post_meta($postID, $count_key, $count);
    }
}

// POST FORMATS
add_theme_support( 'post-formats', array( 'audio' ));

// LIKETHIS
function tz_likeThis($post_id,$action = 'get') {

	if(!is_numeric($post_id)) {
		error_log("Error: Value submitted for post_id was not numeric");
		return;
	} //if

	switch($action) {
	
	case 'get':
		$data = get_post_meta($post_id, '_likes');
		
		if(!is_numeric($data[0])) {
			$data[0] = 0;
			add_post_meta($post_id, '_likes', '0', true);
		} //if
		
		return $data[0];
	break;
	
	
	case 'update':
		if(isset($_COOKIE["like_" + $post_id])) {
			return;
		} //if
		
		$currentValue = get_post_meta($post_id, '_likes');
		
		if(!is_numeric($currentValue[0])) {
			$currentValue[0] = 0;
			add_post_meta($post_id, '_likes', '1', true);
		} //if
		
		$currentValue[0]++;
		update_post_meta($post_id, '_likes', $currentValue[0]);
		
		setcookie("like_" + $post_id, $post_id,time()*20, '/');
	break;

	} //switch

} //tz_likeThis

function tz_printLikes($post_id) {
	$likes = tz_likeThis($post_id);
	
	$who = ' people like ';
	
	if($likes == 1) {
		$who = ' person likes ';
	} //if
	
	if(isset($_COOKIE["like_" + $post_id])) {

	print '<a href="#" class="likeThis active" id="like-'.$post_id.'"><span class="icon"></span><span class="count">'.$likes.' Likes</span></a>';
		return;
	} //if

	print '<a href="#" class="likeThis" id="like-'.$post_id.'"><span class="icon"></span><span class="count">'.$likes.' Likes</span></a>';
} //tz_printLikes


function setUpPostLikes($post_id) {
	if(!is_numeric($post_id)) {
		error_log("Error: Value submitted for post_id was not numeric");
		return;
	} //if
	
	
	add_post_meta($post_id, '_likes', '0', true);

} //setUpPost


function checkHeaders() {
	if(isset($_POST["likepost"])) {
		tz_likeThis($_POST["likepost"],'update');
	} //if

} //checkHeaders

add_action ('publish_post', 'setUpPostLikes');
add_action ('init', 'checkHeaders');

?>
