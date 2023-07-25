/**
 * 
 */

function callCheckoutServlet() {
	var fname = document.getElementById('fname').value
	var lname = document.getElementById('lname').value
	var address = document.getElementById('address').value
	var phone = document.getElementById('phone').value
	var email = document.getElementById('email').value
	var pcode = document.getElementById('pcode').value
	
	

	$.post("http://localhost:8080/LankaHardware/CheckoutServlet", { fname: fname, lname: lname, address: address, phone: phone, email: email, pcode: pcode }, function(response) {

		window.location.href = "http://localhost:8080/LankaHardware/Completedorder.jsp";
	})
}

function callGetCompletedOrdersServlet() {
	$.get("http://localhost:8080/LankaHardware/GetCompletedOrdersServlet", function(response) {

		var completedOrders = response

		buildCompletedOrders(completedOrders)


	})
}

function buildCompletedOrders(completedOrders) {
	var completedOrdersList = document.getElementById('completedOrdersList')

	completedOrdersList.innerHTML = ''

	for (var i = 0; i < completedOrders.length; i++) {
		var elID = `${completedOrders[i].oID}order_itemList`
		var order = `<table class="table" style="margin-bottom: 65px;">
							<thead class="thead-primary">
								<tr class="text-center">
									<th style="text-align: start;" id="orderID">Order ID: ${completedOrders[i].oID}</th>
								</tr>
							</thead>
							<tbody id="${completedOrders[i].oID}order_itemList">
								<tr>
									<td class="price" style="text-align: start; padding-top: 10px; padding-left: 0px;">Name: ${completedOrders[i].name}<br> Date: ${completedOrders[i].date_time}</td>
								</tr>
							</tbody>
					</table>`

		completedOrdersList.innerHTML += order
		buildCompletedOrdersItems(completedOrders[i].items, elID, completedOrders[i].oID)
	}
}

var isAdded = []

function buildCompletedOrdersItems(items, elID, oid) {
	var tr = document.getElementById(elID)

	for (var i = 0; i < items.length; i++) {
		var item = `<tr>
						<td style="text-align: start; position: relative;" id="${items[i].itemID}${oid}TD">
							<img src="${items[i].mainImg}" width="100px"></img>
							${items[i].name}
						</td>
					</tr>`

		tr.innerHTML += item
		callCheckReviewIsAlreadyAddedServlet(items[i].itemID, oid, items[i].mainImg, items[i].name)
	}
}

function buildReviewModal(image, name, itemID, oid) {
	var reviewModalHeader = document.getElementById("reviewModalHeader")
	var reviewModalBody = document.getElementById("reviewModalBody")
	var reviewModalFooter = document.getElementById("reviewModalFooter")

	reviewModalHeader.innerHTML = `<i class="fa-solid fa-arrow-left" data-bs-dismiss="modal" style="font-size: large;"></i>
                        			<h5 style="color: gray;"> Write a review </h5>`

	reviewModalBody.innerHTML = `<section class="mini-cart-no-scroll-bar" style="max-height: 500px; overflow-y: scroll;">
                            <div class="container">
                                <div class="row">
                                    <div class="col-md-12" style="padding-left: 0px; padding-right: 0px;">
                                        <div class="cart-list">
                                            <table class="table">
                                                <tbody>
                                                    <tr class="text-center"
                                                        style="display: flex; align-items: center; justify-content: center; column-gap: 25px; border: 1px solid transparent !important; border-bottom: 1px solid rgba(0, 0, 0, 0.05) !important;">
                                                        <td class="image-prod" style="border: none; padding: 0px;">
                                                            <div class="img"
                                                                style="background-image: url(${image}); margin: 0px;">
                                                            </div>
                                                        </td>
                                                        <td class="product-name"
                                                            style="width: auto; border: none; padding: 0px;">
                                                            <h3>${name}</h3>
                                                        </td>
                                                    </tr>
                                                    <!-- END TR-->
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <div class="star-widget">
                            <input type="radio" name="rate" id="rate-5" value="5" checked> <label for="rate-5" class="fas fa-star"></label>
                            <input type="radio" name="rate" id="rate-4" value="4"> <label for="rate-4" class="fas fa-star"></label>
                            <input type="radio" name="rate" id="rate-3" value="3"> <label for="rate-3" class="fas fa-star"></label>
                            <input type="radio" name="rate" id="rate-2" value="2"> <label for="rate-2" class="fas fa-star"></label>
                            <input type="radio" name="rate" id="rate-1" value="1"> <label for="rate-1" class="fas fa-star"></label>
                        </div>
                        <div class="reviewCard">
                            <div class="drag-area" id="drag-area" ondragover="dragOverFun(this);" ondragleave="dragLeaveFun(this);" ondragdrop="dragDropFun(this);">
                                <span class="visible">
                                    Drag & drop image here or
                                    <span class="select" id="dragSelect"  role="button" onclick="setInputClick();">Browse</span>
                                </span>
                                <span class="on-drop">Drop images here</span>
                                <input name="file" id="inputFile" type="file" class="file" multiple onchange="setImages();"/>
                            </div>

                            <!-- IMAGE PREVIEW CONTAINER -->
                            <div class="imageContainer" id="imageContainer"></div>
                        </div>
                        <textarea name="desc" id="reviewDescription" cols="30" rows="7" class="form-control reviewTextArea"
                            placeholder="Review" style="height: 130px; margin: 20px 0px 20px 0px;"></textarea>`


	reviewModalFooter.innerHTML = `<button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                        				<button type="button" class="btn btn-primary" id="ratingSubmitBtn" onclick="callAddReviewServlet('${itemID}', '${oid}');">Submit</button>`
}

