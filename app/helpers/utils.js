
export function validatePassword(password) {
  return password.length > 6;
}

export function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email)
}

export function validateFirstName(firstName) {
  var re = /^[a-z ,.'-]{2,20}$/i
  return re.test(firstName)
}

export function validateLastName(lastName) {
  var re = /^[a-z ,.'-]{2,30}$/i
  return re.test(lastName)
}

export function validatePhoneNumber(phone) {
  var re = /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i
  return re.test(phone);
}

export function validateCompanyName(companyName) {
  var re = /^[a-z ,.'-]{2,30}$/i
  return re.test(companyName)
}