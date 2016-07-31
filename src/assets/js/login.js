var Login = {
	init: function(){
		Login.events();
	},

	events: function(){
		$('body').on('click', '#login--button', Login.getParams);
	},

	getParams: function(){
		var email = $('#login--email').val();
		var password = $('#login--password').val();

		if(email == '' || password == ''){
			Login.loginError('Incorrect email or password.')
		}else{
			Login.loginUser(email, password, function(response){
				if(response.success){
					window.location.replace(Config.home);
				}else{
					Login.loginError(response.message);
				}
			});
		}
	},

	loginUser: function(email, password, callback){
		
		Config.ajax('login.php', {email: email, password: password}, function(response){
			callback(response);
		});
	},

	loginError: function(message){
		// alert(message);
		$('#modal').foundation('open');
		$('#modalText').text(message);
	}
};

$(function(){
	Login.init();
});