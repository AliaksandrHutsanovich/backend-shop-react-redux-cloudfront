FROM node:alpine
ADD . /app/bff-service
COPY . /app/bff-service
WORKDIR /app/bff-service
RUN export NODE_OPTIONS=--max_old_space_size=8192
RUN npm install

ENV PORT 4000
EXPOSE 4000
ENTRYPOINT ["node", "bin/www"]
