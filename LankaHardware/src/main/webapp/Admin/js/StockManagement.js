

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

var warNum = document.getElementsByName('warrenty-number');
var errorWar = document.getElementsByName('erroruser');


var Submit = document.getElementsByName('submit');





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




//Insert Stock

var isNew = true;


function callAddStockServlet(){
	
	var inputFile = document.getElementById('formFile')
	var name = document.getElementById('stockName').value
	var category = document.getElementsByName('stockCat').value
	var brand = document.getElementsByName('stockBrand').value
	var price = document.getElementsByName('stockPrice').value
	var quantity = document.getElementsByName('stockQ').value
	var descript = document.getElementsByName('stockDes').value
	var mf = document.getElementsByName('stockMf').value
	var exp = document.getElementsByName('stockExp').value
	var warNum = document.getElementsByName('warrenty-number').value
	
	console.log(phoneNum)
	
	var endpoint = "http://localhost:8080/LankaHardware/AddStoreItemsServlet"
	var formData = new FormData();
	
	for(const file of inputFile.files){
		formData.append('inputFile', file)
	}
	
	formData.append('name',name)
	formData.append('category',category)
	formData.append('brand',brand)
	formData.append('address',price)
	formData.append('address',address)
	formData.append('quantity', quantity)
	formData.append('descript',descript)
	formData.append('mf',mf)
	formData.append('exp',exp)
	formData.append('warNum',warNum)

	
	fetch(endpoint, {
		method: "post",
		body: formData
	}).then(res => {
		callGetAllStockServlet()
		setTimeout(function() {
				$('#AddStockModal').modal('hide')
		}, 2500);	
	}
	)
}