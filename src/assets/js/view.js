var View = {
	init: function(){
		View.events();
	},

	events: function(){
		$('body').on('click touchend', '#list_view', View.showListView);
		$('body').on('click touchend', '#map_view', View.showMapView);
	},

	showListView: function() {
		var $this = $(this);

		if($('.results_filter').css('display') == 'block') {
			$('.results_filter_block').removeClass('results_filter_block--active');
			$this.addClass('results_filter_block--active');

			$('#results_map_container').hide();
			$('.results_list').fadeIn();
		} else {
			$('#results_map_container').fadeIn();
			$('.results_list').fadeIn();
		}
		
	},

	showMapView: function() {
		var $this = $(this);

		if($('.results_filter').css('display') == 'block') {
			$('.results_filter_block').removeClass('results_filter_block--active');
			$this.addClass('results_filter_block--active');

			$('.results_list').hide();
			$('#results_map_container').fadeIn();
		} else {
			$('#results_map_container').fadeIn();
			$('.results_list').fadeIn();
		}
	}

	
};

$(function(){
	View.init();
});