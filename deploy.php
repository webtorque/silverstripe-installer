<?php
require 'recipe/common.php';
require 'deployer/functions.php';
require 'deployer/Environment.php';
require 'deployer/apache_tasks.php';
require 'deployer/db_tasks.php';
require 'deployer/deploy_tasks.php';
require 'deployer/sync_tasks.php';
require 'deployer/teardown_tasks.php';

serverList('servers.yml');

set('repository', 'git@bitbucket.org:webtorque/my-website.git');
set('shared_dirs', ['public/assets']);
set('shared_files', ['_ss_environment.php']);
set('writable_dirs', ['public/assets']);
set('web_dir', 'public');

task(
	'deploy',
	[
		'deploy:prepare',
		'deploy:environment',
        'deploy:release',
		'deploy:update_code',
		'deploy:composer',
		'deploy:shared',
		'deploy:ssbuild',
		'deploy:symlink',
		'deploy:writable',
        'deploy:apache',
		'cleanup',
		'success'
	]
);

after('deploy:composer', 'deploy:submodules');