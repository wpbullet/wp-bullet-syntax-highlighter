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
		
            //add new select dropdown buttons     
            ed.addButton("prism_pre_select", {
		title: "Pre Language",		
		type: "menubutton",
                image: url+"/p_select.png",        	
		menu: [{
		
			text: 'BASH',		
			onclick: function() {
               			var return_text = '<pre class="language-bash"><code>//Paste Your Code Here</code></pre>';
               			ed.execCommand("mceInsertContent", 0, return_text);
            		}
        	},
		{
		
			text: 'PHP',		
			onclick: function() {
               			var return_text = '<pre class="language-php"><code>//Paste Your Code Here</code></pre>';
               			ed.execCommand("mceInsertContent", 0, return_text);
            		}
        	},
		{
		
			text: 'VCL',		
			onclick: function() {
               			var return_text = '<pre class="language-vcl"><code>//Paste Your Code Here</code></pre>';
               			ed.execCommand("mceInsertContent", 0, return_text);
            		}
        	},
		{
		
			text: 'SQL',		
			onclick: function() {
               			var return_text = '<pre class="language-sql"><code>//Paste Your Code Here</code></pre>';
               			ed.execCommand("mceInsertContent", 0, return_text);
            		}
        	},
		{
		
			text: 'NGINX',		
			onclick: function() {
               			var return_text = '<pre class="language-nginx"><code>//Paste Your Code Here</code></pre>';
               			ed.execCommand("mceInsertContent", 0, return_text);
            		}
        	},
		{
		
			text: 'APACHE',		
			onclick: function() {
               			var return_text = '<pre class="language-apacheconf"><code>//Paste Your Code Here</code></pre>';
               			ed.execCommand("mceInsertContent", 0, return_text);
            		}
        	}]
	});


            ed.addButton("prism_code_select", {
		title: "Code Language",		
		type: "menubutton",
                image: url+"/c_select.png",        	
		menu: [{
		
			text: 'bash',
			onclick: function() {
               			var return_text = '<code class="language-bash">//Paste Your Code Here</code>';
               			ed.execCommand("mceInsertContent", 0, return_text);
            		}
        	},
		{
		
			text: 'PHP',		
			onclick: function() {
               			var return_text = '<code class="language-php">//Paste Your Code Here</code>';
               			ed.execCommand("mceInsertContent", 0, return_text);
            		}
        	},
		{
		
			text: 'VCL',		
			onclick: function() {
               			var return_text = '<code class="language-vcl">//Paste Your Code Here</code>';
               			ed.execCommand("mceInsertContent", 0, return_text);
            		}
        	},
		{
		
			text: 'SQL',		
			onclick: function() {
               			var return_text = '<code class="language-sql">//Paste Your Code Here</code>';
               			ed.execCommand("mceInsertContent", 0, return_text);
            		}
        	},
		{
		
			text: 'nginx',
			onclick: function() {
               			var return_text = '<code class="language-nginx">//Paste Your Code Here</code>';
               			ed.execCommand("mceInsertContent", 0, return_text);
            		}
        	},
		{
		
			text: 'Apache',
			onclick: function() {
               			var return_text = '<code class="language-apacheconf">//Paste Your Code Here</code>';
               			ed.execCommand("mceInsertContent", 0, return_text);
            		}
        	}]
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
