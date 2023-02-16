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