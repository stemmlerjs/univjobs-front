
import axios from 'axios'

// Create Student Account
export function createStudentAccount(email, password) {
  // Mock get access key
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('83hhf090h3viugkjhsvvzmncxzpoih38bbjdfs98308y7g2-gt82');
    }, 200)
  })
  return promise;
}

// Create Employer Account
export function createEmployerAccount(firstName, lastName, companyName, phone, email, password) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('gse09h23b3028hgfsh20hg29g208g-9joug2090u2g09g208g9g2')
    }, 200)
  })
  return promise;
}

