 AOS.init({
 	duration: 800,
 	easing: 'slide'
 });

(function($) {

	"use strict";

	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};


	$(window).stellar({
    responsive: true,
    parallaxBackgrounds: true,
    parallaxElements: true,
    horizontalScrolling: false,
    hideDistantElements: false,
    scrollProperty: 'scroll'
  });


	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	// loader
	var loader = function() {
		setTimeout(function() { 
			if($('#ftco-loader').length > 0) {
				$('#ftco-loader').removeClass('show');
			}
		}, 1);
	};
	loader();

	// Scrollax
   $.Scrollax();

	var carousel = function() {
		$('.home-slider').owlCarousel({
	    loop:true,
	    autoplay: true,
	    margin:0,
	    animateOut: 'fadeOut',
	    animateIn: 'fadeIn',
	    nav:false,
	    autoplayHoverPause: false,
	    items: 1,
	    navText : ["<span class='ion-md-arrow-back'></span>","<span class='ion-chevron-right'></span>"],
	    responsive:{
	      0:{
	        items:1
	      },
	      600:{
	        items:1
	      },
	      1000:{
	        items:1
	      }
	    }
		});
	
		$('.carousel-testimony').owlCarousel({
			center: true,
			loop: true,
			items:1,
			margin: 30,
			stagePadding: 0,
			nav: false,
			navText: ['<span class="ion-ios-arrow-back">', '<span class="ion-ios-arrow-forward">'],
			responsive:{
				0:{
					items: 1
				},
				600:{
					items: 1
				},
				1000:{
					items: 1
				}
			}
		});

	};
	carousel();

	$('nav .dropdown').hover(function(){
		var $this = $(this);
		// 	 timer;
		// clearTimeout(timer);
		$this.addClass('show');
		$this.find('> a').attr('aria-expanded', true);
		// $this.find('.dropdown-menu').addClass('animated-fast fadeInUp show');
		$this.find('.dropdown-menu').addClass('show');
	}, function(){
		var $this = $(this);
			// timer;
		// timer = setTimeout(function(){
			$this.removeClass('show');
			$this.find('> a').attr('aria-expanded', false);
			// $this.find('.dropdown-menu').removeClass('animated-fast fadeInUp show');
			$this.find('.dropdown-menu').removeClass('show');
		// }, 100);
	});


	$('#dropdown04').on('show.bs.dropdown', function () {
	  console.log('show');
	});

	// scroll
	var scrollWindow = function() {
		$(window).scroll(function(){
			var $w = $(this),
					st = $w.scrollTop(),
					navbar = $('.ftco_navbar'),
					sd = $('.js-scroll-wrap');

			if (st > 150) {
				if ( !navbar.hasClass('scrolled') ) {
					navbar.addClass('scrolled');	
				}
			} 
			if (st < 150) {
				if ( navbar.hasClass('scrolled') ) {
					navbar.removeClass('scrolled sleep');
				}
			} 
			if ( st > 350 ) {
				if ( !navbar.hasClass('awake') ) {
					navbar.addClass('awake');	
				}
				
				if(sd.length > 0) {
					sd.addClass('sleep');
				}
			}
			if ( st < 350 ) {
				if ( navbar.hasClass('awake') ) {
					navbar.removeClass('awake');
					navbar.addClass('sleep');
				}
				if(sd.length > 0) {
					sd.removeClass('sleep');
				}
			}
		});
	};
	scrollWindow();

	
	var counter = function() {
		
		$('#section-counter').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {

				var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
				$('.number').each(function(){
					var $this = $(this),
						num = $this.data('number');
						console.log(num);
					$this.animateNumber(
					  {
					    number: num,
					    numberStep: comma_separator_number_step
					  }, 7000
					);
				});
				
			}

		} , { offset: '95%' } );

	}
	counter();

	var contentWayPoint = function() {
		var i = 0;
		$('.ftco-animate').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .ftco-animate.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn ftco-animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft ftco-animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight ftco-animated');
							} else {
								el.addClass('fadeInUp ftco-animated');
							}
							el.removeClass('item-animate');
						},  k * 50, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '95%' } );
	};
	contentWayPoint();


	// navigation
	var OnePageNav = function() {
		$(".smoothscroll[href^='#'], #ftco-nav ul li a[href^='#']").on('click', function(e) {
		 	e.preventDefault();

		 	var hash = this.hash,
		 			navToggler = $('.navbar-toggler');
		 	$('html, body').animate({
		    scrollTop: $(hash).offset().top
		  }, 700, 'easeInOutExpo', function(){
		    window.location.hash = hash;
		  });


		  if ( navToggler.is(':visible') ) {
		  	navToggler.click();
		  }
		});
		$('body').on('activate.bs.scrollspy', function () {
		  console.log('nice');
		})
	};
	OnePageNav();


	// magnific popup
	$('.image-popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
     gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      verticalFit: true
    },
    zoom: {
      enabled: true,
      duration: 300 // don't foget to change the duration also in CSS
    }
  });

  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,

    fixedContentPos: false
  });



	var goHere = function() {

		$('.mouse-icon').on('click', function(event){
			
			event.preventDefault();

			$('html,body').animate({
				scrollTop: $('.goto-here').offset().top
			}, 500, 'easeInOutExpo');
			
			return false;
		});
	};
	goHere();

	function makeTimer() {

		var endTime = new Date("21 December 2019 9:56:00 GMT+01:00");			
		endTime = (Date.parse(endTime) / 1000);

		var now = new Date();
		now = (Date.parse(now) / 1000);

		var timeLeft = endTime - now;

		var days = Math.floor(timeLeft / 86400); 
		var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
		var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600 )) / 60);
		var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));

		if (hours < "10") { hours = "0" + hours; }
		if (minutes < "10") { minutes = "0" + minutes; }
		if (seconds < "10") { seconds = "0" + seconds; }

		$("#days").html(days + "<span>Days</span>");
		$("#hours").html(hours + "<span>Hours</span>");
		$("#minutes").html(minutes + "<span>Minutes</span>");
		$("#seconds").html(seconds + "<span>Seconds</span>");		

}

