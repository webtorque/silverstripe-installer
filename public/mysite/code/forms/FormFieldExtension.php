<?php
/**
 * Created by JetBrains PhpStorm.
 * User: User
 * Date: 7/10/13
 * Time: 10:10 AM
 * To change this template use File | Settings | File Templates.
 */

class FormFieldExtension extends Extension
{
	public function CustomAttributes() {
		$attributes = $this->owner->getAttributes();

		//remove standard attributes we don't want
		if (is_array($attributes)) {
			if (array_key_exists('type', $attributes)) unset($attributes['type']);
			if (array_key_exists('name', $attributes)) unset($attributes['name']);
			if (array_key_exists('value', $attributes)) unset($attributes['value']);
			if (array_key_exists('class', $attributes)) unset($attributes['class']);
			if (array_key_exists('id', $attributes)) unset($attributes['id']);
			if (array_key_exists('disabled', $attributes)) unset($attributes['disabled']);
		}

		return new ArrayData($attributes);
	}

	public function getCustomAttributesHTML() {
		$attributes = $this->CustomAttributes();

		$parts = array();
		foreach($attributes->toMap() as $name => $value) {
			$parts[] = ($value === true) ? "{$name}=\"{$name}\"" : "{$name}=\"" . Convert::raw2att($value) . "\"";
		}

		return $parts ? implode(' ', $parts) : '';
	}
}