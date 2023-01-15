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

//Item lists
var miniCart_itemList = document.getElementById('miniCart_itemList')
var mainCart_itemList = document.getElementById('mainCart_itemList')
var newArrival_itemList = document.getElementById('newArrival_itemList')
var wishlist_itemList = document.getElementById('wishlist_itemList')
var cartQuantity = document.getElementById('cartQuantity')
var added_msg = document.getElementById('added_msg')
var cartTotals = document.getElementById('cartTotals')

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
    					<a href="#" class="img-prod"><img class="img-fluid" src="images/product-1.png" alt="Colorlib Template">
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
    						<h3><a href="#">${newArrivals[i].itemID}</a></h3>
    						<div class="pricing">
	    						<p class="price"><span>$120.00</span></p>
	    					</div>
	    					<p class="bottom-area d-flex px-3">
    							<a href="#" class="add-to-cart text-center py-2 mr-1" onclick="return false;"><span onclick="callAddToCartServlet('${newArrivals[i].itemID}', 1)">Add to cart <i class="ion-ios-add ml-1"></i></span></a>
    							<a href="#" class="buy-now text-center py-2" onclick="return false;"><span onclick="callAddToWishlistServlet('${newArrivals[i].itemID}')">Wishlist<i class="fa-solid fa-eye-slash ml-1" style="line-height: 1.8;"></i></span></a>
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

function callCartServlet(){
	$.get("http://localhost:8080/LankaHardware/GetCartServlet", function(response) {
		
		cartItems = response[0]
		getCartQuantity()

		var Total = response[1]
		
		if(firstTime == false) buildMiniCart(cartItems)
		if(itemRemoved == true) buildMainCart(cartItems, Total)
		
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
						</td>

						<td class="price">$4.90</td>

						<td class="quantity">
							<div class="input-group mb-3">
								<input type="text" name="quantity"
									class="quantity form-control input-number" value="${cartItems[i].quantity}" min="1" max="100">
							</div>

						<td class="total">$4.90</td>

						<td class="product-remove"><a href="#" onclick="return false;"><span class="ion-ios-close" onclick="callRemoveFromCartServlet('${cartItems[i].itemID}', 'one')"></span></a></td>
					</tr><!-- END TR-->`
    			
    	mainCart_itemList.innerHTML += item
	}
}

//Cart totals
function cartTotal(Total){
	cartTotals.innerHTML = '$' + Total
}

//Add to cart
function callAddToCartServlet(itemID, quantity){
	$.post("http://localhost:8080/LankaHardware/AddToCartServlet", {itemID : itemID, quantity : quantity}, function(response){
	    
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
function callRemoveFromCartServlet(itemID, operation){
	$.post("http://localhost:8080/LankaHardware/RemoveFromCartServlet", {itemID : itemID, operation : operation}, function(response){
	   
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

