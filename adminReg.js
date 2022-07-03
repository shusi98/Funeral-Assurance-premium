function registerL(){
 
   
    var name =document.getElementById("fName").value;
    var namVal = document.getElementById("fnam");

        if( name == "")
        { 
            namVal.innerHTML="*Field is Required!";
        }
        else{
            namVal.innerHTML="";
        }

    var surname = document.getElementById("fSurname").value;
    var surVal = document.getElementById("lastN");
        if( surname == "")
        { 
            surVal.innerHTML="Field is Required!";
        }
        else
        {
            surVal.innerHTML="";
        }
    var idNumber = document.getElementById("idNum").value; 

    var idVal =document.getElementById("idNumW")

    if( idNumber == "")
    {
        idVal.innerHTML = "Field is Required!"
    }
    else
    {
        idVal.innerHTML =""; 
    }
     if(isNaN(idNumber))
     {
         idVal.innerHTML="ID must be a digit!"

     }
    

    var address = document.getElementById("hAddress").value;
    var addrVal=document.getElementById("add")
        if(address =="")
        {
            addrVal.innerHTML ="Field is Required!"
        }
        else
        {
            addrVal.innerHTML=""; 
        }

    var username =document.getElementById("uEmail").value;
    var userNVal = document.getElementById("mailW")

        if( username =="")
        {
            userNVal.innerHTML = "Field is Required!";
        }
        else{
            userNVal.innerHTML=""; 
        }

        checkEmail()
      

    var phoneN =document.getElementById("cellN").value;
    var cellVal =document.getElementById("phone")

        if( phoneN == "")
        {
            cellVal.innerHTML = "Field is Required!"
        }
        else
        {
            cellVal.innerHTML =""; 
        }
        if(isNaN(phoneN))
        {
            cellVal.innerHTML="Number must be a digit!"
        }
       
    var gender =document.getElementById("gend").value;
    var gendV =document.getElementById("gendW")

        if(gender =="")
        {
            gendV.innerHTML ="Field is Required!"
        }
        else
        {
            gendV.innerHTML ="";
        }

    
    var password =document.getElementById("pass").value
    var passwVal = document.getElementById("passW")

        if(password =="")
        {
            passwVal.innerHTML ="Field is Required!";
            
        }
        else
        {
            passwVal.innerHTML ="";
        }

    var confirmPass = document.getElementById("confPass").value
    var confPval = document.getElementById("confPW")

        if(confirmPass == "")
        {
        confPval.innerHTML ="Field is Required!"

        }
        else
        {
            confPval.innerHTML =""; 
        }

        if(confirmPass != password)
        {

        confPval.innerHTML ="Password do not match!"
        return false;
        }
    var logUser ="admin";
    auth.createUserWithEmailAndPassword(username,password).then(()=>{
        db.collection("users").doc(auth.currentUser.uid).set({
           Name:name,
           Surname:surname,
           IDNumber:idNumber,
           Gender:gender,
           Address:address,
           Cellphone:phoneN,
           Email:username,
           userStatus:logUser

        }, merge=true).then(()=>{

         
           location.href = "manageUsers.html";

        })
       
    })
    

   
}

function signOutL()
{

    auth.signOut().then(()=>{
        location.href ="index.html";
    })
}

function checkEmail() {

    var email = document.getElementById("uEmail");
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!filter.test(email.value)) {
        var userNVal = document.getElementById("mailW")
        userNVal.innerHTML="Please enter a valid email"
    email.focus;
    return false;
 }
}


