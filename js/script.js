// This script is a mix between jQuery and JS 
// It allows for faster processing 

$(document).ready(function() {
    
    // jQuery functions first 
    
    // This allows for smooth animation while swapping divs
    $("#signUp").click(function(){
        
        // Login page will fade out and hide
        $("#signIn").fadeOut(0).hide(1000);
        
        // Register page will fade in
        $("#register").fadeIn(1500);
    });

    // When the back arrow in Registration div is pressed
    $("#backArrow1").click(function(){
        
        // Register form will fade out
        $("#register").fadeOut(1500).hide();
        
        // Sign In page will fade in
        $("#signIn").fadeIn(1500);
    });

    
    
    
    // On data change in the email field  (registration field)
    $("#email").change(validate).keyup(validate);

    // Validate function allows for real-time checking the input value changes
    function validate() {

        
        // These are defined as 'var' because the input is constantly changing 
        // Getting the text box of the input
        var textBox = $(this);
        
        // Getting the string from the text box
        var str = textBox.val();

        
        // If the string is not empty or null 
        if(str === null || str === "" || str === undefined){
            
            // The default picture for the logo
            $("#emailImg").attr("src","images/logo.png");

            // Adding the class empty to see any changes 
            textBox.addClass("empty");       

            // Removing the class error and valid because the field is empty
            textBox.removeClass("error");
            textBox.removeClass("valid");

            // If the input matches the below RegEx notation
        } else if (/\S+@\S+\.\S+/.test(textBox.val())) {
            
            // Show a picture for accepting
            $("#emailImg").attr("src","images/accept.png");

            // Adding the valid class (this will alter the CSS)
            textBox.addClass("valid");        
            
            // Removing the error class if there is one  
            textBox.removeClass("error");

        } else {
            
            // If it does not match any inputs, show that the input is not accepted
            $("#emailImg").attr("src","images/deny.png");

            // Show an error
            textBox.addClass("error");        
            
            // Remove valid class (CSS)
            textBox.removeClass("valid");

        } //  end of if array statements   
    
    } // end of validate function
    
    
    
    //**************** Based on ES5 and ES6 standards *******************

    // Defining the templates to append them to the body later
    // since the templates are not chaning they're defined as const
    
    // Wrong answer template 
    const template1 = document.getElementById('dialog-template1');
    
    // Right answer template 
    const template2 = document.getElementById('dialog-template2');
    
    // Notification answer template 
    const template3 = document.getElementById('dialog-template3');

    
    // Adding the template to the body 
    document.body.appendChild(
      document.importNode(template1.content, true)
    );
    
    // Adding the template to the body 
    document.body.appendChild(
      document.importNode(template2.content, true)
    );
    
    // Adding the template to the body 
    document.body.appendChild(
      document.importNode(template3.content, true)
    );
    
    
    
    // Allowing the ability to show the template and add closing functionality
    function showNotification(wrapperName, button) {
        
        // Wrapper takes care of all the content present in the template
        const wrapper = document.querySelector(wrapperName);
        
        // Defining the closing button
        const closeButton = document.querySelector(button);
        
        // Adding that the element is currently active
        const wasFocused = document.activeElement;
        
        // Adding a class open - this will open the template until the close button is clicked
        wrapper.classList.add('open');
        
        // On close button focus
        closeButton.focus();
        
        // Adding closing event to the button 
        closeButton.addEventListener('click', () => {
            
            // Removing the class - this will close the template 
            wrapper.classList.remove('open');
            
            // Remove focus
            wasFocused.focus();
            
        }); //  end of evenlistener
    
    }// end of function 
    
    
    // Checking user information with the information that is local
    // Using method overloading
    showSignIn = function () {

        // Getting values from user input and adding to the new vars
        var fname = document.getElementById('usernameSignIn').value;
        
        // Getting values from user input and adding to the new vars
        var pass = document.getElementById('passwordSignIn').value;
        
        
        // Getting the data from the localStorage 
        // First name
        var getUserEmail =  localStorage.getItem('email');
        
        // Password
        var getUserPass =  localStorage.getItem('pass1');
        
        
        // If the first name is present that has a value in the localStorage
        if(fname === getUserEmail && pass === getUserPass) {
            
            // If both variables match the data 
            showNotification(".wrapper2", "button.close2");

        } else {

            // Show the data if the info is wrong
            showNotification(".wrapper1", "button.close1");
        
        } // end of if
        
    } // end of showSignIn method
    
    
    

    // Registering the user 
    resultsFun = function () {
        
        
        // Creating variables with the data that the user has specified
        
        // First name
         var fname = $('#fname').val();
        
        // Second name
        var lname = $('#lname').val();
        
        // Email
        var email = $('#email').val();
        
        // Date of birth
        var dob = $('#dob').val();
        
        // Gender
        var gen = $("input[name='gender']:checked").val();
        
        // Password
        var pass1 = $('#pass1').val();
        
        // Confirm password
        var pass2 = $('#pass2').val();
        
        
            
        if(testPass(pass1) && testPass(pass2) && pass1 === pass2) {
            $('#pass1').css({ "border": 'transparent 1px solid'});
            $('#pass2').css({ "border": 'transparent 1px solid'});
            $('#pass1').removeClass("error");        
            $('#pass2').removeClass("error");  
            $('#pass2').add("valid");  
            $('#pass2').add("valid");  
            
        } else {
            $('#pass1').addClass("error");        
            $('#pass2').addClass("error");        
        }
            
        // Test first name
        if(testString(fname)) {
            $('#fname').css({ "border": 'transparent 1px solid'});
            $('#fname').removeClass("error");        
            $('#fname').addClass("valid");
        } else {
            showNotification(".wrapper1", "button.close1");
            $('#fname').addClass("error");        
            $('#fname').removeClass("valid");
        }
        
        // Test second name
        if(testString(lname)) {
            $('#lname').css({ "border": 'transparent 1px solid'});
            $('#lname').removeClass("error");        
            $('#lname').addClass("valid");
        } else {
            showNotification(".wrapper1", "button.close1");
            $('#lname').addClass("error");        
            $('#lname').removeClass("valid");
        }
        
        // Test email name        
        if(testEmail(email)) {
            $('#email').css({ "border": 'transparent 1px solid'});
            $('#email').removeClass("error");        
            $('#email').addClass("valid");
        } else {
            showNotification(".wrapper1", "button.close1");
            $('#email').addClass("error");        
            $('#email').removeClass("valid");
        }        
        
        // Test date name        
        if(testDate(dob)) {
            $('#dob').css({ "border": 'transparent 1px solid'});
            $('#dob').removeClass("error");        
            $('#dob').addClass("valid");
        } else {
            showNotification(".wrapper1", "button.close1");
            $('#dob').addClass("error");        
            $('#dob').removeClass("valid");
        }  
        
        // Test date name        
        if(testString(gen)) {
            $('#gen').css({ "border": 'transparent 1px solid'});
            $('#gen').removeClass("error");        
            $('#gen').addClass("valid");
        } else {
            showNotification(".wrapper1", "button.close1");
            $('#gen').addClass("error");        
            $('#gen').removeClass("valid");
        }  
        

        if(!pass1 === null && !pass2 === null && testPass(pass1) === testPass(pass1) && testString(fname) && testString(lname) && testEmail(email) && testDate(dob) && testString(gen)) {
            localStorage.setItem('fname', fname);
            localStorage.setItem('lname', lname);
            localStorage.setItem('email', email);
            localStorage.setItem('dob', dob);
            localStorage.setItem('gen', gen);
            localStorage.setItem('pass1', pass1);
            saveVariables();
            showNotification(".wrapper2", "button.close2");
        } else {
            showNotification(".wrapper1", "button.close1");
        }
    }
    
    
    // Testing the string to make sure it's only letters with no symbols, numebers or spaces
    testString = function (str) {
        
        if(/^[a-zA-Z]+$/.test(str)) 
            return true;            
        else 
            return false;            
    }
    
    
    // Checking the email address to make sure it matches something@something.com
    testEmail = function (str) {
        
        if(/\S+@\S+\.\S+/.test(str)) 
            return true;            
        else 
            return false;            
    }
        
    // Checking if the date has the valid input without any symbols and just numbers 
    testDate = function (str) {
        
        if(/^(?=.*?[1-9])[0-9()-]+$/.test(str))
            return true;
        else
            return false;
    }        
    
    
    // Checking the password to match the criteria
    testPass = function(str) {
        var rules = [
            /[0-9]/,//at least one digit from 0-9, could also use \d
            /[a-z]/,//at least one lowercase
            /[A-Z]/,//at least one uppercase
            /[!%&*\s]/,//special characters, add more as needed. note that \s checks for whitespace
            /^.{8,20}$///length between 8-20
        ];

        //validate
        for(var i = 0; i < rules.length; i++){
           
            var rule = rules[i];
            if(!rule.test(str)){
                return false;
                break;
            } else {
                return true;
                break;
            }
        }
    }
    
    //<!--- Displaying items within the text area -->
    //<!--- Chaning the color of the input string -->
    //<!--- And also placing them within the input fields -->
    saveVariables = function () {
        if(localStorage.getItem('fname') !== null)
            $('#output').text(
                "The details shown below have been recorded \n \n " + 
                "Name: " + localStorage.getItem('fname') + "\n" + 
                "Surname: " + localStorage.getItem('lname') + "\n" + 
                "Email: " + localStorage.getItem('email') + "\n" + 
                "Date of birth: " + localStorage.getItem('dob') + "\n" +
                "Gender: " + localStorage.getItem('gen') + "\n");
    }
});
