<?php

define('SS_ENVIRONMENT_TYPE', 'dev');

define('SS_DEFAULT_ADMIN_USERNAME', 'admin');
define('SS_DEFAULT_ADMIN_PASSWORD', 'w3bt0rq3');

if (!defined('SS_DATABASE_SERVER')) {
	define('SS_DATABASE_SERVER', 'localhost');
	define('SS_DATABASE_USERNAME', 'dbuser');
	define('SS_DATABASE_PASSWORD', 'dbpassword');
	define('SS_DATABASE_NAME', 'dbname');
}

define('WKHTMLTOPDF_BINARY', '/usr/local/bin/wkhtmltopdf');

global $_FILE_TO_URL_MAPPING;
$_FILE_TO_URL_MAPPING['sitepath'] = 'http://domain';