setInterval(function() { makeTimer(); }, 1000);




})(jQuery);

//Important elements
var miniCart_itemList = document.getElementById('miniCart_itemList')
var mainCart_itemList = document.getElementById('mainCart_itemList')
var newArrival_itemList = document.getElementById('newArrival_itemList')
var wishlist_itemList = document.getElementById('wishlist_itemList')
var cartQuantity = document.getElementById('cartQuantity')
var added_msg = document.getElementById('added_msg')
var cartTotals = document.getElementById('cartTotals')
var productDetails = document.getElementById('productDetails')
var ProductSearchResult = document.getElementById('result')
var mainSearchClose = document.getElementById('mainSearchClose')

//Mini cart
const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('mini-cart-overlay')

openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
	callCartServlet()
    const modal = document.querySelector(button.dataset.modalTarget)
    openModal(modal)
  })
})

overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.mini-cart.active')
  modals.forEach(modal => {
    closeModal(modal)
  })
})

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.mini-cart')
    closeModal(modal)
  })
})

function openModal(modal) {
  if (modal == null) return
  modal.classList.add('active')
  overlay.classList.add('active')
}

function closeModal(modal) {
  if (modal == null) return
  modal.classList.remove('active')
  overlay.classList.remove('active')
  
  setTimeout(function() {
    miniCart_itemList.innerHTML="";
  }, 300);
}

//Call wishlist servlet
var wishlistItems = []

function callWishlistServlet(){
	$.get("http://localhost:8080/LankaHardware/GetWishlistServlet", function(response) {
				
		wishlistItems = response
						
		buildWishlist(wishlistItems)
	})
}

