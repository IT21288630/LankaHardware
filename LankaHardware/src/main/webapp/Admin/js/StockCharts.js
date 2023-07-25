var stock = []
var stocktable = document.getElementById('stock')
var totalQ = 0
var totalQArr = []
var FinalDividedArr = []

// view stock items
function callGetAllStockServlet(){
	
	$.get("http://localhost:8080/LankaHardware/GetAllItemsServlet", function(response) {
				
		stock = response
		var stockLen = stock.length;
		buildAllStock(stock, stockLen);
		
	})
}

function callGetAllStockTotal(){
	
	$.get("http://localhost:8080/LankaHardware/GetAllStockTotal", function(response) {
				
		totalQ = response
		console.log(totalQ)
		
		var showQtotal = document.getElementById('stockQtotal');
		showQtotal.innerHTML = totalQ;
	})
}

function buildAllStock(stock, stockLen){
	stocktable.innerHTML = '';
	var showItemCount = document.getElementById('ItemCount');
	
	showItemCount.innerHTML = stockLen;

	//console.log(stock[1].itemID)
	for(var i = 0; i < stockLen; i++){
		totalQArr[i] = stock[i].quantity
		
		 			var stockInFo = `<tr>
								<td>
									${stock[i].itemID}
								</td>
								<td>
									${stock[i].name}
								</td>
								<td>
									${stock[i].type}
								</td>
								
								<td>
									${stock[i].brand}
								</td>
								<td>
									${stock[i].quantity}
								</td>
							
								
								<td>
		                          <div class="dropdown">

				                   <a class="dropdown-item" href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#BarCodeModal" onclick="GenerateBarCode('${stock[i].itemID}')">
				                   <i class="bx bx-barcode"></i></a>
		                            	
                          		  </div>
                       			 </td>
							</tr>`;
							//console.log(stock[i].itemID);
							stocktable.innerHTML += stockInFo;	
							
							
	}
	
	var totalQNumArray = totalQArr.map(Number);
	createAnaliticsforQuantity(totalQNumArray)
	
	console.log(totalQNumArray);
	callGetAllStockTotal();
	
	

}

function createAnaliticsforQuantity(Qarray){
	var len = Qarray.length
	var resultArr = []
	var divide = 7
	console.log("This is the len in analitics: ", len)
	
	var fragment = len/divide;
	console.log("after /7: ", fragment)
	
	var round = Math.round(fragment)
	console.log("round: ", round)
	
	
	for(var i=0; i < len; ){
		var k = 0;	
		var sum = 0;
		for(var j=0; j<round; j++){
			 
			if(Qarray[i] == 0 || Qarray[i] == null || Qarray[i] == ""){
				break;
			}
			sum += Qarray[i];
			i++	
		}
		
	
		
		resultArr.push(sum)
		k++;
		
		
		console.log("THis is the sum of round: ", sum)
	}
	
	FinalDividedArr = resultArr.map(Number);
	console.log("Result array: ", FinalDividedArr[0])
	
	
	
//stock

const QuantityChart = document.getElementById('customers').getContext('2d')

console.log("Cus tempArr: ", FinalDividedArr)
var st0 = FinalDividedArr[0]
var st1 = FinalDividedArr[1]
var st2 = FinalDividedArr[2]
var st3 = FinalDividedArr[3]
var st4 = FinalDividedArr[4]
var st5 = FinalDividedArr[5]
var st6 = FinalDividedArr[6]

const quantity = new Chart(QuantityChart,{
    type:'line',
    data:{
        labels:['mon','tue','wed','thu','fri','sat','sun'],
        datasets:[{
            data:[st0, st1, st2,st3,st4,st5,st6],
            borderColor:['rgb(59,197,154,1)'],
            borderWidth:2
        }]
    },
    options:{
        elements:{
            point:{
                radius:0
            }
        },
        scales:{
            x:{
                display:false
            },
            y:{
                display:false
            }
        },
        plugins:{
            legend:{
                display:false 
            }
        }
    }
})
	
const stockQbar = document.getElementById('tarsale').getContext('2d');
const myChart = new Chart(stockQbar,{
	type:'bar',
	data:{
		labels: ['mon','tue','wed','thu','fri','sat','sun'],
		datasets: [{
			label: '# Stock Quantity',
			data: [st0, st1, st2,st3,st4,st5,st6],
			backgroundColor: [
				'rgba(255,99,132,0.2)',
				'rgba(54,162,235,0.2)',
				'rgba(255,206,86,0.2)',
				'rgba(75,192,192,0.2)',
				'rgba(153,102,255,0.2)',
				'rgba(255,159,64,0.2)'
			],
			borderColor:[
				'rgba(255,99,132, 1)',
				'rgba(54,162,235, 1)',
				'rgba(255,206,86, 1)',
				'rgba(75,192,192, 1)',
				'rgba(153,102,255,1)',
				'rgba(255,159,64, 1)'
			],
			borderWidth: 1
		}]
	},
	options:{
		scales:{
			y:{
				beginAtZero: true
			}
		}
	}
})
		
		
}


