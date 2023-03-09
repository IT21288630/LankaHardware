/**
 * 
 */
var employees = []
var employeestable = document.getElementById('employee')

function callGetAllEmployeesServlet(){
	$.get("http://localhost:8080/LankaHardware/GetAllEmployeesServlet", function(response) {
				
		employees = response
		
		buildAllEmployees();
	})
}

function buildAllEmployees(){
	employeestable.innerHTML = ''
	for(var i = 0; i < employees.length; i++){
		var employee = `<tr>
						<td>
							${employees[i].empNo}
						</td>
						<td>
							${employees[i].name}
						</td>
						<td>
							${employees[i].email}
						</td>
						<td>
							${employees[i].designation}
						</td>
						<td>
							${employees[i].phoneNum}
						</td>
						<td>
							${employees[i].address}
						</td>
						<td>
                          <div class="dropdown">
                            <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                              <i class="bx bx-dots-vertical-rounded"></i>
                            </button>
                            <div class="dropdown-menu">
                              <a class="dropdown-item" href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#EditEmoloyeeModal" onclick="BuildEditEmployeeModal('${employees[i].empNo}', '${employees[i].name}','${employees[i].email}','${employees[i].designation}','${employees[i].phoneNum}','${employees[i].address}','${employees[i].gender}','${employees[i].date}','${employees[i].wage}','${employees[i].salary}');"
                                ><i class="bx bx-edit-alt me-1"></i> Edit</a
                              >
                              <a class="dropdown-item" href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#deleteModal"  onclick="createDeleteModal('${employees[i].empNo}')"
                                ><i class="bx bx-trash me-1"></i> Delete</a
                              >
                            </div>
                          </div>
                        </td>
						
						</tr>`
						
		
		employeestable.innerHTML += employee		
	}
}


//Insert Employees

var isNew = true;


function callAddEmployeeServlet(){
	var inputFile = document.getElementById('inputFile')
	
	var name = document.getElementById('name').value
	var email = document.getElementById('email').value
	var designation = document.getElementById('designation').value
	var phoneNum = document.getElementById('phoneNum').value
	var address = document.getElementById('address').value
	var gender = document.getElementById('gender').value
	var date = document.getElementById('date').value
	var wage = document.getElementById('wage').value
	var salary = document.getElementById('salary').value
	
	console.log(phoneNum)
	
	var endpoint = "http://localhost:8080/LankaHardware/AddEmployeeServlet"
	var formData = new FormData();
	
	for(const file of inputFile.files){
		formData.append('inputFile', file)
	}
	
	formData.append('name',name)
	formData.append('email',email)
	formData.append('designation',designation)
	formData.append('phoneNum',phoneNum)
	formData.append('address',address)
	formData.append('gender', gender)
	formData.append('date',date)
	formData.append('wage',wage)
	formData.append('salary',salary)

	
	fetch(endpoint, {
		method: "post",
		body: formData
	}).then(res => {
		callGetAllEmployeesServlet()
		setTimeout(function() {
				$('#AddEmoloyeeModal').modal('hide')
		}, 2500);	
	}
	)
}

//update Employees
var isNew = true;

var editEmployeeModalHeader = document.getElementById('EditEmoloyeeModalHeader')
var editEmployeeModalBody = document.getElementById('EditEmoloyeeModalBody')
var editEmployeeModalFooter = document.getElementById('EditEmoloyeeModalFooter')
var editCard = document.getElementById('card-body-edit')

