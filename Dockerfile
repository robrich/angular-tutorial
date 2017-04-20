FROM digitaldrummerj/tutorials

WORKDIR /home/app

COPY package.json /home/app

RUN npm install;npm cache clean;rm package.json

EXPOSE 3027

VOLUME ["/home/app/node_modules"]

# CMD ["sails", "lift"]
