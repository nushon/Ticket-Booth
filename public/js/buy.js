// const { default: axios } = require("axios");

function generate_externalID(){
  let uuid = ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
  console.log("The first", uuid);
  let uuid_value = document.getElementById('uuid').value = uuid;
  // return uuid;
  console.log(uuid_value);
}
// function generate_and_submit() {
//     // GENERATE EXRTERNAL ID 
//     generate_externalID();
// // SUBMIT THE FORM 
//     document.getElementById("ticket_submit").submit();
//     // HIDE THE TICKET FORM 
//     document.getElementById("ticket_form").style.display = "none";
//     // DISPLAY THE TICKET 
//     document.getElementById("ticket").style.display = "block";
//     let name = document.getElementById("participant-name");
//     console.log("Just name", name);
//     let address = document.getElementById("participant_address");
//     let amount = document.getElementById("price");
//     let msisdn = document.getElementById("transaction");
//     let event_name = document.getElementById("event_name");
//     let currency = document.getElementById("currency");
//     let external_id = document.getElementById("uuid");
//     let currency = document.getElementById("currency");
//     // axios.post('/tickets',{

//     // })
//   }
  
  // console.log(uuidv4());