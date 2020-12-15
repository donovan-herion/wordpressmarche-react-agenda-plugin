<?php

// Plugin Name: React Agenda Plugin

defined('ABSPATH') || die();


// Registers a shortcode that simply displays a placeholder for our React App.

function react_agenda_plugin()
{
    wp_enqueue_script('react-agenda-plugin', plugins_url('build/index.js', __FILE__), array('wp-element'), time(), true);
    return 'I am the app div';
}

add_shortcode('react-agenda-plugin', 'react_agenda_plugin');

remove_filter('the_excerpt', 'wpautop');
