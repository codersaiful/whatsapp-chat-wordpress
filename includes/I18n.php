<?php
namespace CAT_WhatsApp;

defined('ABSPATH') || exit;
/**
 * I18n Logic
 */
class I18n {
  public static function loadPluginTextdomain() {
    if (function_exists('determine_locale')) {
      $locale = determine_locale();
    } else {
      $locale = is_admin() ? get_user_locale() : get_locale();
    }
    unload_textdomain('codeastrology-whatsapp');
    load_textdomain('codeastrology-whatsapp', CAT_WHATSAPP_PLUGIN_DIR . '/languages/' . $locale . '.mo');
    load_plugin_textdomain('codeastrology-whatsapp', false, CAT_WHATSAPP_PLUGIN_DIR . '/languages/');
  }

  public static function getTranslation(){
    $translation = array(
      'online' => __('Online', 'codeastrology-whatsapp'),
      'offline' => __('Offline', 'codeastrology-whatsapp')
    );

    return $translation;
  }
}
