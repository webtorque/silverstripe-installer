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
a2dissite default
a2ensite silverstripe
service apache2 stop
service apache2 start
