function viewdata(){
    
    db.collection("comments").get().then((AllRecords)=>{

        const list =document.getElementById("table-info")
        var div ="";
        var html ="";

        AllRecords.forEach((currentRecord)=>{

            div =`
            <tr>
            <td>${currentRecord.data().Name}</td>
            <td>${currentRecord.data().Surname}</td>
            <td>${currentRecord.data().Comment}</td>
            

            <td><div class="pic">
              <img src="images/delete.png" alt="" onclick="removeItem('${currentRecord.id}')">
            </div></td>

        </tr>
       
            `
            html += div
            list.innerHTML =html

        })


    })
   
}
function removeItem(id)
{
	
  
		swal({
			title: "Are you sure?",
			text: "Once deleted,you wont be able to retrieve",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		  })
		  .then((willDelete) => {

			if (willDelete) {
				willDelete=db.collection("comments").doc(id).delete();
			  swal("Poof! Claim has been deleted!", {
				icon: "success",
			  });
              setTimeout(() => {
                window.location.reload()
              },2000);
			} else {
			  swal("Claim is safe!");
              setTimeout(() => {
                window.location.reload()
              }, 2000);
			}
		  });


}
function signOutL()
{

    auth.signOut().then(()=>{
        location.href ="../index.html";
    })
}
viewdata()