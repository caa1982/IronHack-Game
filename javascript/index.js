$(document).ready(function () {
    gameMenu();
    animatedCss();
    play();
});


var _u = _.noConflict();
var speed = 2000, level = 1, shoot = 0, timer = 30, count = 0, numHead = 3, bullets = 100;
var audio = document.createElement("audio");
var gunSound = "./sounds/magnum.mp3";
var killSound = "./sounds/wilhem.mp3";
var countDown;
var intervalIds = [];
var head = [];
var merkelHeads = [];
var animation = {
    flash: "flash",
    rubber: "rubberBand",
    bounce: "bounce",
    pulse: "pulse",
    flip: "flip",
    shake: "shake",
    swing: "swing",
    tada: "tada",
    wobble: "wobble",
    jello: "jello"
};

//add animateCss to jquery
function animatedCss() {
    $.fn.extend({
        animateCss: function (animationName) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            this.addClass('animated ' + animationName).one(animationEnd, function () {
                $(this).removeClass('animated ' + animationName);
            });
        }
    });
}

//animate socialMedia
$("a > img").on("mouseover", function () {
    $(this).animateCss(animation.flip);
});


//bitcoin Click menu donation page
$(".bitcoin").on("click", function () {
    $("h1, h2, .bitcoin").slideToggle("slow");
    bitcoinDonation();
});

function bitcoinDonation() {


    setTimeout(function () {

        $(".container").append($("<div></div>")
            .addClass("btcDonation text-center animated fadeInDownBig")
            );

        $(".btcDonation").append(
            $("<h2>Bitcoin Donations QR Code</h2>"),
            $("<img src='img/QRcode.png'>"),
            $("<h2>Total Donation:</h2>"),
            $("<h2><span class='donation'></span> btc</h2>"),
            $("<img class='arrow' src='img/arrow-left.png'>")
            );

        $(".arrow").on("click", function () {
            $(".btcDonation").remove();
            $("h2, h1, .bitcoin").slideToggle("slow");
        });

        $.getJSON("https://blockchain.info/q/addressbalance/1BmJkh8ukFBQANavHXLBeJaY7k3HsZtwSa", function (data) {
            $(".donation").html(data/100000000);
        });


    }, 600);
}

//play trump Intro sound
function play(){
    audio.setAttribute("src", "./sounds/trumpintro.mp3");
    audio.play();
}

function gameMenu() {
    headContainerClick();

    //animate bitcoin coin
    $(".bitcoin").addClass("animated infinite flip");

    //make the h2 option menu flash and toggle
    $("h2").on("click", function () {
        $(this).animateCss(animation.flash);
        $(this).unbind("click");
        setTimeout(function () {
            $("h1, h2, .bitcoin").slideToggle("slow");
            selectGame(this.id);
        }.bind(this), 1400);

    });

}    

//head of Merkel shoot her and you get -5sec
function merkelHead() {
    var randomNumHeads = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
    merkelHeads = [];
    for (var i = 0; i < randomNumHeads; i++) {
        merkelHeads.push("merkelHead");
    }
    createHead(merkelHeads, randomNumHeads);
}

//check start-game selection
function selectGame(key) {
    switch (key) {
        case "trump-game":
        for (var i = 0; i < 10; i++) { head.push("trumpHead"); }
            startGame();
        stats();
        $("body").css("background-image", "url('./img/trumpgame.jpg')");
        break;
        case "trumpPutin-game":
        for (var x = 0; x < 5; x++) { head.push("trumpHead"); head.push("putinHead"); }
            startGame();
        stats();
        $("body").css("background-image", "url('./img/trumpPutin.jpg')");
        break;
        case "trumpPutinKim-game":
        for (var y = 0; y < 2; y++) { head.push("putinHead", "trumpHead", "kimHead", "kimHead", "kimHead"); }
            startGame();
        stats();
        $("body").css("background-image", "url('./img/trumpPutinKim.jpg')");
        break;
        case "setting":
        setTimeout(function () {
            gameOptions();
        }, 800);
        break;
    }
}

//append level, shoot fired and timer to container
function stats() {
    setTimeout(function(){
        $(".container").append($("<div></div>")
            .addClass("top text-center")
            );
        $(".top").append($("<h3 class='a'>Level:<span class='level'>1</span></h3>"));

        $(".container").append($("<div></div>")
            .addClass("middle text-center")
            );
        $(".middle").append($("<h3 class='reload animated infinite zoomIn'>reload (click right or swipe)</h3>"));

        $(".container").append($("<div></div>")
            .addClass("row bottom align-items-end text-center")
            );
        $(".bottom").append(
            $("<h3 class='b'>Shoot fired:<span class='shoot-fired'>0</span></h3>"),
            $("<h3 class='time-left'>Time left:<span class='timer'>30</span></h3>"),
            $("<h3 class='shoot-left'>Bullets Left:<span class='bullets'>6</span></h3>")
            );
        $(".b, .time-left, .shoot-left").addClass("col");
    }, 1000)
}

//countDown timer setInterval
function chrono() {
    var randomTimeMerkel = Math.floor(Math.random() * (30 - 20 + 1)) + 20;
    countDown = setInterval(function () {
        timer -= 1;
        $(".timer").html(timer);
        if (timer <= 0) {
            clearInterval(countDown);
            gameOver();
        }
        else if (timer === 5) {
            audio.setAttribute("src", "./sounds/voice5sec.mp3");
            audio.play();
        }
        else if (timer < 8) {
            $(".time-left").animateCss(animation.flash);
        }
        else if (timer === randomTimeMerkel) {
            merkelHead();
        }
    }, 1000);
}

