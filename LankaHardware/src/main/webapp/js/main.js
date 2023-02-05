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
var cartSubTotal = document.getElementById('cartSubTotal')
var productDetails = document.getElementById('productDetails')
var ProductSearchResult = document.getElementById('result')
var mainSearchClose = document.getElementById('mainSearchClose')
var shopItemList = document.getElementById('shopItemList')
var shopMainCategoryList = document.getElementById('accordion')
var priceMax = document.getElementById('priceMax')
var priceMin = document.getElementById('priceMin')
var priceRangeMin = document.getElementById('priceRangeMin')
var priceRangeMax = document.getElementById('priceRangeMax')
var priceRangeProgress = document.getElementById('priceRangeProgress')
var reviewContainer = document.getElementById('reviewContainer')
var currentFilters = document.getElementById('currentFilters')
var sortBy = document.getElementById('people')
var relatedProductList = document.getElementById('relatedProductList')
var ratingSubmitBtn = document.getElementById('ratingSubmitBtn')

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
var wishlistItemRemoved = false

function callWishlistServlet(){
	$.get("http://localhost:8080/LankaHardware/GetWishlistServlet", function(response) {
				
		wishlistItems = response
		if(wishlistItemRemoved == false) buildWishlist(wishlistItems)
	})
}

function buildWishlist(wishlistItems){
	for(var i = 0; i < wishlistItems.length; i++){
		var starID = wishlistItems[i].itemID + 'wishlistStar'
		
		var item = `<div class="col-sm-12 col-md-6 col-lg-3 ftco-animate d-flex fadeInUp ftco-animated" id="${wishlistItems[i].itemID}ProductCard">
    				<div class="product d-flex flex-column">
    					<a href="#" class="img-prod"><img class="img-fluid" src="${wishlistItems[i].mainImg}" alt="Colorlib Template">
    						<div class="overlay"></div>
    					</a>
    					<div class="text py-3 pb-4 px-3">
    						<div class="d-flex">
    							<div class="cat">
		    						<span>${wishlistItems[i].brand}</span>
		    					</div>
		    					<div class="rating">
	    							<p class="text-right mb-0">
	    								<a href="#"><span class="ion-ios-star-outline" id="${starID}1"></span></a>
	    								<a href="#"><span class="ion-ios-star-outline" id="${starID}2"></span></a>
	    								<a href="#"><span class="ion-ios-star-outline" id="${starID}3"></span></a>
	    								<a href="#"><span class="ion-ios-star-outline" id="${starID}4"></span></a>
	    								<a href="#"><span class="ion-ios-star-outline" id="${starID}5"></span></a>
	    							</p>
	    						</div>
	    					</div>
    						<h3><a href="#">${wishlistItems[i].name}</a></h3>
    						<div class="pricing">
	    						<p class="price"><span>${wishlistItems[i].price}</span></p>
	    					</div>
	    					<p class="bottom-area d-flex px-3">
    							<a href="#" class="add-to-cart text-center py-2 mr-1" onclick="callAddToCartServlet('${wishlistItems[i].itemID}', 1, 'notSpecified'); return false;"><span>Add to cart <i class="ion-ios-add ml-1"></i></span></a>
    							<a href="#" class="buy-now text-center py-2" onclick="callRemoveFromWishlistServlet('${wishlistItems[i].itemID}'); return false;"><span>Remove<i class="fa-solid fa-eye-slash ml-1" style="line-height: 1.8;"></i></span></a>
    						</p>
    					</div>
    				</div>
    			</div>`
    			
    	wishlist_itemList.innerHTML += item
    	buildAverageRating(wishlistItems[i], starID)
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
	   
	   //wishlist_itemList.innerHTML = ""
	   wishlistItemRemoved = true
	   callWishlistServlet()
	   deleteWishlistItemElement(itemID)
	   
	   added_msg.innerHTML = response
	   added_msg.classList.add('active')
	   setTimeout(function() {
	   	added_msg.classList.remove('active')
	   }, 2000);
	})
}

