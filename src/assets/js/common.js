var Common = {

	init: function() {
		Common.getUserDetails();
	},

	getUserDetails: function() {
		Config.ajax('getUser.php', {}, function(response){
			console.log(response);
			if(response.success) {
				$('.menu').css('display', 'none');
				$('.welcome').css('display', 'block');
				$('.welcome #user_name').text(response.data.fName);
			} else {
				$('.menu').css('display', 'block');
				$('.welcome').css('display', 'none');

			}
		});
	}
};

$(function() {
	Common.init();
});