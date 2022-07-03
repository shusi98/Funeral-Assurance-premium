function viewdata(){
    
    db.collection("members").get().then((AllRecords)=>{

        const list =document.getElementById("table-info")
        var div ="";
        var html ="";

        AllRecords.forEach((currentRecord)=>{

            div =`
            <tr>
            <td>${currentRecord.data().Name}</td>
            <td>${currentRecord.data().Surname}</td>
            <td>${currentRecord.data().ID}</td>
           

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
				willDelete=db.collection("members").doc(id).delete().then(()=>{
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

function update(id)
{
  console.log("update")
  var getID= "";
  db.collection("members").doc(id).get().then((info)=>{

    getID = info.data().MemId
    
    db.collection("users").doc(getID).update({

      numMember : parseInt(numMember -1)  
    })

  })

}
 


function signOutL()
{

    auth.signOut().then(()=>{
        location.href ="../index.html";
    })
}

viewdata()
