/**
 * 
 */

function callCheckoutServlet() {
	var fname = document.getElementById('fname').value
	var lname = document.getElementById('lname').value
	var address = document.getElementById('address').value
	var phone = document.getElementById('phone').value
	var email = document.getElementById('email').value
	var pcode = document.getElementById('pcode').value

	$.post("http://localhost:8080/LankaHardware/CheckoutServlet", { fname: fname, lname: lname, address: address, phone: phone, email: email, pcode: pcode }, function(response) {

		//window.location.href = "CompletedOrder.jsp";
	})
}

function callGetCompletedOrdersServlet() {
	$.get("http://localhost:8080/LankaHardware/GetCompletedOrdersServlet", function(response) {

		var completedOrders = response
		
		buildCompletedOrders(completedOrders)
		
		
	})
}

function buildCompletedOrders(completedOrders){
	console.log(completedOrders)
	var completedOrdersList = document.getElementById('completedOrdersList')
	
	completedOrdersList.innerHTML = ''
	
	for(var i = 0; i < completedOrders.length; i++){
		var elID = `${completedOrders[i].oID}order_itemList`
		var order = `<table class="table" style="margin-bottom: 65px;">
							<thead class="thead-primary">
								<tr class="text-center">
									<th style="text-align: start;" id="orderID">Order ID: ${completedOrders[i].oID}</th>
								</tr>
							</thead>
							<tbody id="${completedOrders[i].oID}order_itemList">
								<tr>
									<td class="price" style="text-align: start; padding-top: 10px; padding-left: 0px;">Name: ${completedOrders[i].name}<br> Date: ${completedOrders[i].date_time}</td>
								</tr>
							</tbody>
					</table>`
		
		completedOrdersList.innerHTML += order
		buildCompletedOrdersItems(completedOrders[i].items, elID)
	}
}

function buildCompletedOrdersItems(items, elID){
	var tr = document.getElementById(elID)
	
	console.log(elID)
	
	
	for(var i = 0; i < items.length; i++){
		var item = `<tr>
						<td style="text-align: start; position: relative;">
							<img src="${items[i].mainImg}" width="100px"></img>
							${items[i].name}
							<a href="#" style="position: absolute; right: 0; top: 40%;" class="btn btn-primary py-3 px-4" data-bs-toggle="modal" data-bs-target="#modalCenter" id="openQuestionModal">Add a review</a>
						</td>
					</tr>`
		
		tr.innerHTML += item
		
	}
}