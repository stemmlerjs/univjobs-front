
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

  /*
   * - 1 uppercase
   * - 1 lowercase
   * - 1 number OR 1 symbol 
   * - minimim 8 characters
   */

  var upperCaseLowerCaseSymbolHasNumber = /^(?=.*[a-z])(?=.*[A-Z])(?=.*(_|[^A-Za-z ])).{8,}$/;
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

export function validateStudentEmail(email, schools, callback) {
  // Strip spaces and make lowercase
  email = email.replace(/^\s+|\s+$/g, '').toLowerCase()

  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  /*
   * Ensure the user entered an email address.
   */

  if(!re.test(email)){
    callback(false, "Please enter your school email address.")
  } 

  /*
   * Next, ensure that the user's email is one of the 
   * emails that we're open to.
   */

  else {

    /*
     * School is active
     */

    if (isSchoolAdded()) {
      callback(true)
    }

    /*
     * Not one of the schools we support yet.
     */

    else {
      callback(false, "Sorry, we are only currently available to certain schools. Please contact us at contact@univjobs.ca if you'd like us to extend access to your institution.")
    }
  }

  function isSchoolAdded () {

    var isFound = false;

    for (var i = 0; i < schools.length; i++) {
      if (email.indexOf(schools[i].email_suffix) !== -1) {
        isFound = true;
      }
    }

    return isFound;

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

/*
 * postalCodeCheck
 * 
 * Postal code check. 
 * This checks American and Canadian Postal Codes.
 */

export function postalCodeCheck (postalCode, type) {

    if (!postalCode) {
        return false;
    }

    postalCode = postalCode.toString().trim();

    var us = new RegExp("^\\d{5}(-{0,1}\\d{4})?$");
   // var ca  = new RegExp(/^((?!.*[DFIOQU])[A-VXY][0-9][A-Z])|(?!.*[DFIOQU])[A-VXY][0-9][A-Z]\ ?[0-9][A-Z][0-9]$/i);
    var ca = new RegExp(/^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ]( )?\d[ABCEGHJKLMNPRSTVWXYZ]\d$/i);

    if(type == "us"){
        if (us.test(postalCode.toString())) {
            console.log(postalCode);
            return true;
        }
    }

    if(type == "ca")
    {
        if (ca.test(postalCode.toString())) {
            console.log(postalCode);
            return true;
        }
    }

    return false;
}

export function validateCity(city) {
  let re = /^[a-z ,.'-]{2,30}$/i
  return re.test(city)
}

export function validateAddress(address) {
  let re = /^[a-z0-9 #,.'-]{2,50}$/i // numbers, letters and spaces only
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
  return /^(http\:\/\/|https\:\/\/)?([a-z0-9][a-z0-9\-]*\.)+[a-z0-9][a-z0-9\-\/]*$/.test(value.toLowerCase())  
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

/*
 * compressPicture
 * 
 * Compresses picture before file uploads.
 * "blob:http://localhost:8080/b8448b64-5083-40ac-8f16-e367e09d3288""
 */

export function compressPicture (file, callback) {

  /*
   * Get important metadata about the file so that when we have to 
   * reparse it into a file, we'll be able to fill in the blanks about how to 
   * create it again.
   */

  var max_width = 600;
  var max_height = 600;
  var preview = document.getElementById('preview');
  
  processfile(file)

  function processfile(file) {

    if( !( /image/i ).test( file.type ) ){
      alert( "File "+ file.name +" is not an image." );
      return false;
    }

    // Read the file in as an array buffer.
    var reader = new FileReader();
    reader.readAsArrayBuffer(file);
    
    reader.onload = function (event) {
      // blob stuff
      var blob = new Blob([event.target.result]); // create blob...
      window.URL = window.URL || window.webkitURL;
      var blobURL = window.URL.createObjectURL(blob); // and get it's URL
      
      // helper Image object
      var image = new Image();
      image.src = blobURL;
      //preview.appendChild(image); // preview commented out, I am using the canvas instead
      image.onload = function() {

        /*
          * After resizing, we're left with a data url.
          * We need to turn this back into a file with the same mimetypes that it
          * had initially.
          */
        debugger;
        var resizedDataUrl = resizeMe(image);
        var blob = dataURItoBlob(resizedDataUrl);
        var previewUrl = window.URL.createObjectURL(blob)

        var resizedFile = new File([blob], 
        "newphoto_" + new Date().toDateString() + "." + blob.type,
        {
          type: blob.type
        });

        resizedFile.preview = previewUrl

        callback(resizedFile)
      }
    };
  }

  function dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    //Old Code
    //write the ArrayBuffer to a blob, and you're done
    //var bb = new BlobBuilder();
    //bb.append(ab);
    //return bb.getBlob(mimeString);

    //New Code
    return new Blob([ab], {type: mimeString});

  }

  function readfile(files) {
    
    // remove the existing canvases and hidden inputs if user re-selects new pics
    var existinginputs = document.getElementsByName('images[]');
    var existingcanvases = document.getElementsByTagName('canvas');
    while (existinginputs.length > 0) { // it's a live list so removing the first element each time
      // DOMNode.prototype.remove = function() {this.parentNode.removeChild(this);}
      form.removeChild(existinginputs[0]);
      preview.removeChild(existingcanvases[0]);
    } 
  
    for (var i = 0; i < files.length; i++) {
      processfile(files[i]); // process each file at once
    }
    fileinput.value = ""; //remove the original files from fileinput
    // TODO remove the previous hidden inputs if user selects other files
  }

  // === RESIZE ====

  function resizeMe(img) {
    
    var canvas = document.createElement('canvas');

    var width = img.width;
    var height = img.height;

    // calculate the width and height, constraining the proportions
    if (width > height) {
      if (width > max_width) {
        //height *= max_width / width;
        height = Math.round(height *= max_width / width);
        width = max_width;
      }
    } else {
      if (height > max_height) {
        //width *= max_height / height;
        width = Math.round(width *= max_height / height);
        height = max_height;
      }
    }
    
    // resize the canvas and draw the image data into it
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, width, height);

    /*
     * Rotate the image because for some reason, it's rotated -90 degrees.
     */

    var cw = img.width;
    var ch = img.height;
    var cx = 0;
    var cy = 0;

    var degree = 90

    //   Calculate new canvas size and x/y coorditates for image
    switch (degree){
        case 90:
          cw = img.height;
          ch = img.width;
          cy = img.height * (-1);
          break;
        case 180:
          cx = img.width * (-1);
          cy = img.height * (-1);
          break;
        case 270:
          cw = img.height;
          ch = img.width;
          cx = img.width * (-1);
          break;
    }

    //  Rotate image
    canvas.setAttribute('width', cw);
    canvas.setAttribute('height', ch);
    ctx.rotate(degree * Math.PI / 180);
    ctx.drawImage(img, cx, cy);
    
    // preview.appendChild(canvas); // do the actual resized preview
    
    return canvas.toDataURL("image/jpeg", 0.7); // get the data from canvas as 70% JPG (can be also PNG, etc.)

  }
}

export function attrExists(attr) {
  if (attr !== undefined && attr !== "" && attr !== null) return true;
  return false;
}
