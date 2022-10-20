function init() {
    ////// index //////
    $("#headerAbout").click(function () {
        $("body").toggleClass("openAbout");
    });
    $("#headerWork").click(function () {
        $("body").removeClass("openAbout");
    });

    ////// inner //////
    $("article#motionGrapicInner .inner_video").mouseenter(function () {
        $(this).children("video").get(0).play();
    });
}
jQuery(document).ready(init());