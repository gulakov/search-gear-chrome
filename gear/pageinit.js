//fadeIn the page
setTimeout(function() {
    document.querySelector("html").style.opacity = 1;

}, 100)

//pull settings from account sync
if (chrome.storage.sync)
chrome.storage.sync.get({
    enableAutoload: 1,
    enableHoverMode: 1,
    enablePulsateQuery: 1,
    enableInfiniteScroll: 1,
    enableSolarizedColor: 0,
    enableSwag: 0
}, function(options) {
    for (var i in options)
        localStorage[i] = options[i];


    //before dom content loaded, to reduce twitch
    if (localStorage['enableAutoload'] != "true") {
        document.querySelector('html').classList.add("disableAutoloadApp"); //remove the css restylings
    } else{




       




    }

});


//util$
function $(s) {
    var e = document.querySelectorAll(s);
    return e.length == 1 ? e[0] : e;
};

NodeList.prototype.forEach = Array.prototype.forEach;




function xhr(url, cb) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = cb(xhr.responseText)
    xhr.onerror = function() {
        console.log(xhr)
    };
    xhr.send();
}



document.addEventListener("DOMContentLoaded", function() {
    

    //DISABLE
    return



    //only on specific pages of web results
    if (!$(".hdtb-msel") || !$(".hdtb-msel").textContent || ["All", "Videos", "News", "Shopping", "News", "Books"].indexOf($(".hdtb-msel").textContent) == -1) {
        document.querySelector('html').classList.add("disableAutoloadApp");
        return

    }
         try{
               
        //force http to avoid mixed content CSP block of http iframes on https google
         if (location.protocol == "https:" && typeof window.localStorage !== 'undefined' && localStorage['enableAutoload']=="true")
             location.href = location.href.replace("https", "http") + "&gws_rd=ssl";
        } catch(e){ 
            window.enablein10 = false;
        }

            // alert($(".hdtb-msel").length)
    // return;


    //SETTINGS


    var icon = chrome.extension.getURL("config/icon/in10-icon-clear.png")

    window.sblsbb.innerHTML += "<nav id='settings-btn' style='background-image: url(\"" + icon 
            + "\"); '><nav id='settings'></nav></nav>";



    // $("#searchform form").innerHTML += '';

    window.addConfig = function(id, label, checked, onchange) {

        $("#settings").innerHTML += '<label class="uiToggle"><input id="' + id + '" type="checkbox" ' +
            (localStorage[id] == "true" || localStorage[id] == undefined && checked ? ' checked="checked" ' : '') +
            '><i class="uiToggle-slide"></i><i class="uiToggle-ball"></i>' + label + '</label>';

        setTimeout(function() { //timeout required or else only last elem's event gets sets
            //persist settings forever
            window[id].addEventListener("change", function() {
                localStorage[id] = this.checked;
                var options = {};
                options[id] = this.checked;
                chrome.storage.sync.set(options);
                if (onchange) onchange()
            }, 1)


            //reinit settings to apply on load, except reload functions
            if (window[id] && id != "enableAutoload" )
                window[id].dispatchEvent(new Event('change'));

        }, 1)

    }


    addConfig('enableAutoload', 'Enable Autoload', 1, function() {
        setTimeout(function() {
            location.reload();
        }, 500);
    });

    //if extension disabled, quit after setting the enable switch
    if (localStorage['enableAutoload'] != "true") return;


    addConfig('enableHoverMode', 'Hover Mode', 1);
    addConfig('enablePulsateQuery', 'Pulsate Query', 1);
    addConfig('enableInfiniteScroll', 'Infinite Scroll', 1, function() {
        $("#foot").style.display = window.enableInfiniteScroll.checked ? "none" : "block";
        //TODO move cur page up
    });

    addConfig('enableSwag', 'Turn Your SWAG On', 0, function(){


        if(window.enableSwag.checked) {
            

            chrome.runtime.sendMessage({ action: "swag"}, function(){})

        } else {
            chrome.runtime.sendMessage({ action: "swag-stop"}, function(){})
        }

    })

    addConfig('enableSolarizedColor', 'Solarize', 0, function() {
        if (window.enableSolarizedColor.checked) {
            document.body.classList.add("solar");
            if ($(".show").contentDocument) $(".show").contentDocument.body.classList.add("solar");
        } else {
            document.body.classList.remove("solar");
            if ($(".show").contentDocument) $(".show").contentDocument.body.classList.remove("solar");
        }
    });

    //move google's settings button
    // window.searchform.appendChild(window.ab_ctls)


    //search icon widget -- small ui


    //if links list has been resized, then remember that width
    if (localStorage["linkwidth"] && localStorage["linkwidth"] < 800)
        $("#ires").style['max-width'] = localStorage["linkwidth"] + 'px';





    //#rez container for iframes, and takes up half the page fixed position
    var rez = document.createElement('section');
    rez.id = 'rez';

    var dashSearch = "<nav id='dashSearch'><div id='btnRead'></div><div id='btnTab'></div>"+
            "<div id='btnBack'></div><div id='btnFind'></div></nav>"

    rez.innerHTML = "<div class='loader'></div>"+dashSearch;
    document.body.insertBefore(rez, document.body.firstChild);

    //dash search
    btnRead.addEventListener("click", function(){



    },1)

    btnTab.addEventListener("click", function(){
         
         window.open(document.querySelector(".current a").href, "_blank");

    },1)

    btnBack.addEventListener("click", function(){

        $("#rez .show").contentWindow.history.back();

    },1)

    btnFind.addEventListener("click", function(){


       $("#rez .show").contentWindow.find();

    },0)




    function positionRez() {
        if (!window.rez || !window.settings || !$(".g")[0]) return;

        var rezWidth = document.body.clientWidth - $(".g")[0].clientWidth;
        var rezTop = Math.max(0, $(".sfbg.nojsv").getBoundingClientRect().bottom + 1);
        if (document.body.scrollTop>rezTop)
            rezTop=0


        rez.style.width = rezWidth + "px";
        rez.style.top = rezTop + "px";

        //config bar
        var configWidth = document.body.clientWidth - $("#searchform form").clientWidth - $("#gbw>div>div").clientWidth + 20;
        window.settings.style.width = configWidth + "px";

        // during scrolling, make the intentional lag of mouse hover slightly longer
        window.longDelayHover = true;


        // show or "hide unless hovered" the topbar
        searchform.className = document.body.scrollTop>60 ? "fixed" : "";

    };









    //IFRAME resizable
    window.dragSidebar = false;
    $("#rcnt").addEventListener('mousemove', function(e) {

        if (ires.getBoundingClientRect().right < e.offsetX)
            $("body").classList.add('resizing');
        else if (!dragSidebar)
            $("body").classList.remove('resizing');
    }, 1)

    $("#rcnt").addEventListener('mouseout', function(e) {
        if (!dragSidebar)
            $("body").classList.remove('resizing');
    }, 1)

    $("#rcnt").addEventListener('mousedown', function(e) {
        var start = e.offsetX;

        if( ires.getBoundingClientRect().right > e.offsetX )
            return;


        dragSidebar = true;



        document.body.addEventListener('mousemove', function(e) {
            e.preventDefault();
        }, 1)
        document.body.addEventListener('mouseup', dragSidebarOnMouseUp, 1)


        $("#rez .show").contentWindow.addEventListener('mouseup', dragSidebarOnMouseUp, 1)



    }, 1);

    function dragSidebarOnMouseUp(e) {


        this.removeEventListener('mousemove', 1);

        this.removeEventListener('mouseup', 1);

        if (dragSidebar) {

            dragSidebar = false;

            var newLinkWidth = e.pageX + (this == document.body ? 0 : $("#rez .show").getBoundingClientRect().left);

            $("#ires").style['max-width'] = newLinkWidth + 'px';

            localStorage["linkwidth"] = newLinkWidth;

            positionRez()
        }
    }





    //FIRST LOAD


    //load first result link in iframe
    window.firstLink = setInterval(function() {
        if (document.querySelectorAll(".srg .g")[0])
            clearInterval(window.firstLink);

        document.querySelectorAll(".srg .g")[0].dispatchEvent(new Event('click', { 'bubbles': true }));
    }, 200)


    //preload frames for background cache
    setTimeout(function() {

        return; //off


        var gs = $(".srg .g");

        for (var i = 1; i < 4; i++) {

            //set preloadid token into .g link for later recall
            var url = gs[i].querySelector('h3 a, a').href;

            if (url.indexOf('youtube.com') == -1) {

                gs[i].querySelectorAll('a')[0].dataset.preload = preloadId = "i" + ($("#rez").childNodes.length - 1 + i);



                xhrFrame(url, preloadId, function(rFrame) {

                    // rFrame.style.opacity = 0;
                    // rFrame.style.visibility="visible";


                    //apply scripts to target frame, useful in pre-cache for scroll position
                    onFrameShow();

                })


            }




        }


    }, 7000)


    //listeners
    window.addEventListener("resize", positionRez, 1)
    window.addEventListener("scroll", positionRez, 1)
    positionRez()
    setTimeout(positionRez, 1000) //after new dom elements are loaded

}) //end dom loaded
