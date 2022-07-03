function signOutL()
{

    auth.signOut().then(()=>{
        location.href ="../index.html";
    })
}

function selectAllData()
{
	  
    auth.onAuthStateChanged((user)=>{

        if(user){
    db.collection("users").get().then((AllRecords)=>{
        const list =document.getElementById("table-info")
        var div ="";
        var html ="";

        AllRecords.forEach((currentRecord)=>{

            div =`
			<tr>
			<td>${currentRecord.data().Name}</td>
			<td>${currentRecord.data().Surname}</td>
			<td>${currentRecord.data().IDNumber}</td>
			<td>${currentRecord.data().Cellphone}</td>
			<td>${currentRecord.data().Address}</td>
			<td><div class="pic">
			<img src="images/edit.png" alt="" data-toggle="modal" data-target="#myModal2" onclick="viewEachProduct('${currentRecord.id}')">
			<img src="images/delete.png" alt="" onclick="removeItem('${currentRecord.id}')">
		  </div></td>

		</tr>
       
            `
            html += div
            list.innerHTML =html
        })

    })
}
	})

}
var viewedItem="";
function viewEachProduct(id){

db.collection("users").doc(id).get().then((info)=>{
	// get values from database
	document.getElementById("cell").value = info.data().Cellphone;
	document.getElementById("address").value = info.data().Address;
	
	viewedItem =id
})

}
function updateProduct(){
	//take entered values and update
	var newCellphoneN = document.getElementById("cell").value;
	var newAddress =document.getElementById("address").value;
	
		console.log("clicked")
		db.collection("users").doc(viewedItem).update({
			Cellphone:newCellphoneN,
			Address:newAddress

		}, merge=true).then(()=>{
			swal("Success!", "Item updated successfully!", "success");
			setTimeout(()=>{
				window.location.reload();
			},2000)
		})

}
function removeItem(id)
{
	
  
		swal({
			title: "Are you sure?",
			text: "Once deleted,the user wont be able to login",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		  })
		  .then((willDelete) => {

			if (willDelete) {
				willDelete=db.collection("users").doc(id).delete();
			  swal("Poof! Item has been deleted!", {
				icon: "success",
			  });
			} else {
			  swal("User is safe!");
			}
		  });


}
///////////////////////////////////////////////////////////
function registerL(){
 
 
    var name =document.getElementById("fName").value;
    var surname = document.getElementById("fSurname").value;
    var idNumber = document.getElementById("idNum").value; 
    var address = document.getElementById("hAddress").value;
    var username =document.getElementById("uEmail").value;
    var phoneN =document.getElementById("cellN").value;
    var gender =document.getElementById("gend").value;
    var password =document.getElementById("pass").value
    var confirmPass = document.getElementById("confPass").value
    var countM = 1;
    auth.createUserWithEmailAndPassword(username,password).then(()=>{
        db.collection("users").doc(auth.currentUser.uid).set({
           Name:name,
           Surname:surname,
           IDNumber:idNumber,
           Gender:gender,
           Address:address,
           Cellphone:phoneN,
		   Email:username,
           numMember:countM

        }, merge=true).then(()=>{

         
           swal("success","User added successfully","success");
		   setTimeout(() => {
			   window.location.reload();
		   }, 2000);

        })
       
    })
    

   
}




function myFunction() {
	// Declare variables
	var input, filter, table, tr, td, i, txtValue;
	input = document.getElementById("myInput");
	filter = input.value.toUpperCase();
	table = document.getElementById("show");
	tr = table.getElementsByTagName("tr");
  
	// Loop through all table rows, and hide those who don't match the search query
	for (i = 0; i < tr.length; i++) {
	  td = tr[i].getElementsByTagName("td")[0];
	  if (td) {
		txtValue = td.textContent || td.innerText;
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
		  tr[i].style.display = " ";
		} else {
		  tr[i].style.display = "none";
		}
	  }
	}
	
  }
  selectAllData()
  viewEachProduct()