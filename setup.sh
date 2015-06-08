#!/bin/bash
#setup deployer
wget http://deployer.org/deployer.phar | tr -d '\r'
sudo mv "deployer.phar" "/usr/local/bin/dep" | tr -d '\r'
sudo chmod +x "/usr/local/bin/dep" | tr -d '\r'