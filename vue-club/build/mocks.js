var express = require("express");
var app = express();
var appData = require('../data.json');
var articles = appData.articles;
var passageOne  = {
            "id": 8,
            "title": "t2442",
            "content": "t22",
            "publisher": "232",
            "source": "22",
            "passageType": 1,
            "publishTime": "2019-04-14T15:23:00.000+0000",
            "clickNum": 0
        }
var activities = appData.activities;
var clubs = appData.clubs;
var apiRoutes = express.Router();
apiRoutes.get('/passages', function (req, res) {
  res.json({
    code: 200,
    data: articles
  });
});
apiRoutes.get('/passages/:id', function (req, res) {
  res.json({
    code: 200,
    data: passageOne
  });
});
apiRoutes.get('/activities', function (req, res) {
  res.json({
    code: 200,
    data: activities
  });
});

apiRoutes.get('/clubs', function (req, res) {
  res.json({
    code: 200,
    data: clubs
  });
});

app.use('/club/api', apiRoutes);

app.listen(8010);
console.log("server run at  port :8010");
