var Signup = {
	init: function(){
		Signup.events();
	},

	events: function(){
		$('body').on('click touch', '#signup--button', Signup.getParams);
	},

	getParams: function(){
		var fName = $('#signup--fname').val();
		var lName = $('#signup--lname').val();
		var email = $('#signup--email').val();
		var password = $('#signup--password').val();
		var rePassword = $('#signup--confirm-password').val();

		if(fName == '' || lName == '' || email == '' || password == '' || rePassword == ''){
			Signup.signupError('missing content');
		}else{
			if(password != rePassword){
				Signup.signupError('Passwords dont match');
				
			}else{
				Signup.signupUser(fName, lName, email, password, function(response){
					if(response.success){
						window.location.replace(Config.home);
					}else{
						Login.loginError(response.message);
					}
				});	
			}
		}


	},

	signupUser: function(fName, lName, email, password, callback){
		Config.ajax('signup.php', {email: email, password: password, fName: fName, lName: lName}, function(response){
			callback(response);
		});
	},

	signupError: function(message){
		$('#modal').foundation('open');
		$('#modalText').text(message);
	}
};

$(function(){
	Signup.init();
});