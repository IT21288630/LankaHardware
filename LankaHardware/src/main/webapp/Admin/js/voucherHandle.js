/**
 * 
 */
 
 console.log("this is the voucher handle");


function validation() {
	

	//var image = document.getElementById('inputFile').value
	var code = document.getElementById('Vcode').value
	var amount = document.getElementById('Vamount').value
	var exp = document.getElementById('"Vexp"').value
	
	
	var codeError = document.getElementById('Vcode-error');
	var amountError = document.getElementById('Vamount-error');
	
	

  	//const nameRegex = /^[A-Za-z\s]+$/;
   // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   
  
   
       var valiCode = false;
       var valiAmount = false;
       var valiExp = false;
       
		
	  if (code == "") {	
	     codeError.innerHTML = 'Please enter a valid code';
	     valiCode = false;
	   }
	  
	   if (!code == "") {
	     codeError.innerHTML = '';
	     valiCode = true;
	   }
		
	    if(amount == ""){
			
			amountError.innerHTML ='Please select valid amount';
			valiAmount = false;
		}
		
		if(!amount == ""){
			
			amountError.innerHTML ='';
			valiAmount = true;
		}
		
		
		if(amount < 100){
			amountError.innerHTML ='Please enter a valid amount';
			valiAmount = false;
		}
	
		
		if(amount < 1){
			amountError.innerHTML ='Please enter a valid amount';	
			valiAmount = false;
		}
		
		
		if(isNaN(amount)){
			amountError.innerHTML ='Please add a valid number';
			valiAmount = false;
			  
		}
	
		
		if(!amount == "" && amount > 0 && !isNaN(amount) && amount < 100){
			amountError.innerHTML ='';	
			valiAmount = true;
		}
		
		
		
		//if(descript.length > 200){
		//	e.preventDefault();
		//	errorDes.innerHTML = 'Description must be lower than 200 characters';
		//}
				 
		//callAddStockServlet(Sname, category, brand, price, quantity, description, mf, exp, warrentyType, warNum, warPeriod );
		if(valiCode == true && valiAmount == true){
			

			if(exp == ""){
				exp = null;
			}
			
			
			callGetAllVoucherServlet()
			setTimeout(function() {
						$('#AddStockModal').modal('hide')
					}, 1000);
						
			callAddVoucherServlet(code, amount, exp);
			
			
		}
		
		
	}
	
	
var voucher = [];
var voucherTable = document.getElementById('voucher');

// view vouchers
function callGetAllVoucherServlet(){
	
	
	$.get("http://localhost:8081/LankaHardware/GetAllVoucherServlet", function(response) {
				
		voucher = response
		var varlen = voucher.length;
		buildAllVouchers(voucher, varlen);
		
	})
}

function buildAllVouchers(voucher, varlen){
	voucherTable.innerHTML = '';
	var showVoucherCount = document.getElementById('ItemCount');
	showVoucherCount.innerHTML = varlen + ' Records are available';
	
	//console.log(stock[1].itemID)
	for(var i = 0; i < varlen; i++){
		 			var VoucherInFo = `<tr>
								<td>
									${voucher[i].id}
								</td>
								<td>
									${voucher[i].code}
								</td>
								<td>
									${voucher[i].amount}
								</td>
								
								<td>
									${voucher[i].exp}
								</td>
								
								
								<td>
		                          <div class="dropdown">
		                            <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
		                              <i class="bx bx-dots-vertical-rounded"></i>
		                            </button>
                            

		                            	<div class="dropdown-menu">
				                              <a class="dropdown-item" href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#ViewStockModal" onclick="BuildViewStockModal('${voucher[i].id}', '${voucher[i].code}','${voucher[i].amount}','${voucher[i].exp}')">
				                              <i class="fa-regular fa-eye"></i> View</a> 
				                               
				                              <a class="dropdown-item" href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#ViewStockModal" onclick="BuildEditStockModal('${voucher[i].id}', '${voucher[i].code}','${voucher[i].amount}','${voucher[i].exp}')">
				                              <i class="bx bx-edit-alt me-1"></i>Edit</a> 
		
				                              <a class="dropdown-item" href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#deleteModal" onclick="createDeleteModal('${voucher[i].id}')">
				                              <i class="bx bx-trash me-1"></i>Delete</a>
		                            	</div>
                          		  </div>
                       			 </td>
							</tr>`;
							//console.log(voucher[i].id);
							voucherTable.innerHTML += VoucherInFo;	
	}
	
}

//sortBYview

function callSortbyServlet(sort){
	var showType = document.getElementById('sortType');
	
	if(sort == 1){
		showType.innerHTML = 'Default';
	}
	if(sort == 2){
		showType.innerHTML = 'Code';
	}
	if(sort == 3){
		showType.innerHTML = 'Amount';
	}
	if(sort == 4){
		showType.innerHTML = 'Exp-Date';
	}
	
	
	var endpoint = "http://localhost:8081/LankaHardware/GetAllVoucherServlet";
	$.post(endpoint,{sort:sort}, function(response){
			voucher = response
		var varLen = voucher.length;
		
		buildAllVouchers(voucher, varLen);
	
	})
			
		
}

//sortBYview

function callSortbyServlet(sort){
	var showType = document.getElementById('sortType');
	
	if(sort == 1){
		showType.innerHTML = 'Default';
	}
	if(sort == 2){
		showType.innerHTML = 'code';
	}
	if(sort == 3){
		showType.innerHTML = 'amount';
	}
	if(sort == 4){
		showType.innerHTML = 'Exp-Date';
	}

	
	var endpoint = "http://localhost:8081/LankaHardware/GetAllStoreItemSortByServlet";
	$.post(endpoint,{sort:sort}, function(response){
			stock = response
		var stockLen = stock.length;
		
		buildAllStock(stock, stockLen);
	
	})
			
		
}



