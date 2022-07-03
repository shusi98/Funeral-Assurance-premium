function login(){
    var password =document.getElementById("pass").value
    var username =document.getElementById("uEmail").value;
    auth.signInWithEmailAndPassword(username,password).then(()=>{
        
        db.collection("users").doc(auth.currentUser.uid).get().then((info)=>{

            if(info.data().userStatus == "admin")
            {
                location.href ="manageUsers.html";
               
            }
            else
            {
                swal("error!", "you are a user", "error");
            }
               
         
           })

               

 }).catch(function(error){
     swal("error!", "you are not a registered user", "error");
 })


}

function signOutL()
{

    auth.signOut().then(()=>{
        location.href ="index.html";
    })
}