//start trump game
function startGame() {
    shoot = 0;
    bullets = 6;
    $(".shoot-fired").html(shoot);
    setTimeout(function () {
        createHead(head, numHead);
        chrono();
    }, 1000);
}


function headContainerClick(){
    //play Shoot Sound & add shoot to shoot fired
    $(".container").on("click", function () {
        shoot += 1;
        bullets -= 1;
        $(".shoot-fired").html(shoot);
        $(".bullets").html(bullets);
        audio.setAttribute("src", gunSound);
        audio.play();
        if(bullets === 0){
            $(".container").off("click");
            $(".middle").css("visibility", "visible");
        }
    });

    //make the 1st menu title hinge
    $(".trump-hunt").on("click", function () {
        $(this).animateCss("hinge");
    });




//click head explode target, counter for level, clearIntervals
$(".container").on("click", ".head", function () {
    var audio = document.createElement("audio");
    $(this).click(false);
    if ($(this).attr("src") === "./img/merkelHead.png") {
        timer -= 5;
    }
    else {
        count++;
    }
    $(this).removeClass("animated infinite flip");

    audio.setAttribute("src", killSound);
    audio.play();

    setTimeout(function () {
        $(this).hide("explode", { pieces: 64 }, 1000).remove();
    }.bind(this), 700);

    if (count === numHead && timer !== 0) {
        count = 0;
        speed -= 250;
        numHead += 1;
        level += 1;
        timer = 30;
        for (var i = 0; i < intervalIds.length; i++) { clearInterval(intervalIds[i]); }
            if (level === 8) {
                $(".head").remove();
                clearInterval(countDown);
                winGame();
            }
            else {
                $(".level").html(level);
                $(".head").remove();
                clearInterval(countDown);
                setTimeout(function () {
                    startGame();
                }, 1000);
            }
        }
    });

}


//game Over 
function gameOver() {
    audio.setAttribute("src", "./sounds/game-over.mp3");
    audio.play();
    $(".head, .top, .middle, .bottom").remove();
    $(".container").append("<img src='./img/game-over.jpg' class='game-over animated infinite " + _.sample(animation) + "'>");
    setTimeout(function () {
        location.reload();
    }, 11000);
}

//win game
function winGame() {
    var audio = document.createElement("audio");
    audio.setAttribute("src", "./sounds/win-game.mp3");
    audio.play();
    $(".head, .top, .middle, .bottom").remove();
    $(".container").append("<img src='./img/game-win.jpg' class='game-win animated infinite " + _.sample(animation) + "'>");
    setTimeout(function () {
        location.reload();
    }, 11000);
}


//claculate top and left positions to animate heads
function animateTopLeftCss() {
    var h = $(".container").height() - 50;
    var w = $(".container").width() - 50;
    var top = Math.floor(Math.random() * h);
    var left = Math.floor(Math.random() * w);

    return [top, left];
}

//create Head
function createHead(array, num) {
    for (var i = 0; i < num; i++) {
        var positions = animateTopLeftCss();
        var animateId = "animate" + array[i] + i;
        $(".container").append($("<img>")
            .attr("src", "./img/" + array[i] + ".png")
            .addClass("head mx-auto animated infinite " + _.sample(animation))
            .attr("id", animateId)
            .css("top", positions[0] + "px")
            .css("left", positions[1] + "px")
            );
        animateImg("#" + animateId);
    }
}



//animate heads
function animateImg(headId) {
    intervalIds.push(setInterval(function () {
        var positions = animateTopLeftCss();
        $(headId).animate({ top: positions[0], left: positions[1] }, false);
    }, speed));
}

//Game options
function gameOptions() {
    $(".container").append($("<div></div>")
        .addClass("options text-center animated fadeInDownBig")
        );

    $(".options").append($("<h2>Crosshairs</h2>"));

    for (var i = 1; i < 7; i++) {
        $(".options").append($("<img class='cursor' src='img/cursor" + i + ".png'>"));
    }

    $(".options").append(
        $("<h2>Gun Sounds</h2>"),
        $("<img id='bazooka' class='gun' src='img/bazooka.png'>"),
        $("<img id='magnum' class='gun' src='img/magnum.png'>"),
        $("<img id='AK47' class='gun' src='img/ak47.png'>"),
        $("<h2>Kill Sounds</h2>"),
        $("<img title='wilhem-screm' id='wilhem' class='sounds' src='img/sound-icon.ico'>"),
        $("<img title='Trump grab-them' id='grab-them' class='sounds' src='img/sound-icon.ico'>"),
        $("<img title='torture' id='torture' class='sounds' src='img/sound-icon.ico'>"),
        $("<img title='sports-crowd'id='sports-crowd' class='sounds' src='img/sound-icon.ico'>"),
        $("<img class='arrow' src='img/arrow-left.png'>")
        );

    $(".cursor").on("click", function () {
        var cursor = $(this).attr('src');
        $("body, ul a").css("cursor", 'url("./' + cursor + '") 50 50, auto');
    });

    $(".gun").on("click", function () {
        gunSound = "./sounds/" + this.id + ".mp3";
    });

    $(".sounds, .gun, .cursor").on("mouseover", function () {
        $(this).animateCss(_.sample(animation));
    });

    $(".sounds").on("click", function () {
        var audio = document.createElement("audio");
        killSound = "./sounds/" + this.id + ".mp3";
        audio.setAttribute("src", killSound);
        audio.play();
    });

    $(".arrow").on("click", function () {
        $(".options").remove();
        $("h2, h1, .bitcoin").slideToggle("slow");
    });

}


$(".container").on("contextmenu", function(){
    reload();
})

$(".container").on("swipe", function(){
    reload();
})

function reload(){
    bullets = 6;
    $(".middle").css("visibility", "hidden");
    $(".bullets").html(bullets);
    headContainerClick();
}
