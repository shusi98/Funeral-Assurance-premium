function login(){
    var password =document.getElementById("pass").value
    var username =document.getElementById("uEmail").value;
    auth.signInWithEmailAndPassword(username,password).then(()=>{
        
        db.collection("users").doc(auth.currentUser.uid).get().then((info)=>{

            if(info.data().userStatus == "user")
            {
                location.href ="home.html";
               
            }
            else
            {
                swal("error!", "you are an admin", "error");
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