//delete wishlist item element
function deleteWishlistItemElement(id){
	var productCard = document.getElementById(`${id}ProductCard`)
	
	productCard.classList.remove('d-flex')
	productCard.style = "display: none;"
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
		var starID = newArrivals[i].itemID + 'AvgStar'

		var item = `<div class="col-sm-12 col-md-6 col-lg-3 ftco-animate d-flex fadeInUp ftco-animated">
    				<div class="product d-flex flex-column">
    					<a href="#" class="img-prod" onclick="return false;"><img class="img-fluid" src="${newArrivals[i].mainImg}" alt="Colorlib Template" onclick="toProductSinglePage('${newArrivals[i].itemID}');">
    						<div class="overlay"></div>
    					</a>
    					<div class="text py-3 pb-4 px-3">
    						<div class="d-flex">
    							<div class="cat">
		    						<span>${newArrivals[i].brand}</span>
		    					</div>
		    					<div class="rating">
	    							<p class="text-right mb-0">
	    								<a href="#"><span class="ion-ios-star-outline" id="${starID}1"></span></a>
	    								<a href="#"><span class="ion-ios-star-outline" id="${starID}2"></span></a>
	    								<a href="#"><span class="ion-ios-star-outline" id="${starID}3"></span></a>
	    								<a href="#"><span class="ion-ios-star-outline" id="${starID}4"></span></a>
	    								<a href="#"><span class="ion-ios-star-outline" id="${starID}5"></span></a>
	    							</p>
	    						</div>
	    					</div>
    						<h3><a href="#" onclick="toProductSinglePage('${newArrivals[i].itemID}'); return false;">${newArrivals[i].name}</a></h3>
    						<div class="pricing">
	    						<p class="price"><span>Rs${newArrivals[i].price}</span></p>
	    					</div>
	    					<p class="bottom-area d-flex px-3">
    							<a href="#" class="add-to-cart text-center py-2 mr-1" onclick="callAddToCartServlet('${newArrivals[i].itemID}', 1, 'notSpecified'); return false;"><span> Add to cart <i class="ion-ios-add ml-1"></i></span></a>
    							<a href="#" class="buy-now text-center py-2" onclick="callAddToWishlistServlet('${newArrivals[i].itemID}'); return false;"><span> Wishlist <i class="fa-solid fa-eye" style="line-height: 1.8;"></i></span></a>
    						</p>
    					</div>
    				</div>
    			</div>`
    			
    	newArrival_itemList.innerHTML += item
    	buildAverageRating(newArrivals[i], starID)
	}
}

//build average rating
function buildAverageRating(item, starID){
	if(item.avgRating == 5){
		for(var i = 1; i < 6; i++){
			var id = `${starID}${i}`
			var star = document.getElementById(id)
			
			star.classList.remove('ion-ios-star-outline')
			star.classList.add('ion-ios-star')
		}
		
	} else if(item.avgRating > 4){
		for(var i = 1; i < 5; i++){
			var id = `${starID}${i}`
			var star = document.getElementById(id)
			
			star.classList.remove('ion-ios-star-outline')
			star.classList.add('ion-ios-star')

		}
		var id = `${starID}${i}`
		var star = document.getElementById(id)
		star.classList.remove('ion-ios-star-outline')
		star.classList.add('ion-ios-star-half')
		
	} else if(item.avgRating == 4){
		for(var i = 1; i < 5; i++){
			var id = `${starID}${i}`
			var star = document.getElementById(id)
			
			star.classList.remove('ion-ios-star-outline')
			star.classList.add('ion-ios-star')
		}
		
	} else if(item.avgRating > 3){
		for(var i = 1; i < 4; i++){
			var id = `${starID}${i}`
			var star = document.getElementById(id)
			
			star.classList.remove('ion-ios-star-outline')
			star.classList.add('ion-ios-star')

		}
		var id = `${starID}${i}`
		var star = document.getElementById(id)
		star.classList.remove('ion-ios-star-outline')
		star.classList.add('ion-ios-star-half')
		
	} else if(item.avgRating == 3){
		for(var i = 1; i < 4; i++){
			var id = `${starID}${i}`
			var star = document.getElementById(id)
			
			star.classList.remove('ion-ios-star-outline')
			star.classList.add('ion-ios-star')
		}
		
	} else if(item.avgRating > 2){
		for(var i = 1; i < 3; i++){
			var id = `${starID}${i}`
			var star = document.getElementById(id)
			
			star.classList.remove('ion-ios-star-outline')
			star.classList.add('ion-ios-star')

		}
		var id = `${starID}${i}`
		var star = document.getElementById(id)
		star.classList.remove('ion-ios-star-outline')
		star.classList.add('ion-ios-star-half')
		
	} else if(item.avgRating == 2){
		for(var i = 1; i < 3; i++){
			var id = `${starID}${i}`
			var star = document.getElementById(id)
			
			star.classList.remove('ion-ios-star-outline')
			star.classList.add('ion-ios-star')
		}
		
	} else if(item.avgRating > 1){
		for(var i = 1; i < 2; i++){
			var id = `${starID}${i}`
			var star = document.getElementById(id)
			
			star.classList.remove('ion-ios-star-outline')
			star.classList.add('ion-ios-star')

		}
		var id = `${starID}${i}`
		var star = document.getElementById(id)
		star.classList.remove('ion-ios-star-outline')
		star.classList.add('ion-ios-star-half')
		
		
	} else if(item.avgRating == 1){
			var id = `${starID}${1}`
			var star = document.getElementById(id)
			
			star.classList.remove('ion-ios-star-outline')
			star.classList.add('ion-ios-star')
		
	} else if(item.avgRating > 0){
		var id = `${starID}1`
		var star = document.getElementById(id)
		star.classList.remove('ion-ios-star-outline')
		star.classList.add('ion-ios-star-half')

	}

}

