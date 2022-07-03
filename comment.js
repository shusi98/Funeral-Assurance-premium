function viewComments()
{

    db.collection("comments").get().then((allRec)=>{
       
        const list = document.getElementById("comShow");
        var div="";
        var html ="";
        allRec.forEach((currentRecord) => {
            console.log(currentRecord.data().Name + " "+currentRecord.data().Surname)
            div=`
          
            
                    <div class="card mb-4" style="width: 65rem;left:35%;top:1%;background:#ee77ee;font-size:18px;" id="comShow">
                    <div class="card-body" >
                      <div class="d-flex flex-start">
                       
                        <div class="w-100">
                          <div class="d-flex justify-content-between align-items-center mb-3">
                            <h6 class="text-primary fw-bold mb-0" id="comName" style="font-size:16px;">
                            ${currentRecord.data().Name + " "+currentRecord.data().Surname}
                              <span class="text-dark ms-2" id="comtext" style="font-size:18px;">
                              ${currentRecord.data().Comment}
                              </span>
                            </h6>
                           
                          </div>
                          <div class="d-flex justify-content-between align-items-center">
                            <p class="small mb-0" style="color: #aaa;">
                              <a href="#!" class="link-grey">Remove</a> •
                              <a href="#!" class="link-grey">Reply</a> •
                              <a href="#!" class="link-grey">Translate</a>
                            </p>
                            <div class="d-flex flex-row">
                              <i class="far fa-check-circle text-primary"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                  <!---------------------------------------->
                  
               
 
          `
          html += div
			list.innerHTML =html
  
        });

    })

}


function sendEmail()
{
  var Username;
    var userN=document.getElementById("emailAddress").value;
    var Umessage;
    var getN =document.getElementById("firstName").value;
    var getSur=document.getElementById("lastName").value;

    const serviceID = 'default_service';
   const templateID = 'template_bl0qumq';
   var amountS =document.getElementById("amount").value;
    


           
                Username=getN +" "+getSur; 
                Umessage= Username + " with this email: "+ userN+ " has sent a quote of  Premium  Amount of R"+amountS;
   

                function sending(Username,Umessage)
                {
                    emailjs.send('default_service','template_bl0qumq',{
                        to_name:"Admin", from_name:Username, message:Umessage
                    })
                }
             
                sending(Username,Umessage)
            
              

              swal("success","Your Quote has benn sent successfully, do check your emails regularly for feedback","success");
              
            
            
             
}
