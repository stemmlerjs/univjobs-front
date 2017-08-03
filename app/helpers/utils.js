
import createDOMPurify from 'dompurify';

const DOMPurify = createDOMPurify(window);

/*
 * sanitize
 * 
 * @param {String} - the dirty string to sanitize
 * @return {String} - clean string, sanitized
 */

  export function sanitize(dirty) {
    return DOMPurify.sanitize(dirty);
  }

  /*TODO: Switch string concat to template literals */
  export function multipleQueryList(arr) {
    return arr.map((index, item) => 'job_id=' + item.id + '$').join('')
  }

  export function yyyymmdd(rightNow) {
    return rightNow.toISOString().slice(0,10).replace(/-/g,"-");
  }

/**
 * validatePassword
 * 
 * @description - The password must be a minimum 8 characters in length,
 * have 1 upper case character, 1 lower case, 1 symbol and 1 number.
 * 
 * @param {string} password - 
 * @returns {boolean} success - if the password passes the criteria
 */

export function validatePassword(password) {

  var upperCaseLowerCaseSymbolHasNumber = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/;
  let isMinimum8Chars = false;
  
  if (password.length >= 8) isMinimum8Chars = true;

  return (upperCaseLowerCaseSymbolHasNumber.test(password) && isMinimum8Chars)
}

export function validateResetPasswords (password, confirmPassword) {
    if (password == "" || confirmPassword == "") {
      return true;
    }

    else if (password == confirmPassword) {
      if (!validatePassword(password) || !validatePassword(confirmPassword)) {
        return false
      } else {
        return true;
      }
    }

    else {
      return false
    }
}

export function validateStudentEmail(email, callback) {
  // Strip spaces and make lowercase
  email = email.replace(/^\s+|\s+$/g, '').toLowerCase()

  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  if(!re.test(email)){
    callback(false, "Please enter your school email address.")
  } else if (!/@sheridancollege.ca\s*$/.test(email)) {
     callback(false, "Sorry, we are only currently available to Sheridan College students. Please contact us at contact@univjobs.ca if you'd like us to extend access to your institution.")
  } else {
    callback(true)
  }
}

export function validateEmployerEmail(email) {

  // Strip spaces and make lowercase
  email = email.replace(/^\s+|\s+$/g, '').toLowerCase()

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
    callback(event)
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

export function validateAddress(address) {
  let re = /^[a-z0-9 ,.'-]{2,30}$/i // numbers, letters and spaces only
  return re.test(address)
}

/**
 * GPA must be greater than 0 or less than 4
 *
 * Referrence: http://stackoverflow.com/questions/26921116/using-regexpressions-to-validate-gpa
 * */
export function validateGPA (gpa) {
  var isANumber = !isNaN(Number(gpa));
  var isBetweenZeroAndFour = Number(gpa) <= 4 && Number(gpa) >= 0 
  
  return (isANumber && isBetweenZeroAndFour)
}

export function validateJobTitle(jobTitle) {
  var re = /^[a-z0-9 ,.'-]{2,30}$/i
  return re.test(jobTitle)
}

export function validateWebURL(value){
  return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
}

 /*
 * return false if it's an array 
 *
 * */
export function validateLanguages(languageList) {
    //debugger
    return !Array.isArray(languageList) 
}

// ***************** DATE ******************//
export function toISO(date) {
  return date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();//prints expected format.
}



/* Used to find the index of the jobId in an array
 * Is pair with Array object.findIndexOf(findJobId)
 *
 * Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
 * */
export function findJobId(id, jobId) {
    return id === jobId
}


/* Returns a number
 *
 * */
export function hasCarBoolean(input) {
    let temp;
    //debugger
    
    if(typeof input === 'number') {
        return input;
        
    } else if(typeof input === 'boolean') {
        temp = input === true ? 0 : 1

    } else {
        temp = input
    }

    return temp
}

export function validateResponsibilities (responsibilities) {
  if (responsibilities === "") return false
  return true
  // let re = /^[a-z0-9 ,$()+=?%&*/;:.'-]{2,5500}$/i // numbers, letters and spaces only
  // return re.test(responsibilities)
}

export function validateQualifications (qualifications) {
  if (qualifications === "") return false
  return true
  // let re = /^[a-z0-9 ,$()+=?%&*/;:.'-]{2,1400}$/i // numbers, letters and spaces only
  // return re.test(qualifications)
} 

export function validateDesiredSkills (skills) {
  if (skills === "") return false
  return true
  // let re = /^[a-z0-9 ,$()+=?%&*/;:.'-]{2,100}$/i // numbers, letters and spaces only
  // return re.test(skills)
}

export function validateJobLocation (location) {
  let re = /^[a-z0-9 ,().'-]{2,100}$/i // numbers, letters and spaces only
  return re.test(location)
} 

export function validateCompensation (comp) {
  let re = /^[a-z0-9 ,+=$/.'-]{2,380}$/i // numbers, letters and spaces only
  return re.test(comp)
}

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

export function scrollToY (scrollTargetY, speed, easing) {
    // scrollTargetY: the target scrollY property of the window
    // speed: time in pixels per second
    // easing: easing equation to use

    var scrollY = window.scrollY || document.documentElement.scrollTop,
        scrollTargetY = scrollTargetY || 0,
        speed = speed || 2000,
        easing = easing || 'easeOutSine',
        currentTime = 0;

    // min time .1, max time .8 seconds
    var time = Math.max(.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, .8));

    // easing equations from https://github.com/danro/easing-js/blob/master/easing.js
    var easingEquations = {
            easeOutSine: function (pos) {
                return Math.sin(pos * (Math.PI / 2));
            },
            easeInOutSine: function (pos) {
                return (-0.5 * (Math.cos(Math.PI * pos) - 1));
            },
            easeInOutQuint: function (pos) {
                if ((pos /= 0.5) < 1) {
                    return 0.5 * Math.pow(pos, 5);
                }
                return 0.5 * (Math.pow((pos - 2), 5) + 2);
            }
        };

    // add animation loop
    function tick() {
        currentTime += 1 / 60;

        var p = currentTime / time;
        var t = easingEquations[easing](p);

        if (p < 1) {
            requestAnimFrame(tick);

            window.scrollTo(0, scrollY + ((scrollTargetY - scrollY) * t));
        } else {
            console.log('scroll done');
            window.scrollTo(0, scrollTargetY);
        }
    }

    // call it once to get started
    tick();
}


export function createCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

export function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

export function eraseCookie(name) {
    createCookie(name,"",-1);
}