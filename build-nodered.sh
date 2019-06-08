#!/bin/bash
arch=`uname -a | grep arm`
if [ -z "${arch}" ]
then
    sed -i '1s/docker.*$/docker:v8/' Dockerfile
else
    sed -i '1s/docker.*$/docker:rpi-v8/' Dockerfile
fi

docker rm -f nodered8
docker build -t nodered8 .

docker rm -f nodered8

docker run -it -p 1880:1880 \
    -v /root/nodered/node-red-data:/data \
    --name nodered8 \
    --dns 8.8.8.8 \
    --net host \
    nodered
#    -e FLOWS=flows.json \
