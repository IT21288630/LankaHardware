<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html lang="en" class="light-style layout-menu-fixed" dir="ltr"
	data-theme="theme-default" data-assets-path="../assets/"
	data-template="vertical-menu-template-free">
<head>
<meta charset="utf-8" />
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0" />
	
	    <script src="https://cdn.jsdelivr.net/npm/chart.js@3.9.1/dist/chart.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css" rel="stylesheet">

<title>Store Management - View Store</title>

<meta name="description" content="" />

<!-- Favicon -->
<link rel="icon" type="image/x-icon"
	href="../assets/img/favicon/favicon.ico" />

<!-- Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
	href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
	rel="stylesheet" />

<!-- Icons. Uncomment required icon fonts -->
<link rel="stylesheet" href="../assets/vendor/fonts/boxicons.css" />

<!-- Core CSS -->
<link rel="stylesheet" href="../assets/vendor/css/core.css"
	class="template-customizer-core-css" />
	<link rel="stylesheet" href="../assets/css/StockChartStyle.css"
	class="template-customizer-core-css" />
<link rel="stylesheet" href="../assets/vendor/css/theme-default.css"
	class="template-customizer-theme-css" />


<!-- Vendors CSS -->
<link rel="stylesheet"
	href="../assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css" />

<!-- Page CSS -->

<!-- Helpers -->
<script src="../assets/vendor/js/helpers.js"></script>
<script src="https://kit.fontawesome.com/35f65b186d.js"
	crossorigin="anonymous"></script>

<!--! Template customizer & Theme config files MUST be included after core stylesheets and helpers.js in the <head> section -->
<!--? Config:  Mandatory theme config file contain global vars & default theme options, Set your preferred theme option in this file.  -->
<script src="../assets/js/config.js"></script>
</head>

