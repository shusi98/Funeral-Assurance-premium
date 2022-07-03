function viewdata(){

    db.collection("premiums").get().then((AllRecords)=>{

        const list =document.getElementById("table-info")
        var div ="";
        var html ="";

        AllRecords.forEach((currentRecord)=>{

            div =`
            <tr>
            <td>${currentRecord.data().Name}</td>
            <td>${currentRecord.data().Surname}</td>
            <td>${currentRecord.data().Email}</td>
            <td>${currentRecord.data().Cellphone}</td>
            <td>${currentRecord.data().IDNumber}</td>
            <td>${currentRecord.data().PremiumAmnt}</td>
            <td>${currentRecord.data().dateCreated}</td>

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
var viewedItem =""
function viewEachProduct(id){

db.collection("claims").doc(id).get().then((info)=>{
// get values from database
document.getElementById("statOptions").innerHTML = ` <option>${info.data().Status}</option>
<option value="Approved">Approved</option>

`
viewedItem= id

})

}

function updateStatus(){
//take entered values and update
var newStatus = document.getElementById("statOptions").value;

    db.collection("claims").doc(viewedItem).update({
        Status:newStatus

    }, merge=true).then(()=>{
        swal("Success!", "Status updated successfully!", "success");
        setTimeout(()=>{
            window.location.reload();
        },2000)
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
				willDelete=db.collection("premiums").doc(id).delete();
			  swal("Poof! record has been deleted!", {
				icon: "success",
			  });
			} else {
			  swal("Record is safe!");
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