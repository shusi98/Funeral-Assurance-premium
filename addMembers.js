

function addM(){
    var memName = document.getElementById("fName").value;
    var memSurname = document.getElementById("surname").value;
    var memdateOfB = document.getElementById("dateOf").value ;
    var memRela =document.getElementById("rela").value;
    var memberID =document.getElementById("memID").value;


    if(memName ==""||memSurname ==""||memdateOfB==""|| memRela==""||memberID=="" )
    {
        swal("error","Fields must not be empty","error");
        return false
    }
    var addMem =0;
    auth.onAuthStateChanged((user)=>{

        if(user){
            db.collection("users").doc(user.uid).get().then((info)=>{

            addMem= parseInt( info.data().numMember) + 1;

            if(addMem <= 9  )
            {
                db.collection("members").add({
                    Name:memName,
                    Surname:memSurname,
                    DateOfBirth:memdateOfB,
                    Relationship:memRela,
                    ID:memberID,
                    MemId:user.uid
                    
                }).then(()=>{
                    db.collection("users").doc(user.uid).update({
                        numMember:addMem
    
                    }).then(()=>{
                        swal("Success!", "Member successfully Added", "success");
                        setTimeout(()=>{
                          window.location.reload();
                        },2000)
                    })
            
                }) 

            }else
            {
               
                swal("error","You can only add up to a maximum of 8 members","error");

            }
                
            })/*.then(()=>{

                db.collection("users").doc().update({
                    numMember:addMem

                })
            })*/

        }
    })
}

function viewMember(){
    auth.onAuthStateChanged((user)=>{

        if(user){

	db.collection("members").where("MemId", '==',user.uid).get().then((AllRecords)=>{
		const list =document.getElementById("table-info")
		var div ="";
		var html ="";
var count=0
		AllRecords.forEach((currentRecord)=>{
count++
			div =`
            <tr>
                        
            <td>${currentRecord.data().Name}</td>
            <td>${currentRecord.data().Surname}</td>
            <td>${currentRecord.data().DateOfBirth}</td>
            <td>${currentRecord.data().ID}</td>
            <td>${currentRecord.data().Relationship}</td>
           
          </tr>

			`
			html += div
			list.innerHTML =html
		})
        db.collection("users").doc(user.uid).update({

            numMember:count +1
	},merge=true)
})
	}
})
}

function getPremAmt(){

    var storeAmnt = document.getElementById("shwAmnt");
    storeAmnt.innerHTML = "0";
      auth.onAuthStateChanged((user)=>{
        if(user){
     db.collection("premiums").doc(user.uid).get().then((info)=>{
    
      storeAmnt.innerHTML= info.data().PremiumAmnt
      console.log(storeAmnt)
    
    
     }) 
    
    
        }
        else
      {
        
      }
    
      })
      
    }
    
    function getuserN()
    {
        var getN = document.getElementById("lName");
        auth.onAuthStateChanged((user)=>{
            if(user){
                db.collection("users").doc(user.uid).get().then((info)=>{
    
                    getN.innerHTML = info.data().Name;
    
                })
                
            }
    
        })
    }
    
function signOutL()
{

    auth.signOut().then(()=>{
        location.href ="../index.html";
    })
}

 getuserN()
 getPremAmt()
viewMember()