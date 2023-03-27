(function() {
  catWhatsApp.ready(function() {
    catWhatsApp.createWidget(document.querySelector("#wa"),{
      accounts: cat_wa.accounts,
      timezone: cat_wa_global.timezone,
      gdprStatus: cat_wa.gdprStatus,
      defaultAvatar: cat_wa_global.defaultAvatarSVG,
      options: cat_wa.options,
      urlSettings: cat_wa_global.urlSettings
    });
    // Fix WooMart Theme
    const wa_root_wrap = document.querySelector('#wa').closest('a')
    if (wa_root_wrap && !wa_root_wrap.getAttribute('href')) wa_root_wrap.href="#"
  });
})();

