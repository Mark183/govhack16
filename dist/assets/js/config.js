var Config = {};

Config.home = 'http://' + location.host + '/';
Config.ajaxUrl = Config.home + 'assets/php/';

Config.ajax = function(url, data, callback){
				var url = Config.ajaxUrl + url;
				
				$.ajax({
					url: url,
					data: data,
					dataType: 'jsonp',
					success: function(response) {
						callback(response);
					}
				});
			};