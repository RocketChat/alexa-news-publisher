const express = require("express");
const axios = require('axios');
const app = express();
const cache = require('memory-cache');


require('dotenv').config();

app.use(express.json());

// Environment Variables

const PORT = process.env.PORT || 3000;
const serverurl = process.env.SERVER_URL;
const channelName = process.env.CHANNEL_NAME;

// Title Text & News Update Frequency

const flashBriefingTitle = 'Rocket Chat Flash Briefing';
const cacheTimeout = 300000;

// Altenative End Lines

var climaxLinesArray = ["Finally", "And just to wrap up", "And last but not least"];

// Get Date And UID

async function getDateUID() {

  const now = new Date();
  const jsonDate = now.toJSON();

  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  var length = 7;

  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return {
    date: jsonDate,
    uid: result
  };

}

// Get Channel Names

const getSourceChannels = async (channelnamei) =>
  await axios
  .get(`${ serverurl }/api/v1/channels.anonymousread?roomName=${ channelnamei }`)
  .then((res) => res.data)
  .then((res) => `${ res.messages[0].msg }`)
  .catch((err) => {
    console.log(err.message);
  });

const getChannelLastMessage = async (channelnamei) =>
  await axios
  .get(`${ serverurl }/api/v1/channels.anonymousread?roomName=${ channelnamei }`)
  .then((res) => res.data)
  .then((res) => `${res.messages[0].msg}`)
  .catch((err) => {
    console.log(err.message);
  });

const getMessages = async () => {

  var channelNamesString = await getSourceChannels(channelName);
  var messagearray = [];

  var array = channelNamesString.split("#");

  var randomNumber = Math.floor((Math.random() * climaxLinesArray.length));
  console.log('THIS IS A RANDOM NUMBER' + randomNumber);

  for (let i = 1; i < array.length; i++) {

    console.log(array[i] + i);
    const channel = array[i];
    const lastMessage = await getChannelLastMessage(channel);

    if (array.length != 2 && i === array.length - 1) {
      var channelResponse = `${climaxLinesArray[randomNumber]} From ${channel} - ${lastMessage}`;
    } else {
      var channelResponse = `From ${channel} - ${lastMessage}`;
    }

    messagearray.push(channelResponse);
  }

  var responseString = messagearray.join('. ');

  return responseString;

}

//PING ROUTE

app.get('/ping', (req, res) => {

  console.log('PING Request');

  const pongData = ('{"data":"PONG"}');
  var pong = JSON.parse(pongData);
  return res.status(200).send(pong);

})

//MAIN ROUTE

app.get('/', async (req, res) => {

  if (cache.get('message')) {

    console.log('Using Cached Data From Memory');

    const resultJSON = JSON.parse(cache.get('message'));
    return res.status(200).send(resultJSON);


  } else {

    console.log('Getting New Data From Rocket Chat Server');

    var date_uid = await getDateUID();
    var messages = await getMessages();

    var responseJSON = JSON.stringify({
      uid: date_uid.uid,
      updateDate: date_uid.date,
      titleText: flashBriefingTitle,
      mainText: messages,
      redirectionUrl: serverurl
    });

    console.log('Storing Data In Memory.')
    cache.put('message', responseJSON, cacheTimeout);

    var finalResponse = JSON.parse(responseJSON);
    return res.status(200).send(finalResponse);

  }

});

app.listen(PORT, '0.0.0.0', function () {
  console.log(`Server Now Listening on Port ${PORT}`);
});
