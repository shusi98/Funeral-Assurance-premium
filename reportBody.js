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

    function sendReport(){

        var uName=document.getElementById("fName").value;
        var uSurname =document.getElementById("surname").value;
        var uID =document.getElementById("idNum").value;
        var hAddress=document.getElementById("hAddress").value;
        var pTime =document.getElementById("passT").value;
        var reportEmail ="";
        var reporterCell="";

        if(uName ==""||uSurname ==""||uID ==""||hAddress ==""||pTime =="")
        {
            swal("error","Fields must not be empty","error");
            return false
           
        }
        var pickStat="Pending";

        auth.onAuthStateChanged((user)=>{
            if(user){
                db.collection("users").doc(user.uid).get().then((info)=>{
                   
                    reportEmail =info.data().Email;
                    reporterCell=info.data().Cellphone;

                    console.log(reportEmail)

                   db.collection("reportBody").add({

                        Name:uName,
                        Surname:uSurname,
                        ID:uID,
                        Address:hAddress,
                        PassTime:pTime,
                        Status:pickStat,
                        ReportId:user.uid,
                        ReporterMail:reportEmail,
                        ReporterCell:reporterCell
    
                    })
          

                })
               
            }
    
        })



    }

    function validateReport()
    {

        var reporteeID =document.getElementById("idNum").value
        auth.onAuthStateChanged((user)=>{
            if(user){

                db.collection("members").where("MemId", '==',user.uid).get().then((info)=>{

                   info.forEach((currentRecord) => {

                    if(currentRecord.data().ID == reporteeID){

                        sendReport()
                            swal("success","Report sent successfully","success").then(()=>{
                                setTimeout(() => {
                                    window.location.reload()
                                },2000);
                            })
                         
                      
                      
                    }
                    else{
                     

                            swal("error","Person not registered under your premium","error");
                        
                            setTimeout(() => {
                                window.location.reload()
                            },2000);
    
                        
                       
                       
                    }
                   });
                   
                })

            }
         })
    }
    function viewReport(){
        auth.onAuthStateChanged((user)=>{

        if(user)
        {
            db.collection("reportBody").where("ReportId", '==',user.uid).get().then((AllRecords)=>{


                var div=""
                var html=""
                const list =document.getElementById("table-info")

        AllRecords.forEach((currentRecord) => {

            div=`
            <tr>
            <td>${currentRecord.data().Name}</td>
             <td>${currentRecord.data().Surname}</td>
               <td>${currentRecord.data().ID}</td>
                <td>${currentRecord.data().Address}</td>
              <td>${currentRecord.data().PassTime}</td>
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
    viewReport()
    getuserN()
    getPremAmt()