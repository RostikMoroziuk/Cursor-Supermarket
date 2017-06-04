(function () {

  function addEvents() {
    //Add events for selection product categories
    $('.products-selection a[data-tab=fruits]').click(function (e) {
      //Prevent redirection on new page
      e.preventDefault();
      //.active check active tab .hide - hide current tab
      $(".products .active").removeClass("active").addClass("hide");
      $(".fruits").removeClass("hide").addClass("active");

      //change active tab-button (li)
      $(".products-selection li.active").removeClass("active");
      $(".products-selection .fruits-tab").addClass("active");
    })

    $('.products-selection a[data-tab=vegetables]').click(function (e) {
      e.preventDefault();
      $(".products .active").removeClass("active").addClass("hide");
      $(".vegetables").removeClass("hide").addClass("active");

      //change active tab-button (li)
      $(".products-selection li.active").removeClass("active");
      $(".products-selection .vegetables-tab").addClass("active");
    })

    $('.products-selection a[data-tab=other]').click(function (e) {
      e.preventDefault();
      $(".products .active").removeClass("active").addClass("hide");
      $(".other").removeClass("hide").addClass("active");

      //change active tab-button (li)
      $(".products-selection li.active").removeClass("active");
      $(".products-selection .other-tab").addClass("active");
    })
  }

  addEvents();
})();