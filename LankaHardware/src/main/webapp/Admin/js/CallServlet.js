/**
 * 
 */
var employees = []
var employeestable = document.getElementById('employee')

function callGetAllEmployeesServlet(){
	$.get("http://localhost:8080/LankaHardware/GetAllEmployeesServlet", function(response) {
				
		employees = response
		
		console.log(employees)
		
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
                              <a class="dropdown-item" href="javascript:void(0);"
                                ><i class="bx bx-edit-alt me-1"></i> Edit</a
                              >
                              <a class="dropdown-item" href="javascript:void(0);"
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
	
	var empNo = document.getElementById('empNo').value
	var name = document.getElementById('name').value
	var email = document.getElementById('email').value
	var designation = document.getElementById('designation').value
	var phoneNum = document.getElementById('phoneNum').value
	var address = document.getElementById('address').value
	var gender = document.getElementById('gender').value
	var date = document.getElementById('date').value
	var wage = document.getElementById('wage').value
	var salary = document.getElementById('salary').value
	
	
	
	var endpoint = "http://localhost:8080/LankaHardware/AddEmployeeServlet"
	var formData = new FormData();
	
	for(const file of inputFile.files){
		formData.append('inputFile', file)
	}
	
	formData.append('empNo',empNo)
	formData.append('name',name)
	formData.append('email',email)
	formData.append('designation',designation)
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

//Suppliers

var suppliers = []
var supplierstable = document.getElementById('employee')

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
							${suppliers[i].debit}
						</td>
						<td>
                          <div class="dropdown">
                            <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                              <i class="bx bx-dots-vertical-rounded"></i>
                            </button>
                            <div class="dropdown-menu">
                              <a class="dropdown-item" href="javascript:void(0);"
                                ><i class="bx bx-edit-alt me-1"></i> Edit</a
                              >
                              <a class="dropdown-item" href="javascript:void(0);"
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
	
	
	var supNo = document.getElementById('supNo').value
	var name = document.getElementById('name').value
	var email = document.getElementById('email').value
	var phoneNum = document.getElementById('phoneNum').value
	var description = document.getElementById('description').value
	var debit = document.getElementById('debit').value
	
	
	
	var endpoint = "http://localhost:8080/LankaHardware/AddSupplierServlet"
	var formData = new FormData();

	
	formData.append('supNo',empNo)
	formData.append('name',name)
	formData.append('email',email)
	formData.append('phoneNum',designation)
	formData.append('description',address)
	formData.append('debit', gender)


	
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