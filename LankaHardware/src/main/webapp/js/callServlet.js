/**
 * 
 */


function callLoginServlet() {

	var email = document.getElementById('emailInput').value
	var password = document.getElementById('passwordInput').value
	var loginError = document.getElementById('loginError')

	$.post("http://localhost:8080/LankaHardware/LoginServlet", { email: email, password: password }, function(response) {

		

		if (response == "customers") {
			
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