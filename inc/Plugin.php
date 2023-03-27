<?php
namespace CAT_WhatsApp;

defined('ABSPATH') || exit;
class Plugin {
  protected static $instance = null;

  public static function getInstance() {
    if (null == self::$instance) {
      self::$instance = new self;
    }

    return self::$instance;
  }

  private function __construct() {
  }

  public static function activate() {
    $firstTimeActive = get_option('cat_wa_first_time_active');
    if ( $firstTimeActive === false ) { 
      $waReview = \NJTWhatsAppReview::get_instance('cat_wa', 'WhatsApp Plugin', 'codeastrology-whatsapp');
      $waReview->need_update_option(1); // 1 day
      update_option('cat_wa_first_time_active', 1);
    }

    $currentVersion = get_option('cat_wa_version');
    if ( version_compare(CAT_WHATSAPP_VERSION, $currentVersion, '>' ) ) { 
      // $filebirdCross = \FileBirdCross::get_instance('filebird', 'filebird+codeastrology', CAT_WHATSAPP_PLUGIN_URL, array('filebird/filebird.php', 'filebird-pro/filebird.php'));
      // $filebirdCross->need_update_option();

      if ($firstTimeActive !== false) {
        $waReview = \NJTWhatsAppReview::get_instance('cat_wa', 'WhatsApp Plugin', 'codeastrology-whatsapp');
        $waReview->need_update_option(7); // 1 day
      }

      update_option('cat_wa_version', CAT_WHATSAPP_VERSION);
    }
  }

  public static function deactivate() {
  }
}