function BuildEditEmployeeModal(empNo,name,email,designation,phoneNum,address,gender,date,wage,salary){
	editEmployeeModalHeader.innerHTML = `<h5 class="modal-title" id="modalCenterTitle">Edit Employee</h5>
							              <button
							                type="button"
							                class="btn-close"
							                data-bs-dismiss="modal"
							                aria-label="Close"
							              ></button>`

	
	editEmployeeModalBody.innerHTML = `<div>
						              	 <div class="button-wrapper">
						                          <label for="upload" class="btn btn-primary me-2 mb-4" tabindex="0">
						                            <span class="d-none d-sm-block">Upload new photo</span>
						                            <i class="bx bx-upload d-block d-sm-none"></i>
						                            <input
						                              type="file"
						                              id="inputFile"
						                              class="account-file-input"
						                              hidden
						                              accept="image/png, image/jpeg"
						                            />
						                          </label>
						                          <button type="button" class="btn btn-outline-secondary account-image-reset mb-4">
						                            <i class="bx bx-reset d-block d-sm-none"></i>
						                            <span class="d-none d-sm-block">Reset</span>
						                          </button>
						
						                          <p class="text-muted mb-0"></p>
						                        </div>
						                      </div>`

	editCard.innerHTML = `<form id="formAccountSettings" method="POST" onsubmit="return false">
                        <div class="row">
                          <div class="mb-3 col-md-6">
                            <label for="firstName" class="form-label">Employee No.</label>
                            <input
                              class="form-control"
                              type="text"
                              id="empNoModal"
                              name="empNo"
                   				value="${empNo}"
                              autofocus
							readonly
                            />
                          </div>
                          <div class="mb-3 col-md-6">
                            <label for="lastName" class="form-label">Name</label>
                            <input class="form-control" type="text"  id="nameModal" name="name" value="${name}" id="name"/>
                          </div>
                          <div class="mb-3 col-md-6">
                            <label for="email" class="form-label">E-mail</label>
                            <input
                              class="form-control"
                              type="text"
                              id="emailModal"
                              name="email"
								value="${email}"
                             
                              placeholder="123@gmail.com"
                            />
                          </div>
                          <div class="mb-3 col-md-6">
                            <label for="organization" class="form-label">Designation</label>
                            <input
                              type="text"
                              class="form-control"
                              id="designationModal"
                              name="designation"
								value="${designation}"
                              placeholder = "Assistant Manager"
                            />
                          </div>
                          <div class="mb-3 col-md-6">
                            <label class="form-label" for="phoneNumber">Phone Number</label>
                            <div class="input-group input-group-merge">
                              <span class="input-group-text">LK (+94)</span>
                              <input
                                type="text"
                                id="phoneNumModal"
                                name="phoneNum"
                                class="form-control"
								value="${phoneNum}"
                                placeholder="07********"
                              />
                            </div>
                          </div>
                          <div class="mb-3 col-md-6">
                            <label for="address" class="form-label">Address</label>
                            <input type="text" class="form-control" id="addressModal" name="address" value="${address}"placeholder="Address" />
                          </div>
               
                          <div class="mb-3 col-md-6">
                            <label for="language" class="form-label">Appointment Date</label><br>
                           <input name = date type="date" id="dateModal" name = "date" value="${date}">

                          </div>
                          
                          <div class="mb-3 col-md-6">
                            <label for="currency" class="form-label">Salary Amount[Rs]</label>
                         <input
                              type="text"
                              class="form-control"
                              id="salaryModal"
                              name="salary"
							  value="${salary}"
                              placeholder = "Rs 50000"
                            />
                          </div>
                        </div>
                        <div class="mt-2">
                          <button type="submit" class="btn btn-primary me-2" id = "save" onclick ="callupdateEmployee()">Edit Employee</button>
                          <button type="reset" class="btn btn-outline-secondary" id ="clear" data-bs-dismiss="modal">Cancel</button>
                        </div>
                      </form>`

	editEmployeeModalFooter.innerHTML = ``
	
}

