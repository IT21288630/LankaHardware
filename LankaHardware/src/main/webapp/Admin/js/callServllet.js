/**
* 
*/




/* admin crud */
var admins = []
var adminstable = document.getElementById('admin')

function callGetAllAdminsServlet() {
	$.get("http://localhost:8080/LankaHardware/GetAllAdminsServlet", function(response) {

		admins = response

		buildAllAdmins(admins);
	})
}

function buildAllAdmins(adm) {
	adminstable.innerHTML = ''
	for (var i = 0; i < adm.length; i++) {
		var admin = `<tr>
						<td>
							${adm[i].email}
						</td>
						<td>
							${adm[i].password}
						</td>
						<td>
							${adm[i].phone}
						</td>
						<td>
							${adm[i].name}
						</td>
						<td>
							${adm[i].address}
						</td>
						<td>
							${adm[i].role}
						</td>
						<td>
                          <div class="dropdown">
                            <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                              <i class="bx bx-dots-vertical-rounded"></i>
                            </button>
                            <div class="dropdown-menu">
                              <a class="dropdown-item" href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#EditAdminModal" onclick="BuildEditAdminModal('${adm[i].email}', '${adm[i].password}','${adm[i].phone}','${adm[i].name}','${adm[i].address}','${adm[i].role}');"
                                ><i class="bx bx-edit-alt me-1"></i> Edit</a
                              >
                              <a class="dropdown-item" href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#deleteModal"  onclick="createDeleteModal('${adm[i].email}')"
                                ><i class="bx bx-trash me-1"></i> Delete</a
                              >
                            </div>
                          </div>
                        </td>
						
						</tr>`


		adminstable.innerHTML += admin
	}
}


//Insert Admins

var isNew = true;


function callAddAdminServlet() {
	var inputFile = document.getElementById('upload')

	var email = document.getElementById('email').value
	var password = document.getElementById('password').value
	var phone = document.getElementById('phone').value
	var name = document.getElementById('name').value
	var address = document.getElementById('address').value
	var role = document.getElementById('role').value


	console.log(email,password,phone,name, address,role)

	var endpoint = "http://localhost:8080/LankaHardware/AddAdminServlet"
	var formData = new FormData();
	for (const file of inputFile.files) {
		formData.append('upload', file)
	}


	formData.append('email', email)
	formData.append('password', password)
	formData.append('phone', phone)
	formData.append('name', name)
	formData.append('address', address)
	formData.append('role', role)



	fetch(endpoint, {
		method: "post",
		body: formData
	}).then(res => {
		callGetAllAdminsServlet()
		setTimeout(function() {
			$('#AddAdminModal').modal('hide')
		}, 1000);
	}
	)

	//	$.post(endpoint, {email : email,password : password,phone : phone,name : name,Address : Address,Role : Role }, function(response) {
	//			
	//			callGetAllAdminsServlet()
	//			setTimeout(function() {
	//					$('#AddAdminModal').modal('hide')
	//			}, 1500);	
	//		})



}

//update admins
var isNew = true;

var editAdminModalHeader = document.getElementById('EditAdminModalHeader')
var editAdminModalBody = document.getElementById('EditAdminModalBody')
var editAdminModalFooter = document.getElementById('EditAdminModalFooter')
var editCard = document.getElementById('card-body-edit')

