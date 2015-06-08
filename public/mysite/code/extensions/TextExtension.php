<?php
/**
 * Created by JetBrains PhpStorm.
 * User: User
 * Date: 23/09/13
 * Time: 7:15 PM
 * To change this template use File | Settings | File Templates.
 */

class TextExtension extends Extension {

	public static $casting = array(
		"WholeWordsAfter" => "Text",
		"WholeWordsBefore" => "Text",
	);

	public function WholeWordsAfter($letterCount = 50) {
		$string = trim(Convert::xml2raw(strip_tags($this->owner->value)));

		if (strlen($string) < $letterCount) return $string;

		$pos = strpos($string, ' ', $letterCount);

		$return = substr($string, 0, $pos);

		if (strlen($return) < strlen($string)) $return .= '...';

		return $return;
	}

	public function WholeWordsBefore($letterCount = 50) {
		$string = trim(Convert::xml2raw(strip_tags($this->owner->value)));

		if (strlen($string) < $letterCount) return $string;

		$pos = strlen($string) - strpos(strrev($string), ' ', strlen($string) - $letterCount);

		$return = substr($string, 0, $pos - 1);

		if (strlen($return) < strlen($string)) $return .= '...';

		return $return;
	}
}