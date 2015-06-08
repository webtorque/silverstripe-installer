<?php
/**
 * Created by JetBrains PhpStorm.
 * User: User
 * Date: 8/10/13
 * Time: 9:49 AM
 * To change this template use File | Settings | File Templates.
 */

class WTOptionsetField extends OptionsetField {
	public function performReadonlyTransformation() {
		// Source and values are DataObject sets.
		$field = $this->castedCopy('LookupField');
		$field->setSource($this->getSource());
		$field->setReadonly(true);
		$field->dontEscape = true;

		return $field;
	}
}