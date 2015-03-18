function hookIntoPrefs() {
        var nav = "#new_prefs_dialog .modal-nav";
        var prefbody = "#new_prefs_dialog .modal-body";
        var slackpacktab = "#prefs_slackpack_tab";
        $(nav).append($(HTML.preftab));
        $(prefbody).append($(HTML.prefbody));

        $(slackpacktab).click(function() {
                $('.dialog_tab_pane').removeClass('active');
                $('#prefs_slackpack').addClass('active');
                $(nav + ' a').removeClass('active');
                $(slackpacktab).addClass('active');
        });
}

function updateIgnoreList(people) {
        localStorage["sp_ignore"] = people;
}

$("#user_menu").click(function() {
        $("#member_prefs_item").click(function() {
                setTimeout(hookIntoPrefs, 100);
        });
});

var observeDOM = (function(){
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
        eventListenerSupported = window.addEventListener;

    return function(obj, callback){
        if( MutationObserver ){
            // define a new observer
            var obs = new MutationObserver(function(mutations, observer){
                if( mutations[0].addedNodes.length || mutations[0].removedNodes.length )
                    callback();
            });
            // have the observer observe foo for changes in children
            obs.observe( obj, { childList:true, subtree:true });
        }
        else if( eventListenerSupported ){
            obj.addEventListener('DOMNodeInserted', callback, false);
            obj.addEventListener('DOMNodeRemoved', callback, false);
        }
    }
})();

observeDOM(document.getElementById("msgs_div"), function() {
        console.log("trigger");
        var toblock = localStorage["sp_ignore"].split("\n");
        for (var j = 0; j < toblock.length; j++) {
                var q = document.querySelectorAll(".message a[href='/team/" + toblock[j] + "']");
                for (var i = 0; i < q.length; i++) {
                        q[i].parentElement.style.display = "none";
                }
        }
});
