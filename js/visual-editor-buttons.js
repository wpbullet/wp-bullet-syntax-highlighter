(function() {
    tinymce.create("tinymce.plugins.bullet_prism_button_plugin", {

        //url argument holds the absolute url of our plugin directory
        init : function(ed, url) {

            //Add shortcuts
	        ed.shortcuts.add('alt+p','Pre Wrap Shortcut','prism_pre_command');
	        ed.shortcuts.add('alt+c','Code Wrap Shortcut','prism_code_command');

            //add new button     
            ed.addButton("prism_pre", {
                title : "Wrap in Pre + Code Tags",
                cmd : "prism_pre_command",
                image : url+"/p_key.png"
            });
            ed.addButton("prism_code", {
                title : "Wrap in Code Tags",
                cmd : "prism_code_command",
                image : url+"/c_key.png"
            });

            //buttons functionality.
            ed.addCommand("prism_pre_command", function() {
                var selected_text = ed.selection.getContent({format : "html"});
                var return_text = "<pre><code>" + selected_text + "</code></pre>";
                ed.execCommand("mceInsertContent", 0, return_text);
            });

            ed.addCommand("prism_code_command", function() {
                var selected_text = ed.selection.getContent({format : "html"});
                var return_text = "<code>" + selected_text + "</code>";
                ed.execCommand("mceInsertContent", 0, return_text);
            });

        },

        createControl : function(n, cm) {
            return null;
        },

        getInfo : function() {
            return {
                longname : "WP Bullet PrismJS Default Tag Insertion",
                author : "Dan Dulaney",
                version : "1"
            };
        }
    });

    tinymce.PluginManager.add("bullet_prism_button_plugin", tinymce.plugins.bullet_prism_button_plugin);
})();
