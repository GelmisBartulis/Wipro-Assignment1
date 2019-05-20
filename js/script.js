$(document).ready(function() {
    $("#signUp").click(function(){
        $("#signIn").fadeOut(0).hide(1000);
        $("#register").fadeIn(1500);
    });
    $("#backArrow1").click(function(){
        $("#register").fadeOut(1500).hide();
        $("#signIn").fadeIn(1500);
    });
    $("#email").change(validate).keyup(validate);
    function validate() {
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
    const template1 = document.getElementById('dialog-template1');
    const template2 = document.getElementById('dialog-template2');
    const template3 = document.getElementById('dialog-template3');
    document.body.appendChild( document.importNode(template1.content, true) );
    document.body.appendChild( document.importNode(template2.content, true) );
    document.body.appendChild( document.importNode(template3.content, true) );
    function showNotification(wrapperName, button) {
        const wrapper = document.querySelector(wrapperName);
        const closeButton = document.querySelector(button);
        const wasFocused = document.activeElement;
        wrapper.classList.add('open');
        closeButton.focus();
        closeButton.addEventListener('click', () => {
            wrapper.classList.remove('open');
            wasFocused.focus();
        });
    }
    showSignIn = function () {
        var fname = document.getElementById('usernameSignIn').value;
        var pass = document.getElementById('passwordSignIn').value;
        var getUserEmail =  localStorage.getItem('email');
        var getUserPass =  localStorage.getItem('pass1');
        if(fname === getUserEmail && pass === getUserPass) { showNotification(".wrapper2", "button.close2");} else { showNotification(".wrapper1", "button.close1");}
    } 
    resultsFun = function () {
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
        if(testString(fname)) {
            $('#fname').css({ "border": 'transparent 1px solid'});
            $('#fname').removeClass("error");        
            $('#fname').addClass("valid");
        } else {
            showNotification(".wrapper1", "button.close1");
            $('#fname').addClass("error");        
            $('#fname').removeClass("valid");
        }
        if(testString(lname)) {
            $('#lname').css({ "border": 'transparent 1px solid'});
            $('#lname').removeClass("error");        
            $('#lname').addClass("valid");
        } else {
            showNotification(".wrapper1", "button.close1");
            $('#lname').addClass("error");        
            $('#lname').removeClass("valid");
        }
        if(testEmail(email)) {
            $('#email').css({ "border": 'transparent 1px solid'});
            $('#email').removeClass("error");        
            $('#email').addClass("valid");
        } else {
            showNotification(".wrapper1", "button.close1");
            $('#email').addClass("error");        
            $('#email').removeClass("valid");
        }        
        if(testDate(dob)) {
            $('#dob').css({ "border": 'transparent 1px solid'});
            $('#dob').removeClass("error");        
            $('#dob').addClass("valid");
        } else {
            showNotification(".wrapper1", "button.close1");
            $('#dob').addClass("error");        
            $('#dob').removeClass("valid");
        }  
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
    testString = function (str) {
        if(/^[a-zA-Z]+$/.test(str)) 
            return true;            
        else 
            return false;            
    }
    testEmail = function (str) {
        if(/\S+@\S+\.\S+/.test(str)) 
            return true;            
        else 
            return false;            
    }
    testDate = function (str) {
        if(/^(?=.*?[1-9])[0-9()-]+$/.test(str))
            return true;
        else
            return false;
    }        
    testPass = function(str) {
        var rules = [
            /[0-9]/,//at least one digit from 0-9, could also use \d
            /[a-z]/,//at least one lowercase
            /[A-Z]/,//at least one uppercase
            /[!%&*\s]/,//special characters, add more as needed. note that \s checks for whitespace
            /^.{8,20}$///length between 8-20
        ];
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
