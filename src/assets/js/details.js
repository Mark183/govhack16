var Details = {
	place_id: '',
	details: '',

	init: function(){
		Details.events();
		if (window.location.href.includes('details')) {
			Details.place_id = Details.getUrlParameter('place_id');
			if (!Details.place_id) {
				window.location.replace(Config.home);
			}
			Details.getPlaceData(function(response) {
				console.log(response)
				Details.populateInfo(response.data.details[0]);
				Details.populateRatings(response.data.ratings[0]);
				Details.populateReviews(response.data.reviews);
			});
		}
	},

	events: function(){
		// $('body').on('click', '.Details_input .button--main', Details.getParams);
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

	getPlaceData: function(callback) {
		Config.ajax('getPlaceById.php',{place_id:Details.place_id}, function(response) {
			callback(response)
		})
	},

	populateInfo: function(details) {
		$('h1#placeTitle').text(Strings.details_page[details.category]);
		$('h5#placeAddress').text(details.name);
		$('.latest_reviews--comments#placeDescription').text(details.description);
	},

	populateRatings: function(ratings) {
		var highlighted = '<span><i class="fa fa-star" aria-hidden="true"></i></span>';
		var outline = '<span><i class="fa fa-star-o" aria-hidden="true"></i></span>';
		var overallRating = "";
	 	var count = 1;

	 	while(count < 6) {
	 		var toAppend = count <= ratings.accessibility ? highlighted : outline;
	 		$('#accessibilityRating').append(toAppend);

			toAppend = count <= ratings.lighting ? highlighted : outline;
	 		$('#lightingRating').append(toAppend);

	 		toAppend = count <= ratings.cleanliness ? highlighted : outline;
	 		$('#cleanlinessRating').append(toAppend);

	 		toAppend = count <= ratings.cond ? highlighted : outline;
	 		$('#condRating').append(toAppend);

	 		toAppend = count <= ratings.family_friendly ? highlighted : outline;
	 		$('#family_friendlyRating').append(toAppend);

	 		toAppend = count <= ratings.safety ? highlighted : outline;
	 		$('#safetyRating').append(toAppend);

	 		toAppend = count <= ratings.overall ? highlighted : outline;
	 		overallRating+=toAppend;

	 		count++;
	 	}
	 	$('#overallRating').prepend(overallRating);
	},

	reviewTemplate: '<div class="latest_reviews--item">'+
	'    <div class="latest_reviews--block">'+
	'        <h5>{{{reviewerName}}}</h5>'+
	'        <div class="details_reviews--stars">'+
	'            {{{stars}}}'+
	'        </div>'+
	'        <p class="caps margin-t-20">{{{placeCategory}}}</p>'+
	'        <p>{{{placeName}}}</p>'+
	'        <p class="latest_reviews--comments">{{{comment}}}</p>'+
	'    </div>'+
	'</div>',

	populateReviews: function(reviews) {
		if(reviews) {
			var highlighted = '<span><i class="fa fa-star" aria-hidden="true"></i></span>';
			var outline = '<span><i class="fa fa-star-o" aria-hidden="true"></i></span>';
			
			console.log(reviews)
			$('#noReviews').remove();

			$.each(reviews, function(i, review) {
				var html = Details.reviewTemplate;
				var count = 1;
				var overallRating = "";
				while(count < 6) {
			 		var toAppend = count <= Math.ceil(review.overall) ? highlighted : outline;
			 		overallRating+=toAppend;
			 		count++;
			 	}
			 	html = html.replace('{{{stars}}}',overallRating);
			 	html = html.replace('{{{placeCategory}}}',Strings.details_page[review.category]);
			 	html = html.replace('{{{placeName}}}',review.name);
			 	if (review.comment && review.comment != '') {
			 		html = html.replace('{{{comment}}}',review.comment);
			 	} else {
			 		html = html.replace('{{{comment}}}','This reviewer did not leave a comment.');
			 	}
			 	html = html.replace('{{{reviewerName}}}',review.fName+' '+review.lName);
				$('.details_reviews').append(html);
			})
		}
	}
};

$(function(){
	Details.init();
});