<?php
/**
 * Created by JetBrains PhpStorm.
 * User: User
 * Date: 4/10/13
 * Time: 11:34 AM
 * To change this template use File | Settings | File Templates.
 */

class SiteConfigExtension extends DataExtension
{
	private static $db = array(
		'SiteEmailTo' => 'Varchar(150)',
		'SiteEmailFrom' => 'Varchar(150)',
	);

	public function updateCMSFields(FieldList $fields) {

		$fields->addFieldsToTab('Root.EmailSettings', array(
			TextField::create('SiteEmailTo', 'Email To'),
			TextField::create('SiteEmailFrom', 'Email From'),
			HtmlEditorField::create('EmailHeader', 'Email Header'),
			HtmlEditorField::create('EmailFooter', 'Email Footer')
		));

	}
}