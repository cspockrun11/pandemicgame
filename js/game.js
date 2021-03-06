const $game = $("#game");
//supplies counters
var money = 1200;
var cannedFoods = 10;
var sourdoughStarters = 3;
var masks = 2;
var userInput = "";
var day = 1;

var timesNotWornMask = 0;

var wearingMask = false;

var rentDueTomorrow = false;
var rentDueDay = 0;

const luck = Math.random();


$(function () {
    console.log("luck: " + luck);
    $("#startButton").focus();
    $("#startButton").on('click', function (e) {
        $(this).hide();
        e.preventDefault();
        //events counters
        const gatheringsAttended = 0;
        const multiplier = 0;
        $("#game").show();
        $("section#gametoolbar").show();
        updateMoney(money);
        updateCannedFoods(cannedFoods);
        updateSourdough(sourdoughStarters);
        updateMasks(masks);

        updateDay(1);

    });


});

$("#theInput").on('keyup', function (e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
        if (money < 0 || money == 0) {
            alert("You can't pay your rent! You're being evicted because your state didn't put into place any temporary halts in residential evictions! You're now on the street, without a mask. Guess what happens next...");
            getCovid();
        }
        userInput = $(this).val();
        console.log(userInput);
        userInput = userInput.toLowerCase().trim();
        switch (userInput) {
            case "put on mask":
            case "put on a mask":
            case "wear mask":
                if (masks !== 0) {
                    if (wearingMask) {
                        updateMasks(masks - 1);
                        wearingMask = true;
                        appReact("Oh - uhh, ok, cool, you put on another mask on top of the one you already had on. You take out your phone and say, <em>Hey Siri: in September 2021, remind me to wear 2 condoms.</em>");
                    } else {
                        updateMasks(masks - 1);
                        wearingMask = true;
                        appReact("You put on your mask! Hopefully no one stupid outside isn't wearing one! <em>-1 mask</em>.");
                    }
                } else {
                    appReact("You can't put on a mask when you don't have any left! Now you know how all the nurses feel.");
                }
                break;
            case "go to work":
                if (wearingMask) {
                    //we good
                    if (day == 1) {
                        appReact("You... don't know how to read a calendar, and you went to work on Sunday. No one's here, good thing. You realized you don't have to work so you went back home.");
                    } else {
                        appReact("You start to go to work -- oh! You forgot you were laid off. You went back home.");
                    }

                } else {
                    if (day == 1) {
                        appReact("You... don't know how to read a calendar, and you went to work on Sunday. No one's here, good thing. You realized you don't have to work so you went back home.");
                    } else { 
                        caughtCovid = checkCatch();
                        if (!caughtCovid) {
                            if (day !== 1) {
                                appReact("You went to work like any other normal day... except you realize you don't have a job. You were laid off a month ago. So you went nowhere. Luckily you still have money left (I think)!");
                            }
                        } else {
                            getCovid();
                        }
                    }
                }
                incrementDay();

                break;
            case "watch tv":
            case "watch television":
            case "tv":
                var tvArray = [
                    "You watch this awesome show called Attack on Titan and you get completely hooked by it. Some would say you 'lose' 2 days, but you really don't count them as lost at all. It is an amazing show and the final season starts in December. Can't wait.",
                    "<em>Thank you for being a friiiiiiiiieeeennnndddd....</em>",
                    "FOX News makes a lot of sens----oh shit I gotta get outta this house.",
                    "Frasier oscillates between being incredibly good and incredibly annoying. Here comes season 6!",
                    "What are your favorite TNG episodes?",
                    "Well, at least they defunded COPS."
                ];
                var tvToWatch = Math.floor(Math.random() * tvArray.length);
                appReact("You decide to watch some TV. <br/>" + tvArray[tvToWatch]);
                if (tvToWatch == 0) {
                    incrementDay();
                }
                incrementDay();
                break;
            case "find job":
            case "find a job":
            case "look for a job":
                if (luck > 0.9) {
                    appReact("Holy shit you actually found a job! You apply for it, and they call you back immediately! Wow! You answer the phone, and it's a recorded message saying the company is temporary closed. Oh well, back to Animal Crossing.");
                } else {
                    appReact("There aren't any jobs. At least, not for you.");

                }
                incrementDay();
                wearingMask = false;
                break;
            case "join zoom meeting":
            case "zoom call":
            case "go on zoom call":
            case "call on zoom":
                if (!wearingMask) {
                    appReact("You make sure you're wearing a shirt that doesn't have any food stains on it. You make some salient points about the subject matter at hand, and escape unscathed (mostly). A productive day!!!!");
                } else {
                    appReact("Even though you make sure you're wearing a shirt with no food stains on, and you're even wearing pants, the person you're meeting with thinks you've gone off the deep end because you're wearing a mask on your Zoom call. Whatever -- better safe than sorry!");
                }
                incrementDay();
                break;
            case "enter cave":
                appReact("You're not currently playing a video game.");
                break;
            case "bake bread":
            case "make bread":
            case "make sourdough":
            case "make sourdough bread":
            case "use sourdough":
            case "user sourdough starter":
                if (sourdoughStarters > 0) {
                    if (luck > 0.5) {
                        appReact("You somehow successfully don't kill your sourdough starter! You make some delicious bread. \"Shit, I could surivve in the 1400s no problem!\" you muse as you drizzle that gorgeous bread in warm butter and scarf it down. A gorgeous nap ensues. Evening came, and morning followed. Day " + day + " complete.");
                        updateSourdough(sourdoughStarters - 1);
                    } else if (luck > 0.2 && luck < 0.5) {
                        appReact("You literally have no idea what to do with this bread starter -- is sourdough even a bread? -- so you flail at the oven and nothing happens. ");
                        updateSourdough(sourdoughStarters - 1);
                    } else {
                        appReact("You tried at this thing for like, seriously 23 out of your 24 hours today. Apart from a few fires, where you learned how to use your fire extinguisher finally after you've had it in your broom closet for the last 8 years wondering what it was half the time, this was an unmitigated disaster. You have no sourdough left, and it's probably for the best.");
                        updateSourdough(0);
                    }
                    incrementDay();
                } else {
                    appReact("Awkward - you have no sourdough starters with which to start sourdough. Try something else?");
                }
                break;
            case "play animal crossing":
            case "animal crossing":
                appReact("Better get back to trying to pay off that damn basement.");
                incrementDay();
                break;
            case "video games":
            case "play video game":
            case "play video games":
                var vgArray = [
                    "Video games don't make society violent; ignoring the plight of all but the richest/luckiest in the country makes people violent. But hey - Tetris is pretty great.",
                    "DOOM ETERNAL, HERE WE GO",
                    "Is it Cyberpunk 2077 time yet??",
                    "Factorio for another 24 hours. The factory must grow.",
                    "Is it possible to clear all the lines in Tetris?? Let's find out."
                ]
                var vgToPlay = Math.floor(Math.random() * vgArray.length);
                appReact(vgArray[vgToPlay]);
                incrementDay();
                break;

            case "get groceries":
            case "go shopping":
            case "ford the grocery aisle":
            case "ford the grocery ailes":
            case "go to the store":
            case "go to kroger":
                if (wearingMask) {
                    appReact("You go shopping at your local Kroger/Giant Eagle/Meijer. You brought your Wine With DeWine thermos filled to the brim, so you're ready to watch on the TVs while pushing your cart down the one-way aisles and carefully adjusting your glasses because they keep fucking fogging up. <br/>You didn't get toilet paper because, surprise, they were still out. You spent $100.");
                    updateMoney(money - 100);
                    incrementDay();
                    wearingMask = false;
                    appPrompt("It's the next day. Now what?");

                } else {
                    caughtCovid = checkCatch();
                    if (!caughtCovid) {
                        timesNotWornMask++;
                        appReact("You go shopping at your local Kroger/Giant Eagle/Meijer. You notice you're getting weird looks, and you realize it's because you're not wearing a mask! Somehow you get home without catching COVID... this time. <br/>You spent $200.<br/>");
                        updateMoney(money - 200);
                        incrementDay();
                        appPrompt("It's the next day. Now what?");
                    } else {
                        getCovid();
                    }
                }
                break;
            case "find masks":
            case "find more masks":
            case "order masks":
            case "get masks":
            case "get more masks":
            case "buy masks":
            case "buy mask":
                if (luck > 0.2) {
                    appReact("You go online looking for more masks. You find a case of 5 N-95 masks for $100 - \"fucking hoarders\", you mumble. <em>+ 5 masks</em>");
                    updateMoney(money - 100);
                    updateMasks(masks + 5);
                } else {
                    appReact("You order a few masks from some shady online store you find after putting \"bye maask\" into Bing. You paid $100. They never arrive.");
                    updateMoney(money - 100);
                }

                incrementDay();
                break;
            case "go to party":
            case "visit friends":
            case "go to gathering":
            case "go to church":
                if (!wearingMask) {
                    caughtCovid = checkCatch();
                    if (!caughtCovid) {
                        appReact("You just got back from the outside world. It was generally fun, but something feels off --- oh shit, you weren't wearing your mask! Somehow you still feel ok, other than an insane sense of guilt and misfortune for having potentially exposed yourself and others to the effects of a deadly pandemic. Oh well! Time for Animal Crossing.");
                        incrementDay();
                    } else {
                        getCovid();
                    }
                } else {
                    caughtCovid = checkCatch();
                    if (caughtCovid) {
                        alert("Even though you were wearing your mask, you caught COVID from some asshole that had it around his chin the whole damn time. ");
                        getCovid();
                    } else {
                        appReact("You went out and had a good time. You were wearing your mask, and you spotted a few people with it around their mouth, or chin, and you still scraped by without getting it. Overall you didn't really want to go and now have a gnawing fear for the next time you go out. That's totally normal, right? ....Right??");
                        incrementDay();
                    }
                }
                break;
            case "sleep":
            case "take nap":
            case "take a nap":
                appReact("You slept all day. Some would say it's safer than trying to bake your own bread.");
                incrementDay();
                break;
            case "get covid":
                appReact("....Ok. You got covid.");
                getCovid();
                break;
            default:
                appReact("I don't know how to " + userInput + ".");
                break;

        } //end switch

        clearInput();
        clearPrompt();



        if (rentDueTomorrow && day == rentDueDay) {
            updateMoney(money - 500);
            rentDueTomorrow = false;
        }

        if (day % 5 == 0) {
            appPrompt("<strong>Your rent is due tomorrow! $500 will be debited from your account!</strong>");
            rentDueTomorrow = true;
            console.log("rent due: " + rentDueTomorrow);
            rentDueDay = day + 1;

        } else {
            rentDueTomorrow = false;
        }


    }


});

