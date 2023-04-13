
console.log("this is the stock management file")
//User input Validation



// Get the input field and error span
var StockName = document.querySelector('.stockName');
var errorName = document.getElementById('name-error');

var category = document.getElementsByName('stockCat');
var errorCat = document.getElementById('cat-error');

var brand = document.getElementsByName('stockBrand');
var errorBrand = document.getElementById('Brand-error');

var price = document.getElementsByName('stockPrice');
var errorPrice = document.getElementById('price-error');

var quantity = document.getElementsByName('stockQ');
var errorQ = document.getElementById('quantity-error');

var descript = document.getElementsByName('stockDes');
var errorDes = document.getElementById('disc-error');

var mf = document.getElementsByName('stockMf');
var errorMF = document.getElementById('mf-error');

var exp = document.getElementsByName('stockExp');
var errorExp = document.getElementById('exp-error');

var warNum = document.getElementsByName('warNum');
var errorWarNum = document.getElementById('warNum-error');

var warPeriod = document.getElementsByName('warPeriod');
var errorWarPeriod = document.getElementById('warPeriod-error');

var Submit = document.getElementsByName('submit');

// Add an event listener to the input field to validate in real-time

 StockName.addEventListener("input", Showfunction, false);
 
 function Showfunction(){
  // Get the input value
  var StockName = StockName.value;

  // Send an Ajax request to validate the username
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var response = xhr.responseText;
      if (response === "invalid") {
        // Display an error message if the validation fails
        errorName.innerHTML = "Invalid username.";
      } else {
        // Clear the error message if the validation passes
        errorName.innerHTML = "";
      }
    }
    };
    	xhr.open("POST", "/AddStoreItemsServlet");
  		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
 		xhr.send("name=" + StockName);
    }







/*function validateForm(event){
	event.preventDefault();
	
	if(!Sname){
		errorName.innerHTML = "This field is required";
		errorName.style.color = "red";
	}
	if(!category){
		errorCat.innerHTML = "This field is required";
		errorCat.style.color = "red";
	}
	
	if(!brand){
		errorUser.innerHTML = "This field is required";
		errorUser.style.color = "red";
	}
	if(!price){
		errorPrice.innerHTML = "This field is required";
		errorPrice.style.color = "red";
	}
	if(!quantity){
		errorQ.innerHTML = "This field is required";
		errorQ.style.color = "red";
	}
	if(!descript){
		errorDes.innerHTML = "This field is required";
		errorDes.style.color = "red";
	}
	if(!mf){
		errorMF.innerHTML = "This field is required";
		errorMF.style.color = "red";
	}
	if(!exp){
		errorExp.innerHTML = "This field is required";
		errorExp.style.color = "red";
	}
	if(!warNum){
		errorWarNum.innerHTML = "This field is required";
		errorWarNum.style.color = "red";
	}
	if(!warPeriod){
		errorWarPeriod.innerHTML = "This field is required";
		errorWarPeriod.style.color = "red";
	}
}





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





	
var Stock = []
var Stocktable = document.getElementById('stock')

function callGetAllStockServlet(){
	$.get("http://localhost:8099/LankaHardware/GetAllItemsServlet", function(response) {
				
		stock = response
		
		buildAllEmployees();
	})
}

//Insert Stock

var isNew = true;
) 


function callAddStockServlet(){
	
	var name = document.getElementById('stockName').value
	var category = document.getElementsByName('stockCat').value
	var brand = document.getElementsByName('stockBrand').value
	var price = document.getElementsByName('stockPrice').value
	var quantity = document.getElementsByName('stockQ').value
	var descript = document.getElementsByName('stockDes').value
	var mf = document.getElementsByName('stockMf').value
	var exp = document.getElementsByName('stockExp').value
	var warrentyType = document.getElementsByName('warrentyType').value
	var warNum = document.getElementsByName('warNum').value
	var warPeriod = document.getElementsByName('warPeriod').value
	
	console.log("getting data from jsp")
	
	
	var form = document.querySelector("#StockAddForm");

	form.addEventListener('submit', event => {
		event.preventDefault();
		
		var formData = new FormData(form);
		endpoint = 'http://localhost:8099/LankaHardware/AddStoreItemsServlet';
		
		formData.append('name',name)
		formData.append('category',category)
		formData.append('brand',brand)
		formData.append('price',price)
		formData.append('quantity', quantity)
		formData.append('descript',descript)
		formData.append('mf',mf)
		formData.append('exp',exp)
		formData.append('warrentyType', warrentyType)
		formData.append('warNum',warNum)
		formData.append('warPeriod',warPeriod)
		
		//$.post("http://localhost:8099/LankaHardware/AddStoreItemsServlet", { name: name, category: category, brand: brand, price: price, quantity: quantity, descript: descript ,mf:mf, exp: exp , warrentyType: warrentyType, warNum : warNum, warPeriod : warPeriod}
		
		//)
		.then(res => {
		//callGetAllStockServlet()
		setTimeout(function() {
				$('#AddStockModal').modal('hide')
		}, 2500);
		console.log("fetch end")	
	}
	)
	
	})
	
	}
	
	
	var endpoint = 'http://localhost:8099/LankaHardware/AddStoreItemServlet'
	var formData = new FormData();
	
	for(const file of inputFile.files){
		formData.append('inputFile', file)

	}
	
	formData.append('name',name)
	formData.append('category',category)
	formData.append('brand',brand)
	formData.append('price',price)
	formData.append('quantity', quantity)
	formData.append('descript',descript)
	formData.append('mf',mf)
	formData.append('exp',exp)
	formData.append('warNum',warNum)
	formData.append('warPeriod',warPeriod)

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
} */
