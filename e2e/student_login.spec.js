var faker = require('faker');

var email = ''
var password = 'testing'

Feature("Student Login");

Before((I) => {
    I.amOnPage('/#/join');
});


