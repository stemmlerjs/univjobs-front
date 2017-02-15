var faker = require('faker');

var email = ''
var password = 'testing'

Feature("Student Login");

Before((I) => {
    I.amOnPage('/#/join');
});
/*
Scenario('Student signup', (I) => {
    email = faker.name.firstName();
    I.fillField('student[email]', `${email}@sheridancollege.ca`);
    I.fillField('student[password]', 'testing');
    I.click('Sign me up');
    I.see('Complete your profile so we can find you a job today!');
});
*/

Scenario('Student login', {timeout: 1000}, (I) => {
    I.click('LOGIN');
    within('.skylight-dialog', function() {
        I.fillField('login[email]', email);
        I.click('Next');
    })
});