<body>
	<!-- Layout wrapper -->
	<div class="layout-wrapper layout-content-navbar">
		<div class="layout-container">
			<!-- Menu -->
	       <aside id="layout-menu"
				class="layout-menu menu-vertical menu bg-menu-theme"
				data-bg-class="bg-menu-theme">
				<div class="app-brand demo">
					<a href="index.html" class="app-brand-link"> <span
						class="app-brand-text demo menu-text fw-bolder ms-2">LH</span>
					</a>

					<div style="display: flex; align-items: end;">
						<span class="demo menu-text fw-bolder ms-2"><br><br><br>Admin Panel</span>
					</div>
					<a href="javascript:void(0);"
						class="layout-menu-toggle menu-link text-large ms-auto d-xl-none">
						<i class="bx bx-chevron-left bx-sm align-middle"></i>
					</a>
				</div>

				           
				<div class="menu-inner-shadow"></div>

				           
				<ul class="menu-inner py-1 overflow-auto">
					<!-- Charts -->
					<li class="menu-header small text-uppercase"><span
						class="menu-header-text">Charts</span></li>
					<!-- charts -->
					<li class="menu-item"><a href="StockCharts.jsp" class="menu-link"> <i class="menu-icon tf-icons bx bx-table"></i>
					Charts</a></li>
					<!-- Forms & Tables -->
					<li class="menu-header small text-uppercase"><span
						class="menu-header-text">Tables</span></li>
					<!-- Forms -->
					<!-- Tables -->
					<li class="menu-item"><a href="ViewVoucher.jsp"
						class="menu-link"> <i class="menu-icon tf-icons bx bx-table"></i>
					Voucher Management
					</a></li>
					<li class="menu-item active"><a href="ViewStock.jsp"
						class="menu-link"> <i class="menu-icon tf-icons bx bx-table"></i>
					Store Managements
					</a></li>

				</ul>
			</aside>
			<!-- / Menu -->


        <!-- Layout container -->
        <div class="layout-page">
          <!-- Navbar -->

          <nav
            class="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
            id="layout-navbar"
          >
            <div class="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
              <a class="nav-item nav-link px-0 me-xl-4" href="javascript:void(0)">
                <i class="bx bx-menu bx-sm"></i>
              </a>
            </div>

            <div class="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
              <!-- Search -->
              <form id="searchForm">
            
              <div class="navbar-nav align-items-center">
                <div class="nav-item d-flex align-items-center">
                  <button type="submit" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown" onclick="searchItem()"> <i class="bx bx-search fs-4 lh-0"></i></button>
                  <input
                    type="text"
                    class="form-control border-0 shadow-none"
                    placeholder="Search..."
                    aria-label="Search..."
                    id ="SearchDetails"
                  />
            
                </div>
              </div>
              </form>
              <!-- /Search -->

            
            </div>
          </nav>

          <!-- / Navbar -->

          <!-- Content wrapper -->
          
            <!-- Content -->

            
            <br>
        <section class="main">
      
        <div class="main--container">
        
        
        
            <div class="section--title">
                <h3 class="title">Welcome back, Admin</h3>
                <select name="date" id="date">
                    <option value="last7">Last 7 days</option>
                    <option value="lastmonth">Last month</option>
                    <option value="lastyear">Last year</option>
                    <option value="alltime">All time</option>
                </select>
            </div>
            <div class="cards">
                <div class="card card-1">
                    <div class="card--title">
                        <span class="card--icon icon"><i class="ri-user-line"></i></i></span>
                        <span>Customers</span>
                    </div>
                    <h3 class="card--value">5 <i class="ri-arrow-up-circle-fill up"></i></h3>
                    <h5 class="more">2 more than usual</h5>
                    <div class="chart">
                        <canvas id="sales"></canvas>
                    </div>
                </div>
                
                
                <div class="card card-2">
                    <div class="card--title">
                        <span class="card--icon icon"><i class="ri-gift-line"></i></span>
                        <span>Orders</span>
                    </div>
                    <h3 class="card--value">2,567 <i class="ri-arrow-down-circle-fill down"></i></h3>
                    <h5 class="less">234 less than usual</h5>
                    <div class="chart">
                        <canvas id="orders"></canvas>
                    </div>

                </div>
               
                <div class="card card-3">
                    <div class="card--title">
                        <span class="card--icon icon"><i class="ri-handbag-line"></i></span>
                        <span>Products</span>
                    </div>
                    <h3 class="card--value" id="ItemCount"><i class="ri-arrow-up-circle-fill up"></i></h3>
                    <h5 class="more">Products are available in the store</h5>
                    <div class="chart">
                        <canvas id="products"></canvas>
                    </div>
                </div>
                <div class="card card-4">
                    <div class="card--title">
                        <span class="card--icon icon"><i class="ri-shopping-bag-2-line"></i></span>
                        <span>Stock</span>
                    </div>
                    <h3 class="card--value" id="stockQtotal"><i class="ri-arrow-down-circle-fill down"></i></h3>
                    <h5 class="less">Items are available on stock</h5>
                    <div class="chart">
                        <canvas id="customers"></canvas>
                    </div>
                </div>
            </div>
            <div class="target-vs-sales--container">
                <div class="section--title">
                    <h3 class="title">Stock difference</h3>
                    <div class="sales--value">
                        <div class="target">
                            <i class="ri-checkbox-blank-circle-fill circle"></i>
                            Target <span>&nbsp; sales</span>
                        </div>
                        <div class="current">
                            <i class="ri-checkbox-blank-circle-fill circle"></i>
                            Current <span>&nbsp; sales</span>
                        </div>
                    </div>
                </div>
                <div class="target--vs--sales">
                    <canvas id="tarsale"></canvas>
                </div>
            </div>
            
            
            
            
              <div class="container-xxl flex-grow-1 container-p-y">
              <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Store Management / </span> 
              
                <small> Charts </small>
              
              
               </h4>
               
             

              <!-- Basic Bootstrap Table -->
              <div class="card">
                <h5 class="card-header"><small id="ItemCount">Store Item list</small></h5>
                <div class="table-responsive text-nowrap">
                
                  <table class="table">
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Brand</th>
                        <th>quantity</th>

                      </tr>
                    </thead>
                    <tbody id="stock">
  
                    </tbody>
                    
                  </table>
                </div>
              </div>
              <!--/ Basic Bootstrap Table -->

              <hr class="my-5" />

            </div> 
            
            
            
            
            
            
               
        </div>
    </section>

         
            
            
            <!-- / Content -->

            <!-- Footer -->
            <footer class="content-footer footer bg-footer-theme">
              <div class="container-xxl d-flex flex-wrap justify-content-between py-2 flex-md-row flex-column">
                <div class="mb-2 mb-md-0">
                  Â©
                  <script>
                    document.write(new Date().getFullYear());
                  </script>
                  , 
                  <a href="https://themeselection.com" target="_blank" class="footer-link fw-bolder">Lanka Hardware</a>
                </div>
                <div>
                  <a href="https://themeselection.com/license/" class="footer-link me-4" target="_blank">License</a>
                  <a href="https://themeselection.com/" target="_blank" class="footer-link me-4">More Themes</a>

                  <a
                    href="https://themeselection.com/demo/sneat-bootstrap-html-admin-template/documentation/"
                    target="_blank"
                    class="footer-link me-4"
                    >Documentation</a
                  >

                  <a
                    href="https://github.com/themeselection/sneat-html-admin-template-free/issues"
                    target="_blank"
                    class="footer-link me-4"
                    >Support</a
                  >
                </div>
              </div>
            </footer>
            <!-- / Footer -->

            <div class="content-backdrop fade"></div>
          </div>
          <!-- Content wrapper -->
        </div>
        <!-- / Layout page -->
      </div>

      <!-- Overlay -->
      <div class="layout-overlay layout-menu-toggle"></div>

    <!-- / Layout wrapper -->
 
          
                 <!-- Barcode modal -->
          
      <div class="modal fade" id="BarCodeModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header" id="BarCodeModalHeader">
              
            </div>
            
            <div id="BarCodeModalTitle">
             
            </div>
            
            <div class="modal-body" id="BarCodeModalBody">
               <svg id="barcode"></svg>
                    </div>
                    <hr class="my-0" />
                    
                    <div id="BarCodeModalFooter">
             
            	</div>
              </div>
            </div>
            
          </div>
          

       <!-- view modal -->
          
      <div class="modal fade" id="ViewStockModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header" id="ViewStockModalHeader">
              
            </div>
            <div class="modal-body" id="ViewStockModalBody"> 
                    </div>
                    <hr class="my-0" />
                    
                    <div class="card-body" id="card-body-edit">
                      
                    </div>
              </div>
            </div>
            <div class="modal-footer" id="ViewStockModalFooter">
             
            </div>
          </div>
         
          
          <!-- edit modal -->
      <div class="modal fade" id="EditStockModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header" id="EditStockModalHeader">
            
              
            </div>
            <div class="modal-body" id="EditStockModalBody">
              
                    </div>
                    <hr class="my-0" />
                    
                    <div class="card-body" id="card-body-edit">
                      
                    </div>
              </div>
            </div>
            <div class="modal-footer" id="Footer">
               
            </div>
          </div>

