jQuery(document).ready(function() {
    jQuery('#cat_wa-ads').click(function() {
        jQuery.ajax({
            url: ajaxurl,
            type: 'POST',
            dataType: 'json',
            data: {
                'action': 'cat_wa_ads_save',
                'nonce': window.cat_admin_ads.nonce
            }
        }).done(function(result) {
            if (result.success) {
                jQuery('#cat_wa-ads-wrapper').hide('slow')
            } else {
                console.log("Error", result.data.status)
            }
        });
    })
});