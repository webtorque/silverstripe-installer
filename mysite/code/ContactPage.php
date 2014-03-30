<?php
class ContactPage extends Page {

	private static $db = array(
		'EmailTo' => 'Varchar(255)',
		'EmailFrom' => 'Varchar(255)',
		'EmailSubject' => 'Varchar(255)',
		'EmailSuccessMessage' => 'HTMLText',
	);

	private static $has_one = array(
	);

	private static $validation = array(
		'FirstName' => array(
			'required' => true
		),
		'LastName' => array(
			'required' => true
		),
		'Email' => array(
			'email' => true
		),
		'Message' => array(
			'required' => true
		)
	);

	private static $validation_messages = array(
		'FirstName' => array(
			'required' => 'First Name is required'
		),
		'LastName' => array(
			'required' => 'Last Name is required'
		),
		'Message' => array(
			'required' => 'Message is required'
		)
	);

	public function getCMSFields() {
		$fields = parent::getCMSFields();
		$fields->addFieldsToTab('Root.Email', array(
			TextField::create('EmailTo', 'Email To'),
			TextField::create('EmailFrom', 'Email From'),
			TextField::create('EmailSubject', 'Email Subject'),
			HtmlEditorField::create('EmailSuccessMessage', 'Email Success Message')->setRows(5)
		));
		return $fields;
	}
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
			TextareaField::create('Message')
		));

		$actions = FieldList::create(array(
			FormAction::create('submit', 'Submit')->setUseButtonTag(true)
		));

		$validator = JqueryValidator::create(Config::inst()->get('ContactPage', 'validation_fields'), Config::inst()->get('ContactPage', 'validation_messages'));

		return Form::create($this, 'ContactForm', $fields, $actions, $validator);
	}

	public function submitContactForm($data, Form $form) {

		$email = new Generic_Email();

		$body = '';
		foreach ($form->Fields()->dataFields() as $field) {
			if ($value = $field->Value()) {
				$title = str_replace(array('*', ':'), '', $field->Title());
				$body .= "<b>{$title}</b>: {$value}<br>";
			}
		}

		$email->setTo($this->EmailTo);
		$email->setFrom($this->EmailFrom);
		$email->setSubject($this->EmailSubject);
		$email->populateTemplate(array(
			'Subject' => $this->EmailSubject,
			'Content' => $body
		));

		$email->send();

		$this->redirect($this->Link('success'));
	}

	public function success() {
		return array('Success' => true);
	}

}