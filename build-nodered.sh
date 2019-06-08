docker rm -f nodered
docker build -t nodered .
docker run -it -p 1880:1880 \
    -v /home/xavier/Desktop/nodered/node-red-data:/data \
    --name nodered \
    --dns 8.8.8.8 \
    --net host \
    nodered
#    -e FLOWS=flows.json \
