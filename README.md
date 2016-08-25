# Strategic Plan Web App
## *A playground for Angular2*

---

This app is node (express) on the back-end, and Angular2 (with Typescript, via Weback) on the front end. It's a playground where I can learn Angular2.

See it (and use it!) in action: http://sp.rdybarra.com/

## Installation
1. [Install rethinkdb](https://www.rethinkdb.com/docs/install/)
2. [Install browsersync](https://www.browsersync.io/docs#installation)
3. `$ npm install` at root.
4. `$ npm install` within `client_app`.

## Usage in development
1. Ensure rethinkdb is running with default dev settings: `$ rethinkdb`
2. `$ npm start`
3. `$ npm run start-client`

## Deplyment build
`$ npm run build` within `client_app`.

## Roadmap
THe basics are in place. The only missing *essential* is
* password resets

Some ideas to make the project better are:

1. Define the goal with more clarity
2. Add SWOT (Strengths, Weaknesses, Opportunities, Threats)
3. Interactivity such as email reminders
4. The ability to re-order steps
5. Be able to customize step components (the leading questions)
6. Burning Questions

## Explanations for things you might notice

### Why is there a Gemfile (Capistrano)?
I use [Capistrano](http://capistranorb.com/) for deployment. The additional files you would see are `Gemfile` `Capfile`, everything in `lib/capistrano` `config/deploy.rb` and everything `config/deploy` (not in repo).

Capistrano lets me deploy my code to my server, and run various important
tasks like `npm install`.

### Why aren't you building your assets upon deployment?
So the ideal deployment would compile all my public Javascript and CSS. This is fairly easy to achieve with Capistrano. If you do so, there is no need to include the `public/css` and the `public/js` folders since those are built as part of the deployment process.

However, since this app is deployed on a tiny server with limited memory, I found that it was a lot easier to just build locally. It also makes the deployments quicker.

The only risk I run is that I don't properly build the assets before doing a deployment. While that would suck, for me it's not quite worth it for this application.

### Why is there a file called pm2-config.sample.json?
I keep my node server up and running with a great utility called [pm2](http://pm2.keymetrics.io/). The sample file is my config that I use to run it. It really is not tied to this codebase, but I wanted to include it since this is an example of complete app. The file (less `.sample`) resides at the base directory (from capistranos standpoint). For a more verbose explanation see [my blog post](http://dev.rdybarra.com/2015/07/20/Serving-a-node-app-with-nginx/) (scroll towards the bottom).

### Why is there a file called nginx-config.sample?
Again, as an example of a complete app, I'm showing how I actually execute the code with nginx. This is what the cool kids called a reverse-proxy.  For a more verbose explanation see [my blog post](http://dev.rdybarra.com/2015/07/20/Serving-a-node-app-with-nginx/)

## Thanks for reading
Feel free to say hello, open issues, or reach out to me on twitter at [@rickyybarra](https://twitter.com/RickyYbarra).