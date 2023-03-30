<?php
namespace CAT_WhatsApp;

use CAT_WhatsApp\Fields;

defined('ABSPATH') || exit;
class Shortcode
{
    protected static $instance = null;
    protected $accountID;

    public static function run()
    {
        if (null == self::$instance) {
            self::$instance = new self;
            self::$instance->runHooks();
        }
        return self::$instance;
    }

    private function runHooks(){
        add_shortcode('catwa_button', [$this, 'button_shortcode']);
    }

    public function button_shortcode($id)
    {
        extract($id);
        $displayOption = Fields::getWidgetDisplay();
        $stylesOption = Fields::getWidgetStyles();
        $analyticsOption = Fields::getAnalyticsSetting();

        $script = array(
            'name' => get_the_title($id),
            'info' => get_post_meta($id, 'cat_wa_account_info', true),
            'styles' => Fields::getButtonStyles($id),
            'avatar' => get_the_post_thumbnail_url($id),
            'options' => [
                'display' => $displayOption,
                'styles' => $stylesOption,
                'analytics' => $analyticsOption
            ],
            'gdprStatus' => Helper::checkGDPR($stylesOption),
            'defaultAvatar' => CAT_WHATSAPP_PLUGIN_URL . 'assets/img/whatsapp_logo.svg'
        );

        $content = '<div class="cat_wa_button" data-id="' . esc_attr($id) . '" data-info="' . esc_attr(json_encode($script)) . '"></div>';

        return $content;
    }
}
