FROM nodered/node-red-docker

# RUN npm install -g npm 

ADD ./node-red-data /data
# ADD ~/.ssh /root/.ssh

RUN npm install node-red-node-smooth \
       node-red-dashboard telldus-live mqtt \
       node-red-contrib-threshold deep-diff

RUN  npm audit fix

# COPY ./flows.json /data
