Vagrant.configure("2") do |config|
  config.vm.box = "webtorque/Debian8"
  config.vm.box_url = "file:///w:/vms/builds/debian-8-amd64_virtualbox.box"
  config.vm.synced_folder '.', "/vagrant", mount_options: ['dmode=775','fmode=775'], owner: 'vagrant', group: 'www-data'
  config.vm.network "forwarded_port", guest: 80, host: 51742

  config.vm.provider "virtualbox" do |v|
    v.customize ["modifyvm", :id, "--memory", "1024"]
#    v.customize ["setextradata", :id, "VBoxInternal2/SharedFoldersEnableSymlinksCreate/v-root", "1"]
  end

  config.vm.provision :shell, :path => "vagrant-config/provision.sh"

end