function callupdateEmployee(){
	var inputFile = document.getElementById('inputFileModal')
	
	var empNo = document.getElementById('empNoModal').value
	var name = document.getElementById('nameModal').value
	var email = document.getElementById('emailModal').value
	var designation = document.getElementById('designationModal').value
	var phoneNum = document.getElementById('phoneNumModal').value
	var address = document.getElementById('addressModal').value
	var date = document.getElementById('dateModal').value
	var salary = document.getElementById('salaryModal').value
	
	
	if(name == null)
	{
		name = "null";
	}
	if(email == null)
	{
		email = "null";
	}
	if(designation == null)
	{
		designation = "null";
	}
	if(phoneNum == null)
	{
		phoneNum = "null";
	}
	if(address == null)
	{
		address = "null";
	}

	if(date == null)
	{
		date = "null";
	}
	
	if(salary == null)
	{
		salary = "null";
	}
	
	//console.log(empNo+name+email+designation+phoneNum+address+date+salary )
	
	var endpoint = "http://localhost:8080/LankaHardware/UpdateEmployee"
	var formData = new FormData();
	
//	for(const file of inputFile.files){
//		formData.append('inputFileModal', file)
//	}

//	formData.append('empNoModal',empNo)
//	formData.append('nameModal',name)
//	formData.append('emailModal',email)
//	formData.append('designationModal',designation)
//	formData.append('addressModal',address)
//	formData.append('dateModal',date)
//	formData.append('salaryModal',salary)

	
//	fetch(endpoint, {
//		method: "post",
//		body: formData
//	}).then(res => {
//		callGetAllEmployeesServlet()
//		setTimeout(function() {
//				$('#AddEmoloyeeModal').modal('hide')
//		}, 2500);	
//	}
//	)
	
	$.post(endpoint, {empNoModal : empNo,nameModal : name,emailModal : email,designationModal : designation,phoneNumModal : phoneNum,addressModal : address,dateModal : date,salaryModal : salary }, function(response) {
		
		callGetAllEmployeesServlet()
		setTimeout(function() {
				$('#EditEmoloyeeModal').modal('hide')
		}, 1500);	
	})
}
// delete employees
var deleteModalHeader = document.getElementById('deleteModalHeader')
var deleteModalBody = document.getElementById('deleteModalBody')
var deleteModalFooter = document.getElementById('deleteModalFooter')