//Insert voucher

function callAddVoucherServlet(code, amount, exp){
		
		var endpoint = "http://localhost:8081/LankaHardware/AddVoucherServlet";
		
		
		$.post(endpoint,{code: code, amount:amount, exp:exp}, function(response){
			
		});
}	




//update voucher
var isNew = true;

var editStockModalHeader = document.getElementById('ViewStockModalHeader')
var editStockModalBody = document.getElementById('ViewStockModalBody')
var editStockModalFooter = document.getElementById('EditStockModalFooter')
var editCard = document.getElementById('card-body-edit')

function BuildEditStockModal(id ,code,amount,exp){
	console.log("Hey this is the build edit voucher modal")
	
	editStockModalHeader.innerHTML = '';
	editStockModalHeader.style = '';
	editStockModalHeader.innerHTML = `
							              <button
							                type="button"
							                class="btn-close"
							                data-bs-dismiss="modal"
							                aria-label="Close"
							              ></button>`;
							              
	editStockModalBody.style = 'diplay:block; position:relative; left:190px; <br><br>'						              
	editStockModalBody.innerHTML = '<h5 class="modal-title" id="modalCenterTitle">EDIT VOUCHER</h5>'

	editCard.innerHTML = `<form id="formAccountSettings" method="POST" onsubmit="return false">
                        <div class="row">
                          <div class="mb-3 col-md-6">
                            <label for="stockID" class="form-label">Voucher ID.</label>
                            <input
                              class="form-control"
                              type="text"
                              id="StockIDModal"
                              name="stockID"
                   				value="${id}"
							readonly
                            />
                          </div>
                          
                          
                          <div class="mb-3 col-md-6">
                            <label for="lastName" class="form-label">Coupon Code</label>
                            <input class="form-control" type="text"  id="code" name="code" value="${code}" id="stockName" autofocus/>
                          </div>
                          
                           <div class="mb-3 col-md-6">
                            <label for="lastName" class="form-label">Coupon Code</label>
                            <input class="form-control" type="number" min="1" max="100" id="nameModal" name="amount" value="${amount}" id="amount" autofocus/>
                          </div>
               
                          
                          <div class="mb-3 col-md-6">
                            <label for="exp" class="form-label">Expiry Date</label>
                         <input
                              type="date"
                              class="form-control"
                              id="exp"
                              name="exp"
							  value="${exp}"
                              placeholder = "None"
                            />
                          </div>
                                      
                            
                        <div class="mt-2">
                          <button type="submit" class="btn btn-primary me-2" id = "save" onclick ="callupdateVoucher(); callGetAllVoucherServlet();')">Save</button>
                          <button type="reset" onclick ="BuildViewStockModal('${id}','${code}','${amount}','${exp}')" class="btn btn-outline-secondary" id ="clear" >Cancel</button>
                        </div>
                        </div>
                        
                      </form> `

	
}

var viewModalHeader = document.getElementById('ViewStockModalHeader')
var viewStockModalBody = document.getElementById('ViewStockModalBody')
var viewStockModalFooter = document.getElementById('ViewStockModalFooter')
var viewCard = document.getElementById('card-body-edit')


function BuildViewStockModal(id,code,amount,exp){
	

	viewModalHeader.innerHTML = `      <button
							                type="button"
							                class="btn-close"
							                data-bs-dismiss="modal"
							                aria-label="Close"
							              ></button>`

	viewStockModalBody.innerHTML ='';
	viewStockModalBody.style = 'diplay:block; position:relative; left:190px; <br><br>'						              
	viewStockModalBody.innerHTML = '<h5 class="modal-title" id="modalCenterTitle">View VOUCHER</h5>'
	
	editCard.innerHTML = `<form id="formAccountSettings" method="POST" onsubmit="return false">
                        <div class="row">
                          <div class="mb-3 col-md-6">
                            <label for="stockID" class="form-label">ID</label>
                            <input
                              class="form-control"
                              type="text"
                              id="StockIDModal"
                              name="stockID"
                   				value="${id}"
                              autofocus
							readonly
                            />
                          </div>
                          
                          
                          <div class="mb-3 col-md-6">
                            <label for="lastName" class="form-label">Voucher-Code</label>
                            <input class="form-control" type="text"  id="nameModal" value="${code}" id="stockName" readonly/>
                          </div>
                          
                          <div class="mb-3 col-md-6">
                            <label for="lastName" class="form-label">Amount</label>
                            <input class="form-control" type="text"  id="nameModal" value="${amount}" readonly/>
                          </div>
                          
                          <div class="mb-3 col-md-6">
                            <label for="lastName" class="form-label">Exp-Date</label>
                            <input class="form-control" type="text"  id="nameModal" value="${exp}"  readonly/>
                          </div>
                          

                          
                            
                        <div class="mt-2">
                          <button type="submit" onclick ="BuildEditStockModal('${id}','${code}','${amount}','${exp}')" class="btn btn-primary me-2" id = "save" >Edit</button>
                          <button type="reset"  class="btn btn-outline-secondary" id ="clear" data-bs-dismiss="modal">Cancel</button>
                        </div>
                        </div>
                        
                      </form>`

	viewStockModalFooter.innerHTML = ``
	
}

		