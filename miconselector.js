/*
 * jQuery mIconSelector v0.1 plugin
 * Copyright (c) 2013 Vasilij Olhov
 * Dual licensed under the MIT and GPL licenses
 */

;(function($) {

    // ================================================
    // =============== DEFAULT OPTIONS ================
    // ================================================
    var defaults = {
						path	: './icons/',
						width	: 32,
						height	: 32,
						columns	: 3
	};




    // ================================================
    // =============== EXTERNAL METHODS ===============
    // ================================================
    var methods = {

        // === Initailization ===
        init: function(params) {

            // ----- Extend options and remember -----
            var options = $.extend(true, {}, defaults, params);
            this.data('options',options);

            // wrap select-box and hide it
		    this.wrap('<div class="selecticon-container"></div>').hide();

		    // define root container
		    var root = this.parent(".selecticon-container");
            this.data('root',root);

            // draw choice panel
            var choicer = $('<div class="selecticon-choice"></div>').appendTo(root);

		    // get data from select-box and define choice-panel
		    this.find('option').each(function() {
				//if (!first) { first = { 'name':this.text, 'image':$(this).attr('image') }; }
				icon = $('<div class="selecticon-icon"></div>').appendTo(choicer);
				icon.attr('item', $(this).attr('value') )
					.height( options.height )
					.width( options.width )
					.css("background-image", "url('" + options.path + $(this).attr('image') + "')");
			});
		    $('<div style="clear:both; height:1px;"></div>').appendTo(choicer);
		    $('<div class="selecticon-title">&nbsp;</div>').appendTo(choicer);

            // set width for choice panel
            choicer.width( icon.outerWidth(true) * options.columns );


		    // add first visible icon
		    var display = $('<div class="selecticon-display"></div>').appendTo(root)
		     										   				 .width( options.width )
		    										   				 .height( options.height );

            // add arrow, which showing on mouse over
		    $('<div class="selecticon-arrow"></div>').appendTo(root);

            // resize container
            root.width( display.outerWidth(true) )
            	.height( display.outerHeight(true) );

            // start initialization
            bindActions.call(root);
            selectIcon.call(root, root.find('div.selecticon-icon').first() );

            return this;
        }


    };




    // =================================================
    // ================ HELP FUNCTIONS =================
    // =================================================
    var selectIcon = function( icon ) {
    	var me 		 = this;
    		selector = me.find('select').first();

   		selector.find('option').attr('selected',false); // deselect all
   		selector.find('option[value="' + icon.attr('item') + '"]').attr('selected', "selected"); // select selected
        me.find('div.selecticon-display').css( 'background-image', icon.css('background-image') );
       	me.find('div.selecticon-choice').hide();
    };




    // =================================================
    // ================ BIND ACTIONS ===================
    // =================================================
    var bindActions = function() {
        var me = this;

    	// mouse over icon -> show arrow
    	me.find('div.selecticon-display').on('hover', function(event) {
    		var arrow = me.find('div.selecticon-arrow');
    		if (event.type == "mouseenter") { arrow.show(); } else { arrow.hide(); }
    	});

    	// click to select new icon
		me.find('div.selecticon-display').on('click', function(event) {
    		me.find('div.selecticon-choice').fadeIn('350');
    	});

    	// leave mouse from choice panel - hide it
    	me.find('div.selecticon-choice').on('mouseleave', function() {
    		$(this).fadeOut(100);
    	});

    	// hover on icon -> show title of icon
    	me.find('div.selecticon-choice > div.selecticon-icon').on('hover', function(event) {
    		var title = me.find('div.selecticon-title'),
    			option = me.find('select').find('option[value="'+$(this).attr('item')+'"]');
    		if (event.type == "mouseenter") { title.html(option.text()); }
    		else { title.html('&nbsp;'); }
    	});

    	// click on icon -> select it
    	me.find('div.selecticon-choice > div.selecticon-icon').on('click', function() {
    		selectIcon.call(me, $(this) );
    	});

	}; // end bind action




    // =================================================
    // ============ EXTERNAL ENTRY POINT ===============
    // =================================================
    $.fn.mIconSelector = function(methodOrOptions) {
        if ( methods[methodOrOptions] ) { return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 )); }
        else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) { return methods.init.apply( this, arguments ); }
        else { return false; }
    };


})(jQuery);
