var Search = {
	init: function(){
		Search.events();
	},

	events: function(){
		$('body').on('click', '.search_input .button--main', Search.getParams);
	},

	getParams: function() {
		var location = $('.search_input_container select#search--location').val();
		var category = $('.search_input_container select#search--category').val();
		console.log(location);
		console.log(category);

		if (category == 'Bathrooms') {
			category = 'toilet';
		} else if (category == 'Bus Stops') {
			category = 'bus_stop';
		}

		Config.ajax('getPlaceByLocationAndType.php', {location: location, category: category}, function(response){
			console.log(response.data)
		});
	}
};

$(function(){
	Search.init();
});