# Financing Sustainable Cities Initiative
Description...

Link?...

## Running locally in development mode

To get started in development mode, just clone the repository and run:

    npm install
    npm run dev

## Building and deploying in production

If you wanted to run this site in production run:

    npm install
    npm run build
    npm start

You should run the the build step again any time you make changes to pages or
components.

## Configuring

If you configure a .env file (just copy [.env.default](https://github.com/Vizzuality/otp-portal/blob/master/.env.default) over to '.env' and fill in the options) you can configure a range of options.

See the [AUTHENTICATION.md](https://github.com/Vizzuality/otp-portal/blob/master/AUTHENTICATION.md) for how to set up oAuth if you want to do that.

## Deploying to the cloud with now.sh

To deploy on [Zeit's](https://zeit.co) cloud platform `now` just install it, clone this repository and run `now` in the working directory:

    npm install -g now
    now

If you configure a .env file `now` will include it when deploying if you use the -E option to deploy:

    now -E

## Debugging

If you configure a .env file with value for *LOGS_SECRET* and deploy with `now -E` you can use [now-logs](https://github.com/berzniz/now-logs) to view logs remotely.

    npm install -g now-logs
    now-logs my-secret-value

## Running tests

Note: There are currently no application specific tests, beyond style checking.
