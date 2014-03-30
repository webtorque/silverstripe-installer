<?php

/**
 * JqueryValidator, needs to be created after form is created so fields have had setForm called
 *
 * e.g.
 *
 * <code>
 *      parent::__construct($controller, 'DeliveryForm', $fields, $actions);
 *      $validationFields = $this->config()->get('validation');
 *      $validationMessages = $this->config()->get('validation_messages');
 *      $this->setValidator(JqueryValidator::create($validationFields, $validationMessages));
 * </code>
 *
 * @author Conrad Dobbs
 */
class JqueryValidator extends Validator {
        
        
        protected $rules, $messages;
        
        public static $allowed_validations = array(
            'required', 'email', 'minlength', 'maxlength', 'min', 'max', 'range', 'remote', 'date', 'dateISO',
            'number', 'digits', 'creditcard', 'accept', 'equalTo'
            
        );
        /**
	 * Pass each field to be validated as a seperate argument
	 * to the constructor of this object. (an array of elements are ok)
	 */
	public function __construct($rules, $messages = null) {
		$this->rules = $rules;
		$this->messages = $messages;

		parent::__construct();
	}
        
        public function php($data) {
                //todo: implement me
                $valid = true;

                $fields = $this->form->Fields();
                foreach($fields as $field) {
                        $valid = ($field->validate($this) && $valid);
                }

                foreach ($this->rules as $field => $rules) {
                        foreach ($rules as $rule => $value) {
                                $method = 'validate' . ucfirst($rule);
                                if (method_exists($this, $method)) {
                                        //check field exists and editable
                                        if (($oField = $fields->dataFieldByName($field)) && !$oField->isDisabled() && !$oField->isReadonly()) {
                                                $valid = $this->{$method}($oField, $value, $data, $fields) && $valid;
                                        }
                                }
                        }
                }

                return $valid;
        }


        public function validateRequired($formField, $validationRule, $data, $fields) {
                $fieldName = $formField->getName();

                if (empty($data[$fieldName]) && $formField) {
                        $errorMessage = sprintf( '%s is required.', strip_tags('"' . ($formField->Title() ? $formField->Title() : $fieldName) . '"'));

                        $this->validationError(
                                $fieldName,
                                $errorMessage,
                                "required"
                        );
                        return false;
                }

                return true;
        }

        public function validateEqualTo($formField, $validationRule, $data, $fields) {
                $fieldName = $formField->getName();
                $matchedField = $fields->dataFieldByName($validationRule);

                if ($data[$fieldName] != $data[$validationRule]) {
                        $errorMessage =  strip_tags($formField->Title() . ' does not match ' . $matchedField->Title());

                        $this->validationError(
                                $fieldName,
                                $errorMessage,
                                "equalTo"
                        );
                        return false;
                }

                return true;
        }

        /**
         * Validates for RFC 2822 compliant email adresses.
         *
         * @see http://www.regular-expressions.info/email.html
         * @see http://www.ietf.org/rfc/rfc2822.txt
         *
         * @return bool
         */
        public function validateEmail($formField, $validationRule, $data, $fields) {
                $fieldName = $formField->getName();

                $pcrePattern = '^[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*'
                        . '@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$';

                // PHP uses forward slash (/) to delimit start/end of pattern, so it must be escaped
                $pregSafePattern = str_replace('/', '\\/', $pcrePattern);

                if($data[$fieldName] && !preg_match('/' . $pregSafePattern . '/i', $data[$fieldName])){
                        $this->validationError(
                                $fieldName,
                                _t('EmailField.VALIDATION', "Please enter an email address"),
                                "email"
                        );
                        return false;
                } else{
                        return true;
                }
        }

        public function setForm($form) {
		parent::setForm($form);

		$form->addExtraClass('validate');

		$fields = $form->Fields();

		$this->processFields($fields);
	}

	public function processFields($fields) {
		if ($fields) foreach ($fields as $field) {

			//get child fields if composite
			if ($field instanceof CompositeField) {
				$this->processFields($field->FieldList());
				continue;
			}

                        //don't validate fields which aren't editable
                        if ($field->isDisabled() || $field->isReadonly()) continue;

			if (!empty($this->rules[$field->getName()])) {

				//setup validation rules
				$rules = array();
				$values = array();
				foreach ($this->rules[$field->getName()] as $rule => $value) {
					$rules[] = $rule;
                                        //equalTo needs ID of field
					$values['data-validate_' . $rule] = $rule == 'equalTo' ? '#' . $this->form->FormName() . '_' . $value : $value;
				}
				$field->setAttribute('data-validate', implode(',', $rules));
				foreach ($values as $attribute => $value) {
					$field->setAttribute($attribute, (string)$value);
				}
			}

			//setup messages
			if ($this->messages && !empty($this->messages[$field->getName()])) {

				$messages = array();
				foreach ($this->messages[$field->getName()] as $rule => $message) {
					$rules[] = $rule;
					$messages['data-validate_message_' . $rule] = $message;
				}

				foreach ($messages as $attribute => $value) {
					$field->setAttribute($attribute, $value);
				}
			}
		}
	}

	public function removeValidation() {

	}
}