function BuildEditAdminModal(email, password, phone, name, address, role,Propic) {
	editAdminModalHeader.innerHTML = `<h5 class="modal-title" id="modalCenterTitle">Edit Admin</h5>
							              <button
							                type="button"
							                class="btn-close"
							                data-bs-dismiss="modal"
							                aria-label="Close"
							              ></button>`


		editAdminModalBody.innerHTML = `<div>
						              	 <div class="card-body">
                     <div class="d-flex align-items-start align-items-sm-center gap-4">
                       <img src="${Propic}" alt="user-avatar" class="d-block rounded" height="100" width="100" id="uploadedAvatar">
                       <div class="button-wrapper">
	                         <label for="upload" class="btn btn-primary me-2 mb-4" tabindex="0">
	                           <span class="d-none d-sm-block">Upload new photo</span>
	                            <i class="bx bx-upload d-block d-sm-none"></i>
	                            <input type="file" id="upload" class="account-file-input" hidden="" accept="image/png, image/jpeg" onchange="buildProfileImage();">
	                          </label>
	                          <button type="button" class="btn btn-outline-secondary account-image-reset mb-4">
	                            <i class="bx bx-reset d-block d-sm-none"></i>
	                            <span class="d-none d-sm-block">Reset</span>
	                          </button>
	
	                          <p class="text-muted mb-0">Allowed JPG, GIF or PNG. Max size of 800K</p>
	                        </div>
	                      </div>
	                    </div>
							                      </div>`

	editCard.innerHTML = `  <form id="formAccountSettings" method="POST" onsubmit="return false">
                         <div class="mb-3 col-md-6">
                            <label for="email" class="form-label">E-mail</label>
                            <input
                              class="form-control"
                              type="text"
                              id="EmailModal"
                              name="Email"
                                 value="${email}"
                             
                              placeholder="123@gmail.com"
                            />
                          </div>
                             <div class="mb-3 col-md-6 form-password-toggle">
                    <label class="form-label" for="password">Password</label>
	                  <div class="input-group input-group-merge">
	                    <input
	                      type="password"
	                      id="passwordModal"
	                      class="form-control"
	                      name="password"
	                          value="${password}"
	                      placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
	                      aria-describedby="password"
	                    />
	                    <span class="input-group-text cursor-pointer"><i class="bx bx-hide"></i></span>
	                  </div>
                </div>
	                  <div class="mb-3 col-md-6">
	                            <label class="form-label" for="phoneNumber">Phone Number</label>
	                            <div class="input-group input-group-merge">
	                              <span class="input-group-text">LK (+94)</span>
	                              <input
	                                type="text"
	                                id="phoneModal"
	                                name="phone"
	                                value="${phone}"
	                                class="form-control"
	                                placeholder="07********"
	                              />
	                            </div>
	                       
                         <div class="mb-3">
                 <label for="Name"class="Name">Name</label>
                 <div class="form-group">
  					<input type="text" 
 			        class="form-control" 
			         id="nameModal" 
			         value="${name}"
			         placeholder="name">
  
 		
                
					</div>
                 
                 </div>
                          
                              <div class="row">
                          <div class="mb-3 col-md-6">
                            <label for="address" class="form-label">Address</label>
                            <input type="text" class="form-control" id="AddressModal" name="Address" value="${address}"placeholder="Address" />
                          </div>
                     
                          <div class="mb-3 col-md-6">
                            <label class="form-label" for="country">Role</label>
                            <select id="RoleModal" name = "rsole" value="${role}"class="select2 form-select">
                              <option value="select">Select</option>
                              <option value="SysAdmin">SysAdmin</option>
                              <option value="ProductManager">Product manager</option>
                              <option value="StockManager">Stock manager</option>
                              <option value="SupplierManager">supplier manager</option>
                              <option value="OrderManager">order manager</option>
                              <option value="EmployeeManager">Employee manager</option>
                            
                  
                            </select>
                          </div>
                       
                        <div class="mt-2">
                          <button type="submit" class="btn btn-primary me-2" id = "save" onclick ="callUpdateAdmin()">edit Admin</button>
                          <button type="reset" class="btn btn-outline-secondary" id ="clear" data-bs-dismiss="modal"">Cancel</button>
                        </div>
                      </form>`

	editAdminModalFooter.innerHTML = `  <div class="modal-footer" id="AddAdminModalFooter">
              <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" class="btn btn-primary">Submit</button>
            </div>`

}

function callUpdateAdmin() {
	var inputFile = document.getElementById('upload')

	var email = document.getElementById('EmailModal').value
	var password = document.getElementById('passwordModal').value
	var phone = document.getElementById('phoneModal').value
	var name = document.getElementById('nameModal').value
	var address = document.getElementById('AddressModal').value
	var role = document.getElementById('RoleModal').value

	console.log(email, password, phone, name, address, role)

	if (email == null) {
		email = "null";
	}
	if (password == null) {
		password = "null";
	}
	if (phone == null) {
		phone = "null";
	}
	if (name == null) {
		name = "null";
	}
	if (address == null) {
		address = "null";
	}

	if (role == null) {
		role = "null";
	}




	//console.log(empNo+name+email+designation+phoneNum+address+date+salary )

	var endpoint = "http://localhost:8080/LankaHardware/UpdateAdmin"
	var formData = new FormData();

	for (const file of inputFile.files) {
		formData.append('upload', file)
	}

	//	formData.append('email', email)
	//	formData.append('password', password)
	//	formData.append('phone', phone)
	//	formData.append('name', name)
	//	formData.append('address', address)
	//	formData.append('role', role)
	//
	//
	//	fetch(endpoint, {
	//		method: "post",
	//		body: formData
	//	}).then(res => {
	//		callGetAllAdminsServlet()
	//		setTimeout(function() {
	//			$('#EditAdminModal').modal('hide')
	//		}, 1500);
	//	}
	//	)

	$.post(endpoint, { email: email, password: password, phone: phone, name: name, address: address, addressModal: address, role: role }, function(response) {

		//			callGetAllEmployeesServlet()
		//			setTimeout(function() {
		//					$('#EditEmoloyeeModal').modal('hide')
		//			}, 1500);	
	})
}
//delete Admin
var deleteModalHeader = document.getElementById('deleteModalHeader')
var deleteModalBody = document.getElementById('deleteModalBody')
var deleteModalFooter = document.getElementById('deleteModalFooter')