function buildWishlist(wishlistItems){
	for(var i = 0; i < wishlistItems.length; i++){
		var item = `<div class="col-sm-12 col-md-6 col-lg-3 ftco-animate d-flex fadeInUp ftco-animated">
    				<div class="product d-flex flex-column">
    					<a href="#" class="img-prod"><img class="img-fluid" src="images/product-1.png" alt="Colorlib Template">
    						<div class="overlay"></div>
    					</a>
    					<div class="text py-3 pb-4 px-3">
    						<div class="d-flex">
    							<div class="cat">
		    						<span>${wishlistItems[i].quantity}</span>
		    					</div>
		    					<div class="rating">
	    							<p class="text-right mb-0">
	    								<a href="#"><span class="ion-ios-star-outline"></span></a>
	    								<a href="#"><span class="ion-ios-star-outline"></span></a>
	    								<a href="#"><span class="ion-ios-star-outline"></span></a>
	    								<a href="#"><span class="ion-ios-star-outline"></span></a>
	    								<a href="#"><span class="ion-ios-star-outline"></span></a>
	    							</p>
	    						</div>
	    					</div>
    						<h3><a href="#">${wishlistItems[i].itemID}</a></h3>
    						<div class="pricing">
	    						<p class="price"><span>$120.00</span></p>
	    					</div>
	    					<p class="bottom-area d-flex px-3">
    							<a href="#" class="add-to-cart text-center py-2 mr-1" onclick="return false;"><span onclick="callAddToCartServlet('${wishlistItems[i].itemID}', 1)">Add to cart <i class="ion-ios-add ml-1"></i></span></a>
    							<a href="#" class="buy-now text-center py-2" onclick="return false;"><span onclick="callRemoveFromWishlistServlet('${wishlistItems[i].itemID}')">Remove<i class="fa-solid fa-eye-slash ml-1" style="line-height: 1.8;"></i></span></a>
    						</p>
    					</div>
    				</div>
    			</div>`
    			
    	wishlist_itemList.innerHTML += item
	}
}

//Add to wishlist
function callAddToWishlistServlet(itemID){
	$.post("http://localhost:8080/LankaHardware/AddToWishlistServlet", {itemID : itemID}, function(response){
	    
	    added_msg.innerHTML = response
	    added_msg.classList.add('active')
	    setTimeout(function() {
	    	added_msg.classList.remove('active')
	  	}, 2000);
	})
}

//Remove from wishlist
function callRemoveFromWishlistServlet(itemID){
	$.post("http://localhost:8080/LankaHardware/RemoveFromWishlistServlet", {itemID : itemID}, function(response){
	   
	   wishlist_itemList.innerHTML = ""
	   callWishlistServlet()
	   
	   added_msg.innerHTML = response
	   added_msg.classList.add('active')
	   setTimeout(function() {
	   	added_msg.classList.remove('active')
	   }, 2000);
	})
}

//call index servlet
var newArrivals = []

function callIndexServlet(){
	$.get("http://localhost:8080/LankaHardware/GetIndexServlet", function(response) {
				
		newArrivals = response
						
		buildNewArrivalslist(newArrivals)
	})
}

