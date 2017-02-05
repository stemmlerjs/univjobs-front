var faker = require('faker');

var email = ''

Feature("Employer Signup");

Before((I) => {
    I.amOnPage('/#/join');
});


Scenario('Employer', (I) => {
    I.click('EMPLOYER');
});
