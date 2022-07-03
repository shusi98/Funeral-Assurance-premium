  
function signOutL()
{

    auth.signOut().then(()=>{
        location.href ="../index.html";
    })
}

function addpremium()
{
  var month= ["January","February","March","April","May","June","July",
    "August","September","October","November","December"];
   var uName ="";
   var uSurname ="";
   var uemail ="";
   var uCell="";
   var userID="";
   var premAmnt =document.getElementById("amnt").value;
   var date = new Date;
   var timeYear =date.getFullYear();
   console.log(timeYear)

   auth.onAuthStateChanged((user)=>{
    if(user){
db.collection("users").doc(user.uid).onSnapshot((info)=>{

  uName = info.data().Name;
  uSurname=info.data().Surname
  uemail=info.data().Email
  uCell=info.data().Cellphone
  userID=info.data().IDNumber;
db.collection("premiums").doc(user.uid).collection(month[date.getMonth()]+timeYear).doc(user.uid).get().then((snapshot)=>{

if(typeof snapshot.data() =="undefined"){
  db.collection("premiums").doc(user.uid).collection(month[date.getMonth()]+timeYear).doc(user.uid).set({
    Status:"Not Paid"
  }).then(()=>{
    db.collection("premiums").doc(user.uid).set({

      Name:uName,
      Surname:uSurname,
      Email:uemail,
      Cellphone:uCell,
      IDNumber:userID,
      PremiumAmnt:premAmnt,
      dateCreated:timeYear,
      Months:month,
      PayStatus:"Not Paid"

  }).then(()=>{

    swal("Success!", "premium chosen successfully", "success");
    setTimeout(()=>{
      window.location.reload();
    },2000)

  })
  })

}else{
  db.collection("premiums").doc(user.uid).collection(month[date.getMonth()]+timeYear).doc(user.uid).update({
    Status:"Not Paid"
  }).then(()=>{
    db.collection("premiums").doc(user.uid).set({

      Name:uName,
      Surname:uSurname,
      Email:uemail,
      Cellphone:uCell,
      IDNumber:userID,
      PremiumAmnt:premAmnt,
      dateCreated:timeYear,
      Months:month,
      PayStatus:"Not Paid"

  }).then(()=>{

    swal("Success!", "premium chosen successfully", "success");
    setTimeout(()=>{
      window.location.reload();
    },2000)

  })
  })
}

  
})
  sendEmail()


})

    }
    else
    {
        console.log("user logged out")
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
function sendEmail()
{
    var Username ;
    
    var Umessage;

    const serviceID = 'default_service';
   const templateID = 'template_bl0qumq';
   var amount =document.getElementById("amnt").value;
    

    auth.onAuthStateChanged((user)=>{
        if(user){
            db.collection("users").doc(user.uid).get().then((info)=>{
           
                Username=info.data().Name +" "+ info.data().Surname ;
                Umessage= Username + " has choosen a Premium  Amount of R"+amount;
   

                function sending(Username,Umessage)
                {
                    emailjs.send('default_service','template_bl0qumq',{
                        to_name:"Admin", from_name:Username, message:Umessage
                    })/*.then(()=>{
                        alert("Message sent")
             
                    })*/
                }
             
             sending(Username,Umessage);
             


        })
    }
    })
    
  
}

function countM()
{
 
  var count = 0;
  auth.onAuthStateChanged((user)=>{
    if(user){

      db.collection("claims").where("ClaimerID", '==',user.uid).get().then((info)=>{

        info.forEach((getNumber) => {
          
          count++
          
          
        });

        document.getElementById("claimN").innerHTML = count;

      })

    }

  })

}
function countMembers()
{
  
  var count = 0;
  auth.onAuthStateChanged((user)=>{
    if(user){

      db.collection("members").where("MemId", '==',user.uid).get().then((info)=>{

        info.forEach((getNumber) => {
          
          count++
          
          
        });

        document.getElementById("memM").innerHTML = count;

      })

    }

  })

}
function countRep()
{
 
  var count = 0;
  auth.onAuthStateChanged((user)=>{
    if(user){

      db.collection("reportBody").where("ReportId", '==',user.uid).get().then((info)=>{

        info.forEach((getNumber) => {
          
          count++
          
          
        });

        document.getElementById("repo").innerHTML = count;

      })

    }

  })

}


function viewsend()
{
  var nameU ="";
  var surn ="";
  var getComment =document.getElementById("comment").value;
  auth.onAuthStateChanged((user)=>{
    if(user){
 
      db.collection("users").doc(user.uid).get().then((info)=>{

			nameU = info.data().Name; 
      surn =info.data().Surname;

      db.collection("comments").add({

          Name:nameU,
          Surname:surn,
          Comment:getComment,
          commID:user.uid

      }, merge = true).then(()=>{

        swal("success"," Thank you your comment has been sent successfully","success");
        setTimeout(() => {
          window.location.reload()
        },2000);


      })

      })
    }

  })


}

countRep()
getuserN()
getPremAmt()
countMembers()
