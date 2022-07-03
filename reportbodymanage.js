function signOutL()
{

    auth.signOut().then(()=>{
        location.href ="../index.html";
    })
}

function viewdata(){
     
    
  
        
        db.collection("reportBody").get().then((AllRecords)=>{

            const list =document.getElementById("table-info")
            var div ="";
            var html ="";
    
            AllRecords.forEach((currentRecord)=>{
    
                div =`
                <tr>
                <td>${currentRecord.data().ReporterMail}</td>
                <td>${currentRecord.data().ReporterCell}</td>
                <td>${currentRecord.data().Name}</td>
                <td>${currentRecord.data().Surname}</td>
                <td>${currentRecord.data().ID}</td>
                <td>${currentRecord.data().Address}</td>
                <td><div class="pic">
                  <img src="images/edit.png" alt="" data-toggle="modal" data-target="#myModal2" onclick="viewEachProduct('${currentRecord.id}')" >
                  <img src="images/delete.png" alt="" onclick=removeItem('${currentRecord.id}')>
                </div></td>
    
            </tr>
           
                `
                html += div
                list.innerHTML =html

            })


        })
       
    
}
var viewedItem =""
function viewEachProduct(id){

db.collection("reportBody").doc(id).get().then((info)=>{
	// get values from database
	document.getElementById("statOptions").innerHTML = ` <option>${info.data().Status}</option>
    <option value="Seen">Seen</option>
    <option value="On our way">On our way</option>
    <option value="Done">Done</option>
	`
	viewedItem= id
	
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
				willDelete=db.collection("reportBody").doc(id).delete().then(()=>{
          update(id)
        })
			  swal("Poof! Claim has been deleted!", {
				icon: "success",
			  });
			} else {
			  swal("Claim is safe!");
			}
		  }).then(()=>{

        setTimeout(() => {
          window.location.reload()
        }, 2000);
      })


}


function updateStatus(){
	//take entered values and update
	var newStatus = document.getElementById("statOptions").value;

		db.collection("reportBody").doc(viewedItem).update({
			Status:newStatus

		}, merge=true).then(()=>{
			swal("Success!", "Status updated successfully!", "success");
			setTimeout(()=>{
				window.location.reload();
			},2000)
		})

}
viewdata()