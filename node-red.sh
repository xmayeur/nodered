docker rm -f nodered8
docker run -it -p 1880:1880 \
    -v /root/nodered/node-red-data:/data \
    --name nodered8 \
    --dns 8.8.8.8 \
    --net host \
    xmayeur/nodered8
#    -e FLOWS=flows.json \
