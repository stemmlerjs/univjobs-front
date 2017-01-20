Feature("Student SignUp");

Before((I) => {
    I.amOnPage('/#/join');
});

Scenario('Test Student SignUp', (I) => {
    I.fillField('student[email]', 'charlesjavelona@gmail.com');
    I.fillField('student[password]', 'testingpassword');
});



