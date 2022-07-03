

function signOutL()
{

    auth.signOut().then(()=>{
        location.href ="../index.html";
    })
}
function displayUserinfo()
{
	console.log("running")
    auth.onAuthStateChanged((user)=>{
        if(user){
            db.collection("users").doc(user.uid).get().then((info)=>{
                // get values from database
               document.getElementById("first_name").value = info.data().Name;
                document.getElementById("last_name").value = info.data().Surname;
               document.getElementById("phone").value = info.data().Cellphone;
                document.getElementById("phoneADD").value = info.data().Address;
				
                console.log(info.data().Name)
				
            })     
        } else{
            console.log("user logged out")
        }
    }) 
   

}
function updateProfile(){
	//take entered values and update
	var newName = document.getElementById("first_name").value;
	var newSurname =document.getElementById("last_name").value;
    var newCellphone =document.getElementById("phone").value;
    var newAddress =document.getElementById("phoneADD").value;
	
		console.log("clicked")
        auth.onAuthStateChanged((user)=>{

            if(user){
		db.collection("users").doc(user.uid).update({
            Name:newName,
            Surname: newSurname,
            Username: newSurname,
            Cellphone:newCellphone,
            Address: newAddress

		}, merge=true).then(()=>{
			swal("Success!", "Profile updated successfully!", "success");
			setTimeout(()=>{
				window.location.reload();
			},2000)
		})
    }
})
}


displayUserinfo()