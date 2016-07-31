var Home = {
	init: function(){
		Home.populateLatestReviews();
	},

	populateLatestReviews: function(){
		Config.ajax('getLatestReviews.php', {}, function(response){
			console.log(response.data);
			$('.latest-individual-review').each(function(i, v){
				var rev = response.data[i];
				var cat = rev.category == 'toilet' ? 'Bathroom' : rev.category;
				var text = rev.text == "" ? "User dis not leave a comment" : rev.text;

				$(this).find('.latest-reviewer-name').text(rev.fName + ' ' + rev.lName);
				$(this).find('.latest-review-cat').text(cat);
				$(this).find('.latest-review-desc').text(text);
				var $elem = $(this).find('.star_block span');
				Home.populateRatings(rev.overall, $elem);
			});
		});
		
	},

	populateRatings: function(rating, $elem){
		$elem.each(function(i, v){
			if(i < rating){
				$(this).find('i').removeClass('fa-star').removeClass('fa-star-o').addClass('fa-star');
			}else{
				$(this).find('i').removeClass('fa-star').removeClass('fa-star-o').addClass('fa-star-o');
			}
		});
	},
};

$(function(){
	Home.init();
});