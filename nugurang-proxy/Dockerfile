FROM nginx:alpine

RUN rm /etc/nginx/conf.d/*

COPY ./default.conf /etc/nginx/conf.d/
COPY ./.htpasswd /etc/nginx/.htpasswd
COPY ./server.key /etc/server.key
COPY ./server.crt /etc/server.crt

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]