// EXTERNAL ID GENERATION FUNCTION 
function generate_externalID(){
  let uuid = ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
  console.log("The first", uuid);
  return uuid;
  
}

// PRINT TICKET FUNCTION 
function print_ticket() {
  let ticket_section = document.getElementById("ticket").innerHTML;
  document.body.innerHTML = ticket_section;
  window.print();
}

function generate_and_submit() {
    // GENERATE EXRTERNAL ID 
    let uuid = generate_externalID();
   // SUBMIT THE FORM 
    let name = document.getElementById("participant-name").value;
    let address = document.getElementById("participant_address").value;
    let amount = document.getElementById("price").value;
    let msisdn = document.getElementById("transaction").value;
    let event_name = `<%= single_event.event_name %>`;
    let currency = `<%= single_event.currency%>`;
    let external_id = uuid;
    console.log("This is external id: ", external_id);
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
        let ticketData = JSON.parse(data.ticket);
        console.log("This is hvsh: ", ticketData.name);

        let ticket_design = document.getElementById("ticket");
        ticket_design.innerHTML += `
        <h2 class="sr-only">Our perks</h2>
				<div class="max-w-7xl mx-auto divide-y divide-gray-200 lg:py-8 lg:flex lg:justify-center lg:divide-y-0 lg:divide-x">
					<div class="py-8 lg:py-0 lg:w-1/3 lg:flex-none">
					<div class="max-w-xs mx-auto px-4 flex items-center lg:max-w-none lg:px-8">
						<svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0 h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="color: #AC5C40;">
						<path vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
						</svg>
						<div class="ml-4 flex-auto flex flex-col-reverse">
						<h3 class="font-medium text-white-900"> ${ticketData.event_name} </h3>
						<p class="text-sm text-white-600">Event's Name</p>
						</div>
					</div>
					</div>
					<div class="py-8 lg:py-0 lg:w-1/3 lg:flex-none">
					<div class="max-w-xs mx-auto px-4 flex items-center lg:max-w-none lg:px-8">
					
						<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" style="color: #AC5C40;">
						<path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
						</svg>
						<div class="ml-4 flex-auto flex flex-col-reverse">
						<h3 class="font-medium text-white-900"> ${ticketData.name} </h3>
						<p class="text-sm text-white-600">Name</p>
						</div>
					</div>
					</div>
					<div class="py-8 lg:py-0 lg:w-1/3 lg:flex-none">
					<div class="max-w-xs mx-auto px-4 flex items-center lg:max-w-none lg:px-8">
						
						<svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0 h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="color: #AC5C40;">
						<path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
						<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd" />
						</svg>
						<div class="ml-4 flex-auto flex flex-col-reverse">
						<h3 class="font-medium text-white-900">	${ticketData.amount} $</h3>
						<p class="text-sm text-white-600">Amount Paid</p>
						</div>
					</div>
					</div>
				</div>
				<img class="xl:w-1/4 lg:w-1/3 md:w-1/2 w-2/3 block mx-auto mb-10 object-cover object-center rounded" alt="hero" src="img/Try_New.png">
       
        `
        // console.log(ticketData);


     // HIDE THE TICKET FORM 
     let ticket_form = document.getElementById("ticket_form");
     ticket_form.style.display = "none";
     // DISPLAY THE TICKET 
     ticket_design.style.display = "block";
    //  DISPLAY THE BUTTONS SECTION 
    let buttons_section = document.getElementById("buttons_section");
    buttons_section.style.display = "block";
      }
        // console.log({Frontend_Ticket_Data: data})
    })
    .catch(error => {
        console.log(error);                 
    });

  }
  
  // console.log(uuidv4());