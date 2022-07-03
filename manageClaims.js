function viewdata(){
    
    db.collection("claims").get().then((AllRecords)=>{

        const list =document.getElementById("table-info")
        var div ="";
        var html ="";

        AllRecords.forEach((currentRecord)=>{

            div =`
            <tr>
            <td>${currentRecord.data().ClaimerEmaiil}</td>
            <td>${currentRecord.data().ClaimerCell}</td>
            <td>${currentRecord.data().Name}</td>
            <td>${currentRecord.data().Surname}</td>
            <td>${currentRecord.data().ClameeID}</td>
            <td>${currentRecord.data().Relationship}</td>
            <td>${currentRecord.data().Address}</td>
            <td>${currentRecord.data().Status}</td>

            <td><div class="pic">
              <img src="images/edit.png" alt="" data-toggle="modal" data-target="#myModal2" onclick="viewEachProduct('${currentRecord.id}')" >
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
  var id ='';
//take entered values and update
var newStatus = document.getElementById("statOptions").value;

    db.collection("claims").doc(viewedItem).update({
        Status:newStatus

    }, merge=true).then(()=>{
        db.collection("claims").doc(viewedItem).get().then((info)=>{

 id =info.data().ClameeID
        }).then(()=>{
         db.collection("members").where("ID","==",id).get().then((snp)=>{
          snp.forEach((s)=>{
            s.id
            db.collection("members").doc(s.id).update({
              Status:"Approved"
            },merge=true)
          })
         })
        })
    }).then(()=>{
      swal("success","Status updated successfully","success")
    });setTimeout(() => {
      window.location.reload()
    }, 2000);

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
				willDelete=db.collection("claims").doc(id).delete();
			  swal("Poof! Claim has been deleted!", {
				icon: "success",
			  });
			} else {
			  swal("Claim is safe!");
			}
		  });
      setTimeout(() => {
        window.location.reload()
      }, 2000);


}

function autoDelMem()
{  
  var subcr =0;
  db.collection("members").where("Status","==","Approved").get().then((info)=>{
    info.forEach((i)=>{
    
      db.collection("members").doc(i.id).delete()
    })
  })
 
/*
  db.collection("members").get().then((info)=>{

    info.forEach((currentRecord) => {

      if( currentRecord.id && currentRecord.data().Status =="Approved" ){
          
        
        db.collection("members").where("MemId", '==',currentRecord.data().ClaimerID).get().then((have)=>{

          have.forEach((rec) => {
            console.log(rec.id);
           // db.collection("members").doc(rec.id).delete();

          })

        })
       

      }
      else{
        return false
      }
      

    });
   

  })
*/

}

function signOutL()
{

    auth.signOut().then(()=>{
        location.href ="../index.html";
    })
}

viewdata()
autoDelMem()