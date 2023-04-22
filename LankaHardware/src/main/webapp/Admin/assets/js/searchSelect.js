/**
 * 
 */
var cartWrapper = document.getElementById('cartWrapper')
var wishWrapper = document.getElementById('wishWrapper')
const cartOptions = cartWrapper.querySelector(".options");
const wishOptions = wishWrapper.querySelector(".options2");

var firstTime = true
var wishFirstTime = true
let items = []
let searchResult = []
let wishSearchResult = []

function setItems(allItems) {
	allItems.forEach(item => {
		items.push(item)
	});

	buildItemList(items, 'cart')
	buildItemList(items, 'wishlist')
}

function toggleWrapper(type) {
	if (type == "cart") {
		cartWrapper.classList.add('active')
	}
	else if (type == "wishlist") {
		wishWrapper.classList.add('active')
	}
}

function buildItemList(allItems, type) {

	if (type == "cart") {
		cartOptions.innerHTML = ""

		for (var i = 0; i < allItems.length; i++) {
			var li = `<li onclick="setItemName('${allItems[i].name}', 'cart'); callGetCartChartServlet('${allItems[i].itemID}');" id="${i}Item">${allItems[i].name}</li>`

			cartOptions.innerHTML += li
		}

		if(firstTime == true) {
			$('#0Item').click()
			firstTime = false
		}
	}
	else if (type == "wishlist") {
		wishOptions.innerHTML = ""

		for (var i = 0; i < allItems.length; i++) {
			var li = `<li onclick="setItemName('${allItems[i].name}', 'wishlist'); callGetWishlistChartServlet('${allItems[i].itemID}');" id="${i}WishItem">${allItems[i].name}</li>`

			wishOptions.innerHTML += li
		}

		if(wishFirstTime == true) {
			$('#0WishItem').click()
			wishFirstTime = false
		}
	}
}

function setItemName(name, type) {
	if (type == 'cart') {
		var selectBtnText = document.getElementById('selectBtnText')
		selectBtnText.innerHTML = name
		cartWrapper.classList.remove("active")
	}
	else if (type == 'wishlist') {
		var selectBtnText = document.getElementById('wishSelectBtnText')
		selectBtnText.innerHTML = name
		wishWrapper.classList.remove("active")
	}
}

function searchItem() {
	searchResult = []
	var searchKeyWord = document.getElementById('searchInput').value

	for (var i = 0; i < items.length; i++) {
		if (items[i].name.toLowerCase().includes(searchKeyWord)) searchResult.push(items[i])
	}

	buildItemList(searchResult, 'cart')
}

function searchWishItem() {
	wishSearchResult = []
	var searchKeyWord = document.getElementById('wishSearchInput').value

	for (var i = 0; i < items.length; i++) {
		if (items[i].name.toLowerCase().includes(searchKeyWord)) wishSearchResult.push(items[i])
	}

	buildItemList(wishSearchResult, 'wishlist')
}

var sizes = []
var counts = []
var currentCounts = []
var wishSizes = []
var wishCounts = []
var wishCurrentCounts = []

function callGetCartChartServlet(itemID) {
	$.get("http://localhost:8080/LankaHardware/GetCartChartServlet", { itemID: itemID }, function(response) {
		sizes = response[0]
		counts = response[1]

		buildSizes('cart')
	})
}

function callGetWishlistChartServlet(itemID) {
	$.get("http://localhost:8080/LankaHardware/GetWishlistChartServlet", { itemID: itemID }, function(response) {
		wishSizes = response[0]
		wishCounts = response[1]
			
		buildSizes('wishlist')
	})
}


