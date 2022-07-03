
function signOutL()
{

    auth.signOut().then(()=>{
        location.href ="index.html";
    })
}
function pay(){
  
    var month= ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];
            const d = new Date();
            //let getM = month[d.getMonth()] ; // get the actual month
            var year =d.getFullYear();
    var monthlyFee ="";
    

//get the td id
        var storeM = document.getElementById("payM")
        
        var storeMFee =document.getElementById("mFee")
        var storeStat =document.getElementById("stat")
        

     

//getting the premium amount from the premium table
    auth.onAuthStateChanged((user)=>{
            if(user){
               
         db.collection("premiums").doc(user.uid).get().then((info)=>{
            db.collection("premiums").doc(user.uid).collection(month[d.getMonth()]+year).doc(user.uid).get().then((snapshot)=>{
if(typeof snapshot.data() =="undefined"){
    storeStat.innerHTML="Not Paid"
}else{
    storeStat.innerHTML = snapshot.data().Status;
}

            
            var getM =info.data().Months[d.getMonth()];
            console.log(getM)
            storeM.innerHTML =getM;
        
          if(info.data().PremiumAmnt == "50 000")
          {
              monthlyFee = 285;  //set montly payment base on the premium
          }
          if(info.data().PremiumAmnt == "75 000")
          {
              monthlyFee = 485;
          }
          if(info.data().PremiumAmnt == "100 000")
          {
              monthlyFee = 640;

          }
             storeMFee.innerHTML = "R "+ monthlyFee // for html display
             
         })
        })
         }
           
     })       
         
}

function addpayment()
{
    var monthpay = document.getElementById("payM").innerHTML
    var payAmt =document.getElementById("mFee").innerHTML
    var pStat = document.getElementById("stat").innerHTML;
    const d = new Date();
    //let getM = month[d.getMonth()] ; // get the actual month
    var year =d.getFullYear();
    var month= ["January","February","March","April","May","June","July",
    "August","September","October","November","December"];
    auth.onAuthStateChanged((user)=>{
        if(user){

            if(pStat == "Not Paid")
            {
                db.collection("users").doc(user.uid).get().then((info)=>{
                    var uName =info.data().Name
                    console.log(uName)
                    var uSurn =info.data().Surname
                    db.collection("payment").doc(user.uid).collection(month[d.getMonth()]+year).doc(user.uid).set({
                     
                        Name:uName,
                        Surname:uSurn,
                        Month:monthpay,
                        PaidAmount:payAmt,
                        Status:"Paid",
                        PayerID:user.uid
                    },merge = true)

                }).then(()=>{
                    db.collection("premiums").doc(user.uid).collection(month[d.getMonth()]+year).doc(user.uid).set({
                        Status:"Paid"
                      },merge=true).then(()=>{

                        swal("success","successfully paid","success");
                        setTimeout(() => {
                            window.location.reload();
                        }, 2000);
                    })
                })
               

            }
            else{


                swal("error","You have already paid","error");
                setTimeout(() => {
                    window.location.reload();
                }, 2000); 
            }
        

        }

     })
}

function viewStatement(){
    var month= ["January","February","March","April","May","June","July",
    "August","September","October","November","December"];
    const d = new Date();
    //let getM = month[d.getMonth()] ; // get the actual month
    var year =d.getFullYear();

    auth.onAuthStateChanged((user)=>{
        if(user){
           
     
            db.collection("payment").doc(user.uid).collection(month[d.getMonth()]+year).where("PayerID", '==',user.uid).get().then((AllRecords)=>{
              
               
                const list =document.getElementById("table-info")
                var div=""
                var html =""

                
                  AllRecords.forEach(currentRecord => {
                    
                    console.log("running")
                div= `
                <tr>
					
                <td>${currentRecord.data().Month} </td>
                <td>${currentRecord.data().PaidAmount} </td>
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


pay();
viewStatement()

