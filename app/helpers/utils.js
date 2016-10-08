
export function yyyymmdd(rightNow) {
  return rightNow.toISOString().slice(0,10).replace(/-/g,"-");
}

export function validatePassword(password) {
  return password.length > 6
}

export function validateStudentEmail(email, callback) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  if(!re.test(email)){
    callback(false, "Please enter your school email address.")
  } else if (!/@sheridancollege.ca\s*$/.test(email)) {
     callback(false, "Sorry, we are only currently available to Sheridan College students. Please contact us @ theunivjobs@gmail.com if you'd like us to extend access to your institution.")
  } else {
    callback(true)
  }
}

export function validateEmployerEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email)
}

export function validatePersonalEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  //If true pass validation
  if(re.test(email) || email == '') {
    return true
  } else {
    return false
  }
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
  return re.test(phone) && (phone.length === 10);
}

export function validateCompanyName(companyName) {
  var re = /^[a-z ,.'-]{2,30}$/i
  return re.test(companyName)
}

export function detectEnterPress(event, callback) {
  let keyCode = event.keyCode || event.charCode;
  if(keyCode === 13) {
    callback()
  } 
}

export function validatePostalCode(postalcode) {
  if(postalcode === undefined) {
    return false
  } else {
      var re = /^[\w ]+$/
      return re.test(postalcode) && (postalcode.length === 7)
  }
}

export function validateCity(city) {
  let re = /^[a-z ,.'-]{2,30}$/i
  return re.test(city)
}

export function validateCompanyName(name) {
  let re = /^([a-zA-Z ]){2,30}$/
  return re.test(name)
}

export function validateAddress(address) {
  let re = /^[a-z0-9 ,.'-]{2,30}$/i // numbers, letters and spaces only
  return re.test(address)
}

/*GPA must be two numbers or empty*/
export function validateGPA(gpa) {
  var re = /(^[0]$)|(^\d{2}$)/
  return re.test(gpa)
}

/* Languages must be empty or a number from 0 to 132
 * FIXME: Change range of input to 0 to 132
 * */
export function validateLanguages(languageList) {
  if(languageList.length != 0) {
    return true
  } 
}
// ***************** DATE ******************//
export function toISO(date) {
  return date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();//prints expected format.
}

export function validateJobTitle(jobTitle) {
  var re = /^[a-z ,.'-]{2,40}$/i
  return re.test(jobTitle)
}
