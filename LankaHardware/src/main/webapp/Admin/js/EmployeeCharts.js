/**
 * 
 */

let employees = []
var empWrapper = document.getElementById('empWrapper')
const empOptions = empWrapper.querySelector(".options")
var firstTime = true

function setEmployees(allEmployees) {
	allEmployees.forEach(employee => {
		employees.push(employee)
	});

	buildEmployeeList(employees)

}

function toggleWrapper() {

	empWrapper.classList.add('active')

}

function buildEmployeeList(allEmployees) {

	empOptions.innerHTML = ""

	for (var i = 0; i < allEmployees.length; i++) {
		var li = `<li onclick="setEmployeeName('${allEmployees[i].empNo}'); callGetEmployeeChartServlet('${allEmployees[i].empNo}');" id="${i}Item">${allEmployees[i].empNo}</li>`

		empOptions.innerHTML += li
	}

	if (firstTime == true) {
		$('#0Item').click()
		firstTime = false
	}

}

function setEmployeeName(name) {

	var selectBtnText = document.getElementById('empSelectBtnText')
	selectBtnText.innerHTML = name
	empWrapper.classList.remove("active")


}

function callGetEmployeeChartServlet(empNo) {
	$.get("http://localhost:8080/LankaHardware/GetEmployeeChartServlet", { empNo: empNo }, function(response) {
		var counts = response

		setCurrentCounts(counts)
		createEmployeeChart()
		
		setTotalEmployeeCount()

	})
}

var currentCounts = []

function setCurrentCounts(counts) {
	currentCounts = []
	
	console.log(counts)

	currentCounts.push(JSON.parse(`{"name": "Count",
									"data": [${counts}]}`))
}

function createEmployeeChart() {
	var randomColor = Math.floor((Math.random() * 255) + 1);
	const d = new Date();
	let month = d.getMonth() + 1;

	console.log(currentCounts)

	const employeeChartEl = document.querySelector('#employeeChart'),
		employeeChartConfig = {
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

	employeeChartEl.innerHTML = ""

	if (typeof employeeChartEl !== undefined && employeeChartEl !== null) {
		const employeeChart = new ApexCharts(employeeChartEl, employeeChartConfig);
		employeeChart.render();
	}
}
function setTotalEmployeeCount() {
	var totalElement = document.getElementById('totalEmployeeCount')
	var total = 0

	for (var i = 0; i < currentCounts[0]['data'].length; i++) {
		total += currentCounts[0]['data'][i]
	}

	totalElement.innerHTML = total
}


function createCompareEmployeeChart() {
	var allData = []
	var randomColor = []
	var colorNum = []
	var colorNum2 = []
	var colorNum3 = []
	var allDescrete = []
	const d = new Date()
	let month = d.getMonth() + 1

	for (var i = 0; i < sizes.length; i++) {
		allData.push(JSON.parse(`{"name": "count",
								"data": [${counts}]}`))

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

	const employeeChartEl = document.querySelector('#employeeChart'),
		employeeChartConfig = {
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

	employeeChartEl.innerHTML = ""

	if (typeof employeeChartEl !== undefined && employeeChartEl !== null) {
		const employeeChart = new ApexCharts(employeeChartEl, employeeChartConfig);
		employeeChart.render();
	}
}

















