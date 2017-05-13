FROM digitaldrummerj/angular-cli

WORKDIR /home/app/ng

COPY ./package.json /home/app/ng
RUN npm install

EXPOSE 4200
EXPOSE 9222
EXPOSE 9876
EXPOSE 49153

VOLUME ["/home/app/ng/node_modules"]
