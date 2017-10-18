var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser= require('body-parser');
app.use(cors());
app.use(bodyParser.json());
var Bing = require('node-bing-api')({ accKey: "eda9d2513af94fbb829b331f72e6b30a" });
const googleTrends = require('google-trends-api');

var queries_related_number="";
var quiries_related_topics="";

var search_term_for_bing="";

app.post('/bingnewsplease',function(req,res){
  search_term_for_bing=req.body.searchtermfrontend;
  Bing.news(search_term_for_bing,{
      count: 10 // Number of results (max 15)
    },function(error, response, body){
      // console.log(body);
      res.send(body);
    });
});

app.post('/googletrendsnow',function(req,res){
  console.log(req.body.googlesearcharray);
  console.log("hello");

  console.log(req.body.googlesearcharray.length);

  new_array=[];

  for(var i=0;i<req.body.googlesearcharray.length;i++)
  {
    if(req.body.googlesearcharray[i]!=null)
    {
      req.body.googlesearcharray[i]=req.body.googlesearcharray[i].replace(/undefined/g,"");
      req.body.googlesearcharray[i]=req.body.googlesearcharray[i].replace(/,/g," ");
      req.body.googlesearcharray[i]=req.body.googlesearcharray[i].replace(/null/g,"");
      if(req.body.googlesearcharray[i]!=""||req.body.googlesearcharray[i]!="null",req.body.googlesearcharray[i]!=" ")
      {
        new_array.push(req.body.googlesearcharray[i]);
      }
    }
  }

  setTimeout(function(){
  console.log(new_array);
  },500);


  setTimeout(function(){

    googleTrends.interestOverTime({ keyword:new_array[0],startTime: new Date(Date.now() - (86400000))}, function(err, results) {
      if (err) console.log('oh no error!', err);
      else console.log(results);
        results=JSON.parse(results);

        if(results.default.timelineData.length==0)
        {

          if(new_array.length<=1)
          {
            res.send({"val":"not_found"});
          }else {

            googleTrends.interestOverTime({ keyword:new_array[1],startTime: new Date(Date.now() - (86400000))}, function(err, results) {
              if (err) console.log('oh no error!', err);
              else console.log(results);
                results=JSON.parse(results);

                if(results.default.timelineData.length==0)
                {
                  if(new_array.length<=2)
                  {
                    res.send({"val":"not_found"});

                  }else {

                    googleTrends.interestOverTime({ keyword:new_array[2],startTime: new Date(Date.now() - (86400000))}, function(err, results) {
                      if (err) console.log('oh no error!', err);
                      else console.log(results);
                        results=JSON.parse(results);
                        if(results.default.timelineData.length==0)
                        {
                          res.send({"val":"not_found"});
                        }else {
                          create_html_page(new_array[2]);

                                    googleTrends.relatedQueries({keyword: new_array[2],startTime: new Date(Date.now() - (86400000))})
                                    .then((rescue) => {
                                      rescue=JSON.parse(rescue);
                                      // console.log(rescue.default.rankedList[0].rankedKeyword.length);
                                      queries_related_number=rescue.default.rankedList[0].rankedKeyword.length;

                                      googleTrends.relatedTopics({keyword: new_array[2], startTime: new Date(Date.now() - (86400000))})
                                      .then((rescue) => {
                                        console.log(rescue);
                                        rescue=JSON.parse(rescue);
                                        quiries_related_topics=rescue.default.rankedList[0].rankedKeyword.length;
                                         res.send({"val":new_array[2],"quries":queries_related_number,"topics":quiries_related_topics});
                                      })
                                      .catch((err) => {
                                        console.log(err);
                                      })

                                      })
                                    .catch((err) => {
                                      console.log(err);
                                    })

                        }
                      });
                  }
                }else{
                  create_html_page(new_array[1]);


                            googleTrends.relatedQueries({keyword: new_array[1],startTime: new Date(Date.now() - (86400000))})
                            .then((rescue) => {
                              rescue=JSON.parse(rescue);
                              // console.log(rescue.default.rankedList[0].rankedKeyword.length);
                              queries_related_number=rescue.default.rankedList[0].rankedKeyword.length;

                              googleTrends.relatedTopics({keyword: new_array[1], startTime: new Date(Date.now() - (86400000))})
                              .then((rescue) => {
                                console.log(rescue);
                                rescue=JSON.parse(rescue);
                                quiries_related_topics=rescue.default.rankedList[0].rankedKeyword.length;
                                 res.send({"val":new_array[1],"quries":queries_related_number,"topics":quiries_related_topics});
                              })
                              .catch((err) => {
                                console.log(err);
                              })

                              })
                            .catch((err) => {
                              console.log(err);
                            })


                  // res.send({"val":new_array[1]})
                }
              });
          }
        }else {
          create_html_page(new_array[0]);

          googleTrends.relatedQueries({keyword: new_array[0],startTime: new Date(Date.now() - (86400000))})
          .then((rescue) => {
            rescue=JSON.parse(rescue);
            // console.log(rescue.default.rankedList[0].rankedKeyword.length);
            queries_related_number=rescue.default.rankedList[0].rankedKeyword.length;

            googleTrends.relatedTopics({keyword: new_array[0], startTime: new Date(Date.now() - (86400000))})
            .then((rescue) => {
              console.log(rescue);
              rescue=JSON.parse(rescue);
              quiries_related_topics=rescue.default.rankedList[0].rankedKeyword.length;
               res.send({"val":new_array[0],"quries":queries_related_number,"topics":quiries_related_topics});
            })
            .catch((err) => {
              console.log(err);
            })

            })
          .catch((err) => {
            console.log(err);
          })

        }
        console.log(results.default.timelineData.length);
    });
  },500);

});

