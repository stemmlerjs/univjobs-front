
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


