<?php
namespace CAT_WhatsApp;

use CAT_WhatsApp\Fields;
use CAT_WhatsApp\Helper;

defined('ABSPATH') || exit;

class PostType
{
    protected static $instance = null;

    public static function run()
    {
        if (null == self::$instance) {
            self::$instance = new self;
            self::$instance->runHooks();
        }
        return self::$instance;
    }

    
    public function __construct()
    {
    }

    private function runHooks(){
        add_action('init', array($this, 'register_post_type')); 
        add_action('save_post_cat_wa_accounts', [$this, 'save_account'], 10, 3);
        add_action('add_meta_boxes', [$this, 'add_meta_boxes']);

        add_filter('manage_cat_wa_accounts_posts_columns', [$this, 'manager_accounts_columns'], 10, 1);
        add_action('manage_cat_wa_accounts_posts_custom_column', [$this, 'manager_accounts_show_columns'], 10, 2);
        add_filter('enter_title_here', [$this, 'replace_title'], 20, 2);
        add_action('wp_print_scripts', [$this, 'disable_autosave']);

        add_action('wp_ajax_cat_wa_get_account', [$this, 'ajax_get_account']);
    }

    public function register_post_type(){
        $labels = array(
            'name' => __('WhatsApp Accounts'),
            'singular_name' => __('Whatsapp Account'),
            'add_new' => __('Add New Account', 'codeastrology-whatsapp'),
            'add_new_item' => __('Add New Account', 'codeastrology-whatsapp'),
            'edit_item' => __('Edit Account', 'codeastrology-whatsapp'),
            'new_item' => __('New Account', 'codeastrology-whatsapp'),
            'all_items' => __('All Accounts', 'codeastrology-whatsapp'),
            'view_item' => __('View Accounts', 'codeastrology-whatsapp'),
            'search_items' => __('Search Account', 'codeastrology-whatsapp'),
            'featured_image' => __('Avatar', 'codeastrology-whatsapp'),
            'set_featured_image' => __('Select an image', 'codeastrology-whatsapp'),
            'remove_featured_image' => __('Remove avatar', 'codeastrology-whatsapp'),
        );

        $args = array(
            'labels' => $labels,
            'description' => __('Manager Accounts', 'codeastrology-whatsapp'),
            'public' => false,
            'show_ui' => true,
            'has_archive' => true,
            'show_in_admin_bar' => false,
            'show_in_rest' => true,
            'show_in_menu' => 'cat_whatsapp',
            'menu_position' => 100,
            'query_var' => 'cat_wa_accounts',
            'supports' => array(
                'title',
                'thumbnail',
            ),
            'capabilities' => array(
                'edit_post'          => 'manage_options',
                'read_post'          => 'manage_options',
                'delete_post'        => 'manage_options',
                'edit_posts'         => 'manage_options',
                'edit_others_posts'  => 'manage_options',
                'delete_posts'       => 'manage_options',
                'publish_posts'      => 'manage_options',
                'read_private_posts' => 'manage_options'
            ),
        );
        register_post_type('cat_wa_accounts', $args);
    }

    public function add_meta_boxes(){
        $current_screen = get_current_screen();

        add_meta_box('whatsapp-account-info', 'WhatsApp Account Information', [$this, 'meta_form_account'], 'cat_wa_accounts', 'normal');
        add_meta_box('whatsapp-button-style', 'Button Style', [$this, 'meta_form_button_style'], 'cat_wa_accounts', 'normal');
        if ($current_screen->action !== 'add') {
            add_meta_box('whatsapp-button-shortcode', 'Shortcode for this account', [$this, 'account_shortcode_form'], 'cat_wa_accounts', 'side');
        }
    }

    public function disable_autosave() {    
        if (get_post_type() === 'cat_wa_accounts') {
            wp_deregister_script('autosave');
        }
    }

    public function replace_title($title, $post){
        if ($post->post_type == 'cat_wa_accounts') {
            $my_title = "Account Name";
            return $my_title;
        }

        return $title;
    }

    public function get_posts($argsQuery = array())
    {
        $defaultArgs = array(
            'post_type' => 'cat_wa_accounts',
            'post_status' => 'publish',
            'numberposts' => -1,
        );

        $args = apply_filters('cat_wa_get_post_type', $defaultArgs);
        $args = wp_parse_args($argsQuery, $args);
        $account_list = get_posts($args);

        return $account_list;
    }

    public function get_active_widget_accounts()
    {
        return $this->get_posts(
            array(
                'meta_key' => 'cat_wa_widget_position',
                'orderby' => 'meta_value_num',
                'order' => 'ASC',
                'meta_query' => array(
                    array(
                        'key' => 'cat_wa_widget_show',
                        'value' => 'ON',
                        'compare' => '='
                    )
            ))

        );
    }

    public function get_active_woocommerce_accounts()
    {
        return $this->get_posts(
            array(
                'meta_key' => 'cat_wa_wc_position',
                'orderby' => 'meta_value_num',
                'order' => 'ASC',
                'meta_query' => array(
                    array(
                        'key' => 'cat_wa_wc_show',
                        'value' => 'ON',
                        'compare' => '='
                    )
            ))
        );
    }

    public function ajax_get_account(){
        check_ajax_referer('cat_wa-gutenberg', 'nonce', true);
        $id = sanitize_text_field($_POST['id']);
        $metaInfo = get_post_meta($id, 'cat_wa_account_info', true);
        $metaStyle = get_post_meta($id, 'cat_wa_button_styles', true);
        wp_send_json([
            'imageUrl'   => get_the_post_thumbnail_url($id),
            'buttonTitle'  => $buttonName,
            'metaInfo'    => $metaInfo,
            'metaStyle'   => $metaStyle
        ]);
    }