function buildNewArrivalslist(newArrivals){
	for(var i = 0; i < newArrivals.length; i++){	
		var item = `<div class="col-sm-12 col-md-6 col-lg-3 ftco-animate d-flex fadeInUp ftco-animated">
    				<div class="product d-flex flex-column">
    					<a href="#" class="img-prod" onclick="return false;"><img class="img-fluid" src="images/product-1.png" alt="Colorlib Template" onclick="toProductSinglePage('${newArrivals[i].itemID}');">
    						<div class="overlay"></div>
    					</a>
    					<div class="text py-3 pb-4 px-3">
    						<div class="d-flex">
    							<div class="cat">
		    						<span>${newArrivals[i].quantity}</span>
		    					</div>
		    					<div class="rating">
	    							<p class="text-right mb-0">
	    								<a href="#"><span class="ion-ios-star-outline"></span></a>
	    								<a href="#"><span class="ion-ios-star-outline"></span></a>
	    								<a href="#"><span class="ion-ios-star-outline"></span></a>
	    								<a href="#"><span class="ion-ios-star-outline"></span></a>
	    								<a href="#"><span class="ion-ios-star-outline"></span></a>
	    							</p>
	    						</div>
	    					</div>
    						<h3><a href="javascript:toProductSinglePage('${newArrivals[i].itemID}');">${newArrivals[i].itemID}</a></h3>
    						<div class="pricing">
	    						<p class="price"><span>$120.00</span></p>
	    					</div>
	    					<p class="bottom-area d-flex px-3">
    							<a href="#" class="add-to-cart text-center py-2 mr-1" onclick="callAddToCartServlet('${newArrivals[i].itemID}', 1, 'notSpecified'); return false;"><span> Add to cart <i class="ion-ios-add ml-1"></i></span></a>
    							<a href="#" class="buy-now text-center py-2" onclick="callAddToWishlistServlet('${newArrivals[i].itemID}'); return false;"><span> Wishlist <i class="fa-solid fa-eye" style="line-height: 1.8;"></i></span></a>
    						</p>
    					</div>
    				</div>
    			</div>`
    			
    	newArrival_itemList.innerHTML += item
	}
}

//call cart servlet
var cartItems = []
var firstTime = true
var itemRemoved = false
var quantityChanged = false

function callCartServlet(){
	$.get("http://localhost:8080/LankaHardware/GetCartServlet", function(response) {
		
		cartItems = response[0]
		getCartQuantity()

		var Total = response[1]
		
		if(firstTime == false) buildMiniCart(cartItems)
		if(itemRemoved == true && quantityChanged == false) buildMainCart(cartItems, Total)
		if(quantityChanged == true)	cartTotal(Total)
		
		firstTime = false
	})
}

function buildMiniCart(cartItems){
	for(var i = 0; i < cartItems.length; i++){
		var item = `<tr class="text-center" style="display: flex; align-items: center; border: 1px solid transparent !important; border-bottom: 1px solid rgba(0, 0, 0, 0.05) !important;">
						<td class="image-prod" style="border: none; padding: 0px;">
							<div class="img"
								style="background-image:url(images/product-3.jpg); margin: 0px;">
							</div>
						</td>
						<td class="product-name" style="width: auto; border: none;  padding: 0px;">
							<h3>${cartItems[i].itemID}</h3>
							<p>Far far away, behind the word mountains, far from the countries</p>
							<p class="d-flex" style="justify-content: end; padding-right: 5px;">
								<span>&times;${cartItems[i].quantity}</span>
							</p>
						</td>
					</tr>
					<!-- END TR-->`
    			
    	miniCart_itemList.innerHTML += item
	}
}

function getCartQuantity(){
	
	var qtyTotal = 0
	for(var i = 0; i < cartItems.length; i++){
		qtyTotal += cartItems[i].quantity
	}
	
	var no_of_Items = `[${qtyTotal}]`
	
	cartQuantity.innerHTML = no_of_Items
}

function buildMainCart(cartItems, Total){
	cartTotal(Total)
	for(var i = 0; i < cartItems.length; i++){
		var item = `<tr class="text-center">
						<td class="image-prod">
							<div class="img" style="background-image:url(images/product-3.jpg);"></div>
						</td>

						<td class="product-name">
							<h3>${cartItems[i].itemID}</h3>
							<p>Far far away, behind the word mountains, far from the countries</p>
							<span style="color: grey; font-size: small;">Size ${cartItems[i].size}</span>
						</td>

						<td class="price">$${cartItems[i].price}</td>

						<td>
						    <div class="quantity buttons_added">
								<input type="button" value="-" class="minus"><input type="number" step="1" min="1" max="" name="quantity" value="${cartItems[i].quantity}" title="Qty" class="input-text qty text" size="4" pattern="" inputmode="" onchange="callChangeQuantityServlet('${cartItems[i].itemID}', this, ${cartItems[i].price}, '${cartItems[i].size}')"><input type="button" value="+" class="plus">
							</div>
					    </td>

						<td class="total" id="${cartItems[i].itemID + cartItems[i].size}">$${cartItems[i].price * cartItems[i].quantity}</td>

						<td class="product-remove"><a href="#" onclick="callRemoveFromCartServlet('${cartItems[i].itemID}', 'one', '${cartItems[i].size}'); return false;"><span class="ion-ios-close"></span></a></td>
					</tr><!-- END TR-->`
    			
    	mainCart_itemList.innerHTML += item
	}
}

