<?php
/*
Plugin Name: WP Bullet Syntax Highlighting
Plugin URI: https://dandulaney.com
Description: Custom PrismJS integration for WP Bullet
Version: 1.3.0
Author: Dan Dulaney
Author URI: https://dandulaney.com
License: GPLv2
License URI:
*/

/**
 * Goodbye if someone access to the file directly.
 */
if ( ! defined( 'ABSPATH' ) ) {
	die( 'Access denied.' );
}

//enqueues all js files needed
function bullet_prism_enqueue_script() {
	wp_enqueue_style(
        'bullet-prism-style',
		plugins_url( 'css/prism.css', __FILE__ ),
        false
    );

	wp_enqueue_script(
        'wp-bullet-clipboard.min.js',
        plugins_url( 'js/clipboard.min.js', __FILE__ ),
        null,
        '2.0.6',
        false
    );

	wp_enqueue_script(
        'bullet-prism-js',
		plugins_url( 'js/prism.min.js', __FILE__ ),
        null,
        '1.3.0',
        false
    );
}
add_action( 'wp_enqueue_scripts', 'bullet_prism_enqueue_script' );

//Removes duplicate code button from text editor
function bullet_prism_remove_extra_text_button( $qtInit ) {

	$qtInit['buttons'] = 'strong,em,link,block,del,ins,img,ul,ol,li,more,spell,close';
	return $qtInit;
}
add_filter('quicktags_settings', 'bullet_prism_remove_extra_text_button');

//Adds buttons to the text editor tab
//These buttons wrap selected text in prism pre and code tags
function bullet_prism_js_text_button_script() {

    if(wp_script_is("quicktags")) {
        ?>
            <script type="text/javascript">

                //this function is used to retrieve the selected text from the text editor
                function getSel() {

                    var txtarea = document.getElementById("content");
                    var start = txtarea.selectionStart;
                    var finish = txtarea.selectionEnd;
                    return txtarea.value.substring(start, finish);
                }

                QTags.addButton(
                    "prism_defaults",
                    "pre",
                    callback
                );
                QTags.addButton(
                    "prism_defaults2",
                    "code",
                    callbackCode
                );

                function callback() {

                    var selected_text = getSel();

	            //wraps the content with the tags
                    QTags.insertContent("<pre><code>"+  selected_text + "</code></pre>");
                }

                function callbackCode() {

                    var selected_text = getSel();

	            //wraps the content with the tags
                    QTags.insertContent("<code>"+  selected_text + "</code>");
                }
            </script>
        <?php
    }
}

add_action("admin_print_footer_scripts", "bullet_prism_js_text_button_script");

function enqueue_plugin_scripts($plugin_array) {

    //enqueue TinyMCE plugin script with its ID.
    $plugin_array["bullet_prism_button_plugin"] =  plugin_dir_url(__FILE__) . "js/visual-editor-buttons.js";
    return $plugin_array;
}

add_filter("mce_external_plugins", "enqueue_plugin_scripts");

function register_buttons_editor($buttons) {

    //register buttons with their id.
    array_push($buttons, "prism_pre");
    array_push($buttons, "prism_code");
    array_push($buttons, "prism_pre_select");
    array_push($buttons, "prism_code_select");
    return $buttons;
}

add_filter("mce_buttons", "register_buttons_editor");
