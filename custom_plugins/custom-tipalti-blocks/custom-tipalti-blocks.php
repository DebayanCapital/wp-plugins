<?php
/**
 *  Bootstrap file to launch the plugin.
 *
 *  @wordpress-plugin
 *  Plugin Name: Custom Tipalti Blocks
 *  Plugin URI:  https://tipaltisites.wpengine.com/
 *  Description: Plugin to create custom Gutenberg block for tipalti.
 *  Version:     1.0
 *  Author:      Debayan Chatterjee
 *  Author URI:  https://www.capitalnumbers.com/
 *  License:     GPL2+
 *  License URI: http://www.gnu.org/licenses/gpl-2.0.html
 */


//  Exit if accessed directly.
defined('ABSPATH') || exit;

// Gets this plugin's absolute directory path.
function _get_plugin_directory() {
  return __DIR__;
}

// Gets this plugin's URL.
function _get_plugin_url() {
  static $plugin_url;

  if (empty($plugin_url)) {
    $plugin_url = plugins_url(null, __FILE__);
  }

  return $plugin_url;
}

// Enqueue JS and CSS
include __DIR__ . '/inc/enqueue-scripts.php';

// Load dynamic blocks
include __DIR__ . '/blocks.php';