//call cart servlet
var cartItems = []
var itemRemoved = false
var quantityChanged = false

function callCartServlet(){
	$.get("http://localhost:8080/LankaHardware/GetCartServlet", function(response) {
		
		cartItems = response[0]
		getCartQuantity()
		
		var Total = response[1]

		buildMiniCart(cartItems)
		//if(itemRemoved == true) buildMainCart(cartItems, Total)
		if(quantityChanged == true || itemRemoved == true){
			calculateSubTotal(cartItems)
			cartTotal(Total)
			buildMainCart(cartItems, Total)
		}
	})
}

function buildMiniCart(cartItems){
	miniCart_itemList.innerHTML = ''
	if(cartItems.length == 0) miniCart_itemList.innerHTML = '<p style="text-align: center; font-size: large; color: gray;">Your cart is empty. Add some items to the cart.</p>'
	
	for(var i = 0; i < cartItems.length; i++){
		var item = `<tr class="text-center" style="display: flex; align-items: center; border: 1px solid transparent !important; border-bottom: 1px solid rgba(0, 0, 0, 0.05) !important;">
						<td class="image-prod clickable" style="border: none; padding: 0px;" onclick="toProductSinglePage('${cartItems[i].itemID}');">
							<div class="img"
								style="background-image:url(${cartItems[i].mainImg}); margin: 0px;">
							</div>
						</td>
						<td class="product-name clickable" style="width: auto; border: none;  padding: 0px;" onclick="toProductSinglePage('${cartItems[i].itemID}');">
							<h3>${cartItems[i].name}</h3>
							<p>${cartItems[i].description}</p>
							<p class="d-flex" style="justify-content: space-between; padding-left: 5px; font-size: small;">
								<span>Size ${cartItems[i].size}</span>
								<span>Qty ${cartItems[i].quantity}</span>
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
	mainCart_itemList.innerHTML = ''
	
	if(cartItems.length == 0) {
		mainCart_itemList.innerHTML = `<p style="position: absolute; right: 0; left: 0; font-size: large; color: gray; margin-top: 20px;">Your cart is empty. Add some items to the cart.</p>`
		var cartSummery = document.getElementById('cartSummery')
		cartSummery.style = "transform: scale(0);"
		
		return
	}
	
	calculateSubTotal(cartItems)
	cartTotal(Total)
	for(var i = 0; i < cartItems.length; i++){
		var item = `<tr class="text-center" id="${cartItems[i].itemID}TableRow">
						<td class="image-prod clickable" onclick="toProductSinglePage('${cartItems[i].itemID}');">
							<div class="img" style="background-image:url(${cartItems[i].mainImg});"></div>
						</td>

						<td class="product-name clickable" onclick="toProductSinglePage('${cartItems[i].itemID}');">
							<h3>${cartItems[i].name}</h3>
							<p>${cartItems[i].description}</p>
							<span style="color: grey; font-size: small;">Size ${cartItems[i].size}</span>
						</td>

						<td class="price">Rs${cartItems[i].price}</td>

						<td>
						    <div class="quantity buttons_added">
								<input type="button" value="-" class="minus"><input type="number" step="1" min="1" max="" name="quantity" value="${cartItems[i].quantity}" title="Qty" class="input-text qty text" size="4" pattern="" inputmode="" onchange="callChangeQuantityServlet('${cartItems[i].itemID}', this, ${cartItems[i].price}, '${cartItems[i].size}')"><input type="button" value="+" class="plus">
							</div>
					    </td>

						<td class="total" id="${cartItems[i].itemID + cartItems[i].size}">Rs${cartItems[i].price * cartItems[i].quantity}</td>

						<td class="product-remove"><a href="#" onclick="callRemoveFromCartServlet('${cartItems[i].itemID}', 'one', '${cartItems[i].size}'); deleteTableRow('${cartItems[i].itemID}'); return false;"><span class="ion-ios-close"></span></a></td>
					</tr><!-- END TR-->`
    			
    	mainCart_itemList.innerHTML += item
	}
}

//Cart total
function cartTotal(Total){
	cartTotals.innerHTML = 'Rs' + Total
}

//Add to cart
function callAddToCartServlet(itemID, quantity, size){
	if(quantity != 1){
		var productSingleQuantity = document.getElementById('productSingleQuantity').value
		quantity = productSingleQuantity
	}
	
	$.post("http://localhost:8080/LankaHardware/AddToCartServlet", {itemID : itemID, quantity : quantity, size : size}, function(response){
	    
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
	   
	   itemRemoved = true
	   quantityChanged = true
	   //mainCart_itemList.innerHTML="";
	   callCartServlet()
	   
	   added_msg.innerHTML = response
	   added_msg.classList.add('active')
	   setTimeout(function() {
	   	added_msg.classList.remove('active')
	   }, 2000);
	})
}

//delete table row
function deleteTableRow(id){
	var row = document.getElementById(`${id}TableRow`)
	
	row.style = "display: none;"
}

//call change quantity servlet
function callChangeQuantityServlet(itemID, element, price, size){
	var quantity = element.value
	
	$.post("http://localhost:8080/LankaHardware/ChangeQuantityServlet", {itemID : itemID, quantity : quantity, size : size}, function(response) {

	   quantityChanged = true
	   callCartServlet()
	   calculateItemtotal(quantity, price, itemID, size)
	})
}

//calculate item total
function calculateItemtotal(quantity, price, itemID, size){
	var itemTotal = document.getElementById(itemID + size)
	itemTotal.innerHTML = `Rs${price * quantity}`
}

//calculate cart subtotal
function calculateSubTotal(cartItems){
	var subTotal = 0
	for(var i = 0; i < cartItems.length; i++){
		subTotal += cartItems[i].price * cartItems[i].quantity
	}
	cartSubTotal.innerHTML = `Rs${subTotal}`
}

//Redirect to product-single page
function toProductSinglePage(itemID){
	window.location = 'http://localhost:8080/LankaHardware/product-single.jsp?product=' + itemID
}

//call GetProductSingleServlet
var product = []
var productSizeAndPriceList = []
var allReviews = []
var relatedProducts = []

function callGetProductSingleServlet(itemID){
	$.get("http://localhost:8080/LankaHardware/GetProductSingleServlet", {itemID : itemID}, function(response) {
		
		product = response[0]
		productSizeAndPriceList = response[1]
		allReviews = response[2]
		relatedProducts = response[3]
		
		console.log(relatedProducts)
		buildProductSingle(product)
		buildProductSizes()
		buildReviewPercentagesAndCounts(product)
		buildAllReviews(allReviews, product.ratingCount)
		buildRelatedProducts()
	})
}

function buildProductSingle(product){
	var starID = 'productStar'
	
	var details = `<div class="col-lg-5">
                    <img src="${product.mainImg}" class="img-fluid pb-1" alt="Colorlib Template" id="mainImg">

					<div class="small-img-group">
						<div class="small-img-col">
							<img src="${product.mainImg}" alt="" width="100%" class="small-img" onclick="changeMainImage(this)">
						</div>
						<div class="small-img-col">
							<img src="images/product-2.jpg" alt="" width="100%" class="small-img" onclick="changeMainImage(this)">
						</div>
						<div class="small-img-col">
							<img src="images/product-3.png" alt="" width="100%" class="small-img" onclick="changeMainImage(this)">
						</div>
						<div class="small-img-col">
							<img src="images/product-4.jpg" alt="" width="100%" class="small-img" onclick="changeMainImage(this)">
						</div>
					</div>
                    
                </div>
				<div class="col-lg-6 product-details pl-md-5 ftco-animate fadeInUp ftco-animated">
					<h3>${product.name}</h3>
					<div class="rating d-flex">
						<p class="text-left mr-4">
							<a href="#" class="mr-2">${Math.round(product.avgRating * 10) / 10}</a>
							<a href="#"><span class="ion-ios-star-outline" id="${starID}1"></span></a>
							<a href="#"><span class="ion-ios-star-outline" id="${starID}2"></span></a>
							<a href="#"><span class="ion-ios-star-outline" id="${starID}3"></span></a>
							<a href="#"><span class="ion-ios-star-outline" id="${starID}4"></span></a>
							<a href="#"><span class="ion-ios-star-outline" id="${starID}5"></span></a>
						</p>
						<p class="text-left mr-4">
							<a href="#" class="mr-2" style="color: #000;">${product.ratingCount} <span style="color: #bbb;"
									id="v-pills-3-tab" data-toggle="pill" href="#v-pills-3" role="tab"
									aria-controls="v-pills-3" aria-selected="false">Rating</span></a>
						</p>
						<p class="text-left">
							<a href="#" class="mr-2" style="color: #000;">500 <span style="color: #bbb;">Sold</span></a>
						</p>
					</div>
					<p class="price"><span id="productPrice">Rs${product.price}</span></p>
					<p>${product.description}</p>
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
					<p><a href="#" onclick="addToCartFromSingleProductPage('${product.itemID}', 0); return false;" class="btn btn-black py-3 px-5 mr-2" style="width: 100%;">Add to Cart</a>
				</div>`
    			
    	productDetails.innerHTML += details
    	buildAverageRating(product, starID)
    	mainImg = document.getElementById('mainImg')
}

//buiding product images
function changeMainImage(element){
	mainImg.src = element.src
}

//Building product sizes
function buildProductSizes(){
	var ProductSizes = document.getElementById('ProductSizes')
	
	for(const [size, price] of Object.entries(productSizeAndPriceList)){
		var productSize = `<option value="${size}">${size}</option>`
		
		ProductSizes.innerHTML += productSize
	}
	
	jQuery('select').niceSelect();
}

//Building review percentages and counts
function buildReviewPercentagesAndCounts(product){
	for(var i = 5; i >= 1; i--){
		
		var percentageElement = document.getElementById(`${numberToWord(i)}StarPercentage`)
		var countElement = document.getElementById(`${numberToWord(i)}StarCount`)
		
		percentageElement.innerHTML = `(${parseInt(product.ratingPercentageList[i - 1][0])}%)`
		countElement.innerHTML = `${parseInt(product.ratingPercentageList[i - 1][1])} Reviews`
	}
}

//Build all reviews
function buildAllReviews(allReviews, productRatingCount){
	reviewContainer.innerHTML = `<h3 class="mb-4">${productRatingCount} Reviews</h3>`
	for(var i = 0; i < allReviews.length; i++){
		var starID = `${allReviews[i].reviewID}reviewStar`
		var review = `<div class="review">
						<div class="user-img" style="background-image: url(images/person_2.jpg)"></div>
						<div class="desc">
							<h4>
								<span class="text-left">${allReviews[i].customer.email}</span>
								<span class="text-right">${allReviews[i].reviewDate}</span>
							</h4>
							<p class="star">
								<span>
									<i class="ion-ios-star-outline" id="${starID}1"></i>
									<i class="ion-ios-star-outline" id="${starID}2"></i>
									<i class="ion-ios-star-outline" id="${starID}3"></i>
									<i class="ion-ios-star-outline" id="${starID}4"></i>
									<i class="ion-ios-star-outline" id="${starID}5"></i>
								</span>
								<span class="text-right"><a href="#" class="reply"><i class="icon-reply"></i></a></span>
							</p>
							<p>${allReviews[i].reviewDescription}</p>
							<div class="reviewImgContainer" style="display: flex; flex-direction: row; flex-wrap: wrap;" id="${allReviews[i].reviewID}ImageContainer">
								
							</div>
						</div>
					</div>`
    			
    	reviewContainer.innerHTML += review
    	
    	var item = {"avgRating": allReviews[i].stars}
    	buildAverageRating(item, starID)
    	if(allReviews[i].reviewImages.length != 0) buildAllReviewImages(allReviews[i].reviewImages, allReviews[i].reviewID)
	}
}

//Build all review images
function buildAllReviewImages(images, containerID){
	var reviewImageContainer = document.getElementById(`${containerID}ImageContainer`)
	
	for(var i = 0; i < images.length; i++){
		var image = `<div class="col-lg-6 mb-5 ftco-animate fadeInUp ftco-animated" style="max-width: 30%;">
						<a href="${images[i]}" class="image-popup">
							<img src="${images[i]}" class="img-fluid" alt="Colorlib Template" style="height: 100%;">
						</a>
					</div>`
		
		
		reviewImageContainer.innerHTML += image
	}
    	
    	$('#reviewContainer').magnificPopup({

		          delegate:`.image-popup`,
		          type: 'image',
		          gallery: {
		            enabled: false
		          }

		});
}

//build related products
function buildRelatedProducts(){
	for(var i = 0; i < relatedProducts.length; i++){
		var starID = relatedProducts[i].itemID + 'RelatedProductAvgStar'
		
		var item = `<div class="item">
						<div class="col-sm-12 col-md-6 col-lg-3 ftco-animate d-flex fadeInUp ftco-animated" style="min-width: fit-content;">
							<div class="product d-flex flex-column">
								<a href="#" class="img-prod" onclick="return flase;"><img class="img-fluid" src="${relatedProducts[i].mainImg}" alt="Colorlib Template" onclick="toProductSinglePage('${relatedProducts[i].itemID}');">
									<div class="overlay"></div>
								</a>
								<div class="text py-3 pb-4 px-3">
									<div class="d-flex">
										<div class="cat">
											<span>${relatedProducts[i].brand}</span>
										</div>
										<div class="rating">
											<p class="text-right mb-0">
												<a href="#"><span class="ion-ios-star-outline" id="${starID}1"></span></a>
			    								<a href="#"><span class="ion-ios-star-outline" id="${starID}2"></span></a>
			    								<a href="#"><span class="ion-ios-star-outline" id="${starID}3"></span></a>
			    								<a href="#"><span class="ion-ios-star-outline" id="${starID}4"></span></a>
			    								<a href="#"><span class="ion-ios-star-outline" id="${starID}5"></span></a>
											</p>
										</div>
									</div>
									<h3><a href="#" onclick="toProductSinglePage('${relatedProducts[i].itemID}'); return false;">${relatedProducts[i].name}</a></h3>
									<div class="pricing">
										<p class="price"><span>${relatedProducts[i].price}</span></p>
									</div>
									<p class="bottom-area d-flex px-3">
		    							<a href="#" class="add-to-cart text-center py-2 mr-1" onclick="callAddToCartServlet('${relatedProducts[i].itemID}', 1, 'notSpecified'); return false;"><span> Add to cart <i class="ion-ios-add ml-1"></i></span></a>
		    							<a href="#" class="buy-now text-center py-2" onclick="callAddToWishlistServlet('${relatedProducts[i].itemID}'); return false;"><span> Wishlist <i class="fa-solid fa-eye" style="line-height: 1.8;"></i></span></a>
		    						</p>
								</div>
							</div>
						</div>
					</div>`
		
		
		relatedProductList.innerHTML += item
		buildAverageRating(relatedProducts[i], starID)
	}
	
	$('.owl-carousel').owlCarousel({
			loop:false,
			margin:10,
			nav:false,
			dots:false,
			autoplay:true,
			autoplayTimeout: 3000,
			responsive:{
				0:{
					items:1
				},
				600:{
					items:2
				},
				1000:{
					items:4
				}
			}
		})
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
	
	productPrice.innerHTML = `Rs${displayPrice}`
}


//call main product search servlet
var mainProductSearchResults = []
var itemNameForShop
var isFromSearch

function mainSearch(){
	var itemName = document.getElementById('search-input').value
	itemName = itemName.trim()
	itemNameForShop = itemName
	
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
								style="background-image:url(${mainProductSearchResults[i].mainImg}); margin: 0px;">
							</div>
						</td>
						<td class="product-name" style="width: auto; border: none;  padding: 0px;">
							<h3>${mainProductSearchResults[i].name}</h3>
							<p>${mainProductSearchResults[i].description}</p>
						</td>
					</tr><!-- END TR-->`
    			
    	ProductSearchResult.innerHTML += item
	}
}

