
$.ajaxSetup({ cache: false });


var file_contents="";
var country_to_search_for="";
var google_trends_api_search_term="";
var sentimental_analysis=[];
var article_summary=""
var google_search_term_array=[];
var twitter_country_location="";
var twiiter_news="";

// var url_value="./"+$("#filenameurl").val();

function read_file(){
  $.ajax({
        type: "GET",
        url: "./file.txt",
        dataType: "text",
        success: function(scores) {
          console.log(scores);
          file_contents=scores;
          send_text();
          }
        })
}
function send_text(){


  // var settings =
  // {
  //   "async": true,
  //   "crossDomain": true,
  //   "url": "http://192.168.43.254:5000/sendFile",
  //   "method": "GET",
  //   "headers":
  //    {
  //     "article": $("#realarticle").val(),
  //     "content-type": "application/x-www-form-urlencoded"
  //    }
  // }
  //
  // $.ajax(settings).done(function (response)
  // {
  //     console.log(response);
  // });

  var input_value={"article":file_contents};

  $.ajax({
    type: 'POST',
    data: JSON.stringify(input_value),
    contentType: 'application/json',
    url: 'http://192.168.43.120:5000/sendFile',
    success: function(result) {
             console.log('success');
             console.log(result);

            // get the country Please

            $("#upload_the_file_screen").css('display','none');
            $("#first_screen").css('display','block');

            // show summary




            try{
              $(".articel_real_summary_put_in").html('<div class="card light-blue lighten-5" style="padding-left: 10px;padding-right: 10px;"> <br> <br>'+result.summary+'</div>'+'<br> <br>');
            }catch(err){
              console.log(err);
            }

            try{

              for(var i=0;i<result.place.length;i++)
              {
                if(result.length==2)
                  break;
                country_to_search_for=result.place[0]+" "+result.place[1];
              }

            }catch(err){
                console.log(err);
            }

            try{


              google_trends_api_search_term=result.place[0];
              google_trends_api_search_term=google_trends_api_search_term+" "+result.people[0];
              google_trends_api_search_term=google_trends_api_search_term+" "+result.organization;

              google_search_term_array.push(google_trends_api_search_term);

              google_trends_api_search_term="";
              google_trends_api_search_term=result.place[0];
              google_trends_api_search_term=google_trends_api_search_term+" "+result.people[0];

              google_search_term_array.push(google_trends_api_search_term);

              google_trends_api_search_term="";
              google_trends_api_search_term=result.place[0];
              google_trends_api_search_term=google_trends_api_search_term+" "+result.organization[0];

              google_search_term_array.push(google_trends_api_search_term);

              google_trends_api_search_term="";
              google_trends_api_search_term=result.people[0];
              google_trends_api_search_term=google_trends_api_search_term+" "+result.organization[0];

              google_search_term_array.push(google_trends_api_search_term);

              google_trends_api_search_term="";
              google_trends_api_search_term=result.place[0];
              google_search_term_array.push(google_trends_api_search_term);

            }catch(err){
              console.log(err);
            }

            try{

              sentimental_analysis.push(result.sentiment_prob.compound);
              sentimental_analysis.push(result.sentiment_prob.neg);
              sentimental_analysis.push(result.sentiment_prob.neu);
              sentimental_analysis.push(result.sentiment_prob.pos);


            }catch(err){
              console.log(err);
            }

            try{
                article_summary=result.summary;

            }catch(err){
              console.log(err);
            }

            try{
              twiiter_news=result.place[0]+" "+result.people[0];
            }catch(err){
              console.log(err);
            }

            try{

              place_value_for_bing="";
              people_value_for_bing="";
              organization_value_for_bing="";

              for(var i=0;i<result.place;i++)
              {
                  place_value_for_bing=result.place[i];
                  break;
              }

              for(var i=0;i<result.people;i++)
              {
                  if(pr_code_value_bing=="")
                  {
                    try{
                      people_value_for_bing=result.people[i];
                      people_value_for_bing=result.people[i+1];
                      break;
                    }catch(err)
                    {
                      console.log(err);
                    }
                  }
              }

              for(var i=0;i<result.organization;i++)
              {
                if(place_value_for_bing==""&&people_value_for_bing=="")
                {
                  place_value_for_bing=result.organization[i];
                  people_value_for_bing=result.organization[i+1];
                  organization_value_for_bing=result.organization[i+2];
                  break;
                }

                organization_value_for_bing=result.organization[i];
                break;

              }

              bing_news_search_term=place_value_for_bing+" "+people_value_for_bing+" "+organization_value_for_bing;

            }catch(err){
              console.log(err);
            }
            console.log(bing_news_search_term);
            console.log(twiiter_news);
            console.log(country_to_search_for);
            // console.log(google_trends_api_search_term);
            console.log(sentimental_analysis);
            console.log(google_search_term_array);
            console.log(article_summary);


            // sentimental_analysis_integrate

            sentimental_analysis.push(result.sentiment_prob.compound);
            sentimental_analysis.push(result.sentiment_prob.neg);
            sentimental_analysis.push(result.sentiment_prob.neu);
            sentimental_analysis.push(result.sentiment_prob.pos);
            console.log(typeof(sentimental_analysis[1]));

            // bing_news_integration


            Highcharts.chart('container', {
                chart: {
                    type: 'pie',
                    options3d: {
                        enabled: true,
                        alpha: 45
                    }
                },
                title: {
                    text: 'Sentimental Analysis'
                },

                plotOptions: {
                    pie: {
                        innerSize: 100,bing_news_search_term,
                        depth: 45
                    }
                },
                series: [{
                    name: 'Amount by % ',
                    data: [
                        ['Positive',sentimental_analysis[3]*100,true],
                        ['Negative',sentimental_analysis[1]*100,false],
                        ['Neutral',sentimental_analysis[2]*100, false]
                    ]
                }]
            });

            // now bing new intergrated

            setTimeout(function(){

              data={'searchtermfrontend':google_search_term_array[0]};

              $.ajax({
                type: 'POST',
                data: JSON.stringify(data),
                contentType: 'application/json',
                url: 'http://localhost:3000/bingnewsplease',
                success: function(result) {
                        //  console.log('success');
                        console.log(result);

                         for(var i=0;i<result.value.length;i++)
                         {
                           $(".append_bing_news_here").append('<div class="col s12"> <div class="card teal"> <div class="card blue-grey darken-1"> <div class="card-content white-text"> <span class="card-title bing_headline" ><a href="#!"></a></span> <p class="bing_descirption_news"></p> </div> </div> </div> </div>')
                         }

                         for(var i=0;i<result.value.length;i++)
                         {
                           $(".bing_headline").eq(i).html('<a style="color:black;" href="'+result.value[i].url+'" target="_blank">'+result.value[i].name+'</a>')
                         }

                         for(var i=0;i<result.value.length;i++)
                         {
                           $(".bing_descirption_news").eq(i).html(result.value[i].description);
                         }

                      },
                error:function(err)
                {
                  console.log(err);
                }
              });

              // trend_integration

              data={'googlesearcharray':google_search_term_array};

              $.ajax({
                type: 'POST',
                data: JSON.stringify(data),
                contentType: 'application/json',
                url: 'http://localhost:3000/googletrendsnow',
                success: function(result) {
                         console.log('success');
                         console.log(result);

                         total_related_qureies=result.quries;
                         total_related_topics=result.topics;

                         $('.related_queries').html('Relate Queries : '+total_related_qureies);
                         $('.related_topics').html('Relate Topics : '+total_related_topics);


                         Highcharts.chart('container2', {
           chart: {
               type: 'variablepie'
           },
           title: {
               text: 'Related Topic & Related Queries '
           },
           tooltip: {
               headerFormat: '',
               pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
                   'Most Recent Values: : <b>{point.y}</b><br/>'
               },
           series: [{
               minPointSize: 10,
               innerSize: '20%',
               zMin: 0,
               name: 'countries',
               data: [{
                   name: 'Related Queries',
                   y: parseInt(total_related_qureies),
                   z: parseInt(total_related_qureies)
               }, {
                   name: 'Related Topics',
                   y: parseInt(total_related_topics),
                   z: parseInt(total_related_topics)
               }]
           }]
       });



                         //
                        //  $(".time_series_box").append('<div class="col s12"> <div class="card"> <script type="text/javascript" src="https://ssl.gstatic.com/trends_nrtr/1173_RC01/embed_loader.js"></script> <script type="text/javascript"> trends.embed.renderExploreWidget("TIMESERIES", {"comparisonItem":[{"keyword":"'+result.val+'","geo":"IN","time":"now 1-d"}],"category":0,"property":""}, {"exploreQuery":"date=now 1-d&geo=IN&q='+result.val +'","guestPath":"https://trends.google.com:443/trends/embed/"}); </script></div> </div>')

                      },
                error:function(err)
                {
                  console.log(err);
                }
              });




            },1000);










            // {
            //   "all_keywords":
            //   ["wildfire","leave","wildfires","sonoma","deputy","rosa","county","santa","night","city"],
            //   "organization":["wildfires"],
            //   "people":["santa","rosa"],
            //   "place":["sonoma","county"],
            //   "random":[],
            //   "sentiment":"Negative",
            //   "sentiment_prob":{
            //       "compound":-0.998,
            //       "neg":0.163,
            //       "neu":0.808,
            //       "pos":0.029},
            //       "summary":""
            //   }
            //




          },
    error:function(err){
      console.log(err);
    }
  });


}