    public function save_account($post_id, $post, $update)
    {
        if (isset($post->post_status) && 'auto-draft' == $post->post_status) {
            return;
        }
        
        if (!wp_verify_nonce($_POST['form_account_nonce'], 'save_form_account')) {
            return;
        }

        $new_account = array(
            'number'                => sanitize_text_field($_POST['number']),
            'title'                 => sanitize_text_field($_POST['title']),
            'predefinedText'        => wp_kses_post($_POST['predefinedText']),
            'willBeBackText'        => sanitize_text_field($_POST['willBeBackText']),
            'dayOffsText'           => sanitize_text_field($_POST['dayOffsText']),
            'isAlwaysAvailable'     => isset($_POST['isAlwaysAvailable']) ? 'ON' : 'OFF'
        );

        $daysOfWeekWorking = $_POST['daysOfWeekWorking'];

        $new_account['daysOfWeekWorking'] = array_map(function($day){
            return [
                'isWorkingOnDay' => isset($day['isWorkingOnDay']) ? 'ON' : 'OFF',
                'workHours'      => $day['workHours']
            ];
        }, $daysOfWeekWorking);

        update_post_meta($post_id, 'cat_wa_account_info', $new_account);

        update_post_meta($post_id, 'cat_wa_button_styles', array(
            'type' => sanitize_text_field($_POST['btnType']),
            'backgroundColor' => sanitize_text_field($_POST['backgroundColor']),
            'textColor' => sanitize_text_field($_POST['textColor']),
            'label' => sanitize_text_field($_POST['label']),
            'width' => 300,
            'height' => 64,
        ));

        $isSaveNewPost = Helper::isSaveNewPost(sanitize_text_field($_POST['_wp_http_referer']));
        if ( $isSaveNewPost ) {
            update_post_meta($post_id, 'cat_wa_widget_show', 'OFF');
            update_post_meta($post_id, 'cat_wa_widget_position', 0);
            update_post_meta($post_id, 'cat_wa_wc_show', 'OFF');
            update_post_meta($post_id, 'cat_wa_wc_position', 0);
        } 
    }

    public function meta_form_account($post)
    {
        $screen = get_current_screen();
        $daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

        wp_nonce_field('save_form_account', 'form_account_nonce');
        if ( $screen->action == 'add' ) {
            $meta = Fields::getDefaultMetaAccount($daysOfWeek);
        } else {
            $meta = get_post_meta($post->ID, 'cat_wa_account_info', true);
            $meta['cat_wa_widget_show'] = get_post_meta($post->ID, 'cat_wa_widget_show', true);
            $meta['cat_wa_widget_position'] = get_post_meta($post->ID, 'cat_wa_widget_position', true);
            $meta['cat_wa_wc_show'] = get_post_meta($post->ID, 'cat_wa_wc_show', true);
            $meta['cat_wa_wc_position'] = get_post_meta($post->ID, 'cat_wa_wc_position', true);
        }
        require CAT_WHATSAPP_PLUGIN_DIR . 'admin/meta-accounts.php';
    }

    public function account_shortcode_form()
    {
    ?>
        <p>Copy the shortcode below and paste it into the editor to display the button.</p>
        <p><input type="text" id="cat-button-shortcode-copy" value="[catwa_button id=&quot;<?php echo esc_attr(get_the_ID()) ?>&quot;]" class="widefat" readonly=""></p>
        <p class="cat-shortcode-copy-status hidden" style="color: green"><strong>Copied!</strong></p>
    <?php
    }

    public function meta_form_button_style($post)
    {
        $buttonStyles = Fields::getButtonStyles($post->ID);
        $buttonStyles['avatar'] = get_the_post_thumbnail_url($post->ID);
        $buttonStyles['title'] = $post->post_title;
        require CAT_WHATSAPP_PLUGIN_DIR . 'admin/meta-button-style.php';
    }

    public function manager_accounts_columns($columns)
    {
        $columns = array(
            'cb' => '<input type="checkbox" />',
            'title' => __('Account Name', 'codeastrology-whatsapp'),
            'avatar' => __('Avatar', 'codeastrology-whatsapp'),
            'number' => __('Number', 'codeastrology-whatsapp'),
            'cat_title' => __('Title', 'codeastrology-whatsapp'),
            'activedays' => __('Active Days', 'codeastrology-whatsapp'),
            'shortcode' => __('Shortcode', 'codeastrology-whatsapp'),
        );
        return $columns;
    }

    public function manager_accounts_show_columns($name, $post_id)
    {
        $data_account = get_post_meta($post_id, 'cat_wa_account_info', true);
        if (empty($data_account)) return;
        switch ($name) {
            case 'avatar':
                the_post_thumbnail('thumbnail', array('class' => 'img-size-table'));
                break;
            case 'number':
                echo esc_html($data_account['number']);
                break;
            case 'cat_title':
                echo esc_html($data_account['title']);
                break;
            case 'activedays':
                echo esc_html(Helper::printWorkingDays($data_account));
                break;
            case 'shortcode':
                echo '<input type="text" class="cat-shortcode-table" name="country" value="[catwa_button id=&quot;' . esc_attr($post_id) . '&quot;]" readonly>';
                break;
        }
    }
}
