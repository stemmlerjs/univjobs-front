var faker = require('faker');

var email = ''

//NOTE: 
// Create an array for submit form error
// When an error is expected, lookup the array to see if therror is there

Feature("Employer Signup");

Before((I) => {
    I.amOnPage('/#/join');
});


Scenario('Employer empty firstname field', (I) => {
    I.click('EMPLOYER');
    I.see('HIRE STUDENTS');
    I.click('Employers - Post a job now');
    I.click('Sign up');
    I.see('Please enter your first name');
});


Scenario('Employer empty lastname field', (I) => {
    I.click('EMPLOYER');
    I.see('HIRE STUDENTS');
    I.click('Employers - Post a job now');
    I.fillField('employer[firstname]', faker.name.firstName());
    I.click('Sign up');
    I.see('Please enter your last name');
});

Scenario('Employer empty company field', (I) => {
    I.click('EMPLOYER');
    I.see('HIRE STUDENTS');
    I.click('Employers - Post a job now');
    I.fillField('employer[firstname]', faker.name.firstName());
    I.fillField('employer[lastname]', faker.name.lastName());
    I.click('Sign up');
    I.see('Please enter your company name');
});

Scenario('Employer empty phone field', (I) => {
    I.click('EMPLOYER');
    I.see('HIRE STUDENTS');
    I.click('Employers - Post a job now');
    I.fillField('employer[firstname]', faker.name.firstName());
    I.fillField('employer[lastname]', faker.name.lastName());
    I.fillField('employer[companyName]', faker.company.companyName());
    I.click('Sign up');
    I.see('Please enter in a valid phone 10 digit number');
});

Scenario('Employer empty email field', (I) => {
    I.click('EMPLOYER');
    I.see('HIRE STUDENTS');
    I.click('Employers - Post a job now');
    I.fillField('employer[firstname]', faker.name.firstName());
    I.fillField('employer[lastname]', faker.name.lastName());
    I.fillField('employer[companyName]', faker.company.companyName());
    I.fillField('employer[phone]', '9059199851');
    I.click('Sign up');
    I.see('Please enter in a valid email address');
});

Scenario('Employer empty password field', (I) => {
    I.click('EMPLOYER');
    I.see('HIRE STUDENTS');
    I.click('Employers - Post a job now');
    I.fillField('employer[firstname]', faker.name.firstName());
    I.fillField('employer[lastname]', faker.name.lastName());
    I.fillField('employer[companyName]', faker.company.companyName());
    I.fillField('employer[phone]', '9059199851');
    I.fillField('employer[email]', faker.internet.email());
    I.click('Sign up');
    I.see('Please enter a password with length greater than 6 characters');
});

Scenario('Employer signup', (I) => {
    I.click('EMPLOYER');
    I.see('HIRE STUDENTS');
    I.click('Employers - Post a job now');
    I.fillField('employer[firstname]', faker.name.firstName());
    I.fillField('employer[lastname]', faker.name.lastName());
    I.fillField('employer[companyName]', faker.company.companyName());
    I.fillField('employer[phone]', '9059199851');
    I.fillField('employer[email]', faker.internet.email());
    I.fillField('employer[password]', 'testing');
    I.click('Sign up');
});
