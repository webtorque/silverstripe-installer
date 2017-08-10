#!/bin/bash

#echo "Deleting SS_mysite"
#mysqladmin -f --password=omega drop SS_mysite >>/vagrant/logs/provision.log 2>&1

#echo "Creating new SS_mysite"
#mysql -u root -pomega < /vagrant/db/db-SS_mysite-create.sql

echo "Restoring SQL dump"
mysql -u root -pfr33d0m < /vagrant/db/ss_default.sql

usermod -a -G vagrant www-data

#cp /vagrant/config/php.ini /etc/php5/apache2/php.ini

if [ -e /etc/apache2/sites-available/silverstripe ]; then
  rm /etc/apache2/sites-available/silverstripe
fi

ln -s /vagrant/vagrant-config/silverstripe.conf /etc/apache2/sites-available/silverstripe.conf
a2dissite 000-default
a2ensite silverstripe
service apache2 stop
service apache2 start

apt-get update --fix-missing

#add git
apt-get -y install git

#add node
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
apt-get install -y nodejs
sudo apt-get install -y build-essential

#update npm
npm install npm@latest -g

#install deployer
wget http://deployer.org/deployer.phar
mv "deployer.phar" "/usr/local/bin/dep"
chmod +x "/usr/local/bin/dep"

#install composer
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php composer-setup.php
php -r "unlink('composer-setup.php');"
mv composer.phar /usr/local/bin/composer

#install deployer
wget http://deployer.org/releases/v3.3.0/deployer.phar
mv "deployer.phar" "/usr/local/bin/dep"
chmod +x "/usr/local/bin/dep"

#check for logs
if [ ! -d "/vagrant/logs" ]; then
  mkdir "/vagrant/logs"
fi

#install from composer and dev/build
#cd /vagrant/public && composer update && sudo -u www-data php framework/cli-script.php dev/build flush=1