mainSearchClose.addEventListener('click', () => {
  ProductSearchResult.innerHTML = ""
})

//from search to shop page
function searchToShop(){
	var itemName = document.getElementById('search-input').value
	
	if(itemName == '') return
	else window.location = 'http://localhost:8080/LankaHardware/shop.jsp?search=' + itemNameForShop
}

//customized search
function customizedSearch(itemName){
	if(itemName != undefined){
		isFromSearch = true
		itemNameForShop = itemName
		callGetShopServlet()
	}
}

//Call get shop servlet
var shopItems = []
var mainCategories = []
var highestPrice
var lowestPrice
var customizedShopItems = []
var currentMainCategory
var priceRangeChanged = false
var clickedCategory = false
var sortByValue
var sortByFilterOpen = false

function callGetShopServlet(){
	var itemName
	if(itemNameForShop != undefined){
		itemName = itemNameForShop
		itemName = `%${itemName}%`
	} else{
		itemName = `%%`
	}
	
	$.get("http://localhost:8080/LankaHardware/GetShopServlet", {itemName : itemName}, function(response) {
		
		shopItems = response[0]
		mainCategories = response[1]
		highestPrice = response[2]
		lowestPrice = response[3]
		
		buildShopItems(shopItems)
		buildShopCategories()
		buildPriceRange()
		buildCurrentFilters()
	})
}

