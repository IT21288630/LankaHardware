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
 
				// Store the customer details in local storage
			//	localStorage.setItem('customer', JSON.stringify(customer));
				window.location.href = "index.jsp";

		}
		else if (response == "sysAdmin") {
			window.location.href = "Admin/html/ViewAdmin.jsp";
		}
		else if (response == "supplierManager") {
			window.location.href = "Admin/html/ViewSupplier.jsp";
		}
		else if (response == "employerManager") {
			window.location.href = "Admin/html/ViewEmp.jsp";
		}
		else if (response == "stockManager") {
			window.location.href = "Admin/html/ViewStock.jsp";
		}
		else if (response == "orderManager") {
			window.location.href = "Admin/html/ViewOrder.jsp";
		}
		else if (response == "productManager") {
			window.location.href = "Admin/html/productManagerCharts.jsp";
		}
		else if (response == "Email or Password is incorrect") {
			loginError.innerHTML = response
			loginError.style = "display: block;"
		}


	})

}
// Retrieve the customer details from local storage
//var customer = JSON.parse(localStorage.getItem('cust'));
//
//// Use the customer details to update the UI
//if (customer != null){
//	document.getElementById('email').innerHTML = customer.email;
//	document.getElementById('Password').innerHTML = customer.Password;
//	document.getElementById('phone').innerHTML = customer.phone;
//	document.getElementById('name').innerHTML = customer.name;
//	document.getElementById('address').innerHTML = customer.address;
//
//}
/*






/**registration process */
/**
 * 
 */
var customer= []
var customerstable = document.getElementById('customer')

function callGetAllCustomersServlet() {
	$.get("http://loca8080/LankaHardware/GetAllCustomersServlet", function(response) {

		customers = response

		console.log(customers)

		buildAllCustomers();
	})
}

function buildAllCustomers(cus) {
	customerstable.innerHTML = 'cus'
	for (var i = 0; i < cus.length; i++) {
		var customer = `<tr>
						<td>
							${cus[i].email}
						</td>
						<td>
							${cus[i].Password}
						</td>
						<td>
						    ${cus[i].name}
						</td>	
						<td>
							${cus[i].phone}
						</td>
						<td>
							${cus[i].address}
						</td>
							
						
						</tr>`


		customerstable.innerHTML += customer
	}
}
//var customers = []
//var customerstable = document.getElementById('customer')
//
//function callGetAllCustomersServlet() {
//	$.get("http://localhost:8080/LankaHardware/GetAllCustomersServlet", function(response) {
//
//		customers = response
//
//		console.log(customers)
//
//		buildAllCustomers();
//	})
//}
//
//function buildAllCustomers(cus) {
//	customerstable.innerHTML = ''
//	for (var i = 0; i < cus.length; i++) {
//		var customer = `<div class="card">
//					<div class="card-header">
//						${cus[i].name}
//					</div>
//					<div class="card-body">
//						<p>Email: ${cus[i].email}</p>
//						<p>Password: ${cus[i].Password}</p>
//						<p>Phone: ${cus[i].phone}</p>
//						<p>Address: ${cus[i].address}</p>
//					</div>
//				</div>`
//
//		customerstable.innerHTML += customer
//	}
//}



//Insert Customer

var isNew = true;


function callAddCustomerServlet() {
	var loginError = document.getElementById('loginError')

	var email = document.getElementById('email').value
	var Password = document.getElementById('Password').value
	var con_Password = document.getElementById('con_Password').value
	var phone = document.getElementById('phone').value
	var name = document.getElementById('name').value
	var address = document.getElementById('address').value


	if (con_Password != Password) {
		loginError.innerHTML = "Password and Confirm password should match"
		loginError.style = "display: block;"
		
	}
//	if (!validateEmail(email)) {
//    document.getElementById("loginError").innerHTML = "Invalid email address";
//    document.getElementById("loginError").style.display = "block";
//    valid = false;
//    }
//  
//    if (!validatePassword(Password)) {
//    document.getElementById("loginError").innerHTML = "Password must be at least 8 characters long";
//    document.getElementById("loginError").style.display = "block";
//    valid = false;
//    }
//    if (!validatePhone(phone)) {
//    document.getElementById("loginError").innerHTML = "Invalid phone number";
//    document.getElementById("loginError").style.display = "block";
//    valid = false;
//    }
//  
//    if (!valid) {
//      return;
//    }

	console.log(address)
	console.log(name)



	var endpoint = "http://localhost:8080/LankaHardware/AddCustomerServlet"

	//	var formData = new FormData();
	//	
	//	formData.append('email',email)
	//	formData.append('password',Password)
	//	formData.append('phone',phone)
	//	formData.append('name',name)
	//	formData.append('address',address)
	//
	//
	//	
	//	fetch(endpoint, {
	//		method: "post",
	//		body: formData
	//	}).then(res => res.json()
	//	.then(data => window.location.href = data)
	//	)

	$.post(endpoint, { email: email, Password: Password, phone: phone, name: name, address: address }, function(response) {

		window.location.href = "http://localhost:8080/LankaHardware/Login.jsp";
	})
}
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(Password) {
  return Password.length >= 8;
}

function validatePhone(phone) {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone);
}

//update Customer

function callUpdateCusProfile() {
  var phone = document.getElementById('phone').value || "null";
  var name = document.getElementById('name').value || "null";
  var address = document.getElementById('address').value || "null";

  console.log(phone, name, address);

  $.get("http://localhost:8080/LankaHardware/GetUpdateCusProfile", function(response) {
    var customer = response;

    buildupdateCustomerProfile(customer);
  });
}

function buildupdateCustomerProfile(customer) {
  var phoneElement = document.getElementById('phone');
  var nameElement = document.getElementById('name');
  var addressElement = document.getElementById('address');

  phoneElement.value = customer.phone || '';
  nameElement.value = customer.name || '';
  addressElement.value = customer.address || '';
}



//delete Customer
function callDeleteCusProfile() {
  $.get("http://localhost:8080/LankaHardware/GetDeleteCusProfile", function(response) {
    var customer = response;

    buildDeleteCustomerProfile(customer);
  });
}

function buildDeleteCustomerProfile(customer) {
  var phone = document.getElementById('phone');
  var name = document.getElementById('name');
  var address = document.getElementById('address');

  phone.placeholder = customer.phone || '';
  name.placeholder = customer.name || '';
  address.placeholder = customer.address || '';
}


var otpmessage

function callSendCustomeremailServlet() {

	var email = document.getElementById('otpemail').value

	$.post("http://localhost:8080/LankaHardware/SendCustomeremail", { email: email }, function(response) {

		otpmessage = response
		console.log(otpmessage)
	})
}



function callGetCustomerDetails() {
	$.get("http://localhost:8080/LankaHardware/GetCustomerDetails", function(response) {

		var customer = response

		buildCustomerProfile(customer);
	})
}

function buildCustomerProfile(customer) {

	var phone = document.getElementById('phone')
	var name = document.getElementById('name')
	var address = document.getElementById('address')

	phone.placeholder = customer.phone
	name.placeholder = customer.name
	address.placeholder = customer.address

}