function buildSizes(type) {

	if (type == 'cart') {
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
	else if (type == 'wishlist') {
		var sizeList = document.getElementById('wishSizeList')

		sizeList.innerHTML = `<li class="nav-item" style="display: flex; align-items: center; margin-right: 20px;">
	                      		<span class="text-muted fw-light">Sizes /</span>
	                      	</li>`

		for (var i = 0; i < wishSizes.length; i++) {
			var btnID = `${wishSizes[i]}WishBtn`

			if (i == 0) {
				var size = `<li class="nav-item" onclick="setWishCurrentCounts('${wishSizes[i]}'); createWishlistChart(${wishCounts[sizes[i]]}); toggleWishButton('${wishSizes[i]}', 'sizeBtn'); setWishTotalCount();" id="firstWishSize">
	                          <button type="button" class="nav-link active" role="tab" id="${btnID}">${sizes[i]}</button>
	                		</li>`
			} else {
				var size = `<li class="nav-item" onclick="setWishCurrentCounts('${wishSizes[i]}'); createWishlistChart(${wishCounts[wishSizes[i]]}); toggleWishButton('${wishSizes[i]}', 'sizeBtn'); setWishTotalCount();">
	                          <button type="button" class="nav-link" role="tab" id="${btnID}">${wishSizes[i]}</button>
	                   		 </li>`
			}

			sizeList.innerHTML += size
		}

		sizeList.innerHTML += `<li class="nav-item" onclick="createWishCompareChart(); setWishCompareTotalCount(); toggleWishButton('${wishSizes[i]}', 'compareBtn');" style="position: absolute; right: 5px;">
                          	<button type="button" class="nav-link" role="tab" id="wishCompBtn">Compare</button>
                   		 </li>`

		$('#firstWishSize').click()
	}
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

function toggleWishButton(size, type) {

	var compBtn = document.getElementById('wishCompBtn')

	if (type == 'sizeBtn') {

		compBtn.classList.remove('active')

		for (var i = 0; i < wishSizes.length; i++) {
			var btn = document.getElementById(`${wishSizes[i]}WishBtn`)

			if (wishSizes[i] == size) {
				btn.classList.add('active')
			}
			else {
				if (btn.classList.contains('active')) btn.classList.remove('active')
			}
		}
	} else {
		for (var i = 0; i < wishSizes.length; i++) {
			var btn = document.getElementById(`${wishSizes[i]}WishBtn`)

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

function setWishCurrentCounts(size) {
	wishCurrentCounts = []

	wishCurrentCounts.push(JSON.parse(`{"name": "${size}",
									"data": [${wishCounts[size]}]}`))
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

function createWishlistChart() {
	var randomColor = Math.floor((Math.random() * 255) + 1);
	const d = new Date();
	let month = d.getMonth() + 1;

	const wishChartEl = document.querySelector('#wishlistChart'),
		wishChartConfig = {
			series: wishCurrentCounts,
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

	wishChartEl.innerHTML = ""

	if (typeof wishChartEl !== undefined && wishChartEl !== null) {
		const wishChart = new ApexCharts(wishChartEl, wishChartConfig);
		wishChart.render();
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

function createWishCompareChart() {
	var allData = []
	var randomColor = []
	var colorNum = []
	var colorNum2 = []
	var colorNum3 = []
	var allDescrete = []
	const d = new Date()
	let month = d.getMonth() + 1

	for (var i = 0; i < wishSizes.length; i++) {
		allData.push(JSON.parse(`{"name": "${wishSizes[i]}",
								"data": [${wishCounts[wishSizes[i]]}]}`))

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

	for (var i = 0; i < wishSizes.length; i++) {
		randomColor.push(`rgb(${colorNum[i]}, ${colorNum2[i]}, ${colorNum3[i]})`)
		allDescrete.push(JSON.parse(`{"fillColor": "rgb(255, 255, 255)",
									"seriesIndex": ${i},
						            "dataPointIndex": ${month},
						            "strokeColor": "${randomColor[i]}",
						            "strokeWidth": 2,
						            "size": 6,
						            "radius": 8}`))
	}

	const wishChartEl = document.querySelector('#wishlistChart'),
		wishChartConfig = {
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

	wishChartEl.innerHTML = ""

	if (typeof wishChartEl !== undefined && wishChartEl !== null) {
		const wishChart = new ApexCharts(wishChartEl, wishChartConfig);
		wishChart.render();
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

function setWishTotalCount() {
	var totalElement = document.getElementById('totalWishCount')
	var total = 0

	for (var i = 0; i < wishCurrentCounts[0]['data'].length; i++) {
		total += wishCurrentCounts[0]['data'][i]
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

function setWishCompareTotalCount() {
	var totalElement = document.getElementById('totalWishCount')
	var total = 0

	for (var i = 0; i < wishSizes.length; i++) {
		for (var j = 0; j < wishCounts[wishSizes[i]].length; j++) {
			total += wishCounts[wishSizes[i]][j]
		}
	}
	
	totalElement.innerHTML = total
}



