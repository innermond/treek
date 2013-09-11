(function($){

	$.fn.treek = function(options) {
		var defaults = {
			'prefix-wrap': 'treek-',
			'element-wrap': '<div id=":id" />', // id attributte is compulsory
			'attributes': {'folder': 'data-folder', 'collapsed' : 'data-collapsed', 'toggle' : 'data-toggle'},
			'classes' : {'folder': 'folder', 'file': 'file', 'collapsed' : 'collapsed', 'chosen' : 'chosen'}
		};
		settings = $.extend({}, defaults, options); 


		this.each(function(){
			var 
			$this = $(this),
			is_ul =  $this.is('ul'),
			is_ol =  $this.is('ol');
			// check it is the right element
			if ( ! is_ul && ! is_ol) {
				console.log('element is not UL/OL dom element');
				return false;
			}
			// start plugin
			var 
			folder_attr = settings.attributes.folder,
			elem_type = is_ul ? 'ul' : 'ol',
			folder_selector = elem_type + ' li[' + folder_attr + ']',
			collapsed_attr = settings.attributes.collapsed,
			toggle_attr = settings.attributes.toggle,

			folder_cls = settings.classes.folder,
			file_cls = settings.classes.file,
			collapsed_cls = settings.classes.collapsed,
			chosen_cls = settings.classes.chosen;

			// add classes and attributtes
			$("li", $this).each(function() {
				if($(this).children(elem_type).length){
					$(this).addClass(folder_cls).attr(folder_attr, true);
				}else{	
					$(this).addClass(file_cls);}
			});

			// random id
			var id = settings['prefix-wrap'] + (Math.random() + '').replace('.', '');
			// build an enveloping div element to hold delegated functions
			$this.wrap(settings['element-wrap'].replace(':id', id));
			// attach functions to wrapping div
			$('#' + id).on('collapse', folder_selector, function(event) {event.stopPropagation();

					$(event.target).children().slideUp('fast').end().addClass(collapsed_cls).prop(collapsed_attr, true);

				}).on('expand', folder_selector,  function(event) {event.stopPropagation();

					$(event.target).children().slideDown('fast').end().removeClass(collapsed_cls).prop(collapsed_attr, false);

				}).on('click', folder_selector, function(event){event.stopPropagation();

					var me = $(event.target); 
					// create attribute toggle if not exists
					me.prop(toggle_attr) == undefined && me.prop(toggle_attr, false);	
					me.prop(collapsed_attr) == undefined && me.prop(collapsed_attr, false);	
					// contains chosen_cls remove that class
					$('[class~=' + chosen_cls + ']', $this).removeClass(chosen_cls);
					me.prop(toggle_attr, !me.prop(toggle_attr))
					if ( me.prop(toggle_attr) ) me.trigger("collapse"); else me.trigger("expand");
					me.addClass(chosen_cls);
				});				

		});
	}

})(jQuery)