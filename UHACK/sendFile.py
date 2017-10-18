# -*- coding: utf-8 -*-
from flask import Flask
from flask import request
from flask import jsonify
from flask_cors import CORS, cross_origin
import summaryKeywords

app = Flask(__name__)
CORS(app)

@app.route('/sendFile',methods = ['GET','POST'])
def updateAndTrigger():
    #print request.get_json(silent = True);
    print request.headers#['drama']
    #textToReplace = request.headers['article'];
    #print request.get_json(silent =True);

    textToReplace = request.get_json(silent =True);

    #print textToReplace["article"];
    with open("index.html", 'r+') as f:
        f.seek(0)
        f.truncate();
        text = """<!DOCTYPE html>
        <html>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <head>
        </head>
        <body>

            <div class="hey"> """ + str(textToReplace) + """

             </div>

        </body>
        </html>"""
        f.write(text);


    jsonResult = summaryKeywords.runFinal();
    print jsonResult
    return jsonify(jsonResult)

@app.route("/check")
def chk():
    print "done";
    return "reached"

if __name__ == '__main__':
    app.run(host='0.0.0.0');
