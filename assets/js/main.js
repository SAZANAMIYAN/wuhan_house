(function ($) {
  "use strict";
  
  // ==========================================
  //      Start Document Ready function
  // 更多模板下载： Http://www.bootstrapmb.com
  // ==========================================
  $(document).ready(function () {
    
  // ============== Mobile Menu Sidebar & Offcanvas Js Start ========
  $('.toggle-mobileMenu').on('click', function () {
    $('.mobile-menu').addClass('active');
    $('.side-overlay').addClass('show');
    $('body').addClass('scroll-hide-sm');
  }); 

  $('.close-button, .side-overlay').on('click', function () {
    $('.mobile-menu').removeClass('active');
    $('.side-overlay').removeClass('show');
    $('body').removeClass('scroll-hide-sm');
  }); 
  // ============== Mobile Menu Sidebar & Offcanvas Js End ========
  
  // ============== Mobile Nav Menu Dropdown Js Start =======================
  var windowWidth = $(window).width(); 
  
  $('.has-submenu').on('click', function () {
    var thisItem = $(this); 
    
    if(windowWidth < 992) {
      if(thisItem.hasClass('active')) {
        thisItem.removeClass('active')
      } else {
        $('.has-submenu').removeClass('active')
        $(thisItem).addClass('active')
      }
      
      var submenu = thisItem.find('.nav-submenu');
      
      $('.nav-submenu').not(submenu).slideUp(300);
      submenu.slideToggle(300);
    }
    
  });
  // ============== Mobile Nav Menu Dropdown Js End =======================
  
  // ======================== Offcanvas Js Start ====================
  $('.offcanvas-btn').on('click', function () {
    $('.common-offcanvas').addClass('active');
    $('.side-overlay').addClass('show');
    $('body').addClass('scroll-hide');
  }); 

  $('.close-button, .side-overlay').on('click', function () {
    $('.common-offcanvas').removeClass('active');
    $('.side-overlay').removeClass('show');
    $('body').removeClass('scroll-hide');
  }); 
  // ======================== Offcanvas Js End ====================
    
  // ===================== Scroll Back to Top Js Start ======================
  var progressPath = document.querySelector('.progress-wrap path');
  var pathLength = progressPath.getTotalLength();
  progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
  progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
  progressPath.style.strokeDashoffset = pathLength;
  progressPath.getBoundingClientRect();
  progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
  var updateProgress = function () {
    var scroll = $(window).scrollTop();
    var height = $(document).height() - $(window).height();
    var progress = pathLength - (scroll * pathLength / height);
    progressPath.style.strokeDashoffset = progress;
  }
  updateProgress();
  $(window).scroll(updateProgress);
  var offset = 50;
  var duration = 550;
  jQuery(window).on('scroll', function() {
    if (jQuery(this).scrollTop() > offset) {
      jQuery('.progress-wrap').addClass('active-progress');
    } else {
      jQuery('.progress-wrap').removeClass('active-progress');
    }
  });
  jQuery('.progress-wrap').on('click', function(event) {
    event.preventDefault();
    jQuery('html, body').animate({scrollTop: 0}, duration);
    return false;
  })
  // ===================== Scroll Back to Top Js End ======================
  
  // ============== Magnific Popup Js Start =======================
  $('.popup-video-link').magnificPopup({
    type: 'iframe'
  });
  $('.gallery-popup').magnificPopup({
    type: 'image',
    gallery:{
      enabled:true
    }
  });
  // ============== Magnific Popup Js End =======================
  
  // ========================= Portfolio Slick Slider Js Start ==============
  $('.portfolio-wrapper').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 1500,
    dots: false,
    pauseOnHover: true,
    arrows: false,
    centerMode: true,
    prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-long-arrow-alt-left"></i></button>',
    nextArrow: '<button type="button" class="slick-next"><i class="fas fa-long-arrow-alt-right"></i></button>',
    responsive: [
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 530,
          settings: {
            slidesToShow: 1
          }
        }
      ]
  });
  // ========================= Portfolio Slick Slider Js End ===================

  // ========================= Testimonial Slick Slider Js Start ==============
  $('.testimonial-box').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 1500,
    dots: false,
    pauseOnHover: true,
    arrows: true,
    fade: true,
    draggable: true,
    speed: 900,
    infinite: true,
    prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-arrow-left"></i></button>',
    nextArrow: '<button type="button" class="slick-next"><i class="fas fa-arrow-right"></i></button>',
  });
  // ========================= Testimonial Slick Slider Js End ===================  

  // ========================= Testimonial Four Slider Js Start ==============
  $('.testimonial-four-slider').slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 1500,
    dots: true,
    pauseOnHover: true,
    arrows: false,
    draggable: true,
    speed: 900,
    infinite: true,
    prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-arrow-left"></i></button>',
    nextArrow: '<button type="button" class="slick-next"><i class="fas fa-arrow-right"></i></button>',
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          arrows: false,
        }
      }
    ]
  });
  // ========================= Testimonial Four Slider Js End ===================
  
  // ========================= Testimonial Three Slick Slider Js Start ==============
  $('.testimonials-three__wrapper').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 1500,
    dots: false,
    pauseOnHover: true,
    arrows: true,
    centerMode: true,
    prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-arrow-left"></i></button>',
    nextArrow: '<button type="button" class="slick-next"><i class="fas fa-arrow-right"></i></button>',
  });
  // ========================= Testimonial Three Slick Slider Js End ===================
  
  // ========================= Testimonial Three Slick Slider Js Start ==============
  $('.project-page__inner').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 1500,
    dots: false,
    pauseOnHover: true,
    arrows: true,
    centerMode: true,
    prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-arrow-left"></i></button>',
    nextArrow: '<button type="button" class="slick-next"><i class="fas fa-arrow-right"></i></button>',
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          arrows: false,
        }
      }
    ]
  });
  // ========================= Testimonial Three Slick Slider Js End ===================
  
  // ========================= Property Five Slick Slider Js Start ==============
  $('.property-five-slider').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    speed: 1500,
    dots: false,
    pauseOnHover: true,
    arrows: true,
    prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-arrow-left"></i></button>',
    nextArrow: '<button type="button" class="slick-next"><i class="fas fa-arrow-right"></i></button>',
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          arrows: false,
          dots: true,
        }
      }
    ]
  });
  // ========================= Property Five Slick Slider Js End ===================
  

  // ========================= Counter Up Js End ===================
  const counterUp = window.counterUp.default;

  const callback = (entries) => {
    entries.forEach((entry) => {
      const el = entry.target;
      if (entry.isIntersecting && !el.classList.contains('is-visible')) {
        counterUp(el, {
          duration: 2000,
          delay: 16,
        });
        el.classList.add('is-visible');
      }
    });
  };

  const IO = new IntersectionObserver(callback, { threshold: 1 });

  // About Counter
  const statisticsCounter = document.querySelector('.statisticsCounter');
  if (statisticsCounter) {
    IO.observe(statisticsCounter);
  }

  // Counter
  const counter = document.querySelector('.counter');
  if (counter) {
    IO.observe(counter);
  }

  // Counter Two
  const counterNumbers = document.querySelectorAll('.counterNumber');
  if (counterNumbers.length > 0) {
    counterNumbers.forEach((counterNumber) => {
      IO.observe(counterNumber);
    });
  }

  // Counter Three
  const counterThree = document.querySelectorAll('.counter-three-item__number');
  if (counterThree.length > 0) {
    counterThree.forEach((counterNumber) => {
      IO.observe(counterNumber);
    });
  }

  // Counter Five
  const counterFive = document.querySelectorAll('.counter-five-item__number');
  if (counterFive.length > 0) {
    counterFive.forEach((counterNumber) => {
      IO.observe(counterNumber);
    });
  }

  // Counter Five
  const counterSix = document.querySelectorAll('.project-content__number');
  if (counterSix.length > 0) {
    counterSix.forEach((counterNumber) => {
      IO.observe(counterNumber);
    });
  }

  // Counter Five
  const counterSeven = document.querySelectorAll('.about-five__amount');
  if (counterSeven.length > 0) {
    counterSeven.forEach((counterNumber) => {
      IO.observe(counterNumber);
    });
  }

  // Counter Five
  const counterEight = document.querySelectorAll('.counter-six-item__number');
  if (counterEight.length > 0) {
    counterEight.forEach((counterNumber) => {
      IO.observe(counterNumber);
    });
  }
  // ========================= Counter Up Js End ===================

  // ========================== add active class to ul>li top Active current page Js Start =====================
  function dynamicActiveMenuClass(selector) {
    let FileName = window.location.pathname.split("/").reverse()[0];

    selector.find("li").each(function () {
      let anchor = $(this).find("a");
      if ($(anchor).attr("href") == FileName) {
        $(this).addClass("activePage");
      }
    });
    // if any li has activePage element add class
    selector.children("li").each(function () {
      if ($(this).find(".activePage").length) {
        $(this).addClass("activePage");
      }
    });
    // if no file name return
    if ("" == FileName) {
      selector.find("li").eq(0).addClass("activePage");
    }
  }
  if ($('ul').length) {
    dynamicActiveMenuClass($('ul'));
  }
  // ========================== add active class to ul>li top Active current page Js End =====================
  
  // ========================== Add Attribute For Bg Image Js Start ====================
    $(".background-img").css('background', function () {
      var bg = ('url(' + $(this).data("background-image") + ')');
      return bg;
    });
  // ========================== Add Attribute For Bg Image Js End =====================

  // ========================== Social List Visibility Js Start =====================
  $(document).on('click', function (event) {
    if (!$(event.target).closest('.social-share').length && !$(event.target).closest('.social-share__button').length) {
      $('.social-share-list').removeClass('active');
      $('.social-share__button').removeClass('active')
    }
  });

  $('.social-share__button').on('click', function () {
    $('.social-share__button').not($(this)).removeClass('active')
    $(this).toggleClass('active')
    $('.social-share-list').not($(this).siblings('.social-share-list')).removeClass('active');
    $(this).siblings('.social-share-list').toggleClass('active');
  });
  // ========================== Social List Visibility Js End =====================
  
  // ========================== Text Slide Js Start =====================
  $('.service-slider').marquee({
    pauseOnHover: true,
    
    allowCss3Support: true,
    css3easing: 'linear',
    easing: 'linear',
    delayBeforeStart: 1000,
    duration: 7000,
    gap: 20,
    pauseOnCycle: false,
    startVisible: false
  });
  // ========================== Text Slide Js End =====================

  // ========================== Image Uploader Js Start =====================
  $(function(){
    $('.input-images').imageUploader();
  });
  // ========================== Image Uploader Js End =====================

  // ========================== Grid & List View Js Start =====================
  $('.list-button').on('click', function () {
    $('body').addClass('list-view'); 
    $(this).addClass('active'); 
    $('.grid-button').removeClass('active'); 
  }); 
  $('.grid-button').on('click', function () {
    $('body').removeClass('list-view'); 
    $('.list-button').removeClass('active'); 
    $(this).addClass('active'); 
  }); 
  // ========================== Grid & List View Js End =====================

  // ========================== Range Slider Js Start =====================
  $( function() {
    $( "#slider-range" ).slider({
      range: true,
      min: 0,
      max: 500,
      values: [ 75, 300 ],
      slide: function( event, ui ) {
        $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
      }
    });
    $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
      " - $" + $( "#slider-range" ).slider( "values", 1 ) );
  } );
  // ========================== Range Slider Js End =====================

  // ========================== Increment & Decrement Js Start =====================
  $(function() {
    $('[data-decrease]').click(decrease);
    $('[data-increase]').click(increase);
    $('[data-value]').change(valueChange);
  });
  
  function decrease() {
    var value = $(this).parent().find('[data-value]').val();
    if(value > 1) {
      value--;
      $(this).parent().find('[data-value]').val(value);
    }
  }
  
  function increase() {
    var value = $(this).parent().find('[data-value]').val();
    if(value < 100) {
      value++;
      $(this).parent().find('[data-value]').val(value);
    }
  }
  
  function valueChange() {
    var value = $(this).val();
    if(value == undefined || isNaN(value) == true || value <= 0) {
      $(this).val(1);
    } else if(value >= 101) {
      $(this).val(100);
    }
  }
  // ========================== Increment & Decrement Js End =====================

  // ========================== Cart Item Delete Js Start =====================
  $('.delete-btn').on('click', function() {
    $(this).closest('tr').addClass('d-none')
  }); 
  // ========================== Cart Item Delete Js End =====================

  // ========================== Password Show Hide Js Start =====================
  $(".toggle-password").on('click', function() {
    $(this).toggleClass(" la-eye-slash");
    var input = $($(this).attr("id"));
    if (input.attr("type") == "password") {
    input.attr("type", "text");
    } else {
    input.attr("type", "password");
    }
  });
  // ========================== Password Show Hide Js End =====================
  

  

  });
  // ==========================================
  //      End Document Ready function
  // ==========================================

  // ========================= Preloader Js Start =====================
    $(window).on("load", function(){
      $('.preloader').fadeOut(); 
    })
    // ========================= Preloader Js End=====================

    // ========================= Header Sticky Js Start ==============
    $(window).on('scroll', function() {
      if ($(window).scrollTop() >= 260) {
        $('.header').addClass('fixed-header');
      }
      else {
          $('.header').removeClass('fixed-header');
      }
    }); 
    // ========================= Header Sticky Js End===================

})(jQuery);
