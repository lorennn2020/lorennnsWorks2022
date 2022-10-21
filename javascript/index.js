
// 打開#about時，停用滑鼠滾動
function preventScroll(e){
    e.preventDefault();
    e.stopPropagation();
    return false;
}
function disable(){
    document.querySelector('#about').addEventListener('wheel', preventScroll);
}
function enable(){
    document.querySelector('#works').removeEventListener('wheel', preventScroll);
}

// 防止 spaceber 滾動畫面


function init() {
    //////////// index ////////////
    $("#headerAbout").click(function () {
        $("body").toggleClass("openAbout");
    });
    $("#headerWork").click(function () {
        $("body").removeClass("openAbout");
    });

    // 打開#about時，停用滑鼠滾動
    if ($("#headerAbout").length > 0) {
        document.querySelector("#headerAbout").addEventListener('click', disable);
    }
    if ($("#headerWork").length > 0) {
        document.querySelector("#headerWork").addEventListener('click', enable);
    }
    //////////// index end ////////////
    //////////// inner ////////////
    $("article#motionGrapicInner .inner_video").mouseenter(function () {
        $(this).children("video").get(0).play();
    });
    //////////// inner end ////////////
}
jQuery(document).ready(init());