//Build items in shop page
function buildShopItems(shopItems){
	shopItemList.innerHTML = ''
	
	if(shopItems.length == 0) shopEmpty()
	else shopItemList.style = "justify-content: inherit;"
	
	for(var i = 0; i < shopItems.length; i++){
		var starID = shopItems[i].itemID + 'shopStar'
		
		var item = `<div class="col-sm-12 col-md-12 col-lg-4 ftco-animate d-flex fadeInUp ftco-animated">
							<div class="product">
								<a href="#" class="img-prod" onclick="toProductSinglePage('${shopItems[i].itemID}'); return false;"><img class="img-fluid"
									src="${shopItems[i].mainImg}" alt="Colorlib Template">
									<div class="overlay"></div> </a>
								<div class="text py-3 pb-4 px-3">
									<div class="d-flex">
										<div class="cat">
											<span>${shopItems[i].brand}</span>
										</div>
										<div class="rating">
											<p class="text-right mb-0">
												<a href="#"><span class="ion-ios-star-outline" id="${starID}1"></span></a> <a
													href="#"><span class="ion-ios-star-outline" id="${starID}2"></span></a> <a
													href="#"><span class="ion-ios-star-outline" id="${starID}3"></span></a> <a
													href="#"><span class="ion-ios-star-outline" id="${starID}4"></span></a> <a
													href="#"><span class="ion-ios-star-outline" id="${starID}5"></span></a>
											</p>
										</div>
									</div>
									<h3>
										<a href="#" onclick="toProductSinglePage('${shopItems[i].itemID}'); return false;">${shopItems[i].name}</a>
									</h3>
									<div class="pricing">
										<p class="price">
											<span>Rs${shopItems[i].price}</span>
										</p>
									</div>
									<p class="bottom-area d-flex px-3">
										<a href="#" class="add-to-cart text-center py-2 mr-1" onclick="callAddToCartServlet('${shopItems[i].itemID}', 1, '${shopItems[i].size}'); return false;"><span>Add
												to cart <i class="ion-ios-add ml-1"></i>
										</span></a> <a href="#" class="buy-now text-center py-2" onclick="callAddToWishlistServlet('${shopItems[i].itemID}'); return false;"><span> Wishlist <i class="fa-solid fa-eye" style="line-height: 1.8;"></i></span></a>
									</p>
								</div>
							</div>
						</div>`
    			
    	shopItemList.innerHTML += item
    	buildAverageRating(shopItems[i], starID)
	}
}

