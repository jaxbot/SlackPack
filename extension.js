// Add the SlackPack option to the preferences menu
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
                $("#txt_ignore_list").val(localStorage["sp_ignore"]);
        });
}

// Add an event listener to #user_menu to add preferences hook
$("#user_menu").click(function() {
        $("#member_prefs_item").click(function() {
                setTimeout(hookIntoPrefs, 100);
        });
});

// Store ignore list
function updateIgnoreList(people) {
        localStorage["sp_ignore"] = people;
}

// Helpers
function observeDOM(obj, callback) {
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    if (MutationObserver) {
        var obs = new MutationObserver(function(mutations, observer){
            if (mutations[0].addedNodes.length || mutations[0].removedNodes.length)
                callback();
        });
        obs.observe(obj, { childList:true, subtree:true });
    } else {
        obj.addEventListener('DOMNodeInserted', callback, false);
        obj.addEventListener('DOMNodeRemoved', callback, false);
    }
}

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
