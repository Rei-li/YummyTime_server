# yummy-time

[![Stories in Ready](https://badge.waffle.io/yandex-shri-minsk-2016/yummy-time.png?label=ready&title=Ready)](https://waffle.io/yandex-shri-minsk-2016/yummy-time)

## Getting started

- Clone the repository:

  ```sh
  git clone git@github.com:yandex-shri-minsk-2016/yummy-time.git
  ```

- Install node and bower dependencies:

  ```sh
  npm install
  ```

- Run mongod:

  ```sh
  mongod --dbpath path/to/your/mongo/dbs
  ```

- Launch server application:

  ```sh
  npm run server
  ```

- Launch client application:

  ```sh
  npm run client
  ```

- Open the application in your browser:

  ```sh
  open http://localhost:4200
  ```

- Build the application for different environments:

  ```sh
  npm run build       # => development
  npm run build-prod  # => production
  ```

- Deploy application to Heroku:

  ```sh
  npm run deploy
  ```
