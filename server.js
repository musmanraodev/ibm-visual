var express = require('express')
var app = express()

app.listen(3000)

function faceDetect(params) {
    return new Promise(function (resolve, reject) {
        var res = {};
        var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');
        var visualRecognition = new VisualRecognitionV3({
            version: '2018-03-19',
            api_key: process.env.api_key
        });
        visualRecognition.detectFaces({
            'url': 'https://www.biography.com/.image/t_share/MTE4MDAzNDEwNzg5ODI4MTEw/barack-obama-12782369-1-402.jpg'
        }, function (err, res) {
            if (err)
                reject(err);
            else
                resolve(res);
        });
    });
}

app.get('/', function (req, res) {
    faceDetect()
        .then((results) => res.json(results, null, 2))
        .catch((error) => res.json(error.message));
})