/**
 * 
 */
 
 
//Stock Management

var Stock = []
var Stockstable = document.getElementById('employee')

function callGetAllStockServlet(){
	$.get("http://localhost:8080/LankaHardware/GetAllSuppliersServlet", function(response) {
				
		Stock = response
		
		console.log(Stock)
		
		buildAllStock();
	})
}

function buildAllStock(){
	Stockstable.innerHTML = ''
	for(var i = 0; i < suppliers.length; i++){
		var supplier = `<tr>
						<td>
							${Stock[i].supNo}
						</td>
						<td>
							${Stock[i].name}
						</td>
						<td>
							${Stock[i].email}
						</td>
						<td>
							${Stock[i].phoneNum}
						</td>
						<td>
							${Stock[i].description}
						</td>
						<td>
							${Stock[i].debit}
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
						
		
		Stockstable.innerHTML += Stock		
	}
}


//Insert Stock

var isNew = true;


function callAddStockServlet(){
	
	
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