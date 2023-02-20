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
	
	for(var i = 0; i < employees.length; i++){
		var employee = `<tr><td>
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
							${employees[i].gender}
						</td>
						<td>
							${employees[i].date}
						</td>
						<td>
							${employees[i].wage}
						</td>
						<td>
							${employees[i].salary}
						</td></tr>`
						
		
		employeestable.innerHTML += employee		
	}
}


//Insert Employees

var isNew = true;

function addemployee(){
	
	if($(formAccountSettings).validate()){
		
		var url = "";
		var data = "";
		var method;
		
		if (isNew == true){
			
			url = 'employeeAdd.jsp';
			date = $(formAccountSettings).serialize();
			method = 'POST'
		}
		
		$.ajax()
	}
}


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
	}).catch(console.error)
}