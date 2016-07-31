var Results = {
	location: '',

	category: '',
	map: null,

	init: function() {
		if (window.location.href.includes('results')) {
			Results.events();
			Results.location = Results.getUrlParameter('location');
			Results.category = Results.getUrlParameter('category');

			$('.search_input_container select#search--location').val(Results.location)
			$('.search_input_container select#search--category').val(Strings.search[Results.category])
			$('.results_results #results_category').text(Strings.search[Results.category])
			$('.results_results #results_location').text(Results.location)

			if (!Results.location && !Results.category) {
				window.location.replace(Config.home);
			}
		}
	},

	events: function() {
		$('body').on('click', '.latest_reviews--block', Results.goToDetailsPage);
	},

	goToDetailsPage: function() {
		var place_id = $(this).attr('data-place-id');
		window.location.href = Config.home+"details.html?place_id="+place_id;
	},

	initMap: function() {
		Results.map = new google.maps.Map(document.getElementById('theMap'), {
          center: {lat: Locations[Results.location].lat, lng: Locations[Results.location].lng},
          zoom: 10
        });
        Results.getResults(function(response) {
			Results.populatePlaces(response.data);
		});
	},

	getResults: function(callback) {
		if (Results.category == 'Bathrooms') {
			Results.category = 'toilet';
		} else if (Results.category == 'Bus Stops') {
			Results.category = 'bus_stop';
		}

		Config.ajax('getPlaceByLocationAndType.php', {location: Results.location, category: Results.category}, function(response){
			callback(response)
		});
	},

	place_template: '<div class="latest_reviews--item">'+
					'    <div data-place-id="{{{place_id}}}" class="latest_reviews--block">'+
					'        <h5>{{{placeName}}}</h5>'+
					'        <div class="results_reviews--stars">'+
					'            {{{stars}}}'+
					'        </div>'+
					'        <p class="caps margin-t-20">{{{placeCategory}}}</p>'+
					'    </div>'+
					'</div>',

	populatePlaces: function(data){
		if(data) {
			var highlighted = '<span><i class="fa fa-star" aria-hidden="true"></i></span>';
			var outline = '<span><i class="fa fa-star-o" aria-hidden="true"></i></span>';
			
			$('#noReviews').remove();

			$.each(data, function(i, place) {
				var html = Results.place_template;
				var count = 1;
				var overallRating = "";
				while(count < 6) {
			 		var toAppend = count <= Math.ceil(place.overall) ? highlighted : outline;
			 		overallRating+=toAppend;
			 		count++;
			 	}
			 	html = html.replace('{{{stars}}}',overallRating);
			 	html = html.replace('{{{place_id}}}',place.id);
			 	html = html.replace('{{{placeCategory}}}',Strings.details_page[place.category]);
			 	html = html.replace('{{{placeName}}}',place.name);
				$('.results_list').append(html);
				 var myLatLng = {lat: parseFloat(place.lat), lng: parseFloat(place.lng)};
	             var marker = new google.maps.Marker({
	                position: myLatLng,
	                map: Results.map,
	                title: place.name,
	                icon: Config.home+"assets/img/map-marker.png",
	                animation: google.maps.Animation.DROP
	              });
			})
		}
	},

	getUrlParameter: function getUrlParameter(sParam) {
	    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
	        sURLVariables = sPageURL.split('&'),
	        sParameterName,
	        i;

	    for (i = 0; i < sURLVariables.length; i++) {
	        sParameterName = sURLVariables[i].split('=');

	        if (sParameterName[0] === sParam) {
	            return sParameterName[1] === undefined ? true : sParameterName[1];
	        }
	    }
	},
}

$(function(){
	Results.init();
});