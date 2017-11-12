# IsItSaturday

This is a web app which checks if it is Saturday anywhere in the world in order to let the user know if it is time to shitpost on />p/ or not. 

/>p/ is a facebook group for discussing programming and anything STEM related called Implying We Can Programming. You can find it here. https://www.facebook.com/groups/implyingprogramming/

This web app uses a NodeJS Express web server and Handlebars for template rendering. This way there is no front-end Jabascript involved. It uses a very simple algorithm to check if it's saturday for certain timezone offsets.

## Getting Started
Make sure you have git installed. Follow your operating system's instructions to install it. 
1. In Ubuntu it is simply:
```
apt get install git
```
2. Clone this repository by running:
```
git clone https://github.com/RustyRaptor/isitsaturday.git
``` 




### Prerequisites

Make sure you have the latest version of NodeJS and NPM installed. I recommend installing it in it's own folder seperate from the system's installed version. However if you don't want to do that just follow your distro's instructions for installing them. 

NodeJS website: 
https://nodejs.org

### Installing

1. In the root folder of the project run:
```
npm install
``` 

2. Now in the same folder run:
```
node server.js
```

3. By default the web server will listen on port 3000 or it will use the $PORT environment variable if it is set. With that being said if you want to change the port it runs on simply run this command in bash:

```
export PORT=<port_number>
```
replace <port_number> with the port number you want it to listen on for example:

```
export PORT=3002
```
if you want it to listen on port 3002. 

When you start the server it will print out a message that includes the port it is running on. If the number matches the port you set then you've set it successfully. 

It will look something like: 
```
Server is up on port 3000
```

Now to see it in action open a web browser and point it to localhost:<port_number>
replacing <port_number> with the port you set or with 3000 if you used the default port like so:
localhost:3000



## Running the tests

#TODO

<!-- ### Break down into end to end tests

Explain what these tests test and why

```
Give an example
``` -->

<!-- ### And coding style tests

Explain what these tests test and why

```
Give an example
``` -->

## Built With

* [NodeJS](http://www.dropwizard.io/1.0.2/docs/) - For the backend
* [HandleBars](http://handlebarsjs.com/) - For template rendering

## Contributing

Please feel free to make a pull request for any neat features you want to add. This project is just a meme anyway. 

## Versioning

Doesn't matter 

## Authors

Me and the dude that rewrote the whole code base to not use an external API. Forgot his name. Might add it later. You'll probably find him in the comments. 

## License

GPL v.2 but idgaf really it's just a meme. Steal it if you want. 

## Acknowledgments

none
