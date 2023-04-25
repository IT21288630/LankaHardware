
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html>
<head>
<title>Lanka Hardware</title>
<link rel="stylesheet"
	href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
	integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
	crossorigin="anonymous">
</head>
<body>

	<header>
		<nav class="navbar navbar-expand-md navbar-dark"
			style="background-color: blue">
			<div>
				<a href="https://www.xadmin.net" class="navbar-brand"> Add Order </a>
			</div>

			
		</nav>
	</header>
	<br>
	<div class="container col-md-5">
		<div class="card">
			<div class="card-body">
				<c:if test="${user != null}">
					<form action="update" method="post">
				</c:if>
				<c:if test="${user == null}">
					<form action="insert" method="post">
				</c:if>

				<caption>
					<h2>
						<c:if test="${user != null}">
            			Edit Order
            		</c:if>
						<c:if test="${user == null}">
            			Add Order
            		</c:if>
					</h2>
				</caption>

				 <div class="row">
                        <c:if test="${user != null}">
                          <div class="mb-3 col-md-6">
                            <label class="form-label" >Order ID</label>
                            <input
                              class="form-control" value="<c:out value='${user.orderID}' />" type="hidden" name="orderID"/>
                          </div>
                          </c:if>
                          
                          <div class="mb-3 col-md-6">
                            <label  class="form-label">Item Id</label>
                            <input class="form-control" value="<c:out value='${user.itemID}' />" type="text" name="itemID" />
                          </div>
                          
                          <div class="mb-3 col-md-6">
                            <label class="form-label">Order Name</label>
                            <input class="form-control" value="<c:out value='${user.pname}' />" type="text" name="pname" />
                          </div>
                          
                          <div class="mb-3 col-md-6">
                            <label class="form-label">Order Date</label><br>
                           <input  value="<c:out value='${user.oDate}' />" type="date"  name = "oDate">

                          </div>
                          
                          <div class="mb-3 col-md-6">
                            <label class="form-label">Delivery Date</label><br>
                           <input value="<c:out value='${user.dDate}' />" type="date"  name = "dDate">

                          </div>
                          
                          <div class="mb-3 col-md-6">
                            <label class="form-label">Delivery Pricing</label>
                            <input type="text" class="form-control" value="<c:out value='${user.sPrice}' />"  name="sPrice" placeholder = "Rs 1000"/>
                          </div>
                          
                           <div class="mb-3 col-md-6">
                            <label  class="form-label">Total Price</label>
                            <input type="text" class="form-control" value="<c:out value='${user.tPrice}' />"  name="tPrice" placeholder = "Rs 3000"/>
                          </div>
                         
                  
                          <div class="mb-3 col-md-6">
                            <label  class="form-label">Email</label>
                         <input type="text" class="form-control" value="<c:out value='${user.email}' />"   name="email" />
                          </div>
                          
                          <div class="mb-3 col-md-6">
                            <label class="form-label">Order Status</label><br>
                            <select id="wage" name = "orderstatus"  class="select2 form-select">
                              <option >Select Type</option>
                              <option value="Completed">Completed</option>
                              <option value="Processing">Processing</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Return Requested">Return Requested</option>
                            </select>
                          </div>
                          
                            
                        </div>
                        <div class="mt-2">
                          <button type="submit" class="btn btn-primary me-2"  >Add Order</button>
                          <button type="reset" class="btn btn-outline-secondary"><a href="<%=request.getContextPath()%>/OManagerServlet"> Cancel</a></button>
                        </div>
                     
                    </div>
             
			</div>
		</div>
		</form></form>
</body>
</html>