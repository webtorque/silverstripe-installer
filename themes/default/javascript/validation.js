(function($){
	$('wte').entwine(function($){
		$('form.validate').entwine({
			onadd:function() {
				this.setupValidation();
				this._super();
			},
			setupValidation:function() {
				var rules = {};
				var messages = {};

				this.getValidationFields().each(function(){
					var field = $(this);
					var name = field.attr('name');

					var thisRules = field.data('validate').split(',');
					for (var i = 0; i < thisRules.length; i++) {
						if (!rules[name]) rules[name] = {};

						rules[name][thisRules[i]] = field.data('validate_' + thisRules[i].toLowerCase());

						if (field.data('validate_message_' + thisRules[i].toLowerCase())) {
							if (!messages[name]) messages[name] = {};
							messages[name][thisRules[i]] = field.data('validate_message_' + thisRules[i]);
						}
					}

				});

				if ($(rules).length) {

					this.validate({
						rules: rules,
						messages: messages
					});
				}

			},
			getValidationFields:function() {
				return this.find('input[data-validate],select[data-validate],textarea[data-validate]');
			}

		});
	});

	$('label.error').entwine({
		onadd:function() {
			this.prepend('<span class="arrow"></span>');
			this._super();
		},
		onremove:function() {
			this._super();
		}
	})
})(jQuery);