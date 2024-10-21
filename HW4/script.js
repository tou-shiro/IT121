// IT121 HW4 by Shiro 10/20/2024
// This is a simple web page to validate passwords and use that as part of a large form-validation script.

const validateForm = (myForm) => {

    // add validatePassword function here

    let firstname = myForm.firstname.value; // get text of firstname field
    let lastname = myForm.lastname.value;
    let password = myForm.password.value;

    //document.write(firstname);
    //document.write(lastname);
    //document.write(password);

    /* Form validation code goes here */
    if (firstname.length == 0 || lastname.length == 0 || password.length == 0) {   
      // use this syntax to update 'message' DIV with appropriate wording
      $("#message").html("please enter something in the fields");
      return false; // prevent page reload
    } else if (validatePassword(password) == false) {
      $("#message").html("Valid passwords should have at least one uppercase letter, at least one lowercase letter and 8 char long");
      return false; // prevent page reload
    } else {
      $("#message").html("password is VALID!");
      return false; // prevent page reload
    }
    return true; // never used
  }

  const validatePassword = (str) => {

    let hasUppercase = false;
    let hasLowercase = false;
    let hasLength = false;

    if (str.length >= 8){
      hasLength = true; // check length of pw
    }

    for (let char of str) {
        if (char >= 'A' && char <= 'Z') {
            hasUppercase = true; // check uppercase letter
        } else if (char >= 'a' && char <= 'z') {
            hasLowercase = true; // check lowercase letter
        }

        if (hasUppercase && hasLowercase && hasLength) {
            return true; // Password is valid
        }
    }

    return false; // Return false if invalid
  }