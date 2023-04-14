/**
 * 
 */

const wrapper = document.querySelector(".wrapper"),
	options = wrapper.querySelector(".options");

let items = []
let searchResult = []

function setItems(allItems) {
	allItems.forEach(item => {
		items.push(item)
	});

	buildItemList(items)
}

function toggleWrapper() {
	wrapper.classList.toggle("active")
}

function buildItemList(allItems) {
	options.innerHTML = ""

	for (var i = 0; i < allItems.length; i++) {
		var li = `<li onclick="setItemName('${allItems[i].name}'); callGetCartChartServlet('${allItems[i].itemID}');" id="firstItem">${allItems[i].name}</li>`

		options.innerHTML += li
	}

	$('#firstItem').click()
}

function setItemName(name) {
	var selectBtnText = document.getElementById('selectBtnText')
	selectBtnText.innerHTML = name
	wrapper.classList.remove("active")
}

function searchItem() {
	searchResult = []
	var searchKeyWord = document.getElementById('searchInput').value

	for (var i = 0; i < items.length; i++) {
		if (items[i].name.toLowerCase().includes(searchKeyWord)) searchResult.push(items[i])
	}

	buildItemList(searchResult)
}

var sizes = []
var counts = []
var currentCounts = []

function callGetCartChartServlet(itemID) {
	$.get("http://localhost:8080/LankaHardware/GetCartChartServlet", { itemID: itemID }, function(response) {
		sizes = response[0]
		counts = response[1]

		buildSizes()
	})
}

function buildSizes() {
	var sizeList = document.getElementById('sizeList')

	sizeList.innerHTML = `<li class="nav-item" style="display: flex; align-items: center; margin-right: 20px;">
                      		<span class="text-muted fw-light">Sizes /</span>
                      	</li>`

	for (var i = 0; i < sizes.length; i++) {
		var btnID = `${sizes[i]}Btn`

		if (i == 0) {
			var size = `<li class="nav-item" onclick="setCurrentCounts('${sizes[i]}'); createCartChart(${counts[sizes[i]]}); toggleButton('${sizes[i]}', 'sizeBtn'); setTotalCount();" id="firstSize">
                          <button type="button" class="nav-link active" role="tab" id="${btnID}">${sizes[i]}</button>
                		</li>`
		} else {
			var size = `<li class="nav-item" onclick="setCurrentCounts('${sizes[i]}'); createCartChart(${counts[sizes[i]]}); toggleButton('${sizes[i]}', 'sizeBtn'); setTotalCount();">
                          <button type="button" class="nav-link" role="tab" id="${btnID}">${sizes[i]}</button>
                   		 </li>`
		}

		sizeList.innerHTML += size
	}

	sizeList.innerHTML += `<li class="nav-item" onclick="createCompareChart(); setCompareTotalCount(); toggleButton('${sizes[i]}', 'compareBtn');" style="position: absolute; right: 5px;">
                          	<button type="button" class="nav-link" role="tab" id="cartCompBtn">Compare</button>
                   		 </li>`

	$('#firstSize').click()
}

function toggleButton(size, type) {

	var compBtn = document.getElementById('cartCompBtn')

	if (type == 'sizeBtn') {

		compBtn.classList.remove('active')

		for (var i = 0; i < sizes.length; i++) {
			var btn = document.getElementById(`${sizes[i]}Btn`)

			if (sizes[i] == size) {
				btn.classList.add('active')
			}
			else {
				if (btn.classList.contains('active')) btn.classList.remove('active')
			}
		}
	} else {
		for (var i = 0; i < sizes.length; i++) {
			var btn = document.getElementById(`${sizes[i]}Btn`)

			btn.classList.remove('active')
		}
		
		compBtn.classList.add('active')
	}



}


function setCurrentCounts(size) {
	currentCounts = []

	currentCounts.push(JSON.parse(`{"name": "${size}",
									"data": [${counts[size]}]}`))
}

function createCartChart() {
	var randomColor = Math.floor((Math.random() * 255) + 1);
	const d = new Date();
	let month = d.getMonth() + 1;

	const cartChartEl = document.querySelector('#cartChart'),
		cartChartConfig = {
			series: currentCounts,
			chart: {
				height: 215,
				parentHeightOffset: 0,
				parentWidthOffset: 0,
				toolbar: {
					show: true,
					offsetX: -10,
					offsetY: -20
				},
				type: 'area'
			},
			dataLabels: {
				enabled: false
			},
			stroke: {
				width: 2,
				curve: 'smooth'
			},
			legend: {
				show: false
			},
			markers: {
				size: 6,
				colors: 'transparent',
				strokeColors: 'transparent',
				strokeWidth: 4,
				discrete: [
					{
						fillColor: config.colors.white,
						seriesIndex: 0,
						dataPointIndex: month,
						strokeColor: `rgb(${randomColor}, 152,186)`,
						strokeWidth: 2,
						size: 6,
						radius: 8
					}
				],
				hover: {
					size: 7
				}
			},
			colors: [`rgb(${randomColor}, 152,186)`],
			fill: {
				type: 'gradient',
				gradient: {
					shade: shadeColor,
					shadeIntensity: 0.6,
					opacityFrom: 0.5,
					opacityTo: 0.25,
					stops: [0, 95, 100]
				}
			},
			grid: {
				borderColor: borderColor,
				strokeDashArray: 3,
				padding: {
					top: -20,
					bottom: -8,
					right: 8
				}
			},
			xaxis: {
				categories: ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', "oct", 'Nov', 'Dec'],
				axisBorder: {
					show: false
				},
				axisTicks: {
					show: false
				},
				labels: {
					show: true,
					style: {
						fontSize: '13px',
						colors: axisColor
					}
				}
			},
			yaxis: {
				labels: {
					show: true
				},
				tickAmount: 4
			}
		};

	cartChartEl.innerHTML = ""

	if (typeof cartChartEl !== undefined && cartChartEl !== null) {
		const cartChart = new ApexCharts(cartChartEl, cartChartConfig);
		cartChart.render();
	}
}