function GenerateBarCode(id){
	
	callGetAllStockServlet()
	setTimeout(function() {
		$('#BarCodeModal').modal('show')
	}, 1000);
					
	var BarModalHeader = document.getElementById('BarCodeModalHeader')
	var BarStockModalBody = document.getElementById('BarCodeModalBody')
	var BarStockModalFooter = document.getElementById('BarCodeModalFooter')
	var BarCodeModalTitle = document.getElementById('BarCodeModalTitle')
	

	JsBarcode('#barcode', id,{
			format: 'code128',
			displayValue: true,
		});			
								              					
	BarModalHeader.style = '';
	BarModalHeader.innerHTML = `
						              <button
						                type="button"
						                class="btn-close"
						                data-bs-dismiss="modal"
						                aria-label="Close"
						              ></button>`;
	
	BarCodeModalTitle.style =''; 
	BarCodeModalTitle.innerHTML = '<div style="display:block; justify-content: center; margin-left: auto; margin-right: auto; width: 50%;"><h2 style="color: #000; position:relative; left:80px">BarCode</h2> <h6 style="color: #b2beb5"">Take Screenshot to save your Barcode</h6></div>';
	
	BarStockModalBody.style = "display:block;  margin-left: auto; margin-right: auto; width: 50%;";
	
	//viewStockModalBody.innerHTML += 'This is the Barcode for This store Item' ;	
	BarStockModalFooter.style = "padding:10px; display:block; justify-content: center; margin-left: 160px; margin-right: auto; width: 50%;";	
	BarStockModalFooter.innerHTML = `<button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal" onclick="callGetAllStockServlet()">Close</button>  <button type="button" class="btn btn-primary me-2" data-bs-dismiss="modal" onclick="callGetAllStockServlet()">View Store</button>`;		
	
	
	}

//Main




// order


var stockLength = stock.length

const productsChart = document.getElementById('products').getContext('2d')
const products = new Chart(productsChart,{
	
    type:'line',
    data:{
        labels:['mon','tue','wed','thu','fri','sat','sun'],
        datasets:[{
            data:[5,7,4,15,9,5,23],
            borderColor:['rgb(59,197,154,1)'],
            borderWidth:2
        }]
    },
    options:{
        elements:{
            point:{
                radius:0
            }
        },
        scales:{
            x:{
                display:false
            },
            y:{
                display:false
            }
        },
        plugins:{
            legend:{
                display:false 
            }
        }
    }
})


const salesChart = document.getElementById('sales').getContext('2d')
const sales = new Chart(salesChart,{
    type:'line',
    data:{
        labels:['mon','tue','wed','thu','fri','sat','sun'],
        datasets:[{
            data:[4,87,99,6,345,86,443],
            borderColor:['rgb(59,197,154,1)'],
            borderWidth:2
        }]
    },
    options:{
        elements:{
            point:{
                radius:0
            }
        },
        scales:{
            x:{
                display:false
            },
            y:{
                display:false
            }
        },
        plugins:{
            legend:{
                display:false 
            }
        }
    }
})




function searchItem(){
	
		    var SearchDetails = document.getElementById('SearchDetails').value;
		  
			//console.log("THis is from search: " + SearchDetails);
			
			if(SearchDetails == "" || SearchDetails == null || SearchDetails == "undefined"){
				//alert("Please add some keywords to search")
				console.log("failed")
				callGetAllStockServlet();
			}
			else{
					
					$.post("http://localhost:8080/LankaHardware/GetSearchedItems", {SearchDetails: SearchDetails}, function(response) {
					stock = response;	
					var stockLen = stock.length;
					console.log("Stock response: " + response)
					
					if(response == ""){
						buildNotfound(SearchDetails);
					}
					
					buildAllStock(stock, stockLen);

					
					
				})
				
			}
							
				
	}