//Cart totals
function cartTotal(Total){
	cartTotals.innerHTML = '$' + Total
	quantityChanged = false
}

//Add to cart
function callAddToCartServlet(itemID, quantity, size){
	if(quantity != 1){
		var productSingleQuantity = document.getElementById('productSingleQuantity').value
		quantity = productSingleQuantity
	}
	
	$.post("http://localhost:8080/LankaHardware/AddToCartServlet", {itemID : itemID, quantity : quantity, size : size}, function(response){
	    
	    firstTime = true
	    callCartServlet()
	    
	    added_msg.innerHTML = response
	    added_msg.classList.add('active')
	    setTimeout(function() {
	    	added_msg.classList.remove('active')
	  	}, 2000);
	})
}

//Clear cart
function callRemoveFromCartServlet(itemID, operation, size){
	$.post("http://localhost:8080/LankaHardware/RemoveFromCartServlet", {itemID : itemID, operation : operation, size : size}, function(response){
	   
	   firstTime = true
	   itemRemoved = true
	   mainCart_itemList.innerHTML="";
	   callCartServlet()
	   
	   added_msg.innerHTML = response
	   added_msg.classList.add('active')
	   setTimeout(function() {
	   	added_msg.classList.remove('active')
	   }, 2000);
	})
}

//call change quantity servlet
function callChangeQuantityServlet(itemID, element, price, size){
	var quantity = element.value
	
	$.post("http://localhost:8080/LankaHardware/ChangeQuantityServlet", {itemID : itemID, quantity : quantity, size : size}, function(response) {
		
	   firstTime = true
	   quantityChanged = true
	   callCartServlet()
	   calculateSubtotal(quantity, price, itemID, size)
	})
}

//calculate item total
function calculateSubtotal(quantity, price, itemID, size){
	var itemTotal = document.getElementById(itemID + size)
	itemTotal.innerHTML = `$${price * quantity}`
}

//Redirect to product-single page
function toProductSinglePage(itemID){
	window.location = 'http://localhost:8080/LankaHardware/product-single.jsp?product=' + itemID
}

//call GetProductSingleServlet
var product = []
var productSizeAndPriceList = []

function callGetProductSingleServlet(itemID){
	$.get("http://localhost:8080/LankaHardware/GetProductSingleServlet", {itemID : itemID}, function(response) {
		
		product = response[0]
		productSizeAndPriceList = response[1]
		buildProductSingle(product)
		buildProductSizesAndPrice()
	})
}

