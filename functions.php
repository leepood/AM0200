<?php

// ADMIN PANL META BOX HIDE
function customadmin() {
    if ( is_admin() ) {
        $script = <<< EOF
<script type='text/javascript'>
    jQuery(document).ready(function($) {
        jQuery('#postexcerpt').show()
        jQuery('#wp-content-editor-container').hide()
        jQuery('#wp-content-editor-tools .wp-editor-tabs').hide()
        jQuery('#post-status-info').hide()
    });
</script>
EOF;
        echo $script;
    }
}
add_action('admin_footer', 'customadmin');

// REMOVE IMAGE CROP
function remove_default_image_sizes( $sizes) {
    unset($sizes['thumbnail']);
    unset($sizes['medium']);
    unset($sizes['large']);
    return $sizes;
}
add_filter('intermediate_image_sizes_advanced','remove_default_image_sizes');

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

// REMOVE FONT
function remove_open_sans() {   
    wp_deregister_style( 'open-sans' );   
    wp_register_style( 'open-sans', false );   
    wp_enqueue_style('open-sans','');   
}   
add_action( 'init', 'remove_open_sans' );

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
