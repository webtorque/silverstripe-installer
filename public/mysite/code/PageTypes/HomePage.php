<?php
class HomePage extends Page {

	private static $db = [];

	private static $has_one = [];

	private static $many_many = [
		'SlideshowItems' => 'SlideshowItem'
	];

    private static $many_many_extraFields = [
        'SlideshowItems' => [
            'SlideshowSort' => 'Int'
        ]
    ];

    /**
     * @inheritdoc
     *
     * @return FieldList
     */
	public function getCMSFields() {
		$fields = parent::getCMSFields();

		$fields->addFieldsToTab('Root.Slideshow', array(
			GridField::create('SlideshowItems', 'Slideshow Items', $this->SlideshowItems(), GridFieldConfig_RelationEditor::create()->addComponent(GridFieldOrderableRows::create('Sort')))
		));

		return $fields;
	}

    /**
     * Add sorting to SlideshowItems.
     *
     * @return ManyManyList
     */
	public function SlideshowItems()
    {
        return $this->manyManyComponent('SlideshowItems')->sort('SlideshowSort');
    }
}