function createDeleteModal(empNo) {
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
					              <button type="button" class="btn btn-danger" onclick="callDeleteEmployeeServlet('${empNo}')">Delete</button>`
	deleteModalFooter.style.display = ""
}

function callDeleteEmployeeServlet(empNo) {
	deleteModalHeader.style = "display: none;"
	deleteModalBody.style = "text-align: center;"
	deleteModalBody.innerHTML = `<div class="spinner-border text-warning" role="status" style="width: 2.5rem; height: 2.5rem;">
			                          <span class="visually-hidden">Loading...</span>
			                        </div>`
	deleteModalFooter.style = "display: none;"
	$.post("http://localhost:8080/LankaHardware/RemoveEmployees", { empNo: empNo }, function(response) {

		deleteModalBody.style = "padding: 1rem;"
		deleteModalBody.innerHTML = `<div style="display: flex; justify-content: center; align-items: center; column-gap: 10px;">
									        <lottie-player src="https://assets3.lottiefiles.com/packages/lf20_q7hiluze.json"  background="transparent"  speed="1"  style="width: 50px; height: 50px;" autoplay></lottie-player>
									        <span style="font-size: x-large;">${response}</span>
									    </div>`

		callGetAllEmployeesServlet()

		setTimeout(function() {
			$('#deleteModal').modal('hide')
		}, 2500);
	})
}




//Suppliers

var suppliers = []
var supplierstable = document.getElementById('supplier')

function callGetAllSuppliersServlet(){
	$.get("http://localhost:8080/LankaHardware/GetAllSuppliersServlet", function(response) {
				
		suppliers = response
		
		console.log(suppliers)
		
		buildAllSuppliers();
	})
}

function buildAllSuppliers(){
	supplierstable.innerHTML = ''
	for(var i = 0; i < suppliers.length; i++){
		var supplier = `<tr>
						<td>
							${suppliers[i].supNo}
						</td>
						<td>
							${suppliers[i].name}
						</td>
						<td>
							${suppliers[i].email}
						</td>
						<td>
							${suppliers[i].phoneNum}
						</td>
						<td>
							${suppliers[i].description}
						</td>
						<td>
							${suppliers[i].sup_type}
						</td>
						<td>
                          <div class="dropdown">
                            <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                              <i class="bx bx-dots-vertical-rounded"></i>
                            </button>
                            <div class="dropdown-menu">
                              <a class="dropdown-item" href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#EditSuppliersModal" onclick="BuildEditSupplierModal('${suppliers[i].supNo}', '${suppliers[i].name}','${suppliers[i].email}','${suppliers[i].phoneNum}','${suppliers[i].description}','${suppliers[i].sup_type}');"
                                ><i class="bx bx-edit-alt me-1"></i> Edit</a
                              >
                              <a class="dropdown-item" href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#deleteModal"  onclick="createDeleteModal('${suppliers[i].supNo}')"
                                ><i class="bx bx-trash me-1"></i> Delete</a
                              >
                            </div>
                          </div>
                        </td>
						
						</tr>`
						
		
		supplierstable.innerHTML += supplier		
	}
}


//Insert Suppliers

var isNew = true;


function callAddSupplierServlet(){
	
	
	var name = document.getElementById('name').value
	var email = document.getElementById('email').value
	var phoneNum = document.getElementById('phoneNum').value
	var description = document.getElementById('description').value
	var sup_type = document.getElementById('sup_type').value
	
	
	
	var endpoint = "http://localhost:8080/LankaHardware/AddSupplierServlet"
	var formData = new FormData();

	
	
	formData.append('name',name)
	formData.append('email',email)
	formData.append('description',description)
	formData.append('sup_type', sup_type)


	
	fetch(endpoint, {
		method: "post",
		body: formData
	}).then(res => {
		callGetAllSuppliersServlet()
		setTimeout(function() {
				$('#AddSupplierModal').modal('hide')
		}, 2500);	
	}
	)
}
//update employees
var isNew = true;

var editSupplierModalHeader = document.getElementById('EditSupplierModalHeader')
var editSupplierModalBody = document.getElementById('EditSupplierModalBody')
var editSupplierModalFooter = document.getElementById('EditSupplierModalFooter')
var editCard = document.getElementById('card-body-edit')

function BuildEditSupplierModal(supNo,name,email,phoneNum,description,sup_type){
	editSupplierModalHeader.innerHTML = `<h5 class="modal-title" id="modalCenterTitle">Edit Supplier</h5>
							              <button
							                type="button"
							                class="btn-close"
							                data-bs-dismiss="modal"
							                aria-label="Close"
							              ></button>`

	
	editSupplierModalBody.innerHTML = `<div>
						              	 <div class="button-wrapper">
						                          <label for="upload" class="btn btn-primary me-2 mb-4" tabindex="0">
						                            <span class="d-none d-sm-block">Upload new photo</span>
						                            <i class="bx bx-upload d-block d-sm-none"></i>
						                            <input
						                              type="file"
						                              id="inputFile"
						                              class="account-file-input"
						                              hidden
						                              accept="image/png, image/jpeg"
						                            />
						                          </label>
						                          <button type="button" class="btn btn-outline-secondary account-image-reset mb-4">
						                            <i class="bx bx-reset d-block d-sm-none"></i>
						                            <span class="d-none d-sm-block">Reset</span>
						                          </button>
						
						                          <p class="text-muted mb-0"></p>
						                        </div>
						                      </div>`

	editCard.innerHTML = `<form id="formAccountSettings" method="POST" onsubmit="return false">
                        <div class="row">
                          <div class="mb-3 col-md-6">
                            <label for="firstName" class="form-label">supplier No.</label>
                            <input
                              class="form-control"
                              type="text"
                              id="supNoModal"
                              name="supNo"
                   				value="${supNo}"
                              autofocus
							readonly
                            />
                          </div>
                          <div class="mb-3 col-md-6">
                            <label for="lastName" class="form-label">Name</label>
                            <input class="form-control" type="text"  id="nameModal" name="name" value="${name}" id="name"/>
                          </div>
                          <div class="mb-3 col-md-6">
                            <label for="email" class="form-label">E-mail</label>
                            <input
                              class="form-control"
                              type="text"
                              id="emailModal"
                              name="email"
								value="${email}"
                             
                              placeholder="123@gmail.com"
                            />
                          </div>
                            <div class="mb-3 col-md-6">
                            <label class="form-label" for="phoneNumber">Phone Number</label>
                            <div class="input-group input-group-merge">
                              <span class="input-group-text">LK (+94)</span>
                              <input
                                type="text"
                                id="phoneNumModal"
                                name="phoneNum"
                                class="form-control"
								value="${phoneNum}"
                                
                              />
                            </div>
                          </div>
                       
                          <div class="mb-3 col-md-6">
                   			<label class="form-label" for="description">Supplier Description</label>
                			<textarea name="description" id="description" value="${description}" cols="30" rows="7" class="form-control" placeholder="Description"></textarea>
              			  </div>
                          
                          <div class="mb-3 col-md-6">
                            <label for="debit" class="form-label">Debit Or Credit</label>
                            <select id="sup_typeModal" name = "debit" value="${sup_type}"class="select2 form-select">
                              <option value="">Select Type</option>
                              <option value="Debit">Debit</option>
                              <option value="Credit">Credit</option>
                            
                            </select>
                          </div>
                        </div>
                        <div class="mt-2">
                          <button type="submit" class="btn btn-primary me-2" id = "save" onclick ="callupdateSupplier()">Edit Supplier</button>
                          <button type="reset" class="btn btn-outline-secondary" id ="clear" data-bs-dismiss="modal">Cancel</button>
                        </div>
                      </form>`

	editSupplierModalFooter.innerHTML = ``
	
}

function callupdateSupplier(){

	
	var supNo = document.getElementById('supNoModal').value
	var name = document.getElementById('nameModal').value
	var email = document.getElementById('emailModal').value
	var phoneNum = document.getElementById('phoneNumModal').value
	var description = document.getElementById('descriptionModal').value
	var sup_type = document.getElementById('sup_typeModal').value
	
	
	if(name == null)
	{
		name = "null";
	}
	if(email == null)
	{
		email = "null";
	}
	if(phoneNum == null)
	{
		phoneNum = "null";
	}
	if(description == null)
	{
		description = "null";
	}
	if(sup_type == null)
	{
		sup_type = "null";
	}

	
	
	//console.log(empNo+name+email+designation+phoneNum+address+date+salary )
	
	var endpoint = "http://localhost:8080/LankaHardware/UpdateSupplier"
	var formData = new FormData();
	
//	for(const file of inputFile.files){
//		formData.append('inputFileModal', file)
//	}

//	formData.append('empNoModal',empNo)
//	formData.append('nameModal',name)
//	formData.append('emailModal',email)
//	formData.append('designationModal',designation)
//	formData.append('addressModal',address)
//	formData.append('dateModal',date)
//	formData.append('salaryModal',salary)

	
//	fetch(endpoint, {
//		method: "post",
//		body: formData
//	}).then(res => {
//		callGetAllEmployeesServlet()
//		setTimeout(function() {
//				$('#AddEmoloyeeModal').modal('hide')
//		}, 2500);	
//	}
//	)
	
	$.post(endpoint, {supNoModal : supNo,nameModal : name,emailModal : email,phoneNumModal : phoneNum,descriptionModal : description,sup_typeModal : sup_type }, function(response) {
		
		callGetAllSuppliersServlet()
		setTimeout(function() {
				$('#EditSupplierModal').modal('hide')
		}, 1500);	
	})
}

// delete suppliers
var deleteModalHeader = document.getElementById('deleteModalHeader')
var deleteModalBody = document.getElementById('deleteModalBody')
var deleteModalFooter = document.getElementById('deleteModalFooter')

function createDeleteModal(supNo) {
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
					              <button type="button" class="btn btn-danger" onclick="callDeleteEmployeeServlet('${supNo}')">Delete</button>`
	deleteModalFooter.style.display = ""
}

