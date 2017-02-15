var faker = require('faker');

var email = ''
var password = 'testing'

Feature("Student Login");

Before((I) => {
    I.amOnPage('/#/join');
});

Scenario('Login fields empty', {timeout: 1000}, (I) => {
    I.click('LOGIN');
    within('.skylight-dialog', function() {
        I.click('Next');
    })
    I.see('Please enter a valid email address');
});

Scenario('Login password field is empty', {timeout: 1000}, (I) => {
    //email var is not global
    let email = `${faker.name.firstName()}@sheridancollege.ca`;
    I.click('LOGIN');
    within('.skylight-dialog', function() {
        I.fillField('login[email]', email);
        I.click('Next');
    })
    I.see('ther username or password is incorrect.');
});

Scenario('Student signup to test login', {timeout: 3000}, (I) => {
    email = `${faker.name.firstName()}@sheridancollege.ca`;
    I.fillField('student[email]', email);
    I.fillField('student[password]', 'testing');
    I.click('Sign me up');
    I.amOnPage('/#/profile');
});

Scenario('Student login', {timeout: 2000}, (I) => {
    I.click('LOGIN');
    within('.skylight-dialog', function() {
        I.fillField('login[email]', email);
        I.fillField('login[password]', 'testing');
        I.click('Next');
        I.amOnPage('/#/profile');
    })
});

