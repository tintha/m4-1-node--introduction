'use strict';

// import the needed node_modules.
const express = require('express');
const morgan = require('morgan');

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan('tiny'))

  // Any requests for static files will go into the public folder
  .use(express.static('public'))

  // Nothing to modify above this line
  // ---------------------------------
  // add new endpoints here 👇
  .get('/cat-message', (req, res) => {
    const message = { author: 'cat', text: 'Meow' };
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({status: 200, message });
    }, randomTime);
  })

  .get('/monkey-message', (req, res) => {
    const messages = [
      "Don’t monkey around with me.",
      "If you pay peanuts, you get monkeys.",
      "I fling 💩 at you!",
      "🙊",
      "🙈",
      "🙉",
      "I go bananas for bananas!"
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    const message = { author: 'monkey', text: randomMessage };
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({status: 200, message });
    }, randomTime);
  })

  .get(`/parrot-message`, (req, res) => {
    const { userMessage } = req.query;
    const message = { author: 'parrot', text: userMessage };
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({status: 200, message});
    }, randomTime);
  })

  .get(`/bot-message`, (req, res) => {
    const { userMessage } = req.query;
    const getBotMessage = (userMessage) => {
      const commonGreetings = [
        "hi", 
        "hello", 
        "howdy",  
        "sup", 
      ];
      const commonGoodbyes = [
        "bye", 
        "goodbye"
      ];
      const jokes = [
        "Why do we tell actors to “break a leg?” Because every play has a cast.",
        "Helvetica and Times New Roman walk into a bar... “Get out of here!” shouts the bartender. “We don’t serve your type.”",
        "Why does Waldo wear stripes? He doesn’t want to be spotted.",
        "Did you hear about the claustrophobic astronaut? He just needed a little space.",
        "How do you drown a hipster? Throw him in the mainstream."
      ]
      let botMsg = "";
      
      const splitted = userMessage.toLowerCase().split(/[^\w]/);

      const isInGreeting = [];
      for (let i = 0; i <= splitted.length; i++) {
        if (commonGreetings.includes(splitted[i])) {
          isInGreeting.push(splitted[i]);
        }
      }

      const isInGoodbyes = [];
      for (let i = 0; i <= splitted.length; i++) {
        if (commonGoodbyes.includes(splitted[i])) {
          isInGoodbyes.push(splitted[i]);
        }
      }
 
      if (isInGreeting.length >= 1) {
        botMsg = "Bzzt Hello!";
      } else if (isInGoodbyes.length >= 1) {
        botMsg = "Bzzt Goodbye!";
      } else if (userMessage === "something funny") {
        botMsg = "Bzzt Would you like to hear a joke?";
      } else if (userMessage.toLowerCase() === "yes") {
        botMsg = jokes[Math.floor(Math.random() * jokes.length)]; 
      } else if (userMessage.toLowerCase() === "no") {
        botMsg = "Bzzt Okay, no jokes!";
      } else {
        botMsg = `Bzzt ${userMessage}`;
      }
      return botMsg;
    };
    const message = { author: 'bot', text: getBotMessage(userMessage) };
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({status: 200, message});
    }, randomTime);
  })

  // add new endpoints here ☝️
  // ---------------------------------
  // Nothing to modify below this line

  // this serves up the homepage
  .get('/', (req, res) => {
    res
      .status(200)
      .json({ status: 200, message: "This is the homepage... it's empty :(" });
  })

  // this is our catch all endpoint. If a user navigates to any endpoint that is not
  // defined above, they get to see our 404 page.
  .get('*', (req, res) => {
    res
      .status(404)
      .json({
        status: 404,
        message: 'This is obviously not the page you are looking for.',
      });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));