function buildProductSingle(product){
	var details = `<div class="col-lg-5 mt-5">
                    <div class="card mb-3">
                        <img class="card-img img-fluid" src="images/product-1.png" alt="Card image cap" id="product-detail">
                    </div>
                    <div class="row">
                        <!--Start Controls-->
                        <div class="col-1 align-self-center">
                            <a href="#multi-item-example" role="button" data-bs-slide="prev">
                                <i class="text-dark fas fa-chevron-left"></i>
                                <span class="sr-only">Previous</span>
                            </a>
                        </div>
                        <!--End Controls-->
                        <!--Start Carousel Wrapper-->
                        <div id="multi-item-example" class="col-10 carousel slide carousel-multi-item" data-bs-ride="carousel">
                            <!--Start Slides-->
                            <div class="carousel-inner product-links-wap" role="listbox">

                                <!--First slide-->
                                <div class="carousel-item">
                                    <div class="row">
                                        <div class="col-4">
                                            <a href="#">
                                                <img class="card-img img-fluid" src="images/product-1.png" alt="Product Image 1">
                                            </a>
                                        </div>
                                        <div class="col-4">
                                            <a href="#">
                                                <img class="card-img img-fluid" src="images/product-1.png" alt="Product Image 2">
                                            </a>
                                        </div>
                                        <div class="col-4">
                                            <a href="#">
                                                <img class="card-img img-fluid" src="images/product-1.png" alt="Product Image 3">
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <!--/.First slide-->

                                <!--Second slide-->
                                <div class="carousel-item active">
                                    <div class="row">
                                        <div class="col-4">
                                            <a href="#">
                                                <img class="card-img img-fluid" src="images/product-1.png" alt="Product Image 4">
                                            </a>
                                        </div>
                                        <div class="col-4">
                                            <a href="#">
                                                <img class="card-img img-fluid" src="images/product-1.png" alt="Product Image 5">
                                            </a>
                                        </div>
                                        <div class="col-4">
                                            <a href="#">
                                                <img class="card-img img-fluid" src="images/product-1.png" alt="Product Image 6">
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <!--/.Second slide-->

                                <!--Third slide-->
                                <div class="carousel-item">
                                    <div class="row">
                                        <div class="col-4">
                                            <a href="#">
                                                <img class="card-img img-fluid" src="images/product-1.png" alt="Product Image 7">
                                            </a>
                                        </div>
                                        <div class="col-4">
                                            <a href="#">
                                                <img class="card-img img-fluid" src="images/product-1.png" alt="Product Image 8">
                                            </a>
                                        </div>
                                        <div class="col-4">
                                            <a href="#">
                                                <img class="card-img img-fluid" src="images/product-1.png" alt="Product Image 9">
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <!--/.Third slide-->
                            </div>
                            <!--End Slides-->
                        </div>
                        <!--End Carousel Wrapper-->
                        <!--Start Controls-->
                        <div class="col-1 align-self-center">
                            <a href="#multi-item-example" role="button" data-bs-slide="next">
                                <i class="text-dark fas fa-chevron-right"></i>
                                <span class="sr-only">Next</span>
                            </a>
                        </div>
                        <!--End Controls-->
                    </div>
                </div>
				<div class="col-lg-6 product-details pl-md-5 ftco-animate fadeInUp ftco-animated">
					<h3>${product.itemID}</h3>
					<div class="rating d-flex">
						<p class="text-left mr-4">
							<a href="#" class="mr-2">5.0</a>
							<a href="#"><span class="ion-ios-star-outline"></span></a>
							<a href="#"><span class="ion-ios-star-outline"></span></a>
							<a href="#"><span class="ion-ios-star-outline"></span></a>
							<a href="#"><span class="ion-ios-star-outline"></span></a>
							<a href="#"><span class="ion-ios-star-outline"></span></a>
						</p>
						<p class="text-left mr-4">
							<a href="#" class="mr-2" style="color: #000;">100 <span style="color: #bbb;"
									id="v-pills-3-tab" data-toggle="pill" href="#v-pills-3" role="tab"
									aria-controls="v-pills-3" aria-selected="false">Rating</span></a>
						</p>
						<p class="text-left">
							<a href="#" class="mr-2" style="color: #000;">500 <span style="color: #bbb;">Sold</span></a>
						</p>
					</div>
					<p class="price"><span id="productPrice">$${product.price}</span></p>
					<p>A small river named Duden flows by their place and supplies it with the necessary regelialia. It
						is a paradisematic country, in which roasted parts of sentences fly into your mouth.</p>
					<p>On her way she met a copy. The copy warned the Little Blind Text, that where it came from it
						would have been rewritten a thousand times and everything that was left from its origin would be
						the word "and" and the Little Blind Text should turn around and return to its own, safe country.
						But nothing the copy said could convince her and so it didn’t take long until a few insidious
						Copy Writers ambushed her, made her drunk with Longe and Parole and dragged her into their
						agency, where they abused her for their.
					</p>
					<div class="row mt-4">
						<div class="col-md-6">
							<div class="form-group d-flex">
								<div class="select-wrap">
									<div class="icon"><span class="ion-ios-arrow-down"></span></div>
									<select name="" id="ProductSizes" class="form-control" onchange="displayProductPrice()">
									</select>
								</div>
							</div>
						</div>
						<div class="w-100"></div>
						<div class="input-group col-md-6 d-flex mb-3">
							<div class="quantity buttons_added">
								<input type="button" value="-" class="minus"><input type="number" step="1" min="1" max="" name="quantity" value="1" title="Qty" class="input-text qty text" size="4" pattern="" inputmode="" id="productSingleQuantity"><input type="button" value="+" class="plus">
							</div>
						</div>
						<div class="w-100"></div>
						<div class="col-md-12">
							<p style="color: #000;">80 piece available</p>
						</div>
					</div>
					<p><a href="javascript:addToCartFromSingleProductPage('${product.itemID}', 0);" class="btn btn-black py-3 px-5 mr-2" style="width: 100%;">Add to Cart</a>
				</div>`
    			
    	productDetails.innerHTML += details
}

