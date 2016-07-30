var Common = {

	init: function() {
		Common.getUserDetails();
	},

	events: function() {
		$('body').on('click', '.welcome #logout--button', Common.logoutUser);
	},

	getUserDetails: function() {
		Config.ajax('getUser.php', {}, function(response){
			if(response.success) {
				$('.menu').css('display', 'none');
				$('.welcome').css('display', 'block');
				$('.welcome #user_name').text(response.data.fName);
			} else {
				$('.menu').css('display', 'block');
				$('.welcome').css('display', 'none');

			}
		});
	},

	logoutUser: function() {
		Config.ajax('logout.php', {}, function(response) {
			window.location.replace(Config.home);

			$('.menu').css('display', 'block');
			$('.welcome').css('display', 'none');
		});
	}
};

$(function() {
	Common.init();
});