function incrementDay() {
    day++;

    updateDay(day);
    wearingMask = false;
}

function clearInput() {
    $("#theInput").val('');
}

function clearPrompt() {
    $("p#prompt").html('');
}

function checkCatch() {
    if (!wearingMask && luck < 0.5) {
        return true;
    } else {
        if (luck > 0.9) {
            return false;
        } else {
            return true;
        }
    }
}

function getCovid() {
    alert("You weren't wearing a mask. You caught COVID. The hospistals were overrun with people like you, so you couldn't get proper treatment. Game over.");
    $("html").html("<body class='gameOver'><h1>Game Over</h1><p>Next time wear a damn mask.</p>");
}

function appReact(message) {
    $("#appreaction").html(message);
}

function appPrompt(prompt) {
    $("#prompt").html(prompt);
}

function updateCannedFoods(c) {
    cannedFoods = c;
    $("#cannedFoods").val(c);

}

function updateMoney(m) {
    money = m;
    $(".money").html("$" + m);

    $("#money").val(m);

}

function updateSourdough(s) {
    $("#sourdoughStarter").val(s);
    sourdoughStarters = s;
}

function updateMasks(m) {
    masks = m;
    $("#masks").val(m);
}

function updateDay(d) {
    $("#dayNum").html(d);
    day = d;
}