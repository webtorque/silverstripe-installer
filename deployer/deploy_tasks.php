<?php

task(
	'deploy:composer',
	function () {
		$webDir = get('web_dir', false);

		cd("{{release_path}}/{$webDir}");
		run("composer install --no-dev --verbose --prefer-dist --optimize-autoloader --no-progress --no-scripts");
	}
)->desc('Installing composer dependencies');


task(
	'deploy:environment',
	function () {
		$releasePath = env()->parse('{{deploy_path}}/current');
		$webDir = get('web_dir', false);

		$tmp = '/tmp/env.php';
		$remoteEnv = env()->parse("{{deploy_path}}/shared/_ss_environment.php");

		if (!fileExists($remoteEnv)) {
			$env = new \WebTorque\Deployment\Environment(file_get_contents('_ss_environment.php'));

			$dbUser = ask('Please provide a username for the database', '');
			$dbPassword = ask('Please provide a password for the database', '');
			$dbName = ask('Please provide a name for the database', '');
			$domain = ask('Please provide a domain for this server', '');

			$file = $env->setupEnvironmentFile("{$releasePath}/{$webDir}", $dbUser, $dbPassword, $dbName, $domain);

			file_put_contents($tmp, $file);
			upload($tmp, $remoteEnv);
			unlink($tmp);
		}
	}
)->desc('Setting up environment file');

task(
	'deploy:ssbuild',
	function() {
		$webDir = get('web_dir');

		run("cd {{release_path}} && php {$webDir}/cli-script.php dev/build flush=1");
	}
)->desc('Running dev/build on remote server');

task(
	'deploy:update',
	function() {
		$releasePath = '{{deploy_path}}/current';
		$webDir = get('web_dir');

        writeln('<info>Updating site</info>');
		if ($branch = env('branch')) {
			run("cd {$releasePath} && git pull --rebase origin {$branch} --depth 1 --force && php {$webDir}/cli-script.php dev/build flush=1 && cd {$webDir} && composer install");
		}
	}
)->desc('Updating site on remote server');

task(
    'deploy:submodules',
    function() {
        run("cd {{release_path}} && git submodule update --init --recursive --depth=1");
    }
)->desc('Update submodules');

task(
    'deploy:apache',
    [
        'apache:setup',
        'apache:ensite'
    ]
)->desc('Checking and setting up Apache');

task(
    'deploy:sync',
    [
        'sync:remote',
        'db:permissions'
    ]
)->desc('Uploading from local and setting up database permissions');