<?php
if (isset($_GET['tab'])) {
    $active_tab = sanitize_text_field($_GET['tab']);
} else {
    $active_tab = 'tab_one';
}
?>
<div class="wrap">
    <h1>Floating Widget</h1>

    <?php settings_errors(); ?>
    <div id="tabs">
        <ul class="nav-tab-wrapper cat-tab-wrapper">
            <li><a href="#tabs-1" class="nav-tab cat-selected-tab"><?php echo __('Selected Accounts', 'codeastrology-whatsapp') ?></a></li>
            <li><a href="#tabs-2" class="nav-tab cat-design-tab" data-action="cat_wa_save_design_setting"><?php echo __('Design', 'codeastrology-whatsapp') ?></a></li>
            <li><a href="#tabs-3" class="nav-tab cat-display-setting-tab" data-action="cat_wa_save_display_setting"><?php echo __('Display Settings', 'codeastrology-whatsapp') ?></a></li>
        </ul>
        <div class="cat-tabs-content">
            <form method="post" action="options.php">
                <div id="form-selected-account" autocomplete="off">
                    <div id="tabs-1">
                        <?php do_settings_sections('floating-widget-whatsapp-1'); ?>
                    </div>
                    <div id="tabs-2" style="display: none;">
                        <?php do_settings_sections('floating-widget-whatsapp-2'); ?>
                    </div>
                    <div id="tabs-3" style="display: none;">
                        <?php do_settings_sections('floating-widget-whatsapp-3'); ?>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>