function createDeleteModal(email) {
	deleteModalHeader.innerHTML = `<button
					                type="button"
					                class="btn-close"
					                data-bs-dismiss="modal"
					                aria-label="Close"
					              ></button>`
	deleteModalHeader.style.display = ""

	deleteModalBody.innerHTML = `<div style="display: flex; flex-direction: column; text-align: center;">
					                <div class="icon-box">
					                  <i class="material-icons">&times;</i>
					                </div>						
					                <h4 class="modal-title w-100">Are you sure?</h4>
					                <p style="margin-top: 10px;">Do you really want to delete these records? This process cannot be undone.</p>
					              </div>`
	deleteModalBody.style.padding = ""

	deleteModalFooter.innerHTML = `<button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
					                Close
					              </button>
					              <button type="button" class="btn btn-danger" onclick="callDeleteAdminServlet('${email}')">Delete</button>`
	deleteModalFooter.style.display = ""
}

function callDeleteAdminServlet(email) {
	deleteModalHeader.style = "display: none;"
	deleteModalBody.style = "text-align: center;"
	deleteModalBody.innerHTML = `<div class="spinner-border text-warning" role="status" style="width: 2.5rem; height: 2.5rem;">
			                          <span class="visually-hidden">Loading...</span>
			                        </div>`
	deleteModalFooter.style = "display: none;"

	console.log("before response")

	$.post("http://localhost:8080/LankaHardware/RemoveAdmin", { email: email }, function(response) {

		console.log("after response")

		deleteModalBody.style = "padding: 1rem;"
		deleteModalBody.innerHTML = `<div style="display: flex; justify-content: center; align-items: center; column-gap: 10px;">
									        <lottie-player src="https://assets3.lottiefiles.com/packages/lf20_q7hiluze.json"  background="transparent"  speed="1"  style="width: 50px; height: 50px;" autoplay></lottie-player>
									        <span style="font-size: x-large;">${response}</span>
									    </div>`

		callGetAllAdminsServlet()

		setTimeout(function() {
			$('#deleteModal').modal('hide')
		}, 2500);
	})
}

//build admin search results
var searchLists = []

function buildSearchLists() {
	searchLists = []
	var search = document.getElementById("searchadm").value.toLowerCase()
	search = search.trim()


	for (var i = 0; i < admins.length; i++) {
		if (admins[i].name.toLowerCase().includes(search) || admins[i].email.toLowerCase().includes(search))

			searchLists.push(admins[i])


		buildAllAdmins(searchLists)

	}

}





/* customer details*/
var customers = []
var customerstable = document.getElementById('customer')

function callGetAllCustomersServlet() {
	$.get("http://localhost:8080/LankaHardware/GetAllCustomersServlet", function(response) {

		customers = response

		/*console.log(customers)*/

		buildAllCustomers(customers);
	})
}