function callAddReviewServlet(itemID, oid) {
	var reviewModalHeader = document.getElementById("reviewModalHeader")
	var reviewModalBody = document.getElementById("reviewModalBody")
	var reviewModalFooter = document.getElementById("reviewModalFooter")

	var inputFile = document.getElementById('inputFile')
	var reviewDescription = document.getElementById('reviewDescription').value
	var stars = document.querySelector('input[name="rate"]:checked').value
	var endpoint = "http://localhost:8080/LankaHardware/AddReviewServlet"
	var formData = new FormData();

	for (const file of inputFile.files) {
		formData.append('inputFile', file)
	}

	formData.append('itemID', itemID)
	formData.append('oID', oid)
	formData.append('reviewDescription', reviewDescription)
	formData.append('stars', stars)

	reviewModalHeader.style = "display: none;"
	reviewModalBody.style = "text-align: center;"
	reviewModalBody.innerHTML = `<div class="spinner-border text-warning" role="status" style="width: 2.5rem; height: 2.5rem;">
		                         
		                        </div>`
	reviewModalFooter.style = "display: none;"

	fetch(endpoint, {
		method: "post",
		body: formData
	}).then(res => res.json()
		.then(data =>
			displayReviewAddedMsg(data, itemID, oid)
		)
	).catch(console.error)
}

function displayReviewAddedMsg(msg, itemID, oid) {
	var reviewModalHeader = document.getElementById("reviewModalHeader")
	var reviewModalBody = document.getElementById("reviewModalBody")
	var reviewModalFooter = document.getElementById("reviewModalFooter")

	reviewModalHeader.style = "display: none;"
	reviewModalBody.style = "padding: 1rem;"
	reviewModalBody.innerHTML = `<div style="display: flex; justify-content: center; align-items: center; column-gap: 10px;">
									        <lottie-player src="https://assets3.lottiefiles.com/packages/lf20_q7hiluze.json"  background="transparent"  speed="1"  style="width: 50px; height: 50px;" autoplay></lottie-player>
									        <span style="font-size: x-large;">${msg}</span>
									    </div>`
	reviewModalFooter.style = "display: none;"

	setTimeout(function() {
		$('#modalCenter').modal('hide')
	}, 2500);

	var reviewBtn = document.getElementById(`${itemID}${oid}ReviewBtn`)
	reviewBtn.style.display = "none"
}

function callCheckReviewIsAlreadyAddedServlet(itemID, oID, mainImg, name) {

	$.get("http://localhost:8080/LankaHardware/CheckReviewIsAlreadyAddedServlet", { itemID: itemID, oID: oID }, function(response) {
		var el = document.getElementById(`${itemID}${oID}TD`)
		var isAdded = response

		if (isAdded) return
		else {
			el.innerHTML += `<a href="#" onclick="buildReviewModal('${mainImg}', '${name}', '${itemID}', '${oID}');" style="position: absolute; right: 0; top: 40%;" class="btn btn-primary py-3 px-4" data-bs-toggle="modal" data-bs-target="#modalCenter" id="${itemID}${oID}ReviewBtn">Add a review</a>`
		}
	})
}