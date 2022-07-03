function signOutL()
{

    auth.signOut().then(()=>{
        location.href ="../index.html";
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
    function viewClaims(){
        
        auth.onAuthStateChanged((user)=>{

        if(user)
        {
            db.collection("claims").where("ClaimerID", '==',user.uid).get().then((AllRecords)=>{
                var div=""
                var html=""
                const list =document.getElementById("table-info")
                
               console.log("running")
        AllRecords.forEach((currentRecord) => {
            div=`
            <tr>
            <td>${currentRecord.data().Name}</td>
            <td>${currentRecord.data().Surname}</td>
            <td>${currentRecord.data().ClameeID}</td>
            <td>${currentRecord.data().Relationship}</td>
            <td>${currentRecord.data().Address}</td>
            <td>${currentRecord.data().Status}</td>
            </tr>
            `
            html += div
            list.innerHTML =html
            });



            })

        }

    })
    }
    viewClaims()
    getuserN()
    