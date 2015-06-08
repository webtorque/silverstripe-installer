<?php
class HomePage extends Page {

	private static $db = array(
	);

	private static $has_one = array(
	);

	private static $has_many = array(
		'HomeSlideshowItems' => 'HomeSlideshowItem'
	);

	public function getCMSFields() {
		$fields = parent::getCMSFields();

		$fields->addFieldsToTab('Root.Slideshow', array(
			GridField::create('HomeSlideshowItems', 'Slideshow Items', $this->HomeSlideshowItems(), GridFieldConfig_RelationEditor::create()->addComponent(GridFieldOrderableRows::create('Sort')))
		));

		return $fields;
	}

}

class HomePage_Controller extends Page_Controller {

	private static $allowed_actions = array (
	);

	public function init() {
		parent::init();
	}

}

class HomeSlideshowItem extends DataObject {

	private static $db = array(
		'Title' => 'Varchar(100)',
		'Sort' => 'Int'
	);

	private static $has_one = array(
		'Image' => 'Image',
		'HomePage' => 'HomePage'
	);

	private static $default_sort = 'Sort';

	public function getCMSFields() {
		$fields = parent::getCMSFields();
		$fields->removeByName('Sort');
		return $fields;
	}

}