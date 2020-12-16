<?php

// Plugin Name: React Agenda Plugin

defined('ABSPATH') || die();


// Registers a shortcode that simply displays a placeholder for our React App.

function react_agenda_plugin()
{
    wp_enqueue_script('react_agenda_plugin', plugins_url('build/index.js', __FILE__), array('wp-element'), time(), true);
    return '<div id="app" class="bg-white py-48px px-24px position-relative d-md-flex px-xl-48px mx-xl-n30px justify-content-md-center flex-column"></div>';
}

add_shortcode('react_agenda_plugin', 'react_agenda_plugin');

remove_filter('the_excerpt', 'wpautop');