function create_html_page(value)
{
  var fs = require('fs')
  var createHTML = require('create-html')

  body_values='<div> <script type="text/javascript" src="https://ssl.gstatic.com/trends_nrtr/1173_RC01/embed_loader.js"></script> <script type="text/javascript"> trends.embed.renderExploreWidget("TIMESERIES", {"comparisonItem":[{"keyword":"'+value+'","time":"now 1-d"}],"category":0,"property":""}, {"exploreQuery":"date=now 1-d&geo=IN&q='+value+'","guestPath":"https://trends.google.com:443/trends/embed/"}); </script> </div>'
  body_values=body_values+'<div><script type="text/javascript" src="https://ssl.gstatic.com/trends_nrtr/1173_RC01/embed_loader.js"></script> <script type="text/javascript"> trends.embed.renderExploreWidget("GEO_MAP", {"comparisonItem":[{"keyword":"'+ value +'","time":"now 1-d"}],"category":0,"property":""}, {"exploreQuery":"date=now 1-d&geo=IN&q='+ value+'","guestPath":"https://trends.google.com:443/trends/embed/"});</script></div>'
  body_values=body_values+'<div><script type="text/javascript" src="https://ssl.gstatic.com/trends_nrtr/1173_RC01/embed_loader.js"></script> <script type="text/javascript"> trends.embed.renderExploreWidget("RELATED_TOPICS", {"comparisonItem":[{"keyword":"'+value+'","time":"now 1-d"}],"category":0,"property":""}, {"exploreQuery":"date=now 1-d&geo=IN&q='+value+'","guestPath":"https://trends.google.com:443/trends/embed/"});</script></div>'
  body_values=body_values+'<div><script type="text/javascript" src="https://ssl.gstatic.com/trends_nrtr/1173_RC01/embed_loader.js"></script> <script type="text/javascript"> trends.embed.renderExploreWidget("RELATED_QUERIES", {"comparisonItem":[{"keyword":"'+value+'","time":"now 1-d"}],"category":0,"property":""}, {"exploreQuery":"date=now 1-d&geo=IN&q='+value+'","guestPath":"https://trends.google.com:443/trends/embed/"});</script></div>'
  var html = createHTML({
    title: 'example',
    script: 'example.js',
    scriptAsync: true,
    css: 'example.css',
    lang: 'en',
    head: '<meta name="description" content="example">',
    body: body_values
  })

  fs.writeFile('rajat/index.html', html, function (err) {
    if (err) console.log(err)
  })


}

app.listen(3000);
