<?php

class SlideshowItem extends DataObject
{
    private static $db = array(
        'Title' => 'Varchar(100)'
    );

    private static $has_one = array(
        'Image' => 'Image'
    );

    private static $default_sort = 'Sort';

    /**
     * @inheritdoc
     *
     * @return FieldList
     */
    public function getCMSFields() {
        $fields = parent::getCMSFields();
        $fields->removeByName('Sort');
        return $fields;
    }

}