function buildAllCustomers(cus) {
	customerstable.innerHTML = ''
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
						<td>
                          <div class="dropdown">
                            <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                              <i class="bx bx-dots-vertical-rounded"></i>
                            </button>
                            <div class="dropdown-menu">
                             
                              <a class="dropdown-item" href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#deleteCustomerModal"  onclick="createCustomerDeleteModal('${cus[i].email}')"
                                ><i class="bx bx-trash me-1"></i> Delete</a
                              >
                            </div>
                          </div>
                        </td>
						
						
						</tr>`


		customerstable.innerHTML += customer
	}

}
//delete customer
var deleteCustomerModalHeader = document.getElementById('deleteCustomerModalHeader')
var deleteCustomerModalBody = document.getElementById('deleteCustomerModalBody')
var deleteCustomerModalFooter = document.getElementById('deleteCustomerModalFooter')

function createCustomerDeleteModal(email) {
	deleteCustomerModalHeader.innerHTML = `<button
					                type="button"
					                class="btn-close"
					                data-bs-dismiss="modal"
					                aria-label="Close"
					              ></button>`
	deleteCustomerModalHeader.style.display = ""

	deleteCustomerModalBody.innerHTML = `<div style="display: flex; flex-direction: column; text-align: center;">
					                <div class="icon-box">
					                  <i class="material-icons">&times;</i>
					                </div>						
					                <h4 class="modal-title w-100">Are you sure?</h4>
					                <p style="margin-top: 10px;">Do you really want to delete these records? This process cannot be undone.</p>
					              </div>`
	deleteCustomerModalBody.style.padding = ""

	deleteCustomerModalFooter.innerHTML = `<button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
					                Close
					              </button>
					              <button type="button" class="btn btn-danger" onclick="callDeleteCustomerServlet('${email}')">Delete</button>`
	deleteCustomerModalFooter.style.display = ""
}

function callDeleteCustomerServlet(email) {
	deleteCustomerModalHeader.style = "display: none;"
	deleteCustomerModalBody.style = "text-align: center;"
	deleteCustomerModalBody.innerHTML = `<div class="spinner-border text-warning" role="status" style="width: 2.5rem; height: 2.5rem;">
			                          <span class="visually-hidden">Loading...</span>
			                        </div>`
	deleteCustomerModalFooter.style = "display: none;"

	console.log("before response")

	$.post("http://localhost:8080/LankaHardware/RemoveCustomer", { email: email }, function(response) {

		console.log("after response")

		deleteCustomerModalBody.style = "padding: 1rem;"
		deleteCustomerModalBody.innerHTML = `<div style="display: flex; justify-content: center; align-items: center; column-gap: 10px;">
									        <lottie-player src="https://assets3.lottiefiles.com/packages/lf20_q7hiluze.json"  background="transparent"  speed="1"  style="width: 50px; height: 50px;" autoplay></lottie-player>
									        <span style="font-size: x-large;">${response}</span>
									    </div>`

		callGetAllCustomersServlet()

		setTimeout(function() {
			$('#deleteCustomerModal').modal('hide')
		}, 2500);
	})
}
//build customer search results
var searchLists = []

function buildSearchLists() {
	searchLists = []
	var search = document.getElementById("searchcus").value.toLowerCase()
	search = search.trim()


	for (var i = 0; i < customers.length; i++) {
		if (customers[i].name.toLowerCase().includes(search) || customers[i].email.toLowerCase().includes(search))

			searchLists.push(customers[i])


		buildAllCustomers(searchLists)

	}

}

function callGetAdminDetails() {
	$.get("http://localhost:8080/LankaHardware/GetAdminDetails", function(response) {

		var admin = response

		buildAdminProfile(admin);
	})
}

function buildAdminProfile(admin) {

	var phone = document.getElementById('phone')
	var name = document.getElementById('name')
	var address = document.getElementById('Address')
	var Propic = document.getElementById('uploadedAvatar')

	phone.placeholder = admin.phone
	name.placeholder = admin.name
	address.placeholder = admin.address
	Propic.src = admin.ProfilePic

}
//update admin

function callUpdataAdminProfile() {
	var phone = document.getElementById('phone').value || "null";
	var name = document.getElementById('name').value || "null";
	var address = document.getElementById('Address').value || "null";
	var ProfilePic = document.getElementById('upload')|| "null";;

	console.log(phone, name, address, ProfilePic);

	var formData = new FormData(); // Create a FormData object to send the data

	formData.append("phone", phone);
	formData.append("name", name);
	formData.append("Address", address);
	formData.append("upload", ProfilePic.files[0]); // Append the selected file to the FormData

	fetch("http://localhost:8080/LankaHardware/UpdataAdminProfile", {
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

function buildupdateAdminProfile(admin) {
	var phoneElement = document.getElementById('phone');
	var nameElement = document.getElementById('name');
	var addressElement = document.getElementById('Address');
    var Propic = document.getElementById('uploadedAvatar')
    
	phoneElement.value = admin.phone || '';
	nameElement.value =admin.name || '';
	addressElement.value = admin.address || '';
	Propic.src = admin.ProfilePic || '';
}

