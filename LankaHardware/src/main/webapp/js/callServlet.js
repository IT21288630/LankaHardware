/**
 * 
 */


function callLoginServlet() {

	var email = document.getElementById('emailInput').value
	var password = document.getElementById('passwordInput').value
	var loginError = document.getElementById('loginError')

	$.post("http://localhost:8080/LankaHardware/LoginServlet", { email: email, password: password }, function(response) {

		console.log(response)

		if (response == "customer") {
			window.location.href = "index.jsp";

		}
		else if(response == "sysAdmin"){
			window.location.href = "http://www.w3schools.com";
		}
		else if(response == "supplierManager"){
			
		}
		else if(response == "employerManager"){
			
		}
		else if(response == "stockManager"){
			
		}
		else if(response == "orderManager"){
			
		}
		else if(response == "productManager"){
			
		}
		else if(response == "Email or Password is incorrect"){
			loginError.innerHTML = response
			loginError.style = "display: block;"
		}
		
		
	})
	
}
/**registration process */
/**
 * 
 */
var customer = []
var customerlogintable = document.getElementById('customer')

function callGetAllCustomersServlet(){
	$.get("http://localhost:8080/LankaHardware/GetAllCustomersServlet", function(response) {
				
		customers = response
		
		console.log(customers)
		
		buildAllCustomers();
	})
}

function buildAllCustomer(){
	customerlogintable.innerHTML = ''
	for(var i = 0; i <customers.length; i++){
		var customer = `<tr>
						<td>
							${customers[i].email}
						</td>
						<td>
							${ecustomers[i].Password}
						</td>	
						<td>
							${customers[i].phone}
						</td>
						<td>
							${customerss[i].address}
						</td>
						
						
						</tr>`
						
		
		customerlogintable.innerHTML += customer		
	}
}


//Insert Customer

var isNew = true;


function callAddCustomersServlet(){
	
	var email = document.getElementById('email').value
	var Password = document.getElementById('Password').value
	var phone = document.getElementById('phone').value
	var address = document.getElementById('address').value
		
	console.log(Password)
	
	var endpoint = "http://localhost:8080/LankaHardware/AddCustomerServlet"

	var formData = new FormData();
	
	formData.append('email',email)
	formData.append('Password',Password)
	formData.append('phone',phone)
	formData.append('address',address)


	
	fetch(endpoint, {
		method: "post",
		body: formData
	}).then(res => res.json()
	.then(data => window.location.href = data)
	)
}

var otpmessage

function callSendCustomeremailServlet(){
	
	var email = document.getElementById('otpemail').value
	
	$.post("http://localhost:8080/LankaHardware/SendCustomeremail", {email : email }, function(response) {
				
		otpmessage = response
		console.log(otpmessage)
	})
}