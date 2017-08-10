<?php
class ContactPage extends Page {

	private static $db = [];

	private static $has_one = [];

}
class ContactPage_Controller extends Page_Controller {

	private static $allowed_actions = array (
		'ContactForm'
	);


	public function ContactForm() {
		$fields = FieldList::create(array(
			TextField::create('FirstName', 'First Name')->setAttribute('Placeholder', 'First Name'),
			TextField::create('LastName', 'Last Name')->setAttribute('Placeholder', 'Last Name'),
			TextField::create('Email', 'Email')->setAttribute('Placeholder', 'Email'),
			DropdownField::create('HearAboutUs', 'Where did you hear about us?', array(
				'Google' => 'Google',
				'Radio' => 'Radio',
				'Magazine' => 'Magazine'
			))->setEmptyString('Select an option'),
                        CheckboxField::create('SubscribeNewsLetter', 'Subscribe Web Torque News Letter')->setAttribute('required', 'required'),
                        OptionsetField::create('ChooseOneOption', 'Please choose one option', array(1 => 'Yes', 0 => 'No'))->setAttribute('required', 'required'),
			TextareaField::create('Message')
		));

		$actions = FieldList::create(array(
			FormAction::create('submitMyForm', 'Submit')->setUseButtonTag(true)
		));

		$validator = RequiredFields::create(array(
			'FirstName', 'LastName', 'Email'
		));

		return Form::create($this, 'ContactForm', $fields, $actions, $validator);
	}

	public function submitMyForm($data, $form) {
		echo "You submitted me!!";exit;
	}

}