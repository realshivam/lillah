document.addEventListener("DOMContentLoaded", function () {
  // make it as accordion for smaller screens
  if (window.innerWidth < 991) {
    // close all inner dropdowns when parent is closed
    document
      .querySelectorAll(".navbar .dropdown")
      .forEach(function (everydropdown) {
        everydropdown.addEventListener("hidden.bs.dropdown", function () {
          // after dropdown is hidden, then find all submenus
          this.querySelectorAll(".submenu").forEach(function (everysubmenu) {
            // hide every submenu as well
            everysubmenu.style.display = "none";
          });
        });
      });

    document.querySelectorAll(".dropdown-menu a").forEach(function (element) {
      element.addEventListener("click", function (e) {
        let nextEl = this.nextElementSibling;
        if (nextEl && nextEl.classList.contains("submenu")) {
          // prevent opening link if link needs to open dropdown
          e.preventDefault();
          if (nextEl.style.display == "block") {
            nextEl.style.display = "none";
          } else {
            nextEl.style.display = "block";
          }
        }
      });
    });
  }
  // end if innerWidth
});
// DOMContentLoaded  end

$(".count").each(function () {
  var $this = $(this);
  jQuery({ Counter: 0 }).animate(
    { Counter: $this.attr("data-stop") },
    {
      duration: 3000,
      easing: "swing",
      step: function (now) {
        $this.text(Math.ceil(now));
      },
    }
  );
});

$(document).ready(function () {
  // AOS.init({once: true});

  $(window).scroll(function () {
    if ($(document).scrollTop() > 70) {
      $("header").addClass("sticky");
    } else {
      $("header").removeClass("sticky");
    }
  });

  $("#trigger-open1").click(function () {
    $("#content1").toggleClass("info-content-show");
  });
  $("#trigger-close1").click(function () {
    $("#content1").removeClass("info-content-show");
  });

  $("#trigger-open2").click(function () {
    $("#content2").toggleClass("info-content-show");
  });
  $("#trigger-close2").click(function () {
    $("#content2").removeClass("info-content-show");
  });

  $("#trigger-open3").click(function () {
    $("#content3").toggleClass("info-content-show");
  });
  $("#trigger-close3").click(function () {
    $("#content3").removeClass("info-content-show");
  });

  $("#trigger-open4").click(function () {
    $("#content4").toggleClass("info-content-show");
  });
  $("#trigger-close4").click(function () {
    $("#content4").removeClass("info-content-show");
  });

  $("#trigger-open5").click(function () {
    $("#content5").toggleClass("info-content-show");
  });
  $("#trigger-close5").click(function () {
    $("#content5").removeClass("info-content-show");
  });

  $("#trigger-open6").click(function () {
    $("#content6").toggleClass("info-content-show");
  });
  $("#trigger-close6").click(function () {
    $("#content6").removeClass("info-content-show");
  });
});

$(document).ready(function () {
  $("#news-slider").owlCarousel({
    items: 3,
    itemsDesktop: [1199, 3],
    itemsDesktopSmall: [980, 2],
    itemsMobile: [600, 1],
    navigation: true,
    navigationText: ["", ""],
    pagination: true,
    autoPlay: true,
  });
});

var swiper = new Swiper("#latest-project", {
  autoplay: true,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
  },
});

var swiper = new Swiper("#work-gallery1", {
  loop: true,
  autoplay: true,
  centeredSlides: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    640: {
      slidesPerView: 1,
      allowTouchMove: true,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
      allowTouchMove: true,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 20,
      allowTouchMove: true,
    },
    1200: {
      slidesPerView: 4,
      spaceBetween: 30,
      allowTouchMove: false,
    },
  },
});

var swiper = new Swiper("#work-gallery2", {
  loop: true,
  autoplay: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    640: {
      slidesPerView: 1,
      allowTouchMove: true,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 20,
      allowTouchMove: true,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 20,
      allowTouchMove: true,
    },
    1200: {
      slidesPerView: 5,
      spaceBetween: 30,
      allowTouchMove: false,
    },
  },
});

var swiper = new Swiper("#work-gallery3", {
  loop: false,
  autoplay: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    640: {
      slidesPerView: 1,
      allowTouchMove: true,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 20,
      allowTouchMove: true,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 20,
      allowTouchMove: true,
    },
    1200: {
      slidesPerView: 5,
      spaceBetween: 30,
      allowTouchMove: false,
    },
  },
});

// let info = document.querySelectorAll(".info-trigger");
// //console.log(info);
// let contentTarget = document.getElementsByClassName("info-content")[0];
// //console.log(contentTarget);

// for(let p = 0; p < info.length; p++) {

//     info[p].addEventListener("click", function (){
//       //console.log(info);

//         contentTarget.getElementsByClassName("info-content").classList.toggle("info-content-show");

//       //this.children[1].classList.add("info-content-show");

//     });
// }

$(document).ready(function () {
  $(".proceed-button").click(function () {
    $(".donate-basic-detail").toggleClass("perform");
    $(".hero").toggleClass("increase-height");
  });
});

$(document).ready(function () {
  $("#donate_select").on("change", function () {
    var GetValue = $("#donate_select").val();
    $("#00N5f00000eUeLW").val(GetValue);
  });
});

$(document).ready(function () {
  $("#textbox-amount").hide();
  $(".mail-address").hide();
});

$("#donate_select").on("change", function () {
  if (this.value == "") {
    $("#textbox-amount").show();
  } else {
    $("#textbox-amount").hide();
  }
});

$("#payment_mode").on("change", function () {
  if (this.value == "checkbymail") {
    $(".mail-address").show();
  } else {
    $(".mail-address").hide();
  }
});
