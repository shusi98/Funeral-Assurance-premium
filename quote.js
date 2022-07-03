function quote(){
    var premAmnt =document.getElementById("amount").value 
    var name =document.getElementById("firstName").value 
    var surname =document.getElementById("lastName").value
    var age =document.getElementById("birthdayDate").value
    var gend =document.getElementById("gender").value
    var email =document.getElementById("emailAddress").value
    var phoneNumber=document.getElementById("phoneNumber").value

    db.collection("quotes").add({
        PremiunAmt:premAmnt,
        Name:name,
        Surname:surname,
        Age:age,
        Gender:gend,
        Email:email,
        CellNumber:phoneNumber

    }).then(()=>{
        swal("Success!", "Quote Successfully Sent", "success");
        setTimeout(()=>{
            window.location.reload();
        },2000)

    })
    
}