function callDeleteSupplierServlet(supNo) {
	deleteModalHeader.style = "display: none;"
	deleteModalBody.style = "text-align: center;"
	deleteModalBody.innerHTML = `<div class="spinner-border text-warning" role="status" style="width: 2.5rem; height: 2.5rem;">
			                          <span class="visually-hidden">Loading...</span>
			                        </div>`
	deleteModalFooter.style = "display: none;"
	$.post("http://localhost:8080/LankaHardware/RemoveSupplier", { supNo: supNo }, function(response) {

		deleteModalBody.style = "padding: 1rem;"
		deleteModalBody.innerHTML = `<div style="display: flex; justify-content: center; align-items: center; column-gap: 10px;">
									        <lottie-player src="https://assets3.lottiefiles.com/packages/lf20_q7hiluze.json"  background="transparent"  speed="1"  style="width: 50px; height: 50px;" autoplay></lottie-player>
									        <span style="font-size: x-large;">${response}</span>
									    </div>`

		callGetAllSuppliersServlet()

		setTimeout(function() {
			$('#deleteModal').modal('hide')
		}, 2500);
	})
}

//feedbacks
var feedbacks = []
var feedbackstable = document.getElementById('feedback')

function callGetAllFeedbacksServlet(){
	$.get("http://localhost:8080/LankaHardware/GetAllFeedbacksServlet", function(response) {
				
		feedbacks = response
		
		buildAllFeedbacks();
	})
}

