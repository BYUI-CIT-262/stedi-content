//© 2021 Sean Murdock

let userName = "";

let verifypassword = "";
let passwordRegEx=/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%!]).{6,40})/;

function setusername(){
    userName = $("#username").val();
}



function setverifypassword(){
    verifypassword = $("#verifypassword").val();
    if (verifypassword!=password){
        alert('Passwords must be entered the same twice');
    }
}

function savetoken(token){
// whatever passes as token should save into local storage
    if (window.localStorage){
     localStorage.setItem("token", token);
    }

}

function checkexpiredtoken(token){
// read token from local storage - check with ajax call
    if(window.localStorage){
    usertoken = localStorage.getItem("token");
    $.ajax({
       type: 'GET',
        url: '/validate/'+token,
        data: JSON.stringify({usertoken}),
        success: function(data){savetoken(data)},
        contentType: "application/text",
        dataType: 'text' })
    }
}



function getUserPin(){
    setusername();
    $.ajax({
        type: 'POST',
        url: getApiRoot() + '/twofactorlogin/'+ userName,
        success: function(data) {
            window.location.href = "/pin.html#"+ userName
        },
        contentType: "application/text",
        dataType: 'text'
    });
        
        

}

function readonlyforms(formid){
    form = document.getElementById(formid);
    elements = form.elements;
    for (i = 0, len = elements.length; i < len; ++i) {
    elements[i].readOnly = true;
    }
    createbutton();
}
 function pwsDisableInput( element, condition ) {
        if ( condition == true ) {
            element.disabled = true;

        } else {
            element.removeAttribute("disabled");
        }

 }

function createbutton(){
    var button = document.createElement("input");
    button.type = "button";
    button.value = "OK";
    button.onclick = window.location.href = "/index.html";
    context.appendChild(button);
}


function createuser(){
    $.ajax({
        type: 'POST',
        url: '/user',
        data: JSON.stringify({userName, 'email': userName, password, 'verifyPassword': vpwd, 'accountType':'Personal'}),//we are using the email as the user name
        success: function(data) { alert(data);
//        readonlyforms("newUser");
//        alert(readonlyforms("newUser"));
        window.location.href = "/index.html"},
        contentType: "application/text",
        dataType: 'text'
    });
}

function getstephistory(){
      $.ajax({
            type: 'POST',
            url: '/stephistory',
            data: JSON.stringify({userName}),
            success: function(data) { alert(data);
            json = $.parseJSON(data);
            $('#results').html(json.name+' Total Steps: ' + json.stepTotal)},
            contentType: "application/text",
            dataType: 'text'
        });
}

var enterFunction = (event) =>{
    if (event.keyCode === 13){
        event.preventDefault();
        $("#loginbtn").click();
    }
}



const getApiRoot = () => {
    const hashTag = window.location.hash;
    console.log('Hash tag '+ hashTag);

    let apiRoot = hashTag === '#local' 
                ? 'http://localhost:4567' 
                : 'https://dev.stedi.me';

    if (window.location.hostname.includes('-dev')){
        apiRoot = 'https://dev.stedi.me';
    
    } else if (window.location.hostname.includes('stedi.me')){
        apiRoot = 'https://setdi.me';
    }
    return apiRoot;
}

$(document).ready(

    ()=>{
        var userField = document.getElementById("username");
        userField.onchange=setusername;        
        userField.addEventListener("keyup", enterFunction);
        
        var loginButton = document.getElementById("loginbtn");
        loginButton.onclick=userlogin;   
    }

);
