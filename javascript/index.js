function init() {
    $("#headerAbout").click(function () {
        $("body").toggleClass("openAbout");
    });
    $("#headerWork").click(function () {
        $("body").removeClass("openAbout");
    });
}
jQuery(document).ready(init());