<!-- Delete Modal -->
      <div class="modal fade" id="deleteModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header" id="deleteModalHeader">
            </div>
            <div class="modal-body" id="deleteModalBody">
            </div>
            <div class="modal-footer" style="justify-content: center;" id="deleteModalFooter">
            </div>
          </div>
        </div>
      </div>
          
    



	<script
		src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js"></script>
	<script
		src="https://cdn.jsdelivr.net/npm/jquery-validation@1.19.5/dist/jquery.validate.js"></script>
	<!-- Core JS -->
	<script
		src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js"></script>
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js"></script>
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/exceljs/4.3.0/exceljs.min.js"></script>
		
	<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.3.0/chart.min.js"></script>

	<!-- build:js assets/vendor/js/core.js -->
	<script src="https://smtpjs.com/v3/smtp.js"></script>
	<script src="../assets/vendor/libs/jquery/jquery.js"></script>
	<script src="../assets/vendor/libs/popper/popper.js"></script>
	<script src="../assets/vendor/js/bootstrap.js"></script>
	<script
		src="../assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js"></script>


	<script src="../assets/vendor/js/menu.js"></script>
	<!-- endbuild -->

	<!-- Vendors JS -->

	<!-- Call JS -->
	<script src="../js/StockCharts.js"></script>

	<!-- Page JS -->
	<script>
		$(document).ready(function() {
			callGetAllStockServlet();
		});
	</script>

	<!-- Place this tag in your head or just before your close body tag. -->
	<script async defer src="https://buttons.github.io/buttons.js"></script>
</body>
</html>
