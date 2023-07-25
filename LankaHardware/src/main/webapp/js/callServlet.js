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
			window.location.href = "Admin/html/vieworder.jsp";
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
var customer = []
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
	var con_Password = document.getElementById('Co_Password').value
	var phone = document.getElementById('phone').value
	var name = document.getElementById('name').value
	var address = document.getElementById('address').value

    if(!email.includes("@gmail")){
		console.log("Invalid email")
		return
	}
	
	if(phone.length != 9){
		return
	}
	
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
	var  Profilepics = document.getElementById('upload')||"null";

	console.log(phone, name, address, Profilepics);

	var formData = new FormData(); // Create a FormData object to send the data

	formData.append("phone", phone);
	formData.append("name", name);
	formData.append("address", address);
	formData.append("upload",  Profilepics.files[0]); // Append the selected file to the FormData

	fetch("http://localhost:8080/LankaHardware/UpdateCusProfile", {
		method: "post",
		body: formData
	})

	//	$.ajax({
	//		url: "http://localhost:8080/LankaHardware/UpdateCusProfile",
	//		type: "POST",
	//		data: formData,
	//		processData: false, // Important to prevent jQuery from processing the data
	//		contentType: false, // Important to prevent jQuery from setting content type
	//		success: function(response) {
	//			var customer = response;
	//			buildupdateCustomerProfile(customer);
	//		}
	//	});
}

function buildupdateCustomerProfile(customer) {
	var phoneElement = document.getElementById('phone');
	var nameElement = document.getElementById('name');
	var addressElement = document.getElementById('address');
    var Propic = document.getElementById('uploadedAvatar')

	phoneElement.value = customer.phone || '';
	nameElement.value = customer.name || '';
	addressElement.value = customer.address || '';
	Propic.src = customer.Profilepics ||'';
}


//delete Customer
function callDeleteCusProfile() {
  var email = "<email>"; // Replace with the actual email value
  $.post("http://localhost:8080/LankaHardware/DeleteCusProfile", { email: email }, function(response) {
    // On successful deletion, redirect to login.jsp
    window.location.href = "pullin Login.jsp";
  });
}


var otpmessage

function callSendCustomeremailServlet() {

	var email = document.getElementById('otpemail').value

	$.post("http://localhost:8080/LankaHardware/SendCustomeremail", { email: email }, function(response) {

		otpmessage = response
		console.log(otpmessage)
		window.location.href = "http://localhost:8080/LankaHardware/Login.jsp";
	})
}



function callGetCustomerDetails() {
	$.get("http://localhost:8080/LankaHardware/GetCustomerDetails", function(response) {

		var customer = response

		buildCustomerProfile(customer);
	})
}

function buildCustomerProfile(customer) {

	console.log(customer)

	var phone = document.getElementById('phone')
	var name = document.getElementById('name')
	var address = document.getElementById('address')
	var Propic = document.getElementById('uploadedAvatar')

	phone.placeholder = customer.phone
	name.placeholder = customer.name
	address.placeholder = customer.address
	Propic.src = customer.Profilepics


}
//logg out

function callLogOutServlet() {

	var xhr = new XMLHttpRequest();
	xhr.open("POST", "LogOutServlet", true);
	xhr.setRequestHeader("Content-Type", "application/json");

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status === 200) {
			// Redirect the user to the login page after successful logout
			window.location.href = "http://localhost:8080/LankaHardware/Login.jsp";
		}
	};

	xhr.send();
}
//otp 
function callOtpServlet(){
	
    var otp = document.getElementById('otp').value;
	
	$.post("http://localhost:8080/LankaHardware/OtpServlet",{otp : otp}, function(response) {

		window.location.href = "http://localhost:8080/LankaHardware/newPassword.jsp";
	})
}

function callNewPassword(){
	var password = document.getElementById('Password').value;
	
	$.post("http://localhost:8080/LankaHardware/NewPassword",{password : password}, function(response) {

		window.location.href = "http://localhost:8080/LankaHardware/Login.jsp";
	})
	
}
	

//  function validateForm() {
//    // Get form input values
//    var email = document.getElementById('email').value;
//    var password = document.getElementById('Password').value;
//    var confirmPassword = document.getElementById('Co_Password').value;
//    var phone = document.getElementById('phone').value;
//    var name = document.getElementById('name').value;
//    var address = document.getElementById('address').value;
//    var termsChecked = document.getElementById('terms-conditions').checked;
//
//    // Validate email format
//    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//    if (!emailRegex.test(email)) {
//      alert('Please enter a valid email address.');
//      return false;
//    }
//
//    // Validate password length
//    if (password.length < 8) {
//      alert('Password must be at least 8 characters long.');
//      return false;
//    }
//
//    // Validate password and confirm password match
//    if (password !== confirmPassword) {
//      alert('Passwords do not match.');
//      return false;
//    }
//
//    // Validate phone number
//    var phoneRegex = /^\d{10}$/;
//    if (!phoneRegex.test(phone)) {
//      alert('Please enter a valid 10-digit phone number.');
//      return false;
//    }
//
//    // Validate name
//    if (name.trim() === '') {
//      alert('Please enter your name.');
//      return false;
//    }
//
//    // Validate address
//    if (address.trim() === '') {
//      alert('Please enter your address.');
//      return false;
//    }
//
//    // Validate terms and conditions
//    if (!termsChecked) {
//      alert('Please agree to the privacy policy and terms.');
//      return false;
//    }
//
//    // Form is valid
//    return true;
//  }
//




