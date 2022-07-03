
    function signOutL()
    {
    
        auth.signOut().then(()=>{
            location.href ="../index.html";
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

    function sendClaim(){

        var uName =document.getElementById("fName").value
        var uSurname =document.getElementById("fSurname").value
        var clameeID =document.getElementById("idNum").value
        var relationship=document.getElementById("relation").value
        var Uadress=document.getElementById("hAddress").value
        var claimerEmail ="";
        var claimerCell="";
        var status ="Pending";
        auth.onAuthStateChanged((user)=>{
            if(user){
                db.collection("users").doc(user.uid).get().then((info)=>{

                    claimerEmail=info.data().Email;
                    claimerCell =info.data().Cellphone;
                    db.collection("claims").add({

                        Name:uName,
                        Surname:uSurname,
                        ClameeID:clameeID,
                        Relationship:relationship,
                        Address:Uadress,
                        ClaimerEmaiil:claimerEmail,
                        ClaimerCell:claimerCell,
                        ClaimerID:user.uid,
                        Status:status

                    })
                       
                    
    
                })
                
            }
    
        })
    }

    function validateClaim()
    {

        var clameeID =document.getElementById("idNum").value
        auth.onAuthStateChanged((user)=>{
            if(user){

                db.collection("members").where("MemId", '==',user.uid).get().then((info)=>{

                   info.forEach((currentRecord) => {

                    if(currentRecord.data().ID == clameeID){

                        sendClaim()
                        swal("success","Your claim is been sent","success")
                      
                        return false
                      
                    }
                    else{
                        swal("error","Person not registered under your premium","error");
                       
                        setTimeout(() => {
                            window.location.reload()
                        }, 2000);
                    }
                   })
                   
                })



            }
         })
    }
    getuserN()