#!/bin/bash

set -e

service_name=alert-on-metrics

echo "This script clear docker containers/images related to ${service_name}." 
echo "It's intended to be run on a remote machine."
read -p "Do you wish to continue? [Yy] " -n 1 -r
echo # move to a new line
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    exit 1
fi

rm ~/docker-images/*.tar
sudo docker ps -a | grep ${service_name} | awk '{print $1}' | xargs sudo docker stop
sudo docker ps -a | grep ${service_name} | awk '{print $1}' | xargs sudo docker rm
sudo docker images -a | grep ${service_name} | awk '{print $3}' | xargs sudo docker rmi