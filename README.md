# Alexa News Pulisher
Flash Briefing Skill - Powered By Rocket.Chat

***

# Let's Get Started

Deploy your Flash briefing skill in minutes using Rocket chat and broadcast messages on both channel and skill in realtime.

# Setup

### Pre-requisites

* Node.js (> v8.10)
* Register for an [Amazon Developer Account](https://developer.amazon.com/)
* Rocket Chat Server updated to Release 1.2.0-rc.0 or later.

### Enabling Anonymous Read

* Go to **Server** -> **Three Dot Menu** -> **Administration** -> **Accounts** , and Set **Allow Anonymous Read** to **True**.

**Note:** Requires Admin Access.

### Creating A Main Broadcast Channel

* On Server Homepage click on **Create New** -> **Channel**

* Set **Private Channel** -> **Public Channel** and Enable **Broadcast Channel**.

* Then give your **Channel Name**, and click on **Create**.

* This channel will work as the main channel that tells your flashbriefing from where to gather messages. Make sure you the channelnames in this channel are declared in following way:

![editor-channel](https://user-images.githubusercontent.com/41849970/60520926-e1301c00-9d03-11e9-8a88-881be2f4defd.png)

### Deploying Code

* Clone the repository contents to your server.

* After cloning create a **.env** file with following environment variables:

  * **PORT** : Enter The Port number you want server to run on.
  
  * **CHANNEL_NAME** : Enter the name of the broadcasting channel we created earlier. Make sure its in lower case with no spaces.

  * **SERVER_URL** : Enter your current Rocket.Chat server url here. Ex- https://your.sever.chat

* Change **cacheTimeout** & **flashBriefingTitle** from **index.js** as per your requirement.

  * **cacheTimeout** : It is the frequency of your message update. For example if you want your flash briefing to update data every hour then set the value of cacheTimeout to `3600000` i.e one hour in milliseconds.
  
  * **flashBriefingTitle** : The title of the feed item to display in the Alexa app.

* Deploy the code to the server of your choice along.

* Make sure it's working on an **HTTPS** domain if not then assign a **HTTPS** domain to it.You can then test your server by sending `/ping` or `/download` request.

* After App is deployed we will be using **URL/Domain** of the server in the next step.

### Creating Flash Briefing Skill

* Go [Alexa Developer Console](https://developer.amazon.com/alexa/console/ask).

* Click on **Create Skill**, give **Skill name** , **Default language** and choose **Flash Briefing** model then click on **Create Skill**.

* Write **Custom Error Message**, then click on **Add new feed**. Fill details as per you requirement.

* Choose **Content type** as **Text**.

* In **Feed**, paste the **URL/Domain**.

* Upload Photo and hit **Add**.

* Click on **Save** and that should complete the complete the process.

## Usage

* Flash briefing will use the **channel names in last message** from the main broadcast channel for broadcasting. It will then gather all the messages from the mentioned channels and present it to the user in the skill.

* Make sure that the last message is a **text message**.

# TODOs

Need community help in the following:

* add a conversation flow to allow an admin to "publish the briefing" daily using the VUI
