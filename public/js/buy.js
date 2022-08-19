// EXTERNAL ID GENERATION FUNCTION 
function generate_externalID(){
  let uuid = ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
  console.log("The first", uuid);
  return uuid;
  
}
// let msisdn;
// function validate_msisdn() {
//   let contact = [];
//   contact = document.getElementById("transaction").value;
//   console.log(contact);
//   if (contact[0][1] === 05 || contact[0][1] === 08){
//     document.getElementById("buyNowBtn").disabled = true;
//     msisdn = contact.toString();
//   }
//   else{
//     document.getElementById("buyNowBtn").disabled = false;
//     alert("Please insert a lonestar number");
//   }
// }
// PRINT TICKET FUNCTION 
function print_ticket() {
  let ticket_section = document.getElementById("ticket_card").innerHTML;
  document.body.innerHTML = ticket_section;
  window.print();
}
 // DOWNLOAD TICKET 
function download_ticket() {
  let ticket_ele = document.getElementById("ticket");

  html2canvas(ticket_ele, {
}).then(canvas => {
    // console.log(canvas, "here");
    canvas.toBlob(function(blob) {
      window.saveAs(blob, `${event_name}.jpg`);
    });
    // document.body.appendChild(canvas)
});
}

function display() {
  let ticket_design = document.getElementById("ticket");
        ticket_design.innerHTML += `
        <div class="relative z-10 " aria-labelledby="modal-title" role="dialog" aria-modal="true">
           
            <div class="fixed inset-0 bg-opacity-75 transition-opacity"></div>
          
            <div class="fixed z-10 inset-0 overflow-y-auto">
              <div class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                <div class="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-sm sm:w-full sm:p-6">
                  <div>
                    <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                      <!-- Heroicon name: outline/check -->
                      <svg class="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div class="mt-3 text-center sm:mt-5">
                      <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">Payment successful</h3>
                      <div class="mt-2">
                        <p class="text-sm text-gray-500">Congratulations you have completed the process of purchasing your ticket. Confirm your transaction. </p>
                      </div>
                    </div>
                  </div>
                  <div class="mt-5 sm:mt-6">
                    <button type="button" class=" button-primary inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm">CONFIRM</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `
        // HIDE THE TICKET FORM 
        document.getElementById("ticket_form").style.display = "none";
        // HIDE THE Loader....
         document.getElementById("spinner").style.display = "none";
          // DISPLAY THE TICKET 
          ticket_design.style.display = "block";
}
function spinnerLoader() {
  document.getElementById("ticket_form").style.display = "none";
  document.getElementById("spinner").style.display = "block";
}
function generate_and_submit() {
  // Display the loader 
  spinnerLoader();
    // GENERATE EXRTERNAL ID 
    let uuid = generate_externalID();
   // SUBMIT THE FORM 
    let name = document.getElementById("participant-name").value;
    let address = document.getElementById("participant_address").value;
    let amount = document.getElementById("price").value;
    let msisdn = document.getElementById("transaction").value;
    let event_name = document.getElementById("event_name").innerHTML;
    let currency = document.getElementById("ticket_currency").innerHTML;
    let event_location = document.getElementById("event_location").innerHTML;
    let event_date = document.getElementById("event_date").innerHTML;
    let external_id = uuid;
    console.log("This is external id: ", external_id);
if (name != "" && address != "" && amount != "" && msisdn != "") {
  fetch('/tickets',{
    method: 'POST',
    body: JSON.stringify({
          name: name,
          address: address,
          amount: amount,
          msisdn: msisdn,
          event_name: event_name,
          currency: currency,
          external_id: external_id
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
  }
    
  })

  .then(res => {
    if (!res.ok) {                                   
        throw new Error("HTTP error " + res.status); 
    }                                                
    return res.json();                               
  })
  .then(data => {
    console.log(data);
    if (data){
      alert("Congratulations!");
      display();
      // const ticketData = data;
      
    }
  })
  .catch(error => {
    console.log(error);                 
});
}
else{
  alert("Please fill in the all the fields");
}
    

//         let ticket_design = document.getElementById("ticket");
//         ticket_design.innerHTML += `
        
//   <div class="ticket">
// 	<div class="holes-top"></div>
// 	<div class="title">
//   <div id="img_sect">
//   <img id="ticket_img" src="/img/new1.png" alt="${event_name}" />
//   </div>
// 		<p class="event-title">${event_name}</p>
//     <p class="ticket_num"><b>Ticket#:</b> ${ticketData.external_id}</p>
// 	</div>
	
// 	<div class="info">
// 	<table>
// 		<tr>
// 			<th class="bigger">NAME</th>
// 			<th class="bigger">VENUE</th>
// 			<th class="bigger">SEAT</th>
// 		</tr>
// 		<tr>
// 			<td class="bigger"><b>${ticketData.name}</b></td>
// 			<td class="bigger">${event_location}</td>
// 			<td class="bigger">24</td>
// 		</tr>
// 	</table>
// 	<table>
// 		<tr>
// 			<th class="bigger">PRICE</th>
// 			<th class="bigger">DATE</th>
// 			<th class="bigger">TIME</th>
// 		</tr>
// 		<tr>
// 			<td class="bigger">$${ticketData.amount} ${ticketData.currency}</td>
// 			<td class="bigger">${event_date}</td>
// 			<td class="bigger">19:30</td>
// 		</tr>
// 	</table>
//   <div id="brand_footer">
//                     <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
//                         <title>Laurel</title>
//                         <defs>
//                             <linearGradient x1="0%" y1="100%" x2="50%" y2="0%" id="logo-footer-a">
//                                 <stop stop-color="#F9425F" stop-opacity=".8" offset="0%"/>
//                                 <stop stop-color="#47A1F9" stop-opacity=".16" offset="100%"/>
//                             </linearGradient>
//                             <linearGradient x1="50%" y1="100%" x2="50%" y2="0%" id="logo-footer-b">
//                                 <stop stop-color="#FDFFDA" offset="0%"/>
//                                 <stop stop-color="#F97059" stop-opacity=".798" offset="49.935%"/>
//                                 <stop stop-color="#F9425F" stop-opacity="0" offset="100%"/>
//                             </linearGradient>
//                         </defs>
//                         <g fill="none" fill-rule="evenodd">
//                             <path d="M22 19.22c6.627 0 9.593-6.415 9.593-13.042C31.593-.45 28.627.007 22 .007S10 2.683 10 9.31c0 6.628 5.373 9.91 12 9.91z" fill="url(#logo-footer-a)"/>
//                             <path d="M13.666 31.889c7.547 0 10.924-7.307 10.924-14.854 0-7.547-3.377-7.027-10.924-7.027C6.118 10.008 0 13.055 0 20.603c0 7.547 6.118 11.286 13.666 11.286z" fill="url(#logo-footer-b)" transform="matrix(-1 0 0 1 24.59 0)"/>
//                         </g>
//                     </svg>
//                 </div>
//   <div class="footer-copyright">&copy; 2022 Ticket Booth, www.ticketbooth.store</div>
// 	</div>
  
// 	<div class="holes-lower"></div>
	
// </div>
  
//         `  

// //      // HIDE THE TICKET FORM 
//      let ticket_form = document.getElementById("ticket_form");
//      ticket_form.style.display = "none";
//      // DISPLAY THE TICKET 
//      ticket_design.style.display = "block";
//     //  DISPLAY THE BUTTONS SECTION 
//     let buttons_section = document.getElementById("buttons_section");
//     buttons_section.style.display = "block";
//       }
//         // console.log({Frontend_Ticket_Data: data})
//     })
   
  }
  
