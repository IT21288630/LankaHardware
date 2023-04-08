console.log("heythere")




//User input Validation

var user = document.getElementsByName('stockName');
var errorUser = document.getElementsByName('erroruser');

var category = document.getElementsByName('stockCat');
var errorCat = document.getElementsByName('errorCat');

var brand = document.getElementsByName('stockBrand');
var errorBrand = document.getElementsByName('errorBrand');

var price = document.getElementsByName('stockPrice');
var errorPrice = document.getElementsByName('errorPrice');

var quantity = document.getElementsByName('stockQ');
var errorQ = document.getElementsByName('errorQ');

var descript = document.getElementsByName('stockDes');
var errorDes = document.getElementsByName('errorDes');

var mf = document.getElementsByName('stockMf');
var errorMF = document.getElementsByName('errorMF');

var exp = document.getElementsByName('stockExp');
var errorExp = document.getElementsByName('errorExp');

var warNum = document.getElementsByName('warrentyNumber');
var errorWar = document.getElementsByName('erroruser');


var Submit = document.getElementsByName('submit');




/*
user.addEventListener("keyup", UserValidate);
function NameValidate(){
	if(user.value == "" ){
		errorUser.innerHTML = "This field is required";
		errorUser.style.color = "red";
		
	}else{
		errorUser.innerHTML = "";
	}
	
}

category.addEventListener("keyup", categoryValidate);
function categoryValidate(){
	if(category.value == "" ){
		errorCat.innerHTML = "This field is required";
		errorCat.style.color = "red";
		
	}else{
		errorCat.innerHTML = "";
	}
	
}

brand.addEventListener("keyup", BrandValidate);
function BrandValidate(){
	if(brand.value == "" ){
		errorBrand.innerHTML = "This field is required";
		errorBrand.style.color = "red";
		
	}else{
		errorBrand.innerHTML = "";
	}
	
}


price.addEventListener("keyup", PriceValidate);
function PriceValidate(){
	if(price.value == "" ){
		errorPrice.innerHTML = "This field is required";
		errorPrice.style.color = "red";
		
	}else{
		errorPrice.innerHTML = "";
	}
	
}


quantity.addEventListener("keyup", QuanValidate);
function QuanValidate(){
	if(quantity.value == "" ){
		errorQ.innerHTML = "This field is required";
		errorQ.style.color = "red";
		
	}else{
		errorQ.innerHTML = "";
	}
	
}

descript.addEventListener("keyup", DesValidate);
function DesValidate(){
	if(descript.value == "" ){
		errorDes.innerHTML = "This field is required";
		errorDes.style.color = "red";
		
	}else{
		errorDes.innerHTML = "";
	}
	
}

mf.addEventListener("keyup", MfValidate);
function MfValidate(){
	if(mf.value == "" ){
		errorMF.innerHTML = "This field is required";
		errorMF.style.color = "red";
		
	}else{
		errorMF.innerHTML = "";
	}
	
}

exp.addEventListener("keyup", ExpValidate);
function ExpValidate(){
	if(exp.value == "" ){
		errorExp.innerHTML = "This field is required";
		errorExp.style.color = "red";
		
	}else{
		errorExp.innerHTML = "";
	}
	
}


warNum.addEventListener("keyup", warValidate);
function warValidate(){
	if(warNum.value == "" ){
		errorWar.innerHTML = "This field is required";
		errorWar.style.color = "red";
		
	}else{
		errorWar.innerHTML = "";
	}
	
}


*/

//Insert Stock

var isNew = true;


function callAddStockServlet(){
	
	var id = document.getElementById('stockID')
	var name = document.getElementById('stockName').value
	var category = document.getElementsByName('stockCat').value
	var brand = document.getElementsByName('stockBrand').value
	var price = document.getElementsByName('stockPrice').value
	var quantity = document.getElementsByName('stockQ').value
	var descript = document.getElementsByName('stockDes').value
	var mf = document.getElementsByName('stockMf').value
	var exp = document.getElementsByName('stockExp').value
	var warNum = document.getElementsByName('warrenty-number').value
	
	console.log("getting data from jsp")
	
	var endpoint = "http://localhost:8099/LankaHardware/AddStoreItemServlet"
	var formData = new FormData();
	
	/*for(const file of inputFile.files){
		formData.append('inputFile', file)
		console.log("dont know what the fk is this!")
	}*/
	
	formData.append('name',name)
	formData.append('category',category)
	formData.append('brand',brand)
	formData.append('price',price)
	formData.append('quantity', quantity)
	formData.append('descript',descript)
	formData.append('mf',mf)
	formData.append('exp',exp)
	formData.append('warNum',warNum)

console.log("data append")
	
	fetch(endpoint, {
		
		method: "post",
		body: formData
		
	}).then(res => {
		callGetAllStockServlet()
		setTimeout(function() {
				$('#AddStockModal').modal('hide')
		}, 2500);
		console.log("fetch end")	
	}
	)
}

var Stock = []
var Stocklogintable = document.getElementById('customer')

function callGetAllCustomersServlet(){
	$.get("http://localhost:8099/LankaHardware/GetAllCustomersServlet", function(response) {
				
		customers = response
		
		console.log(customers)
		
		buildAllCustomers();
	})
}


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
						              	 <div class="card-body">
                      <div class="d-flex align-items-start align-items-sm-center gap-4">
                        <img src="../assets/img/avatars/1.png" alt="user-avatar" class="d-block rounded" height="100" width="100" id="uploadedAvatar">
                        <div class="button-wrapper">
                          <label for="upload" class="btn btn-primary me-2 mb-4" tabindex="0">
                            <span class="d-none d-sm-block">Upload new photo</span>
                            <i class="bx bx-upload d-block d-sm-none"></i>
                            <input type="file" id="upload" class="account-file-input" hidden="" accept="image/png, image/jpeg">
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
