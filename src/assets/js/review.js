var Review = {

	lighting: false,
	cleaning: false,
	accessibility: false,
	condition: false,
	familyFriendly: false,
	safety: false,


	init: function(){
		Review.events();
	},

	events: function(){
		$('body').on('click', '.review_new .review_new--stars span', Review.addStars);
		$('body').on('click', '.review_new #review_button', Review.submitReview);
	},

	addStars: function(){
		var rating = $(this).attr('data-score');
		var elem = $(this).closest('.latest_reviews--item').attr('id');
		switch(elem){
			case 'add--rev--lighting':
				Review.lighting = rating;
				break;
			case 'add--rev--cleanliness':
				Review.cleaning = rating;
				break;
			case 'add--rev--accessibility':
				Review.accessibility = rating;
				break;
			case 'add--rev--condition':
				Review.condition = rating;
				break;
			case 'add--rev--famfriendly':
				Review.familyFriendly = rating;
				break;
			case 'add--rev--safety':
				Review.safety = rating;
				break;
		}

		Review.populateRatings(rating, '#'+elem);
	},

	populateRatings: function(rating, elem_id){
		$(elem_id + ' span').each(function(i, v){
			if(i < rating){
				$(this).find('i').removeClass('fa-star').removeClass('fa-star-o').addClass('fa-star');
			}else{
				$(this).find('i').removeClass('fa-star').removeClass('fa-star-o').addClass('fa-star-o');
			}
		});
	},

	submitReview: function(){
		console.log('test')
		var comment = $('.review_new #review_comment').val();
		

		var data = {
			place_id: Details.place_id,
			comment: comment,
			lighting: Review.lighting,
			cleaning: Review.cleaning,
			accessibility: Review.accessibility,
			condition: Review.condition,
			familyFriendly: Review.familyFriendly,
			safety: Review.safety,
		};

		Config.ajax('addReview.php', data, function(response){
			console.log(response)
			if(response.success){
				window.location.replace(Config.home + "details.html?place_id=" + Details.place_id);
			}else{
				alert(response.message);
			}
		});
	}
};

$(function(){
	Review.init();
});