//Buils main categories in the shop page
function buildShopCategories(){	
	shopMainCategoryList.innerHTML = ''
	for(var i = 0; i < mainCategories.length; i++){
		var headingID = `heading${numberToWord(i + 1)}`
		var collapseID = `collapse${numberToWord(i + 1)}`
		
		var category = `<div class="panel panel-default">
                         <div class="panel-heading" role="tab" id="${headingID}">
                             <h4 class="panel-title">
                                 <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#${collapseID}" aria-expanded="false" aria-controls="${collapseID}" onclick="setCurrentMainCategory('${mainCategories[i]}'); buildCurrentFilters();">${mainCategories[i]}
                                 </a>
                             </h4>
                         </div>
                         <div id="${collapseID}" class="panel-collapse collapse" role="tabpanel" aria-labelledby="${headingID}">
                             <div class="panel-body">
                                <ul>
                                 	<li><a href="#">Sport</a></li>
                                 	<li><a href="#">Casual</a></li>
                                 	<li><a href="#">Running</a></li>
                                 	<li><a href="#">Jordan</a></li>
                                 	<li><a href="#">Soccer</a></li>
                                 	<li><a href="#">Football</a></li>
                                 	<li><a href="#">Lifestyle</a></li>
                                </ul>
                             </div>
                         </div>
                     </div>`
    			
    	shopMainCategoryList.innerHTML += category
	}
}