function buildAllFeedbacks(){
	feedbackstable.innerHTML = ''
	for(var i = 0; i < feedbacks.length; i++){
		var feedback = `<tr>
						<td>
							${feedbacks[i].feedid}
						</td>
						<td>
							${feedbacks[i].email}
						</td>
						<td>
							${feedbacks[i].subject}
						</td>
						<td>
							${feedbacks[i].feedback}
						</td>

						<td>
                          <div class="dropdown">
                            <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                              <i class="bx bx-dots-vertical-rounded"></i>
                            </button>
                            <div class="dropdown-menu">
                              <a class="dropdown-item" href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#EditFeedbackModal" onclick="BuildEditFeedbackModal('${feedbacks[i].feedid}', '${feedbacks[i].email}','${feedbacks[i].subject}','${feedbacks[i].feedback}');"
                                ><i class="bx bx-edit-alt me-1"></i> Edit</a
                              >
                              <a class="dropdown-item" href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#deleteModal"  onclick="createDeleteModal('${feedbacks[i].feedid}')"
                                ><i class="bx bx-trash me-1"></i> Delete</a
                              >
                            </div>
                          </div>
                        </td>
						
						</tr>`
						
		
		feedbackstable.innerHTML += feedback		
	}
}


//Insert feedbacks

var isNew = true;


function callAddFeedbackServlet(){
	var inputFile = document.getElementById('inputFile')
	
	
	var email = document.getElementById('email').value
	var subject = document.getElementById('subject').value
	var feedback = document.getElementById('feedback').value
	
	
	console.log(phoneNum)
	
	var endpoint = "http://localhost:8080/LankaHardware/AddFeedbackServlet"
	
	
	

	formData.append('email',email)
	formData.append('subject',subject)
	formData.append('feedback',feedback)
	

	
	fetch(endpoint, {
		method: "post",
		body: formData
	}).then(res => {
		callGetAllFeedbacksServlet()
		setTimeout(function() {
				$('#AddFeedbackModal').modal('hide')
		}, 2500);	
	}
	)
}


// delete feedbacks
var deleteModalHeader = document.getElementById('deleteModalHeader')
var deleteModalBody = document.getElementById('deleteModalBody')
var deleteModalFooter = document.getElementById('deleteModalFooter')

function createDeleteModal(feedid) {
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
					              <button type="button" class="btn btn-danger" onclick="callDeleteEmployeeServlet('${feedid}')">Delete</button>`
	deleteModalFooter.style.display = ""
}

function callDeleteFeedbackServlet(feedid) {
	deleteModalHeader.style = "display: none;"
	deleteModalBody.style = "text-align: center;"
	deleteModalBody.innerHTML = `<div class="spinner-border text-warning" role="status" style="width: 2.5rem; height: 2.5rem;">
			                          <span class="visually-hidden">Loading...</span>
			                        </div>`
	deleteModalFooter.style = "display: none;"
	$.post("http://localhost:8080/LankaHardware/RemoveFeedbacks", { feedid: feedid }, function(response) {

		deleteModalBody.style = "padding: 1rem;"
		deleteModalBody.innerHTML = `<div style="display: flex; justify-content: center; align-items: center; column-gap: 10px;">
									        <lottie-player src="https://assets3.lottiefiles.com/packages/lf20_q7hiluze.json"  background="transparent"  speed="1"  style="width: 50px; height: 50px;" autoplay></lottie-player>
									        <span style="font-size: x-large;">${response}</span>
									    </div>`

		callGetAllFeedbacksServlet()

		setTimeout(function() {
			$('#deleteModal').modal('hide')
		}, 2500);
	})
}
