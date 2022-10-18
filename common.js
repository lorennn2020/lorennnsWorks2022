jQuery(document).ready(function() {
    console.log($( window ).height());
    console.log($( window ).width());
    
    ///////  variable declaration  //////////////////

    // 全域參數宣告
    var $bag_spaceLR;

    var $gameFrameleft = $("#game_frame").offset().left; 
    var $frame_home = $('#frame_home');
    var $man = $('#man');

    var $submarine = $('#submarine');
    var $volcanoPos = 0;

    var $desert = $('#frame_desert');
    var $desertJeff = $('#desert_Jeff');
    var $desert_Jeff_drawWater =  $('#desert_Jeff_drawWater');
    var $desertJeffLeft = 102;
    var $desertPos = 0;
    var $desertJeffOffsetLeft =  $desertJeff.offset().left;

    var $toHome, $toSea, $toDesert;
    var $taking, $clicking, $bag_spaceLR,
        $mousePosX, $mousePosY,
        $ingredientsBlock;

    // 環境參數宣告
    var $mouseX,
        $mousePreX = 120,
        $mouseY,
        $mousePreY = 120,
        $worm1 = 1,
        $worm2 = 1,
        $worm3 = 1,
        $worm4 = 1,
        $worm5 = 1,
        $worm6 = 1,
        $worm7 = 1,
        $worm8 = 1,
        $worm9 = 1,
        $wormInCapsule = 0;

    $man.css('left', 120 + 'px');
    

    // - 音樂參數宣告
    var audio_ingreBeep = document.createElement("audio");
    audio_ingreBeep.src = "audio/ingredientsBeep.mp3";
    audio_ingreBeep.volume = 0.2;
    audio_ingreBeep.loop = true;
    audio_ingreBeep.autoplay = true; //之後要讓音樂自動播放（點擊遊戲開始，即根網頁互動、即可自動播放）

    var audio_footsteps = document.createElement("audio");
    audio_footsteps.src = "audio/footsteps.mp3";

    var audio_click = document.createElement("audio");
    audio_click.src = "audio/click.mp3";

    var audio_clickOff = document.createElement("audio");
    audio_clickOff.src = "audio/clickOff.mp3";

    
    //////////// 介面功能開始 //////////////////////// 

    // 點擊聲音開關
    $(".audio_click").click(function(){
        audio_click.play();
        event.stopPropagation(); // 阻止泡泡事件
    });

    // 右上角 聲音開關 
    $(".btn_vol_on").click(function(){

        if (audio_footsteps.muted == false) {
            $(".btn_vol_on").css({
                opacity: 0,
            });
            audio_footsteps.muted = true;
            audio_click.muted = true;
            audio_clickOff.muted = true;
        }else{
            $(".btn_vol_on").css({
                opacity: 1,
            });
            audio_footsteps.muted = false;
            audio_click.muted = false;
            audio_clickOff.muted = false;
        }
        event.stopPropagation(); // 阻止泡泡事件
    });

    // 右上角 中英切換（未開始）


    //////////// ＬＩＧＨＴＢＯＸ //////////////////// 

    // 點擊lightbox底 關閉所有lightbox
    $("#game_lightbox").click(function (event) {
        $("#game_lightbox").removeClass('c_showLightbox mapShow bagShow lightFrameShow');
        audio_clickOff.play();
        event.stopPropagation(); // 阻止泡泡事件
    })
    // 背包
    $(".btn_bag").click(function(event){
        $("#game_lightbox").removeClass('c_showLightbox mapShow bagShow lightFrameShow');
        $("#game_lightbox").addClass('c_showLightbox bagShow');
        event.stopPropagation(); // 阻止泡泡事件
    });
    // 地圖
    $(".btn_map").click(function(event){
        $("#game_lightbox").removeClass('c_showLightbox mapShow bagShow lightFrameShow');
        $("#game_lightbox").addClass('c_showLightbox mapShow');
        event.stopPropagation(); // 阻止泡泡事件
    });
    // home 像框
    $("#photoS").click(function (event) {
        $("#game_lightbox").removeClass('c_showLightbox mapShow bagShow lightFrameShow');
        $("#game_lightbox").addClass('c_showLightbox lightFrameShow');
        event.stopPropagation(); // 阻止泡泡事件
    })
    //////////// ＬＩＧＨＴＢＯＸ end /////////////// 
    ////////////  ＢＡＧ  ///////////////////////// 

    $("#bag").click(function(event){
        event.stopPropagation(); // 阻止泡泡事件
    });
    $("#bag_close").click(function(event){
        $(".c_showLightbox").removeClass('c_showLightbox mapShow bagShow lightFrameShow');
        event.stopPropagation(); // 阻止泡泡事件
    });

    ////////////  ＢＡＧ end  /////////////////////
    //////////// BAG CAPSULE TO HOME STOVE /////// 
    $(".bag_space.L").click(function(e){
        $("#bag").addClass("taking");
        $bag_spaceLR = 1;

        $mousePos(e);

        $clicking =  $(this);
        taking($clicking);

        // 關閉包包
        $(".c_showLightbox").removeClass('c_showLightbox mapShow bagShow lightFrameShow');

        //放到爐子上，或關閉包包重置包包狀態

    });
    $(".bag_space.R").click(function(e){
        $("#bag").addClass("taking");
        $bag_spaceLR = 2;

        $mousePos(e);
        
        $clicking = $(this);
        taking($clicking);

        // 關閉包包
        $(".c_showLightbox").removeClass('c_showLightbox mapShow bagShow lightFrameShow');


    });
    
    // 判別taking worm
    function taking() {
        if ($clicking.hasClass("gotSeaWorm") == true){
            $taking = 1;
            $("#ingredientsBlock i").addClass("seaWorm");

        }else if($clicking.hasClass("gotDesertWorm") == true){
            $taking = 2;
            $("#ingredientsBlock i").addClass("desertWorm");
        }else{
            console.log("sth went wrong :(");
        }
        mouseMove();
    }
    
    // 判別滑鼠位置
    function $mousePos(e) {
        // e.page目前是與網頁的距離，改成與 ＃game_frame 的距離
        $mousePosX = e.pageX + 0;
        $mousePosY = e.pageY - 0;
        // console.log("$mousePosX:",$mousePosX," ; $mousePosY:",$mousePosY);
    }

    // 跟隨滑鼠移動 獲取數值
    function mouseMove() {
        ingredientsMove();
        
        $(document).mousemove(function(e) {
            if ($taking == 1 || $taking == 2 ) {
                console.log("$taking: ",$taking);
    
                $mousePos(e);
                ingredientsMove();
            }
        });
    }

    // 跟隨滑鼠移動 調整樣式
    function ingredientsMove() {
        $("#ingredientsBlock i").css({
            "position":"fixed",
            "top":$mousePosY+"px",
            "left":$mousePosX+"px",
        });
        console.log("$mousePosXtop:",$mousePosX," ; $mousePosY:",$mousePosY);
    }

    // worm 加入鍋子
    $("#ingredientsBlock").click(function(){
        if ($taking == 1) {
            // console.log("A");

            setTimeout(function(){
                $("#ingredientsBlock #animaSea").show();  
            }, 500);
            setTimeout(function(){
                $("#ingredientsBlock #animaSea").remove();   
            }, 2000);

            $("#ingredientsBlock #A").addClass("full");
            removeOrigWorm();
            
        } else if ($taking == 2){
            // console.log("B");

            setTimeout(function(){
                $("#ingredientsBlock #animaDesert").show();  
            }, 500);
            setTimeout(function(){
                $("#ingredientsBlock #animaDesert").remove();   
            }, 2000);

            $("#ingredientsBlock #B").addClass("full");
            removeOrigWorm();

        }else {
            console.log("nothing put in");
        }
    });

    //  點其他位置，取消拿膠囊狀態
    $("#frame_home , #frame_home div:not(#ingredientsBlock)").click(function(){
        $("#bag").removeClass("taking");
        $taking, $mousePosX, $mousePosY = 0;
    });

    // 移除背包worm
    function removeOrigWorm() {
        setTimeout(function(){
            $("#ingredientsBlock span").animate({left:"24px"});  
        }, 3000);

        // 是否finalEnding？
        if ($("#ingredientsBlock #A").hasClass("full") == true && $("#ingredientsBlock #B").hasClass("full") == true) {
            finalEnding();
        }

        $("#ingredientsBlock i").removeClass("seaWorm , desertWorm");
        $("#bag").removeClass("taking");


        if ($bag_spaceLR == 1){
            $(".bag_space.L").removeClass("gotSeaWorm , gotDesertWorm");
            $(".bag_space.L").addClass("end");
            
        }else if ($bag_spaceLR == 2){
            $(".bag_space.R").removeClass("gotSeaWorm , gotDesertWorm");
            $(".bag_space.R").addClass("end");
        }else{
            console.log("sth went wrong :(");
        }

        // 移除所有相關數值
        $ingredientsBlock,
        $bag_spaceLR,
        $mousePosX,
        $mousePosY,
        $taking,
        $clicking = "";
    }
    //////////// BAG CAPSULE TO HOME STOVE end ///
    ////////////   ＭＡＰ  /////////////////////////

    $("#map").click(function(event){
        event.stopPropagation(); // 阻止泡泡事件
    });
    $("#map_close").click(function(event){
        $(".c_showLightbox").removeClass('c_showLightbox mapShow bagShow lightFrameShow');
        event.stopPropagation(); // 阻止泡泡事件
    });

    // 地圖hover 顯示文字
    $("#map #location_home").mouseenter(function(){
        // console.log(":visible ",$("#map #map_text_bg").is(':visible'));
        if ($("#map #map_text_bg").is(':visible') == false) {
            $("#map #map_text").text("Home");
            $("#map #map_btn_y , #map #map_btn_n").hide();
            $("#map #map_text_bg").show();
        }
    });
    $("#map #location_desert").mouseenter(function(){
        // console.log(":visible ",$("#map #map_text_bg").is(':visible'));
        if ($("#map #map_text_bg").is(':visible') == false) {
            $("#map #map_text").text("Desert");
            $("#map #map_btn_y , #map #map_btn_n").hide();
            $("#map #map_text_bg").show();
        }
    });
    $("#map #location_sea").mouseenter(function(){
        // console.log(":visible ",$("#map #map_text_bg").is(':visible'));
        if ($("#map #map_text_bg").is(':visible') == false) {
            $("#map #map_text").text("Sea");
            $("#map #map_btn_y , #map #map_btn_n").hide();
            $("#map #map_text_bg").show();
        }
    });

    $("#map #location_home , #map #location_desert , #map #location_sea").mouseout(function(){
        mapMouseout();
    });
    function mapMouseout() {
        if ($toHome == 1 || $toSea == 1 || $toDesert == 1) {
        }else{
            $("#map #map_text_bg").hide();
            $("#map #map_text").text("");
        }
    }

    // 點擊地圖
    $("#map #location_home").click(function(){
        $toHome = 1;
        $("#map #map_text").text("Are you sure want to go Home?");
        $("#map #map_btn_y , #map #map_btn_n").show();
        $("#map #map_text_bg").show();

    });
    $("#map #location_sea").click(function(){
        $toSea = 1;
        $("#map #map_text").text("Are you sure want to go to the Sea?");
        $("#map #map_btn_y , #map #map_btn_n").show();
        $("#map #map_text_bg").show();
        
    });
    $("#map #location_desert").click(function(){
        $toDesert = 1;
        $("#map #map_text").text("Are you sure want to go to Desert?");
        $("#map #map_btn_y , #map #map_btn_n").show();
        $("#map #map_text_bg").show();
       
    });

    // 地圖 是否前往？
    $("#map #map_btn_y").click(function(){
        $("#frame_home").removeClass("begining");

        $("#map #map_text_bg").hide();
        $(".toSea").removeClass("toSea");
        $(".toDesert").removeClass("toDesert");
        $(".desertToHome").removeClass("seaToHome");
        $(".desertToHome").removeClass("desertToHome");
        $(".DesertToSea").removeClass("DesertToSea");
        $(".SeaToDesert").removeClass("SeaToDesert");
        $(".atSea").removeClass("atHome");
        $(".atSea").removeClass("atSea");
        $(".atSea").removeClass("atDesert");
        $(".opening").removeClass("opening");

        // 解除 jeff, submarine 凍結（開關地圖會導致動畫重新跑）
        $("#map #map_jeff , #map #map_submarine").removeClass("paused");

        if ($("#map #location_home").hasClass("here") == true && $toSea == 1 ){
            // Home to Sea 7s
            $("#map").addClass("toSea");
            $("#map .here").removeClass("here");
    
            setTimeout(function(){
                $("#map #location_sea").addClass("here");

                //// 前往sea
                $("#frame_volcano").addClass("open");
                $(".c_frameNow").removeClass("c_frameNow");
                $("#frame_volcano").addClass("c_frameNow");
                volcanoSTART();
            }, 6900);

            $toSea = 0;

            setTimeout(function(){
                $("#game_lightbox").removeClass('c_showLightbox mapShow bagShow lightFrameShow'); //收起的很突然
            }, 7400);

        }else if($("#map #location_home").hasClass("here") == true && $toDesert == 1 ){
            // Home to Desert 7s
            $("#map").addClass("toDesert");
            $("#map .here").removeClass("here");
    
            setTimeout(function(){
                $("#map #location_desert").addClass("here");
                $(".c_frameNow").removeClass("c_frameNow");
                $("#frame_desert").addClass("c_frameNow");
                desertSTART();
            }, 6900);

            $toDesert = 0;
            setTimeout(function(){
                $("#game_lightbox").removeClass('c_showLightbox mapShow bagShow lightFrameShow'); //收起的很突然
            }, 7900);

        }else if($("#map #location_desert").hasClass("here") == true && $toSea == 1){
            // Desert to Sea 15s
            $("#map").addClass("DesertToSea");
            $("#map .here").removeClass("here");
    
            setTimeout(function(){
                $("#map #location_sea").addClass("here");

                //// 前往sea
                $("#frame_volcano").addClass("open");
                $(".c_frameNow").removeClass("c_frameNow");
                $("#frame_volcano").addClass("c_frameNow");
                volcanoSTART();
            }, 14900);

            $toSea = 0;
            setTimeout(function(){
                $("#game_lightbox").removeClass('c_showLightbox mapShow bagShow lightFrameShow'); //收起的很突然
            }, 15400);

        }else if($("#map #location_desert").hasClass("here") == true && $toHome == 1){
            // Desert to Home 6s
            $("#map").removeClass("toDesert");
            $("#map").addClass("desertToHome");
            $("#map .here").removeClass("here");
    
            setTimeout(function(){
                $("#map #location_home").addClass("here");
                $(".c_frameNow").removeClass("c_frameNow");
                $("#frame_home").addClass("c_frameNow");
                homeSTART();
            }, 5900);

            $toHome = 0;
            setTimeout(function(){
                $("#game_lightbox").removeClass('c_showLightbox mapShow bagShow lightFrameShow'); //收起的很突然
            }, 6900);

        }else if($("#map #location_sea").hasClass("here") == true && $toHome == 1){
            // Sea to Home 7s 不明頓點？？？
            $("#map").removeClass("toSea");
            $("#map").addClass("SeaToHome");
            $("#map .here").removeClass("here");
    
            setTimeout(function(){
                $("#map #location_home").addClass("here");
                $(".c_frameNow").removeClass("c_frameNow");
                $("#frame_home").addClass("c_frameNow");
                homeSTART();
            }, 6900);

            $toHome = 0;
            setTimeout(function(){
                $("#game_lightbox").removeClass('c_showLightbox mapShow bagShow lightFrameShow'); //收起的很突然
            }, 7900);

        }else if($("#map #location_sea").hasClass("here") == true && $toDesert == 1){
            // Sea to Desert 15s 測試中
            $("#map").addClass("SeaToDesert");
            $("#map .here").removeClass("here");
    
            setTimeout(function(){
                $("#map #location_desert").addClass("here");
                $(".c_frameNow").removeClass("c_frameNow");
                $("#frame_desert").addClass("c_frameNow");
                desertSTART();
            }, 14900);

            $toDesert = 0;
            setTimeout(function(){
                $("#game_lightbox").removeClass('c_showLightbox mapShow bagShow lightFrameShow'); //收起的很突然
            }, 15900);

        }else{
            console.log("something went wrong :(");
        }
    });
    $("#map #map_btn_n").click(function(){
        $("#map #map_text_bg").hide();
    });
    ////////////   ＭＡＰ end   //////////////////////
    ////////////   ＢＥＧＩＮＩＮＧ  ///////////////////
    $("#game_menu #menu_start").click(function(){
        $("#game_frame").addClass("starting");

        // setTimeout(function(){
        doctorSTART();
        // }, 0);
    });
    ////////////   ＢＥＧＩＮＩＮＧ end  ///////////////
    ////////////   ＤＯＣＴＯＲＳ  /////////////////////
    function doctorSTART() {
        // 模糊效果
        for (let $i = 5; $i < 21; $i++) {
            console.log("$i:",$i);

            let $doctorBurTimeout = setTimeout(function(){
                if ($("#doctors_opening feMorphology:nth-child(5)").attr("radius") == 2) {
                    setTimeout(function(){
                        $doctorBurTimeout = 0;
                        $("#doctors_opening").remove();
                    }, 100);
                }else{
                    $("#doctors_opening feMorphology:nth-child(5)").remove();
                }
            }, 90 * $i);
        }

        $("#game_menu").remove();

        // 醫師診斷 貓快死了
        setTimeout(function(){
            $("#frame_doctors #doctors_anima01").css("background-image","url(img/animation-doctors01.gif)");
        }, 1460);

        setTimeout(function(){
            $("#frame_doctors #doctors_img01").css({"z-index":"2","opacity":"1"});
            $("#frame_doctors #doctors_anima01").remove();
        }, 10660);
        
        // 轉場
        setTimeout(function(){
            $("#frame_doctors #doctors_img01").css("top","-100%");
            $("#frame_doctors #doctors_homeSadBegin").css({"z-index":"2","opacity":"1","top":"0%"});
            $("#frame_doctors #doctors_BG").css("background-color","#2e333c");
        }, 11660);

        // 回家哭哭，撿傳單
        setTimeout(function(){
            $("#frame_doctors #doctors_homeSad").css("background-image","url(img/animation-homeSad.gif)"); // 9.5s
            $("#frame_doctors #doctors_img01").remove();
        }, 12760);

        setTimeout(function(){
            $("#frame_doctors #doctors_homeSadImg").css({"z-index":"5","opacity":"1"});
        }, 21760);

        // 傳單pop up
        setTimeout(function(){
            $("#frame_doctors #doctors_homeSadBegin").remove();
            $("#frame_doctors #doctors_homeSad").remove();
            $("#frame_doctors #doctors_homeSadAD").css({"z-index":"7","top":"50%"});
        }, 22560);

        // 點擊前往怪奇實驗室
        $("#frame_doctors #doctors_homeSadCTA").click(function() {
            $("#frame_doctors #doctors_homeSadImg").css({"transition":"top 1.0s","top":"-100%"});
            $("#frame_doctors #weirdDoctorBG").css({"top":"0%"});
            $("#frame_doctors #doctors_BG").css("background-color","#251e35");
            
            // 轉場
            setTimeout(function(){
                $("#frame_doctors #doctors_homeSadAD").css("top","160%");
                $("#frame_doctors #doctors_weirdDoctorEquip , #frame_doctors #doctors_weirdDoctorFront").css({"top":"0%"});
                $("#frame_doctors #doctors_homeSadImg").remove();
            }, 1000);

            // weirdDoctorEquip 動畫開始
            setTimeout(function(){
                $("#frame_doctors #doctors_animaEquip").css("background-image","url(img/animatiom-weirdDoctorEquip.gif)"); // 8.3s
                $("#frame_doctors #doctors_weirdDoctorFront").addClass("show");
            }, 2000);

            setTimeout(function(){
                $("#frame_doctors #doctors_homeSadAD").remove();
                $("#frame_doctors #doctors_animaEquip").remove();
                $("#frame_doctors #doctors_weirdDoctorEquip").addClass("fade");
            }, 10300);

            // weirdDoctorFront 動畫開始
            setTimeout(function(){
                $("#frame_doctors #doctors_animaFront").css("background-image","url(img/animatiom-weirdDoctorFront.gif)"); // 29s
                $("#frame_doctors #doctors_weirdDoctorFront").remove();
            }, 10800);

            setTimeout(function(){
                //返家
                $("#frame_home").addClass("begining");
            }, 37800);
            
            setTimeout(function(){
                $("#frame_doctors #doctors_weirdDoctorMain").css("opacity","1");
                $("#frame_doctors #doctors_animaFront").remove();
            }, 39800);

            // 返家後開啟地圖
            setTimeout(function(){
                $("#game_lightbox").addClass('c_showLightbox mapShow');
                $("#map #map_text").text("Where you want to go first?");
                $("#map #map_btn_y , #map #map_btn_n").hide();
                $("#map #map_text_bg").show();

                $("#frame_btnBtm").removeClass("hide");
                $("#frame_doctors").remove();
            }, 41500);
        });
    }

    ////////////   ＤＯＣＴＯＲＳ end  //////////////// 
    ////////////   ＨＯＭＥ  ///////////////////////// 

    // 點擊畫面移動James 
    function homeSTART() {
    // if ($("#frame_home").hasClass("open") == true) {
        $("#frame_home").addClass("opening");
        $("#frame_home").show();

        // $("html").click(function(e){
        //     // 點擊時獲取滑鼠X軸位置
        //     $mouseX = e.pageX - $frame_home.offset().left - 30;
        //     // console.log('$mouseX: ',$mouseX,'$mousePreX',$mousePreX)

        //     // 判斷是否超出畫面？
        //     if ( $mouseX > 1 && $mouseX < 830 ) {
        //         // 判斷需不需要轉身？
        //         if ( $mouseX - $mousePreX < 1 ) {
        //             $man.css('transform', 'rotateY(180deg)');
        //         } else {
        //             $man.css('transform', 'rotateY(0deg)');
        //         }
        //         // 人物走到點擊位置
        //         var $walkTime = 0.004*Math.abs($mouseX - $mousePreX);
        //         // console.log('$mouseX - $mousePreX',$mouseX - $mousePreX);
        //         // console.log('$walkTime',$walkTime);
        //         $man.css('transition','left linear ' + $walkTime + 's 0s');

        //         // 人物走動
        //         audio_footsteps.play();
        //         $man.css('background-image','url(img/manA-walk.gif)');

        //         // 人物移動
        //         $man.css('left', $mouseX + 'px');
        //         // 確認走到位後停止音效
        //         var setInt = setInterval(function(){
        //             // console.log('$mouseX,',$mouseX);
        //             if( $man.position().left == $mouseX ){
        //                 // console.log('$man.position().left,',$man.position().left);
        //                 // console.log('$mouseX,',$mouseX);

        //                 $man.css('background-image','url(img/manA-stand.svg)');
        //                 audio_footsteps.pause();
        //                 clearInterval(setInt);
        //             }
        //         }, 500);
        //         $mousePreX = $mouseX;
        //     }
        // });
    }

    ////////////   ＨＯＭＥ end  ///////////////////// 
    ////////////   ＳＥＡ ＶＯＬＣＡＮＯ   ///////////// 

    function volcanoSTART() {
        $("#frame_volcano").addClass("opening");
        $("#frame_volcano").show();

        //opening
        setTimeout(() => {
            $("#frame_volcano").removeClass("opening");
        }, 1000);
        
        // Start
        setTimeout(() => {
            $("#frame_volcano #c_start").fadeIn();
            $("#frame_volcano #submarine").removeClass("beforeOpening");
        }, 4900);


        // 鍵盤控制 demo
        window.addEventListener('keydown', function(e){
            var demoID = e.code;

            if(demoID === 'KeyW')  {
                console.log('W');
                $("#frame_volcano #start_keyboard01 i:nth-child(1)").addClass("down");
            }
            if(demoID === 'KeyA')  {
                console.log('A');
                $("#frame_volcano #start_keyboard01 i:nth-child(2)").addClass("down");
            }
            if(demoID === 'KeyS')  {
                console.log('S');
                $("#frame_volcano #start_keyboard01 i:nth-child(3)").addClass("down");
            }
            if(demoID === 'KeyD')  {
                console.log('D');
                $("#frame_volcano #start_keyboard01 i:nth-child(4)").addClass("down");
            }
            if(demoID === 'Space')  {
                console.log('Spacebar');
                $("#frame_volcano #start_keyboard02 i:nth-child(1)").addClass("down");
            }
        }, false);
        window.addEventListener('keyup', function(e){
            var keyupID = e.code;
            if(keyupID === 'KeyW')  {
                console.log('W');
                $("#frame_volcano #start_keyboard01 i:nth-child(1)").removeClass("down");
            }
            if(keyupID === 'KeyA')  {
                console.log('A');
                $("#frame_volcano #start_keyboard01 i:nth-child(2)").removeClass("down");
            }
            if(keyupID === 'KeyS')  {
                console.log('S');
                $("#frame_volcano #start_keyboard01 i:nth-child(3)").removeClass("down");
            }
            if(keyupID === 'KeyD')  {
                console.log('D');
                $("#frame_volcano #start_keyboard01 i:nth-child(4)").removeClass("down");
            }
            if(keyupID === 'Space')  {
                console.log('Spacebar');
                $("#frame_volcano #start_keyboard02 i:nth-child(1)").removeClass("down");
            }
        }, false);

        // START! WASD移動James's submarine
        $("#frame_volcano #start_btn").click(function () {
            
            window.removeEventListener('keydown,keyup',function() {
                console.log('removeEventListener keydown,keyup FAIL')
            });
            $("#frame_volcano #c_start").fadeOut();
            

            // WASD Space控制潛水艇
            $submarineLeft = $submarine.position().left;
            $submarineTop = $submarine.position().top;

            window.addEventListener('keydown', function(e){
                var keyID = e.code;
    
                if(keyID === 'KeyW')  {
                    console.log('W');
                    if($submarineTop > 39) {
    
                        $submarineTop = $submarineTop - 30;
                        $submarine.css('top', $submarineTop + 'px');
                    }
                }
                if(keyID === 'KeyA')  {
                    console.log('A');
    
                    if($submarineLeft > 1) {
                        $submarine.css('transform', 'rotateY(180deg)');
                        $submarineLeft = $submarineLeft - 30;
                        $submarine.css('left', $submarineLeft + 'px');
                    
                    // 控制背景向左 
                    }else if ( $volcanoPos > 0 ){
                        $volcanoPos = $volcanoPos - 10;
                        $("#frame_volcano").css('background-position', $volcanoPos +'% 100%');
                        console.log("$volcanoPos:",$volcanoPos);
    
                        volcanoPosChang();
                    }
                }
                if(keyID === 'KeyS')  {
                    console.log('S');
                    if($submarineTop < 430) {
    
                        $submarineTop = $submarineTop + 30;
                        $submarine.css('top', $submarineTop + 'px');
                    }
                }
                if(keyID === 'KeyD')  {
                    console.log('D');
    
                    if($submarineLeft < 700) {
                        $submarine.css('transform', 'rotateY(0deg)');
                        $submarineLeft = $submarineLeft + 30;
                        $submarine.css('left', $submarineLeft + 'px');
    
                    // 控制背景向右
                    }else if ( $volcanoPos < 100 ){
                        $volcanoPos = $volcanoPos + 10;
                        $("#frame_volcano").css('background-position', $volcanoPos +'% 100%');
                        console.log("$volcanoPos:",$volcanoPos);
                        
                        volcanoPosChang();
                    }
                }
                if(keyID === 'Space')  {
                    console.log('Spacebar');
                    catchWorms();
                }
    
                console.log('$submarineLeft:'+$submarineLeft);
                console.log('$submarineTop:'+$submarineTop);
    
                // worms隨 $volcanoBgPos改變位置
                function volcanoPosChang() {
                    // console.log("volcanoPosChang $volcanoPos:",$volcanoPos);
    
                    $("#frame_volcano .seaLight").css("width",732 - $volcanoPos * 9 + "px");
                    $("#frame_volcano .worm1").css("right",36 + $volcanoPos * 9 + "px");
                    $("#frame_volcano .worm2").css("right",0 + $volcanoPos * 9 + "px");
                    $("#frame_volcano .worm3").css("right",-6 + $volcanoPos * 9 + "px");
                    $("#frame_volcano .worm4").css("right",-180 + $volcanoPos * 9 + "px");
                    $("#frame_volcano .worm5").css("right",-195 + $volcanoPos * 9 + "px");
                    $("#frame_volcano .worm6").css("right",-219 + $volcanoPos * 9 + "px");
                    $("#frame_volcano .worm7").css("right",-222 + $volcanoPos * 9 + "px");
                    $("#frame_volcano .worm8").css("right",-477 + $volcanoPos * 9 + "px");
                    $("#frame_volcano .worm9").css("right",-477 + $volcanoPos * 9 + "px");
                }
    
                // 範圍內抓取worms
                function catchWorms() {
                    console.log("$volcanoPos:",$volcanoPos);
                    
                    switch ($volcanoPos) {
                        case 0:
                            //抓取worm1, worm2, worm3
                            if( $submarine.css('transform') == 'matrix(1, 0, 0, 1, 0, 0)' && $submarineLeft > 592 && $submarineTop == 441 ){
                                catchWorms123();
                            }
                            break;
    
                        case 10:
                            //抓取worm1, worm2, worm3
                            if( $submarine.css('transform') == 'matrix(1, 0, 0, 1, 0, 0)' && $submarineLeft > 502 && $submarineLeft < 594 && $submarineTop == 441 ){
                                catchWorms123();
                            }
                            break;
    
                        case 20:
                            console.log("case 20");
                            
                            //抓取worm1, worm2, worm3
                            if( $submarine.css('transform') == 'matrix(1, 0, 0, 1, 0, 0)' && $submarineLeft > 442 && $submarineLeft < 534 && $submarineTop == 441 ){
                                catchWorms123();
    
                            }else if(  $submarine.css('transform') == 'matrix3d(-1, 0, -1.22465e-16, 0, 0, 1, 0, 0, 1.22465e-16, 0, -1, 0, 0, 0, 0, 1)'&& $submarineLeft == 683 && $submarineTop == 441 ){
                                catchWorms123();
                            }
    
                            // 抓取worm4, worm5
                            if( $submarine.css('transform') == 'matrix(1, 0, 0, 1, 0, 0)' && $submarineLeft > 652 && $submarineLeft < 684 && $submarineTop > 380 ){
                                console.log("if 1");
                                catchWorms456();
                            }
                            break;
    
                        case 30:
                            console.log("case 30");
    
                            //抓取worm1, worm2, worm3
                            if( $submarine.css('transform') == 'matrix(1, 0, 0, 1, 0, 0)' && $submarineLeft > 352 && $submarineLeft < 414 && $submarineTop == 430 ){
                                catchWorms123();
    
                            }else if( $submarine.css('transform') == 'matrix3d(-1, 0, -1.22465e-16, 0, 0, 1, 0, 0, 1.22465e-16, 0, -1, 0, 0, 0, 0, 1)' && $submarineLeft > 562 && $submarineLeft < 654 && $submarineTop == 441 ){
                                catchWorms123();
                            }
    
                            // 抓取worm4, worm5, worm6
                            if( $submarine.css('transform') == 'matrix(1, 0, 0, 1, 0, 0)' && $submarineLeft > 562 && $submarineLeft < 654 && $submarineTop > 380 ){
                                catchWorms456();
                            }
                            break;
    
                        case 40:
    
                            //抓取worm1, worm2, worm3
                            if( $submarine.css('transform') == 'matrix(1, 0, 0, 1, 0, 0)' && $submarineLeft > 262 && $submarineLeft < 324 && $submarineTop == 441 ){
                                catchWorms123();
    
                            }else if( $submarine.css('transform') == 'matrix3d(-1, 0, -1.22465e-16, 0, 0, 1, 0, 0, 1.22465e-16, 0, -1, 0, 0, 0, 0, 1)' && $submarineLeft > 472 && $submarineLeft < 532 && $submarineTop == 441 ){
                                catchWorms123();
                            }
    
                            // 抓取worm4, worm5, worm6
                            if( $submarine.css('transform') == 'matrix(1, 0, 0, 1, 0, 0)' && $submarineLeft > 472 && $submarineLeft < 564 && $submarineTop > 380 ){
                                catchWorms456();
                            }
                            break;
    
                        case 50:
                            console.log("case 50");
    
                            //抓取worm1, worm2, worm3
                            if( $submarine.css('transform') == 'matrix(1, 0, 0, 1, 0, 0)' && $submarineLeft > 172 && $submarineLeft < 234 && $submarineTop == 441 ){
                                catchWorms123();
    
                            }else if( $submarine.css('transform') == 'matrix3d(-1, 0, -1.22465e-16, 0, 0, 1, 0, 0, 1.22465e-16, 0, -1, 0, 0, 0, 0, 1)' && $submarineLeft > 382 && $submarineLeft < 444 && $submarineTop == 441 ){
                                catchWorms123();
                            }
    
                            // 抓取worm4, worm5, worm6
                            if( $submarine.css('transform') == 'matrix(1, 0, 0, 1, 0, 0)' && $submarineLeft > 382 && $submarineLeft < 474 && $submarineTop > 380 ){
                                catchWorms456();
                            }else if( $submarine.css('transform') == 'matrix3d(-1, 0, -1.22465e-16, 0, 0, 1, 0, 0, 1.22465e-16, 0, -1, 0, 0, 0, 0, 1)' && $submarineLeft > 592 && $submarineLeft < 684 && $submarineTop > 410 ){
                                catchWorms456();
                            }
                            break;
    
                        case 60:
    
                            //抓取worm1, worm2, worm3
                            if( $submarine.css('transform') == 'matrix(1, 0, 0, 1, 0, 0)' && $submarineLeft > 172 && $submarineLeft < 234 && $submarineTop == 441 ){
                                catchWorms123();
    
                            }else if( $submarine.css('transform') == 'matrix3d(-1, 0, -1.22465e-16, 0, 0, 1, 0, 0, 1.22465e-16, 0, -1, 0, 0, 0, 0, 1)' && $submarineLeft > 292 && $submarineLeft < 354 && $submarineTop == 441 ){
                                catchWorms123();
                            }
    
                            // 抓取worm4, worm5, worm6
                            if( $submarine.css('transform') == 'matrix(1, 0, 0, 1, 0, 0)' && $submarineLeft > 292 && $submarineLeft < 354 && $submarineTop > 380 ){
                                catchWorms456();
                            }else if( $submarine.css('transform') == 'matrix3d(-1, 0, -1.22465e-16, 0, 0, 1, 0, 0, 1.22465e-16, 0, -1, 0, 0, 0, 0, 1)' && $submarineLeft > 502 && $submarineLeft < 594 && $submarineTop > 380 ){
                                catchWorms456();
                            }
    
                            // 抓取worm8, worm9
                            if( $submarine.css('transform') == 'matrix(1, 0, 0, 1, 0, 0)' && $submarineLeft > 592 && $submarineLeft < 654 && $submarineTop > 170  && $submarineTop < 232 ){
                                catchWorms89();
                            }                            
                            break;
    
                        case 70:
                            console.log("case 70");
    
                            //抓取worm1, worm2, worm3
                            if( $submarine.css('transform') == 'matrix(1, 0, 0, 1, 0, 0)' && $submarineLeft > 22 && $submarineLeft < 54 && $submarineTop == 441 ){
                                catchWorms123();
                            }else if( $submarine.css('transform') == 'matrix3d(-1, 0, -1.22465e-16, 0, 0, 1, 0, 0, 1.22465e-16, 0, -1, 0, 0, 0, 0, 1)' && $submarineLeft > 202 && $submarineLeft < 264 && $submarineTop == 441 ){
                                catchWorms123();
                            }
    
                            // 抓取worm4, worm5, worm6
                            if( $submarine.css('transform') == 'matrix(1, 0, 0, 1, 0, 0)' && $submarineLeft > 202 && $submarineLeft < 294 && $submarineTop > 380 ){
                                catchWorms456();
                            }else if( $submarine.css('transform') == 'matrix3d(-1, 0, -1.22465e-16, 0, 0, 1, 0, 0, 1.22465e-16, 0, -1, 0, 0, 0, 0, 1)' && $submarineLeft > 412 && $submarineLeft < 504 && $submarineTop > 380 ){
                                catchWorms456();
                            }
    
                            // 抓取worm8, worm9
                            if( $submarine.css('transform') == 'matrix(1, 0, 0, 1, 0, 0)' && $submarineLeft > 502 && $submarineLeft < 564 && $submarineTop > 170  && $submarineTop < 232 ){
                                catchWorms89();
                            }
                            break;
    
                        case 80:
                            console.log("case 80");
    
                            //抓取worm1, worm2, worm3
                            if( $submarine.css('transform') == 'matrix3d(-1, 0, -1.22465e-16, 0, 0, 1, 0, 0, 1.22465e-16, 0, -1, 0, 0, 0, 0, 1)' && $submarineLeft > 112 && $submarineLeft < 174 && $submarineTop == 441 ){
                                catchWorms123();
                            }
    
                            // 抓取worm4, worm5, worm6
                            if( $submarine.css('transform') == 'matrix(1, 0, 0, 1, 0, 0)' && $submarineLeft > 112 && $submarineLeft < 204 && $submarineTop > 380 ){
                                catchWorms456();
                            }else if( $submarine.css('transform') == 'matrix3d(-1, 0, -1.22465e-16, 0, 0, 1, 0, 0, 1.22465e-16, 0, -1, 0, 0, 0, 0, 1)' && $submarineLeft > 322 && $submarineLeft < 414 && $submarineTop > 380 ){
                                catchWorms456();
                            }
    
                            // 抓取worm8, worm9
                            if( $submarine.css('transform') == 'matrix(1, 0, 0, 1, 0, 0)' && $submarineLeft > 412 && $submarineLeft < 474 && $submarineTop > 170  && $submarineTop < 232 ){
                                catchWorms89();
                            }else if( $submarine.css('transform') == 'matrix3d(-1, 0, -1.22465e-16, 0, 0, 1, 0, 0, 1.22465e-16, 0, -1, 0, 0, 0, 0, 1)' && $submarineLeft > 622 && $submarineLeft < 684 && $submarineTop > 170 && $submarineTop < 232 ){
                                catchWorms89();
                            }
                            break;
    
                        case 90:
    
                            //抓取worm1, worm2, worm3
                            if( $submarine.css('transform') == 'matrix3d(-1, 0, -1.22465e-16, 0, 0, 1, 0, 0, 1.22465e-16, 0, -1, 0, 0, 0, 0, 1)' && $submarineLeft > 22 && $submarineLeft < 84 && $submarineTop == 441 ){
                                catchWorms123();
                            }
    
                            // 抓取worm4, worm5, worm6
                            if( $submarine.css('transform') == 'matrix(1, 0, 0, 1, 0, 0)' && $submarineLeft > 22 && $submarineLeft < 84 && $submarineTop > 380 ){
                                catchWorms456();
                            }else if( $submarine.css('transform') == 'matrix3d(-1, 0, -1.22465e-16, 0, 0, 1, 0, 0, 1.22465e-16, 0, -1, 0, 0, 0, 0, 1)' && $submarineLeft > 232 && $submarineLeft < 324 && $submarineTop > 380 ){
                                catchWorms456();
                            }
    
                            // 抓取worm8, worm9
                            if( $submarine.css('transform') == 'matrix(1, 0, 0, 1, 0, 0)' && $submarineLeft > 322 && $submarineLeft < 354 && $submarineTop > 170  && $submarineTop < 232 ){
                                catchWorms89();
                            }else if( $submarine.css('transform') == 'matrix3d(-1, 0, -1.22465e-16, 0, 0, 1, 0, 0, 1.22465e-16, 0, -1, 0, 0, 0, 0, 1)' && $submarineLeft > 592 && $submarineLeft < 564 && $submarineTop > 170 && $submarineTop < 232 ){
                                catchWorms89();
                            }
                            break;
    
                        case 100:
    
                            // 抓取worm4, worm5, worm6
                            if( $submarine.css('transform') == 'matrix3d(-1, 0, -1.22465e-16, 0, 0, 1, 0, 0, 1.22465e-16, 0, -1, 0, 0, 0, 0, 1)' && $submarineLeft > 142 && $submarineLeft < 234 && $submarineTop > 380 ){
                                catchWorms456();
                            }
    
                            // 抓取worm8, worm9
                            if( $submarine.css('transform') == 'matrix(1, 0, 0, 1, 0, 0)' && $submarineLeft > 232 && $submarineLeft < 264 && $submarineTop > 170  && $submarineTop < 232 ){
                                catchWorms89();
                            }else if( $submarine.css('transform') == 'matrix3d(-1, 0, -1.22465e-16, 0, 0, 1, 0, 0, 1.22465e-16, 0, -1, 0, 0, 0, 0, 1)' && $submarineLeft > 442 && $submarineLeft < 474 && $submarineTop > 170 && $submarineTop < 232 ){
                                catchWorms89();
                            }
                            break;
    
                        default:
                                console.log("不在抓取範圍");
                                // 空抓
                                $submarine.css('background-image','url(img/scene-volcano_submarineNoCatch.gif)');
                            break;
                    }
    
                    // 停止抓取
                    var catchSetInt = setInterval(function(){
                        $submarine.css('background-image','url(img/scene-volcano_submarine.svg)');
                        // audio_footsteps.pause();
                        clearInterval(catchSetInt);
                    }, 2400);
                }
    
                // 抓取worm1, worm2, worm3 判定
                function catchWorms123() {
                    if( $worm1 > 0 ){
                        console.log("$worm1: ", $worm1);
                        // 抓取
                        $submarine.css('background-image','url(img/scene-volcano_submarineCatch.gif)');
                        $("#frame_volcano .worm1").hide();
                        $worm1 = 0;
                        $wormInCapsule ++;
    
                    }else if( $worm1 == 0 && $worm2 > 0){
                        $submarine.css('background-image','url(img/scene-volcano_submarineCatch.gif)');
                        $("#frame_volcano .worm2").hide();
                        $worm2 = 0;
                        $wormInCapsule ++;
    
                    }else if( $worm1 == 0 && $worm2 == 0 && $worm3 > 0){
                        $submarine.css('background-image','url(img/scene-volcano_submarineCatch.gif)');
                        $("#frame_volcano .worm3").hide();
                        $worm3 = 0;
                        $wormInCapsule ++;
    
                    }else{
                        // 空抓
                        $submarine.css('background-image','url(img/scene-volcano_submarineNoCatch.gif)');
                    }
                    wormInCapsule();
                        console.log("$wormInCapsule: ", $wormInCapsule);
                }
    
                // 抓取worm4, worm5, worm6 判定
                function catchWorms456() {
                    if( $worm4 > 0 ){
                        // 抓取
                        $submarine.css('background-image','url(img/scene-volcano_submarineCatch.gif)');
                        $("#frame_volcano .worm4").hide();
                        $worm4 = 0;
                        $wormInCapsule ++;
    
                    }else if( $worm4 == 0 && $worm5 > 0){
                        $submarine.css('background-image','url(img/scene-volcano_submarineCatch.gif)');
                        $("#frame_volcano .worm5").hide();
                        $worm5 = 0;
                        $wormInCapsule ++;
    
                    }else if( $worm4 == 0 && $worm5 == 0 && $worm6 > 0){
                        $submarine.css('background-image','url(img/scene-volcano_submarineCatch.gif)');
                        $("#frame_volcano .worm6").hide();
                        $worm6 = 0;
                        $wormInCapsule ++;
    
                    }else{
                        // 空抓
                        $submarine.css('background-image','url(img/scene-volcano_submarineNoCatch.gif)');
                    }
                    wormInCapsule();
                }
    
                // 抓取worm8, worm9 判定
                function catchWorms89() {
                    if( $worm8 > 0 ){
                        // 抓取
                        $submarine.css('background-image','url(img/scene-volcano_submarineCatch.gif)');
                        $("#frame_volcano .worm8").hide();
                        $worm8 = 0;
                        $wormInCapsule ++;
    
                    }else if( $worm8 == 0 && $worm9 > 0){
                        $submarine.css('background-image','url(img/scene-volcano_submarineCatch.gif)');
                        $("#frame_volcano .worm9").hide();
                        $worm9 = 0;
                        $wormInCapsule ++;
    
                    }else{
                        // 空抓
                        $submarine.css('background-image','url(img/scene-volcano_submarineNoCatch.gif)');
                    }
                    wormInCapsule();
                }
    
                // 膠囊中的worms判定
                function wormInCapsule() {
                    if ( $wormInCapsule < 6 ) {
                        $("#frame_volcano .catchedWorm"+$wormInCapsule).addClass("show");   
                    }
                    if ( $wormInCapsule == 5 ) {
                        // 抓取成功
                        volcanoEnding();
                    }
                }
            }, false);
        });
    }
    
    // 抓取成功 animation
    function volcanoEnding () {
        // 移除鍵盤控制
        window.removeEventListener('keydown',function() {
            console.log('removeEventListener keydown FAIL')
        });

        // $("#game_lightbox #bag").addClass("gotSeaWorm");
        // $gotSeaWorm = 1;
        if ($(".bag_space.L").hasClass("gotDesertWorm") == true) {
            $(".bag_space.R").addClass("gotSeaWorm");

        } else {
            $(".bag_space.L").addClass("gotSeaWorm");
        }

        //元素顯示
        setTimeout(function(){
            $("#frame_volcano #success").fadeIn();
        }, 2500);

        //capsule顯示
        setTimeout(function(){
            $("#frame_volcano #capsule_top , #frame_volcano #capsule_hole , #frame_volcano #capsule_bottom").addClass("show");
        }, 4500);

        //膠囊闔起
        setTimeout(function(){
            $("#frame_volcano #capsule_top , #frame_volcano #capsule_hole , #frame_volcano #capsule_bottom").addClass("close");
        }, 5300);

        //膠囊上升＋字、按鈕（回家or前往下個地點）顯示
        setTimeout(function(){
            $("#frame_volcano #capsule").addClass("float");
            $("#frame_volcano #text").addClass("show");
            $("#frame_volcano #success_btn").addClass("show");
        }, 6500);

        // 移除 Map Sea
        $("#map").addClass("seaFin");
    }
    
    // capsule放進包包 animation
    $("#frame_volcano #success_btn").click(function() {
        $(this).fadeOut();
        $("#frame_volcano #text").removeClass("show");
        $("#frame_volcano #success_bg").addClass("hide");
        $("#frame_volcano #capsule").addClass("shrink");
        $("#frame_btnBtm .btn_bagOpen").addClass("open");

        // 開啟地圖補間動畫
        setTimeout(function(){
            $("#game_frame #map_anima").addClass("pop");     
        }, 1710);

        //移除包包打開gif
        setTimeout(function(){
            $("#frame_btnBtm .btn_bagOpen").removeClass("open");
        }, 1810);
        
        setTimeout(function(){
            $("#map #map_text").text("Where you want to go next?");
            $("#map #map_text_bg").show();
            $("#map #map_btn_y , #map #map_btn_n").hide();

            // 自動開啟地圖
            $("#game_lightbox").removeClass('c_showLightbox mapShow bagShow lightFrameShow');
            $("#game_lightbox").addClass('c_showLightbox'); //#game_lightbox 背景出現的很突然
            $("#game_frame #map_anima").removeClass("pop");  
        }, 2210);

        setTimeout(function(){
            $("#frame_volcano #success").fadeOut();
        }, 2510);
    });


    ////////////   ＶＯＬＣＡＮＯ end   /////////////////// 
    ////////////   ＳＥＡ ＤＥＳＥＲＴ   /////////////////// 

    function desertSTART() {
        $("#frame_desert").addClass("opening");
        $("#frame_desert").show();

        // Start
        setTimeout(() => {
            $("#frame_desert #c_start").fadeIn();
        }, 3900);

        // 迴圈生成puzzle
        for (let i = 1; i < 13; i++) {
            $('#bucket_puzzle02').append('<i id="puzzle02_'+i+'" style="background-image: url(img/scene-desert_well_inner02-'+i+'.svg )"></i>');  
        }
        for (let i = 1; i < 36; i++) {
            $('#bucket_puzzle03').append('<i id="puzzle03_'+i+'" style="background-image: url(img/scene-desert_well_inner03-'+i+'.svg )"></i>');
        }

        // 鍵盤控制 demo
        window.addEventListener('keydown', function(e){
            var desertDemoID = e.code;

            if(desertDemoID === 'KeyA')  {
                console.log('A');
                $("#frame_desert #start_keyboard01 i:nth-child(1)").addClass("down");
            }
            if(desertDemoID === 'KeyD')  {
                console.log('D');
                $("#frame_desert #start_keyboard01 i:nth-child(2)").addClass("down");
            }
            if(desertDemoID === 'Space')  {
                console.log('Spacebar');
                $("#frame_desert #start_keyboard02 i:nth-child(1)").addClass("down");
            }
        }, false);
        window.addEventListener('keyup', function(e){
            var desertDemokeyupID = e.code;
            if(desertDemokeyupID === 'KeyA')  {
                console.log('A');
                $("#frame_desert #start_keyboard01 i:nth-child(1)").removeClass("down");
            }
            if(desertDemokeyupID === 'KeyD')  {
                console.log('D');
                $("#frame_desert #start_keyboard01 i:nth-child(2)").removeClass("down");
            }
            if(desertDemokeyupID === 'Space')  {
                console.log('Spacebar');
                $("#frame_desert #start_keyboard02 i:nth-child(1)").removeClass("down");
            }
        }, false);

        // START!
        $("#frame_desert #start_btn").click(function () {
            window.removeEventListener('keydown,keyup',function() {
                console.log('removeEventListener keydown,keyup FAIL')
            });
            $("#frame_desert #c_start").fadeOut();

            // camelCaravan 1s move 1 pixel
            var $camelCaravanPos = 640;
            setInterval(() => {
                if ($camelCaravanPos < -218) {
                    $camelCaravanPos = 2010;
                }
                $camelCaravanPos = $camelCaravanPos - 3;
                // console.log($camelCaravanPos);
                $("#desert_camelCaravan").css("left", $camelCaravanPos+"px");
            }, 1000);

            // AD Space 控制Jeff
            window.addEventListener('keydown', function(e){
                var desertKeyID = e.code;
                var $desertJeffOffsetDistance = parseInt($("#desert_Jeff").offset().left) - parseInt($gameFrameleft);

                console.log('$desertPos: ',$desertPos);
                // console.log("$desertJeffLeft: ",$desertJeffLeft);
                // console.log("$desertJeffOffsetLeft: ",$desertJeffOffsetLeft);
                console.log("$desertJeffOffsetDistance: ",$desertJeffOffsetDistance);

                if(desertKeyID === 'KeyA')  {
                    console.log('A');
                    $desertJeff.css('background-image', 'url(img/scene-desert_manWalk.gif)');
                    $desertJeff.css('transform', 'rotateY(180deg)');

                    if($desertJeffOffsetDistance > 101) {
                        $desertJeffLeft = $desertJeffLeft - 12;
                        $desertJeff.css('left', $desertJeffLeft + 'px');

                    }else{
                        // 控制背景向右
                        if ($desertPos < 0) {
                            $desertPos = $desertPos + 12;
                            $("#frame_desert").css('left', $desertPos +'px');
                            $desertJeffLeft = $desertJeffLeft - 12;
                            $desertJeff.css('left', $desertJeffLeft + 'px');
                        }
                    }
                }
                if(desertKeyID === 'KeyD')  {
                    console.log('D');

                    $desertJeff.css('transform', 'rotateY(0deg)');

                    if ( $desertPos > -1044 ){
                        console.log("$desertPos:",$desertPos);

                        if( $desertJeffOffsetDistance < 700 ) {
                            $desertJeff.css('background-image', 'url(img/scene-desert_manWalk.gif)');

                            $desertJeffLeft = $desertJeffLeft + 12;
                            $desertJeff.css('left', $desertJeffLeft + 'px');

                        }else{
                            $desertPos = $desertPos - 12;
                            $("#frame_desert").css('left', $desertPos +'px');
                            $desertJeffLeft = $desertJeffLeft + 12;
                            $desertJeff.css('left', $desertJeffLeft + 'px');

                        }
                    }else{
                        if( $desertJeffOffsetDistance < 700 ) {
                            $desertJeff.css('background-image', 'url(img/scene-desert_manWalk.gif)');

                            $desertJeffLeft = $desertJeffLeft + 12;
                            $desertJeff.css('left', $desertJeffLeft + 'px');

                        }
                    }
                }

                // Jeff隨沙丘改變高度
                if(desertKeyID === 'KeyA' || desertKeyID === 'KeyD')  {
                    console.log("$desertJeffLeft: ",$desertJeffLeft);

                    // 第一個沙丘開始
                    if ($desertJeffLeft > 161 && $desertJeffLeft < 187) {
                        $desertJeff.css('bottom', '27px');

                    }else if($desertJeffLeft > 186 && $desertJeffLeft < 223){
                        $desertJeff.css('bottom', '24px');

                    }else if($desertJeffLeft > 221 && $desertJeffLeft < 247){
                        $desertJeff.css('bottom', '21px');

                    }else if($desertJeffLeft > 246 && $desertJeffLeft < 271){
                        $desertJeff.css('bottom', '18px');

                    }else if($desertJeffLeft > 270 && $desertJeffLeft < 295){
                        $desertJeff.css('bottom', '15px');

                    }else if($desertJeffLeft > 294 && $desertJeffLeft < 367){
                        $desertJeff.css('bottom', '12px');

                    }else if($desertJeffLeft > 365 && $desertJeffLeft < 475){
                        $desertJeff.css('bottom', '9px');

                    }else if($desertJeffLeft > 474 && $desertJeffLeft < 532){
                        $desertJeff.css('bottom', '12px');

                    }else if($desertJeffLeft > 531 && $desertJeffLeft < 571){
                        $desertJeff.css('bottom', '15px');

                    }else if($desertJeffLeft > 570 && $desertJeffLeft < 631){
                        $desertJeff.css('bottom', '18px');

                    }else if($desertJeffLeft > 630 && $desertJeffLeft < 643){
                        $desertJeff.css('bottom', '21px');

                    }else if($desertJeffLeft > 644 && $desertJeffLeft < 655){
                        $desertJeff.css('bottom', '24px');

                    }else if($desertJeffLeft > 654 && $desertJeffLeft < 655){
                        $desertJeff.css('bottom', '27px');

                    }else if($desertJeffLeft > 644 && $desertJeffLeft < 667){
                        $desertJeff.css('bottom', '30px');

                    }else if($desertJeffLeft > 666 && $desertJeffLeft < 679){
                        $desertJeff.css('bottom', '33px');

                    }else if($desertJeffLeft > 678 && $desertJeffLeft < 691){
                        $desertJeff.css('bottom', '36px');

                    }else if($desertJeffLeft > 690 && $desertJeffLeft < 703){
                        $desertJeff.css('bottom', '39px');

                    }else if($desertJeffLeft > 702 && $desertJeffLeft < 715){
                        $desertJeff.css('bottom', '42px');

                    }else if($desertJeffLeft > 714 && $desertJeffLeft < 727){
                        $desertJeff.css('bottom', '45px');

                    }else if($desertJeffLeft > 726 && $desertJeffLeft < 703){
                        $desertJeff.css('bottom', '48px');

                    }else if($desertJeffLeft > 702 && $desertJeffLeft < 739){
                        $desertJeff.css('bottom', '51px');
                    
                    }else if($desertJeffLeft > 738 && $desertJeffLeft < 751){
                        $desertJeff.css('bottom', '54px');

                    // 第二個沙丘開始
                    }else if($desertJeffLeft > 750 && $desertJeffLeft < 775){
                        $desertJeff.css('bottom', '51px');

                    }else if($desertJeffLeft > 774 && $desertJeffLeft < 787){
                        $desertJeff.css('bottom', '48px');

                    }else if($desertJeffLeft > 786 && $desertJeffLeft < 799){
                        $desertJeff.css('bottom', '45px');

                    }else if($desertJeffLeft > 798 && $desertJeffLeft < 823){
                        $desertJeff.css('bottom', '42px');

                    }else if($desertJeffLeft > 822 && $desertJeffLeft < 847){
                        $desertJeff.css('bottom', '39px');

                    }else if($desertJeffLeft > 846 && $desertJeffLeft < 871){
                        $desertJeff.css('bottom', '36px');

                    }else if($desertJeffLeft > 870 && $desertJeffLeft < 895){
                        $desertJeff.css('bottom', '33px');

                    }else if($desertJeffLeft > 894 && $desertJeffLeft < 919){
                        $desertJeff.css('bottom', '30px');

                    }else if($desertJeffLeft > 918 && $desertJeffLeft < 943){
                        $desertJeff.css('bottom', '27px');

                    }else if($desertJeffLeft > 942 && $desertJeffLeft < 967){
                        $desertJeff.css('bottom', '24px');

                    }else if($desertJeffLeft > 966 && $desertJeffLeft < 1015){
                        $desertJeff.css('bottom', '21px');

                    }else if($desertJeffLeft > 1014 && $desertJeffLeft < 1123){
                        $desertJeff.css('bottom', '24px');

                    }else if($desertJeffLeft > 1121 && $desertJeffLeft < 1135){
                        $desertJeff.css('bottom', '27px');

                    }else if($desertJeffLeft > 1134 && $desertJeffLeft < 1147){
                        $desertJeff.css('bottom', '30px');

                    }else if($desertJeffLeft > 1145 && $desertJeffLeft < 1159){
                        $desertJeff.css('bottom', '33px');

                    }else if($desertJeffLeft > 1158 && $desertJeffLeft < 1171){
                        $desertJeff.css('bottom', '36px');

                    }else if($desertJeffLeft > 1170 && $desertJeffLeft < 1183){
                        $desertJeff.css('bottom', '39px');

                    }else if($desertJeffLeft > 1182 && $desertJeffLeft < 1195){
                        $desertJeff.css('bottom', '36px');

                    // 第三個沙丘開始
                    }else if($desertJeffLeft > 1194 && $desertJeffLeft < 1207){
                        $desertJeff.css('bottom', '33px');

                    }else if($desertJeffLeft > 1362 && $desertJeffLeft < 1567){
                        $desertJeff.css('bottom', '27px');
                        
                    }else if($desertJeffLeft > 1566 && $desertJeffLeft < 1615){
                        $desertJeff.css('bottom', '24px');
                        
                    }else if($desertJeffLeft > 1614 && $desertJeffLeft < 1664){
                        $desertJeff.css('bottom', '24px');
                        
                    }else if($desertJeffLeft > 1663 && $desertJeffLeft < 1674){
                        $desertJeff.css('bottom', '21px');
                        
                    }else if($desertJeffLeft > 1673 && $desertJeffLeft < 1747){
                        $desertJeff.css('bottom', '15px');
                        
                    }else{
                        $desertJeff.css('bottom', '30px');
                    }



                }

                // Jeff draw water
                if(desertKeyID === 'Space')  {
                    console.log('Spacebar');
                    if ($desertJeffLeft > 1493 && $desertJeffLeft < 1627 ) {
                        $desertJeff.css('transform', 'rotateY(0deg)');
                        $desertJeff.css("background-image","none");
                        $desertJeff.css('left', '1521px');
                        $desert_Jeff_drawWater.css("background-image","url(img/scene-desert_drawWater.gif");

                        //well gif
                        setTimeout(() => {
                            $('#desert_well').addClass("drawUp");
                            
                        }, 700);

                        drawWater();
                    }
                }
            }, false);

            // 移除走路 gif 
            window.addEventListener('keyup', function(e){
                var desertKeyupID = e.code;
                if(! desertKeyupID === 'Space')  {
                    $desertJeff.css('background-image', 'url(img/scene-desert_man.gif)');
                }
            }, false);
        });

        function drawWater() {
            //移除draw water gif
            setTimeout(() => {
                console.log("setTimeout");
                $('#desert_Jeff_drawWater').addClass("drawUp");
                $('#desert_well').addClass("drawDone");
                
            }, 5700);

            setTimeout(() => {
                wellShow();
            }, 6700);
        }

        // well puzzle
        function wellShow() {
            console.log("wellShow");
            $("#frame_desert #bucket_puzzle01").addClass("now");
            $("#well_bg").fadeIn();

            $('#frame_desert #well_bg , #frame_desert #success').css("left",Math.abs($desertPos));
            $('#frame_desert #well_bucket').css("left",Math.abs($desertPos) + 184);
            $('#frame_desert #well_bucket .fontSize_28').css("left",Math.abs($desertPos) + 260);

            // 桶子上提
            setTimeout(() => {
                $("#frame_desert #well_bucket").addClass("show");
                $("#frame_desert .fontSize_28").addClass("show");
            }, 1500);
        }

        // 點擊puzzle旋轉
        $('#well_bucket i[id^="puzzle"]').click(function(){
            console.log("clicked puzzle");
            $('#frame_desert #bucket_click').fadeOut();

            let $rotateZ = $(this).css("transform");
            // console.log("be: ",$rotateZ);
            
            if ($rotateZ == "matrix(1, 0, 0, 1, 0, 0)") { //0deg
                $(this).css({
                    "transition":"all 0s",
                    "transform":"rotate(-360deg)"
                });

                // 度數由-270deg轉至0deg時會逆著轉，故調整transition，並最小限度的延遲讓程式生效
                setTimeout(() => {
                    $(this).css("transition","all 0.2s ease-out");
                    $(this).css("transform","rotate(-270deg)");
                }, 1);

                $rotateZ = $(this).css("transform");
                
            } else if($rotateZ == "matrix(6.12323e-17, -1, 1, 6.12323e-17, 0, 0)"){ //-90deg
                $(this).css("transform","rotate(0deg)");
                    $rotateZ = $(this).css("transform");

            } else if($rotateZ == "matrix(-1, -1.22465e-16, 1.22465e-16, -1, 0, 0)"){ //-180deg
                $(this).css("transform","rotate(-90deg)");
                $rotateZ = $(this).css("transform");
                
            } else if($rotateZ == "matrix(-1.83697e-16, 1, -1, -1.83697e-16, 0, 0)"){ //-270deg
                $(this).css("transform","rotate(-180deg)");
                $rotateZ = $(this).css("transform");

            } else {
                console.log("X(");
            }

            // console.log("af: ",$rotateZ);
            // 過快exam會造成吐出值有誤
            setTimeout(() => {
                puzzleExam();
            }, 1000);
        });

        // 角度驗證
        function puzzleExam() {
            if ($("#frame_desert #bucket_puzzle01").hasClass("now")) {
            // puzzle01    
                if ($("#puzzle01_2").css("transform") == "matrix(1, 0, 0, 1, 0, 0)"){
                    puzzleExamCorrect();
                }
                
            } else if($("#frame_desert #bucket_puzzle02").hasClass("now")) {
            // puzzle02

                var $puzzle02Num = 0;
                $("#frame_desert #bucket_puzzle02 i").each(function () {
                    if ($(this).css("transform") == "matrix(1, 0, 0, 1, 0, 0)"){
                        $puzzle02Num ++;
                        console.log('$puzzle02Num: ',$puzzle02Num);
                    }
                });
                if ($puzzle02Num == 12) {
                    puzzleExamCorrect();

                }else{
                    console.log("error :(");
                }
                
            }else{
            // puzzle03

                var $puzzle03Num = 0;
                $("#frame_desert #bucket_puzzle03 i").each(function () {
                    if ($(this).css("transform") == "matrix(1, 0, 0, 1, 0, 0)"){
                        $puzzle03Num ++;
                        console.log('$puzzle03Num: ',$puzzle03Num);
                    }
                });
                if ($puzzle03Num == 35) {
                    puzzleExamCorrect();

                }else{
                    console.log("error :(");
                }
            }
        }

        // 角度驗證正確
        function puzzleExamCorrect() {
            console.log("success!");

            if ($("#frame_desert #bucket_puzzle01").hasClass("now") == true) {
            // puzzle01
                $('#well_bucket #bucket_puzzle01 i').css("pointer-events","none");
                $("#frame_desert #puzzle01_glow").addClass("show");

                setTimeout(() => {
                    $("#frame_desert #bucket_puzzle01 i").fadeOut();
                }, 510);

                setTimeout(() => {
                    $("#frame_desert #puzzle01_glow").addClass("get");
                    $("#frame_desert #blank_Geobacter:nth-child(1)").addClass('show');
                }, 1500);

                setTimeout(() => {
                    $("#frame_desert #bucket_puzzle01").removeClass("now");
                }, 2500);

                // 切換成puzzle02
                setTimeout(() => {
                    $("#frame_desert #well_bucket").removeClass("show");
                }, 3000);
                
                setTimeout(() => {
                    $("#frame_desert #bucket_puzzle02").addClass("now");
                    $("#frame_desert #well_bucket").addClass("show");
                }, 4300);

            }else if($("#frame_desert #bucket_puzzle02").hasClass("now") == true){
                // puzzle02
                // console.log("puzzle02 now");
                $('#well_bucket #bucket_puzzle02 i').css("pointer-events","none");
                $("#frame_desert #puzzle02_glow").addClass("show");

                setTimeout(() => {
                    $("#frame_desert #bucket_puzzle02 i").fadeOut();
                }, 510);

                setTimeout(() => {
                    $("#frame_desert #puzzle02_glow").addClass("get");
                    $("#frame_desert #blank_Geobacter:nth-child(2) , #frame_desert #blank_Geobacter:nth-child(3)").addClass('show');
                }, 1500);

                setTimeout(() => {
                    $("#frame_desert #bucket_puzzle02").removeClass("now");
                }, 2500);

                // 切換成puzzle03
                setTimeout(() => {
                    $("#frame_desert #well_bucket").removeClass("show");
                }, 3000);
                
                setTimeout(() => {
                    $("#frame_desert #bucket_puzzle03").addClass("now");
                    $("#frame_desert #well_bucket").addClass("show");
                }, 4300);

            }else{
            // puzzle03
                // console.log("puzzle03 now");
                $('#well_bucket #bucket_puzzle03 i').css("pointer-events","none");
                $("#frame_desert #puzzle03_glow").addClass("show");

                setTimeout(() => {
                    $("#frame_desert #bucket_puzzle03 i").fadeOut();
                }, 510);

                setTimeout(() => {
                    $("#frame_desert #puzzle03_glow").addClass("get");
                    $("#frame_desert #blank_Geobacter:nth-child(4) , #frame_desert #blank_Geobacter:nth-child(5) , #frame_desert #blank_Geobacter:nth-child(6) , #frame_desert #blank_Geobacter:nth-child(7)").addClass('show');
                }, 1500);

                setTimeout(() => {
                    $("#frame_desert #well_bucket .fontSize_28").css("transition","all 1.5s ease-out");
                    $("#frame_desert #bucket_puzzle03").removeClass("now");
                }, 2500);

                desertEnding ();

            }
        }
    
        // 抓取成功 animation
        function desertEnding () {
            // 移除鍵盤控制
            window.removeEventListener('keydown',function() {
                console.log('removeEventListener keydown FAIL')
            });

            // $("#game_lightbox #bag").addClass("gotDesertWorm");
            // $gotDesertWorm = 1;
            if ($(".bag_space.L").hasClass("gotSeaWorm") == true) {
                $(".bag_space.R").addClass("gotDesertWorm");

            } else {
                $(".bag_space.L").addClass("gotDesertWorm");
            }

            //元素顯示
            setTimeout(function(){
                $("#frame_desert #success").fadeIn();
                $("#frame_desert #well_bucket .fontSize_28").css("top","-120px");
                
            }, 2500);

            //capsule顯示
            setTimeout(function(){
                $("#frame_desert #capsule_top , #frame_desert #capsule_hole , #frame_desert #capsule_bottom").addClass("show");
            }, 4500);

            //膠囊闔起
            setTimeout(function(){
                $("#frame_desert #capsule_top , #frame_desert #capsule_hole , #frame_desert #capsule_bottom").addClass("close");
            }, 5300);

            //膠囊上升＋字、按鈕（回家or前往下個地點）顯示
            setTimeout(function(){
                $("#frame_desert #capsule").addClass("float");
                $("#frame_desert #text").addClass("show");
                $("#frame_desert #success_btn").addClass("show");
            }, 6500);

            // 移除 Map Desert
            $("#map").addClass("dsertFin");
        }

        // capsule放進包包 animation
        $("#frame_desert #success_btn").click(function() {
            $(this).fadeOut();
            $("#frame_desert #text").removeClass("show");
            $("#frame_desert #success_bg").addClass("hide");
            $("#frame_desert #capsule").addClass("shrink");
            $("#frame_btnBtm .btn_bagOpen").addClass("open");

            // 開啟地圖補間動畫
            setTimeout(function(){
                $("#game_frame #map_anima").addClass("pop");     
            }, 1710);

            //移除包包打開gif
            setTimeout(function(){
                $("#frame_btnBtm .btn_bagOpen").removeClass("open");
            }, 1810);

            setTimeout(function(){
                $("#map #map_text").text("Where you want to go next?");
                $("#map #map_text_bg").show();
                $("#map #map_btn_y , #map #map_btn_n").hide();

                // 自動開啟地圖
                $(".c_showLightbox").removeClass('c_showLightbox mapShow bagShow lightFrameShow');
                // $("#game_lightbox , #map , #map_close").addClass('c_showLightbox'); //#game_lightbox 背景出現的很突然
                $("#game_lightbox").addClass('c_showLightbox'); //#game_lightbox 背景出現的很突然
                $("#game_frame #map_anima").removeClass("pop");  
                // event.stopPropagation(); // 阻止泡泡事件
            }, 2210);

            setTimeout(function(){
                $("#frame_desert #success").fadeOut();
            }, 2510);
        });
    }
                      
    ////////////   ＤＥＳＥＲＴ end   ///////////////////// 
    ////////////   ＥＮＤＩＮＧ   /////////////////////////
    function finalEnding() {
        // console.log("finalEnding");
        $("#frame_btnBtm , #frame_btnTop").animate({right:"-70px"});

        setTimeout(function(){
            $("#FinalEnding").show();
            $("#game_frame").css("background-color","#1d2023");
        }, 1000);
        
        setTimeout(function(){
            $("#FinalEnding").css("background-image","url(img/scene-finalEnding.svg)");
            $("#frame_home").remove();
        }, 24300);
        $("#frame_volcano , #frame_desert , #map_anima , #game_lightbox").remove();

        // 感謝名單
        setTimeout(function(){
            $("#FinalEnding").addClass("scrollUp");
            $("#Credits").addClass("scrollUp");
        }, 26300);

        $("#Credits #restart").click(function(){
            location.reload(true);
        });
    }
    ////////////   ＥＮＤＩＮＧ end   ///////////////////// 



    //////////// 其他函數包 //////////////////////// 

    //四捨五入到num後面的n位
    function getResult(num,n){
        return Math.round(num*Math.pow(10,n))/Math.pow(10,n);
    };
});
