FROM nginx:alpine
LABEL version="<%= version %>"

COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html
COPY <%= outputPath %> .