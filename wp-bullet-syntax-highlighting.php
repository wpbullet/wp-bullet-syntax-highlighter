<?php
/*
Plugin Name: WP Bullet Syntax Highlighting
Plugin URI: https://dandulaney.com
Description: Custom PrismJS integration for WP Bullet
Version: 1.2
Author: Dan Dulaney
Author URI: https://dandulaney.com
License: GPLv2
License URI: 
*/

//enqueues all css files needed
function bullet_prism_enqueue_style() {
	wp_enqueue_style( 'bullet-prism-style', plugin_dir_url( __FILE__ ) . 'css/prism.css', false ); 
	
}
//enqueues all js files needed
function bullet_prism_enqueue_script() {
	wp_enqueue_script( 'bullet-prism-js', plugin_dir_url( __FILE__ ) . 'js/prism.js', false ); 
	wp_enqueue_style( 'dashicons' );
}
add_action( 'wp_enqueue_scripts', 'bullet_prism_enqueue_style' );
add_action( 'wp_enqueue_scripts', 'bullet_prism_enqueue_script' );


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
    return $buttons;
}

add_filter("mce_buttons", "register_buttons_editor");