function createCompareChart() {
	var allData = []
	var randomColor = []
	var colorNum = []
	var colorNum2 = []
	var colorNum3 = []
	var allDescrete = []
	const d = new Date()
	let month = d.getMonth() + 1

	for (var i = 0; i < sizes.length; i++) {
		allData.push(JSON.parse(`{"name": "${sizes[i]}",
								"data": [${counts[sizes[i]]}]}`))

		colorNum.push(Math.floor((Math.random() * 255) + 1))
		colorNum2.push(Math.floor((Math.random() * 255) + 1))
		colorNum3.push(Math.floor((Math.random() * 255) + 1))
	}

	for (var i = 0; i < colorNum.length; i++) {

		if (i != colorNum.length - 1) {
			while (colorNum[i + 1] == colorNum[i]) {
				colorNum[i + 1] = Math.floor((Math.random() * 255) + 1)
			}
		}

		if (i != colorNum2.length - 1) {
			while (colorNum2[i + 1] == colorNum2[i]) {
				colorNum2[i + 1] = Math.floor((Math.random() * 255) + 1)
			}
		}

		if (i != colorNum3.length - 1) {
			while (colorNum3[i + 1] == colorNum3[i]) {
				colorNum3[i + 1] = Math.floor((Math.random() * 255) + 1)
			}
		}

	}

	for (var i = 0; i < sizes.length; i++) {
		randomColor.push(`rgb(${colorNum[i]}, ${colorNum2[i]}, ${colorNum3[i]})`)
		allDescrete.push(JSON.parse(`{"fillColor": "rgb(255, 255, 255)",
									"seriesIndex": ${i},
						            "dataPointIndex": ${month},
						            "strokeColor": "${randomColor[i]}",
						            "strokeWidth": 2,
						            "size": 6,
						            "radius": 8}`))
	}

	const cartChartEl = document.querySelector('#cartChart'),
		cartChartConfig = {
			series: allData,
			chart: {
				height: 215,
				parentHeightOffset: 0,
				parentWidthOffset: 0,
				toolbar: {
					show: true,
					offsetX: -10,
					offsetY: -20
				},
				type: 'area'
			},
			dataLabels: {
				enabled: false
			},
			stroke: {
				width: 2,
				curve: 'smooth'
			},
			legend: {
				show: false
			},
			markers: {
				size: 6,
				colors: 'transparent',
				strokeColors: 'transparent',
				strokeWidth: 4,
				discrete: allDescrete,
				hover: {
					size: 7
				}
			},
			colors: randomColor,
			fill: {
				type: 'gradient',
				gradient: {
					shade: shadeColor,
					shadeIntensity: 0.6,
					opacityFrom: 0.5,
					opacityTo: 0.25,
					stops: [0, 95, 100]
				}
			},
			grid: {
				borderColor: borderColor,
				strokeDashArray: 3,
				padding: {
					top: -20,
					bottom: -8,
					right: 8
				}
			},
			xaxis: {
				categories: ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', "oct", 'Nov', 'Dec'],
				axisBorder: {
					show: false
				},
				axisTicks: {
					show: false
				},
				labels: {
					show: true,
					style: {
						fontSize: '13px',
						colors: axisColor
					}
				}
			},
			yaxis: {
				labels: {
					show: true
				},
				tickAmount: 4
			}
		};

	cartChartEl.innerHTML = ""

	if (typeof cartChartEl !== undefined && cartChartEl !== null) {
		const cartChart = new ApexCharts(cartChartEl, cartChartConfig);
		cartChart.render();
	}
}

function setTotalCount() {
	var totalElement = document.getElementById('totalCount')
	var total = 0

	for (var i = 0; i < currentCounts[0]['data'].length; i++) {
		total += currentCounts[0]['data'][i]
	}

	totalElement.innerHTML = total
}

function setCompareTotalCount() {
	var totalElement = document.getElementById('totalCount')
	var total = 0

	for (var i = 0; i < sizes.length; i++) {
		for (var j = 0; j < counts[sizes[i]].length; j++) {
			total += counts[sizes[i]][j]
		}
	}

	totalElement.innerHTML = total
}





