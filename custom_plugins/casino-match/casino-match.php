<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              domain.com
 * @since             1.0.0
 * @package           Casino_Match
 *
 * @wordpress-plugin
 * Plugin Name:       Casino match
 * Plugin URI:        https://github.com/highlightmedia
 * Description:       Casino match is a form of casino search or filter feature. It returns partner or partners list as per the options chosen by the user.
 * Version:           1.0.0
 * Author:            Tech HLM
 * Author URI:        domain.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       casino-match
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'CASINO_MATCH_VERSION', '1.0.0' );

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-casino-match-activator.php
 */
function activate_casino_match() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-casino-match-activator.php';
	Casino_Match_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-casino-match-deactivator.php
 */
function deactivate_casino_match() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-casino-match-deactivator.php';
	Casino_Match_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_casino_match' );
register_deactivation_hook( __FILE__, 'deactivate_casino_match' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-casino-match.php';
require plugin_dir_path( __FILE__ ) . 'includes/class-post-types.php';
require plugin_dir_path( __FILE__ ) . 'includes/fields.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_casino_match() {

	$plugin = new Casino_Match();
	$plugin->run();

}
run_casino_match();
