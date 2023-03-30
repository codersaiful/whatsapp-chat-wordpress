<?php
/**
 * @wordpress-plugin
 * Plugin Name:       Whatsapp Chat WordPress Chat by CodeAstrology
 * Plugin URI:        https://codeastrology.com/whatsapp-chat-wordpress
 * Description:       Integrate your WhatsApp experience directly into your website. This is one of the best way to connect and interact with your customer.
 * Version:           1.0.0
 * Author:            CodeAstrology
 * Author URI:        https://codeastrology.com
 * Text Domain:       codeastrology-whatsapp
 * Domain Path:       /languages
 */
namespace CAT_WhatsApp;

defined( 'ABSPATH' ) || exit;

if ( function_exists( 'CAT_WhatsApp\\init' ) ) {
	require_once plugin_dir_path( __FILE__ ) . 'inc/Fallback.php';
	add_action(
		'admin_init',
		function() {
			deactivate_plugins( plugin_basename( __FILE__ ) );
		}
	);
	return;
}

if ( ! defined( 'CAT_WHATSAPP_VERSION' ) ) {
	define( 'CAT_WHATSAPP_VERSION', '1.0.0' );
}

if ( ! defined( 'CAT_WHATSAPP_PLUGIN_URL' ) ) {
	define( 'CAT_WHATSAPP_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
}

if ( ! defined( 'CAT_WHATSAPP_PLUGIN_DIR' ) ) {
	define( 'CAT_WHATSAPP_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
}

if ( ! defined( 'CAT_WHATSAPP_BASE_NAME' ) ) {
	define( 'CAT_WHATSAPP_BASE_NAME', plugin_basename( __FILE__ ) );
}

// if (file_exists(dirname(__FILE__) . '/inc/Cross.php')) {
//     require_once dirname(__FILE__) . '/inc/Cross.php';
// }

spl_autoload_register(
	function ( $class ) {
		$prefix   = __NAMESPACE__; // project-specific namespace prefix
		$base_dir = __DIR__ . '/inc'; // base directory for the namespace prefix

		$len = strlen( $prefix );
		if ( strncmp( $prefix, $class, $len ) !== 0 ) { // does the class use the namespace prefix?
			return; // no, move to the next registered autoloader
		}

		$relative_class_name = substr( $class, $len );

		// replace the namespace prefix with the base directory, replace namespace
		// separators with directory separators in the relative class name, append
		// with .php
		$file = $base_dir . str_replace( '\\', '/', $relative_class_name ) . '.php';

		if ( file_exists( $file ) ) {
			require $file;
		}
	}
);

if ( file_exists( dirname( __FILE__ ) . '/inc/Review.php' ) ) {
	require_once dirname( __FILE__ ) . '/inc/Review.php';
}

if ( ! function_exists( 'CAT_WhatsApp\\init' ) ) {
	function init() {
		Plugin::activate();
		PostType::run();
		I18n::loadPluginTextdomain();
		Shortcode::run();
		Popup::run();
		Settings::run();
		Upgrade::run();
		Vendor\WPML::run();
		Vendor\Woocommerce::run();
		if ( function_exists( 'register_block_type' ) ) {
			require_once dirname( __FILE__ ) . '/blocks/src/init.php';
		}
	}
}

add_action( 'plugins_loaded', 'CAT_WhatsApp\\init' );

register_activation_hook( __FILE__, array( 'CAT_WhatsApp\\Plugin', 'activate' ) );
register_deactivation_hook( __FILE__, array( 'CAT_WhatsApp\\Plugin', 'deactivate' ) );