//Building product sizes and price
function buildProductSizesAndPrice(){
	var ProductSizes = document.getElementById('ProductSizes')
	
	for(const [size, price] of Object.entries(productSizeAndPriceList)){
		var productSize = `<option value="${size}">${size}</option>`
		
		ProductSizes.innerHTML += productSize
	}
}

//call add to cart from single product page
function addToCartFromSingleProductPage(itemID, quantity){
	var size = document.getElementById('ProductSizes').value
	callAddToCartServlet(itemID, quantity, size)
}

//display relevant product price
function displayProductPrice(){
	var productPrice = document.getElementById('productPrice')
	var productSize = document.getElementById('ProductSizes').value
	var displayPrice = productSizeAndPriceList[productSize]
	
	productPrice.innerHTML = `$${displayPrice}`
}


//call main product search servlet
var mainProductSearchResults = []

function mainSearch(){
	var itemName = document.getElementById('search-input').value	
	if(itemName == ''){
		ProductSearchResult.innerHTML = ""
		return
	} 
	
	callMainProductSearch(itemName)
}

function callMainProductSearch(itemName){
	var forNoResults = itemName
	itemName = '%' + itemName + '%'
	
	$.get("http://localhost:8080/LankaHardware/GetMainProductSearch", {itemName : itemName}, function(response) {
		
		mainProductSearchResults = response
		builtResults(mainProductSearchResults, forNoResults)
	})
}

function builtResults(mainProductSearchResults, forNoResults){
	ProductSearchResult.innerHTML = ""
	
	if(mainProductSearchResults.length == 0){
		ProductSearchResult.innerHTML = `<div style='display: flex; flex-direction: column; justify-content: center; font-size: medium; margin-top: 50px;'>
											<span style='font-size: x-large'><i class="fa-solid fa-circle-exclamation"></i> We're Sorry</span>
											<span>We didn't find any results for '${forNoResults}'</span>
										</div>`
		return
	}
	
	for(var i = 0; i < mainProductSearchResults.length; i++){
		var item = `<tr class="text-center clickable" style="display: flex; align-items: center; border: 1px solid transparent !important; border-bottom: 1px solid rgba(0, 0, 0, 0.05) !important;" onclick="toProductSinglePage('${mainProductSearchResults[i].itemID}');">
						<td class="image-prod" style="border: none; padding: 0px;">
							<div class="img"
								style="background-image:url(images/product-3.jpg); margin: 0px;">
							</div>
						</td>
						<td class="product-name" style="width: auto; border: none;  padding: 0px;">
							<h3>${mainProductSearchResults[i].itemID}</h3>
							<p>Far far away, behind the word mountains, far from the countries</p>
						</td>
					</tr><!-- END TR-->`
    			
    	ProductSearchResult.innerHTML += item
	}
}

mainSearchClose.addEventListener('click', () => {
  ProductSearchResult.innerHTML = ""
})