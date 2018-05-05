define(function (require) {
	var router = require('plugins/router'),
		ko = require('knockout'),
		userDM = require('documentModels/userDM');

	return {
		router: router,
		userDM: userDM,
		activate: function () {
			console.log('ACTIVATED SHELL PAGE');
			var self = this;
			router.map([
				{ route: '', title: 'Home', moduleId: 'home', nav: true },
				{ route: 'addBlog', title: 'Add', moduleId: 'addBlog', nav: true },
				{ route: 'liveChat', title: 'Live Chat', moduleId: 'liveChat', nav: true },
				{ route: 'login', title: 'Login', moduleId: 'login', nav: false }
			]).buildNavigationModel();
			
			router.activate();

			//for user accounts
			router.guardRoute = function (instance, instruction) {
				console.log(instance);
				console.log(instruction);
				$.ajax({
					type: 'post',
					data: {
						'function': 'check',
					},
					url: 'app/services/login.php',
				})
					.done(function (response) {
						console.log(response);
						if (instruction.config.route !== 'login' && response === "false") {
							router.navigate("login");
						}
						else { "wtf man"; }
						userDM.name($.parseJSON(response));
					});
				return true;
			};
		}
	};
});