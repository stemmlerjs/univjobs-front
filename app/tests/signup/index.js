import assert from 'assert'
import axios from 'axios'
import config from '../config'
import { makeTestId, makeTestPassword } from '../helpers'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised);

const expect = chai.expect;
const testId = makeTestId();
const testStudentEmail = testId + '@sheridancollege.ca';
const testStudentPassword = makeTestPassword();

const testEmployerEmail = testId + '@test.ca';
const testEmployerPassword = makeTestPassword();

export function createStudentAccount(email, password) {
  return axios.post(config.BASE_API_URL + 'register/', {
    email: email,
    password: password
  })
}

/**
  * Create Employer Account
  *   - Makes a POST to /register/business to create an employer account
  *   - Successful eturn response gives us our access token
  *
  * @param (String) - firstName, lastName, companyName, mobile, email, password
  */
export function createEmployerAccount(firstName, lastName, companyName, mobile, email, password) {
  return axios.post(config.BASE_API_URL + 'register/business/', {
    email: email,
    password: password,
    first_name: firstName,
    last_name: lastName,
    company_name: companyName,
    mobile: mobile
  })
}

  /*
  * Test Signup functionality
  */

describe('Signup', function() {

  /*
  * Create a Student
  * API ENDPOINT: /api/register/ - POST
  */

  describe('#Student Signup - Create a new student - /api/register/', function() {
    this.timeout(10000);
    it('should return a successful response of 201', function() {
      return expect(
        createStudentAccount(testStudentEmail, testStudentPassword))
        .to.eventually.have
        .property('status')
        .to.equal(201)
    });
  });

  /*
  * Create an Employer
  * API ENDPOINT: /api/register/business/ - POST
  */

  describe('#Employer Signup - Create a new employer - /api/register/business/', function() {
    it('should return a successful response of 201', function() {
      return expect(
          createEmployerAccount(testId, testId, testId, '2261111111', testEmployerEmail, testEmployerPassword))
          .to.eventually.have
          .property('status')
          .to.equal(201)
    });
  });



});