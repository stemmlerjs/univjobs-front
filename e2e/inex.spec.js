Feature("Student SignUp");

Before((I) => {
    I.amOnPage('/#/join');
});

Scenario('Test Non Student SignUp', (I) => {
    I.fillField('student[email]', 'charlesjavelona@gmail.com');
    I.fillField('student[password]', 'testingpassword');
    I.click('Sign me up');
    I.see("Sorry, we are only currently available to Sheridan College students. Please contact us @ theunivjobs@gmail.com if you'd like us to extend access to your institution."); 
});

/*TODO: Make a random name and password generator */
Scenario('Test Student SignUp', (I) => {
    I.fillField('student[email]', 'javelonc@sheridancollege.ca');
    I.fillField('student[password]', 'testing');
    I.click('Sign me up');
    I.see('First Name');

});



