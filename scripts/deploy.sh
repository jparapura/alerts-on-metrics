#!/bin/bash

set -e

service_name=alert-on-metrics
host=mikrus
tag=$(date '+%Y-%m-%d-%H-%M-%S')
service_port=8080
access_port=22222

image_name_dashed=${service_name}-${tag}
image_name_coloned=${service_name}:${tag}
tar_file=${image_name_dashed}.tar

echo "This script will create a docker image, send it to remote server and run the service." 
echo "For this to work properly, already running service must be stopped."
echo "Since storage on remote server is limited, it's recommended to clean it more often than not."
echo "All of the above is done in scripts/clear-docker-images.sh"
read -p "Do you wish to continue? [Yy] " -n 1 -r
echo # move to a new line
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    exit 1
fi

docker build -t ${image_name_coloned} .
docker save --output ${tar_file} ${image_name_coloned}
scp ${tar_file} ${host}:~/docker-images/
ssh ${host} -t "sudo docker load --input docker-images/${tar_file}"
ssh ${host} -t "sudo docker run -p ${access_port}:${service_port} -itd ${image_name_coloned}"