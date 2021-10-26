let password = "";
let userName = "";

function setuserpassword(){
    password = parseInt($("#password").val());
    console.log(password)

}

function userlogin(){
    setuserpassword()
    console.log(userName)
    $.ajax({
        type: 'POST',
        url: getApiRoot() + '/twofactorlogin',
        data: JSON.stringify({'phoneNumber':userName, 'oneTimePassword':password}),
        success: function(data) {
            window.location.href = "/timer.html#"+data;//add the token to the url
        },
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

        var passwordField = document.getElementById("password");
        passwordField.onchange=setuserpassword;
        passwordField.addEventListener("keyup", enterFunction);
        
        var loginButton = document.getElementById("loginbtn");
        loginButton.onclick=userlogin;   
        
        let hash= location.hash;//will include the #
        let hashparts = hash.split("#");
        if (hashparts.length < 2) {
            window.location="/"; //there is no phone number on the url, so they must not have logged in yet, we will help redirect them here
        } else {
            userName = hashparts[1];// the url should look like https://stedi.me/timer.html#4c2286a7-8fdc-47c5-b972-739769554c88
            console.log(userName)
        }
    }

);