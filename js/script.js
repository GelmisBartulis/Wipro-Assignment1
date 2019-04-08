$(document).ready(function() {
    $("#signUp").click(function(){// This allows for smooth animation while swapping divs
        $("#signIn").fadeOut(0).hide(1000);
        $("#register").fadeIn(1500);
    });

    $("#backArrow1").click(function(){// When the back arrow in Registration div is pressed
        $("#register").fadeOut(1500).hide();// Register form will fade out
        $("#signIn").fadeIn(1500);// Sign In page will fade in
    });

    $("#email").change(validate).keyup(validate);// On data change in the email field  (registration field)
    
    function validate() {// Validate function allows for real-time checking the input value changes
        var textBox = $(this);
        var str = textBox.val();
        if(str === null || str === "" || str === undefined){
            $("#emailImg").attr("src","images/logo.png");
            textBox.addClass("empty");       
            textBox.removeClass("error");
            textBox.removeClass("valid");
        } else if (/\S+@\S+\.\S+/.test(textBox.val())) {
            $("#emailImg").attr("src","images/accept.png");
            textBox.addClass("valid");        
            textBox.removeClass("error");
        } else {
            $("#emailImg").attr("src","images/deny.png");
            textBox.addClass("error");        
            textBox.removeClass("valid");
        } 
    }
    const template1 = document.getElementById('dialog-template1');// Wrong answer template 
    const template2 = document.getElementById('dialog-template2');// Right answer template 
    const template3 = document.getElementById('dialog-template3');// Notification answer template 
    document.body.appendChild(document.importNode(template1.content, true) );// Adding the template to the body 
    document.body.appendChild(document.importNode(template2.content, true) );// Adding the template to the body 
    document.body.appendChild(document.importNode(template3.content, true) );// Adding the template to the body 
    
    function showNotification(wrapperName, button) {// Allowing the ability to show the template and add closing functionality
        const wrapper = document.querySelector(wrapperName);// Wrapper takes care of all the content present in the template
        const closeButton = document.querySelector(button);
        const wasFocused = document.activeElement;// Adding that the element is currently active
        wrapper.classList.add('open');// Adding a class open - this will open the template until the close button is clicked
        closeButton.focus();// On close button focus
        closeButton.addEventListener('click', () => {// Adding closing event to the button 
            wrapper.classList.remove('open');// Removing the class - this will close the template 
            wasFocused.focus();// Remove focus
        }); 
    }
    
    showSignIn = function () {// Using method overloading
        var fname = document.getElementById('usernameSignIn').value;
        var pass = document.getElementById('passwordSignIn').value;
        var getUserEmail =  localStorage.getItem('email');
        var getUserPass =  localStorage.getItem('pass1');
        if(fname === getUserEmail && pass === getUserPass) { showNotification(".wrapper2", "button.close2");} else {showNotification(".wrapper1", "button.close1");} 
    } 
    
    resultsFun = function () {// Registering the user 
         var fname = $('#fname').val();
        var lname = $('#lname').val();
        var email = $('#email').val();
        var dob = $('#dob').val();
        var gen = $("input[name='gender']:checked").val();
        var pass1 = $('#pass1').val();
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
        if(testString(fname)) {// Test first name
            $('#fname').css({ "border": 'transparent 1px solid'});
            $('#fname').removeClass("error");        
            $('#fname').addClass("valid");
        } else {
            showNotification(".wrapper1", "button.close1");
            $('#fname').addClass("error");        
            $('#fname').removeClass("valid");
        }
        if(testString(lname)) {// Test second name
            $('#lname').css({ "border": 'transparent 1px solid'});
            $('#lname').removeClass("error");        
            $('#lname').addClass("valid");
        } else {
            showNotification(".wrapper1", "button.close1");
            $('#lname').addClass("error");        
            $('#lname').removeClass("valid");
        }
        if(testEmail(email)) {// Test email name       
            $('#email').css({ "border": 'transparent 1px solid'});
            $('#email').removeClass("error");        
            $('#email').addClass("valid");
        } else {
            showNotification(".wrapper1", "button.close1");
            $('#email').addClass("error");        
            $('#email').removeClass("valid");
        }        
        if(testDate(dob)) {// Test date name      
            $('#dob').css({ "border": 'transparent 1px solid'});
            $('#dob').removeClass("error");        
            $('#dob').addClass("valid");
        } else {
            showNotification(".wrapper1", "button.close1");
            $('#dob').addClass("error");        
            $('#dob').removeClass("valid");
        }  
        if(testString(gen)) {// Test date name 
            $('#gen').css({ "border": 'transparent 1px solid'});
            $('#gen').removeClass("error");        
            $('#gen').addClass("valid");
        } else {
            showNotification(".wrapper1", "button.close1");
            $('#gen').addClass("error");        
            $('#gen').removeClass("valid");
        }  
        if(pass1 !== null && pass2 !== null && testPass(pass1) === testPass(pass1) && testString(fname) && testString(lname) && testEmail(email) && testDate(dob) && testString(gen) ) {
            localStorage.setItem('fname', fname);
            localStorage.setItem('lname', lname);
            localStorage.setItem('email', email);
            localStorage.setItem('dob', dob);
            localStorage.setItem('gen', gen);
            localStorage.setItem('pass1', pass1);
            displayVariables();
        } else {
            console.log("hi");
            showNotification(".wrapper1", "button.close1");
        }
    }
    testString = function (str) { return /^[a-zA-Z]+$/.test(str) ? true : false ; } // Testing the string to make sure it's only letters with no symbols, numebers or spaces 
    testEmail = function (str) { return /\S+@\S+\.\S+/.test(str) ? true : false ; } // Checking the email address to make sure it matches something@something.com
    testDate = function (str) { return /^(?=.*?[1-9])[0-9()-]+$/.test(str) ? true : false ; }// Checking if the date has the valid input without any symbols and just numbers 
    testPass = function(str) {// Checking the password to match the criteria
        var rules = [/[0-9]/,/[a-z]/,/[A-Z]/,/[!%&*\s]/, /^.{8,20}$/];
        for(var i = 0; i < rules.length; i++){//validate
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
    displayVariables = function () {
        if(localStorage.getItem('fname') !== null)
            var wrapper1 = document.querySelector(".wrapper2");// Wrapper takes care of all the content present in the template
            var closeButton2 = document.querySelector("button.close2");
            var wasFocused3 = document.activeElement;// Adding that the element is currently active
            wrapper1.classList.add('open');// Adding a class open - this will open the template until the close button is clicked
            document.getElementById('contentID').innerHTML =  
                "<strong>The details shown below have been recorded </strong><br>" + 
                "<strong>Name: </strong>" + localStorage.getItem('fname') + "<br>" + 
                "<strong>Surname: </strong>" + localStorage.getItem('lname') + "<br>" + 
                "<strong>Email: </strong>" + localStorage.getItem('email') + "<br>" + 
                "<strong>Date of birth: </strong>" + localStorage.getItem('dob') + "<br>" +
                "<strong>Gender: </strong>" + localStorage.getItem('gen') + "<br>";
            closeButton2.focus();// On close button focus
            closeButton2.addEventListener('click', () => {// Adding closing event to the button 
                wrapper1.classList.remove('open');// Removing the class - this will close the template 
                wasFocused3.focus();// Remove focus
            }); 
    }
});
