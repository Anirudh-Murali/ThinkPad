# Thinkpad
Content demand prediction a  method to predict demand of an article before it is published

## Current Scenario 
As an article is given by journalist to the News Agency so that they will release it. But these are the certain problems which News Agency faces
  * Whether will be a hit or not or How to know the article will be a hit?
  * What type of people will be interested in that article?
  * What are trending news related to the article?
  * Places/Location where the article will be a huge hit?
  * What are recent Social Media Tweets realated to the article?
  * What are the sentiments of the writer when he is writing the article?

## Our Solution 

Creating a software which will handle all the above issues in the following manner
  * Article are uploaded by the News Agency through a .txt file
  * <b>Summarisation</b> <br>
        Any article is not complete without a summary. So thinkpad creates a simple,exact and small summary for the article so
      that News Agency can approach them through summary
  * <b>News Related to the Article</b> <br>
      If there are any news related to the article then they are shown so that News Agencies can know whether Media poeple will       be interested in the article or not
  * <b>Demographic Location </b> <br>
      Places where this article wiil be a huge success are shown so that News Agencies can target these places
  * <b>Social Media Tweets</b> <br>
      Recent tweets are embedded and shown in the software so that we can know whether people are talking about it or not
  * <b>Sentimental Analysis</b> <br>
      This analysis is not made only on the words but it works on what are the sentiments related to the flow of the text.
      It gives the percentage of positive, negative, neutral words
  * <b>Personalised content delivery</b> <br>
      People have therown likes and dislikes so there is no point throwing the articles to them in which they are not                 intersted. So using the public data of a user mined through facebook,twitter,linkedin and instagram we make a profile a
      user with categorisation as well <br>
      Now we have categories of article as well as the users so now News Agecny knows to which user they should throw this           article instead of random throwing

## Technology Stack 
  * <b>User data mining </b> : Chrome Web Driver Selenium, Beautifull Soup
  * <b>Related News Articles</b> : Using Bing API's
  * <b>Trending </b> : Google trends npm package
  * <b>Demographic Places </b> : Google trends npm package
  * <b>Social Media Tweets </b> : Twitter python API
  * <b>Sentimental Analysis</b> : Sentiment Analysis with Python NLTK Text Classification
  * <b>Summarisation </b> : summy()
  * <b>Database </b> : MongoDB
  * <b>Server </b> : Node.js & Flask
  * <b>Frontend </b> : HTML,CSS,JavaScript,Jquery.Framework : Materialize.css


## Contributors 
  <a href="https://github.com/Anirudh-Murali" target="_blank">Anirudh Murali</a> <br>
  <a href="https://github.com/Anirudh-Murali" target="_blank">Rohan Chougule</a>
  

## Copyrights & Licensing
   Code copyright 2017 Team Troy. Code released under the MIT license.

  
    
