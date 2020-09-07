var express = require('express');
var router = express.Router();
var fs = require('fs');
var menu = JSON.parse(fs.readFileSync('menu.json', 'utf8'));

const dayName = {1: "Monday", 2: "Tuesday", 3: "Wednesday", 4: "Thursday", 5: "Friday", 6: "Saturday", 7: "Sunday"}

function getDay() {
  var now = new Date();
  var time = now.getTime();
  var day = (time - 1598832000000)/1000/60/60/24;
  var week = day/7;
  return ["Week " + String((Math.floor(week)%4+1)), dayName[(Math.floor(day)%7+1)]];
}


/* GET home page. */
router.get('/', function(req, res, next) {
  var day = getDay();
  var food = menu[day[0]][day[1]];
  var soup = food.Lunch.Soup;
  var lunches = food.Lunch.Mains;
  var lsides = food.Lunch.Sides;
  var ldessert = food.Lunch.Dessert;
  var dinners = food.Dinner.Mains;
  var dsides = food.Dinner.Sides;
  var ddessert = food.Dinner.Dessert;
  res.render('index.ejs', {"soup" : soup, "lunches": lunches, "lsides": lsides, "ldessert": ldessert, "dinners": dinners, "dsides": dsides, "ddessert": ddessert});
});

module.exports = router;
