var faker = require('faker');

var email = ''

Feature("Student SignUp");

Before((I) => {
    I.amOnPage('/#/join');
});

Scenario('Wrong email for student signup', (I) => {
    I.fillField('student[email]', 'charlesjavelona@gmail.com');
    I.fillField('student[password]', 'testingpassword');
    I.click('Sign me up');
    I.see("Sorry, we are only currently available to Sheridan College students. Please contact us @ theunivjobs@gmail.com if you'd like us to extend access to your institution."); 
});

Scenario('Student signup', (I) => {
    email = faker.name.firstName();
    I.fillField('student[email]', `${email}@sheridancollege.ca`);
    I.fillField('student[password]', 'testing');
    I.click('Sign me up');
    I.see('Complete your profile so we can find you a job today!');
});

Scenario('Email duplicate', (I) => {
    I.fillField('student[email]', `${email}@sheridancollege.ca`);
    I.fillField('student[password]', 'testing');
    I.click('Sign me up');
    I.see('This email is already registered, please try another one');
});