//Set current main category
function setCurrentMainCategory(mainCategory){
	currentMainCategory = mainCategory
}

//Build price range
function buildPriceRange(){	
	priceMax.value = highestPrice
	priceMin.value = lowestPrice
	priceRangeMin.value = lowestPrice
	priceRangeMax.value = highestPrice

	priceRangeProgress.style = `left: ${lowestPrice / 100}%; right: ${100 - (highestPrice/100)}%`
	
	priceRangeMax.addEventListener('change', () => {
		priceRangeChanged = true
	 	buildCurrentFilters()
	})	
	
	priceRangeMin.addEventListener('change', () => {
		priceRangeChanged = true
	 	buildCurrentFilters()
	})
}

//call get customized shop servlet
function callGetCustomizedShopServlet(mainCategory){
	
	if(mainCategory == undefined) {
		buildShopCategories()
		mainCategory = `%%`
	}
	else mainCategory = `%${mainCategory}%`
	
	var itemName
	if(itemNameForShop != undefined){
		itemName = itemNameForShop
		itemName = `%${itemName}%`
	} else{
		itemName = `%%`
	}
	
	var lowerPrice = priceMin.value
	var higherPrice = priceMax.value
	
	$.get("http://localhost:8080/LankaHardware/GetCustomizedShopServlet", {mainCategory : mainCategory, lowerPrice : lowerPrice, higherPrice : higherPrice, sortByValue: sortByValue, itemName: itemName}, function(response) {
		
		customizedShopItems = response
		buildShopItems(customizedShopItems)
	})
}

