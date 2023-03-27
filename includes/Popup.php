<?php
namespace CAT_WhatsApp;

use CAT_WhatsApp\Fields;
use CAT_WhatsApp\PostType;

defined('ABSPATH') || exit;
class Popup
{
    protected static $instance = null;

    public static function getInstance()
    {
        if (null == self::$instance) {
            self::$instance = new self;
            self::$instance->doHooks();
        }
        return self::$instance;
    }

    public function __construct()
    {
    }

    private function doHooks(){
        add_action('wp_enqueue_scripts', [$this, 'enqueue_global_scripts_styles']);
        add_action('wp_footer', [$this, 'show_widget']);
    }

    public function enqueue_global_scripts_styles(){
        wp_register_style('cat-css-popup', CAT_WHATSAPP_PLUGIN_URL . 'assets/dist/css/style.css');
        wp_enqueue_style('cat-css-popup');
        wp_style_add_data('cat-css-popup', 'rtl', 'replace');

        //This base script for add_inline_script in shortcode
        wp_enqueue_script('cat-wa-libs', CAT_WHATSAPP_PLUGIN_URL . 'assets/dist/js/cat_whatsapp.js', [], CAT_WHATSAPP_VERSION, true);

        if ( function_exists('wp_timezone_string') ) {
            $timezone = wp_timezone_string();
        } else {
            $timezone = Helper::wp_timezone_string();
        }

        wp_register_script('cat-js-global', CAT_WHATSAPP_PLUGIN_URL . 'assets/js/whatsapp-button.js', [], CAT_WHATSAPP_VERSION, true);
        wp_localize_script('cat-js-global', 'cat_wa_global', [
            'ajax_url' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('ajax-nonce'),
            'defaultAvatarSVG' => Helper::print_icon(),
            'defaultAvatarUrl' => CAT_WHATSAPP_PLUGIN_URL . 'assets/img/whatsapp_logo.svg',
            'timezone' => $timezone,
            'i18n' => I18n::getTranslation(),
            'urlSettings' => Fields::getURLSettings()
        ]);
        wp_enqueue_script('cat-js-global');
    }

    public function show_widget()
    {
        $displayOption = Fields::getWidgetDisplay();
        $postId = get_the_ID();
        
        if ( $this->notShowInPage($postId, $displayOption) ) return;

        $activeAccounts = $this->get_accounts_active_and_meta();
        if ( count($activeAccounts) < 1 ) return;

        if (    wp_is_mobile() && $displayOption['showOnMobile'] === "OFF"
            || !wp_is_mobile() && $displayOption['showOnDesktop'] === "OFF"
            || ( $displayOption['showOnMobile'] === "OFF" && $displayOption['showOnDesktop'] === "OFF" )
        ) {
            return;
        }

        echo '<div id="wa"></div>';
        $this->enqueue_scripts_styles($activeAccounts, $displayOption);
    }

    public function enqueue_scripts_styles($activeAccounts, $displayOption)
    {
        $stylesOption = Fields::getWidgetStyles();
        $analyticsOption = Fields::getAnalyticsSetting();
        wp_register_script('cat-js-popup', CAT_WHATSAPP_PLUGIN_URL . 'assets/js/whatsapp-popup.js', []);
        wp_localize_script('cat-js-popup', 'cat_wa', [
            'gdprStatus' => Helper::checkGDPR($stylesOption),
            'accounts' => $activeAccounts,
            'options' => [
                'display' => $displayOption,
                'styles' => $stylesOption,
                'analytics' => $analyticsOption
            ]
        ]);
        wp_enqueue_script('cat-js-popup');
    }

    public function notShowInPage($postId, $option)
    {
        $isPageOrShop = apply_filters('cat_whatsapp_is_page_or_shop_filter', is_page());
        $postId       = apply_filters('cat_whatsapp_get_post_id_filter', $postId);
        $isPost       = is_singular( 'post' );
        $showInPostTypes = apply_filters( 'cat_whatsapp_display_in_post_types', array() );

		if ( ! empty( $showInPostTypes ) ) {
			$post_type = get_post_type( $postId );

			if ( in_array( $post_type, $showInPostTypes ) ) {
				return false;
			}
		}

        if (is_array($option['includePosts']) && $isPost && in_array(strval($postId), $option['includePosts'])){
            return false;
        }

        if ($option['displayCondition'] == 'includePages') {
            if (is_array($option['includePages']) && $isPageOrShop && in_array(strval($postId), $option['includePages'])) {
                return false;
            } 
            return true;
        } else if ($option['displayCondition'] == 'excludePages') {
            if (is_array($option['excludePages']) && $isPageOrShop && in_array(strval($postId), $option['excludePages'])) {
                return true;
            } 
        }

        return false;
    }

    public function get_accounts_active_and_meta(){
        $results  = array();
		$accounts = PostType::getInstance()->get_active_widget_accounts();
		foreach ( $accounts as $account ) {
			$meta   = get_post_meta( $account->ID, 'cat_wa_account_info', true );
			$avatar = get_the_post_thumbnail_url( $account->ID );
            if ('' !== $meta) {
                $results[] = array_merge(
                    array(
                        'accountId'   => $account->ID,
                        'accountName' => $account->post_title,
                        'avatar'      => $avatar !== false ? $avatar : '',
                    ),
                    $meta
                );
            }
		}
		return $results;
    }
}
