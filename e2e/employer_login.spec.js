var faker = require('faker');

var email = ''
var password = 'testing'

Feature("Employer Login");

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

Scenario('Employer signup to test login', {timeout: 2000}, (I) => {
    email = faker.internet.email();
    I.click('EMPLOYER');
    I.see('HIRE STUDENTS');
    I.click('Employers - Post a job now');
    I.fillField('employer[firstname]', faker.name.firstName());
    I.fillField('employer[lastname]', faker.name.lastName());
    I.fillField('employer[companyName]', faker.company.companyName());
    I.fillField('employer[phone]', '9059199851');
    I.fillField('employer[email]', email);
    I.fillField('employer[password]', password);
    I.click('Sign up');
    I.amOnPage('/#/profile');
});

Scenario('Employer login', {timeout: 2000}, (I) => {
    I.click('LOGIN');
    within('.skylight-dialog', function() {
        I.fillField('login[email]', email);
        I.fillField('login[password]', 'testing');
        I.click('Next');
        I.amOnPage('/#/profile');
    })
});