//build current filters
function buildCurrentFilters(){
	sortByValue = sortBy.value
	
	currentFilters.innerHTML = ''
	
	if(currentMainCategory != null){
		currentFilters.innerHTML = `<div class="cat" style="padding: 10px; text-transform: capitalize;">
										<a href="" onclick="removeMainCategory(); return false;" class="btn btn-outline-secondary filter" style="display: flex; align-items: center; height: 33px;">${currentMainCategory}<span style="font-size: x-large; margin-left: 5px;">&times;</i></span></a>
									</div>`
	}
	
	if(itemNameForShop != null){
		currentFilters.innerHTML += `<div class="cat" style="padding: 10px; text-transform: capitalize;">
										<a href="" onclick="removeSearchedName(); return false;" class="btn btn-outline-secondary filter" style="display: flex; align-items: center; height: 33px;">"${itemNameForShop}"<span style="font-size: x-large; margin-left: 5px;">&times;</i></span></a>
									</div>`
	}
	
	if(sortByFilterOpen == true){
		currentFilters.innerHTML += `<div class="cat" style="padding: 10px; text-transform: capitalize;">
									<a href="" onclick="removeSortBy(); return false;" class="btn btn-outline-secondary filter" style="display: flex; align-items: center; height: 33px;">${sortByValue}<span style="font-size: x-large; margin-left: 5px;">&times;</i></span></a>
								</div>`
	}
	
	if(currentMainCategory != null || itemNameForShop != null || sortByFilterOpen != false){
		currentFilters.innerHTML += `<div class="cat" style="padding: 10px;">
									<button type="reset" class="btn btn-outline-secondary filterReset" onclick="resetCurrentFilters();">Reset Filters	</button>
								</div>`
	}
				
	callGetCustomizedShopServlet(currentMainCategory)
}

//remove main category
function removeMainCategory(){
	currentMainCategory = null
	buildCurrentFilters()
}

//remove searched name
function removeSearchedName(){
	itemNameForShop = null
	buildCurrentFilters()
}

//set sort by
function setSotrBy(){
	sortByFilterOpen = true
}

//remove sort by
function removeSortBy(){
	sortByFilterOpen = false
	sortBy.value = 'Price: Low To High'
	$('select').niceSelect('update');
	buildCurrentFilters()
}

//reset filters
function resetCurrentFilters(){
	currentFilters.innerHTML = ``
	currentMainCategory = null
	itemNameForShop = null
	sortByFilterOpen = false
	sortBy.value = 'Price: Low To High'
	$('select').niceSelect('update');
	callGetShopServlet()
}

//shop empty message
function shopEmpty(){
	shopItemList.style = "justify-content: center;"
	shopItemList.innerHTML = `<div style='display: flex; flex-direction: column; justify-content: center; align-items: center; font-size: medium; margin-top: 50px;'>
									<span style='font-size: x-large'><i class="fa-solid fa-circle-exclamation"></i> We're Sorry</span>
									<span>We couldn't find any items</span>
							</div>`
							
	var pagination = document.getElementById('pagination')
	pagination.style = "display: none;"
}

//call AddReviewServlet

function test(){
	console.log(ratingSubmitBtn)
}

function callAddReviewServlet(){
	var inputFile = document.getElementById('inputFile')
	var reviewDescription = document.getElementById('reviewDescription').value
	var stars = document.querySelector('input[name="rate"]:checked').value
	var endpoint = "http://localhost:8080/LankaHardware/AddReviewServlet"
	var formData = new FormData();
	
	for(const file of inputFile.files){
		formData.append('inputFile', file)
	}
	
	formData.append('reviewDescription', reviewDescription)
	formData.append('stars', stars)
	
	fetch(endpoint, {
		method: "post",
		body: formData
	}).catch(console.error)
}
		

//Get the number in words
function numberToWord(number){
	var ones = {
		0: "Zero",
		1: "One",
		2: "Two",
		3: "Three",
		4: "Four",
		5: "Five",
		6: "Six",
		7: "Seven",
		8: "Eight",
		9: "Nine"
	}
	
	for(const [n, w] of Object.entries(ones)){
		if(number == n){
			var word = w
			break
		}
	}
	
	return word
}