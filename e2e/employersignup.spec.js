var faker = require('faker');

var email = ''

Feature("Employer Signup");

Before((I) => {
    I.amOnPage('/#/join');
});


Scenario('Employer signup', (I) => {
    I.click('EMPLOYER');
    I.see('HIRE STUDENTS');
    I.click('Employers - Post a job now');
    I.fillField('employer[firstname]', 'test');
});
