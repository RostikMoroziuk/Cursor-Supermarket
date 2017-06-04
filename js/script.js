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

    //Add events for change tab
    $(".navigation .find").click(function(e) {//Find tab
      //hide products and bill
      $(".weigh-field").addClass("hide");
      $(".buy-field").addClass("hide");
      //Show products
      $(".products").removeClass("hide");
      //Change active tab btn
      $(".navigation .active").removeClass("active");
      $(this).addClass("active");
    })
    $(".navigation .weigh").click(function(e) {//Weigh tab
      //hide products and bill
      $(".products").addClass("hide");
      $(".buy-field").addClass("hide");
      //Show products
      $(".weigh-field").removeClass("hide");
      //Change active tab btn
      $(".navigation .active").removeClass("active");
      $(this).addClass("active");
    })
    $(".navigation .buy").click(function(e) {//Buy tab
      //hide products and bill
      $(".products").addClass("hide");
      $(".weigh-field").addClass("hide");
      //Show products
      $(".buy-field").removeClass("hide");
      //Change active tab btn
      $(".navigation .active").removeClass("active");
      $(this).addClass("active");
    })

    //Add event for buy product
    $(".card-btn").click(function(e) {
      var card = $(this).parents(".card");//find what is it product
      //create Product instance and add to bill
      var product = new Product();
      product.setImage(card.find("img").attr("src"));
      product.setName(card.find(".name").text());
      product.setPrice(card.find(".price .label").text());
      //add to bill
      bill.addProduct(product);
    })
  }

  //class Product
  function Product() {
    var name, weigh, price, img;//private
    this.setName = function(n) {
      name = n;
    }
    this.getName = function() {
      return name;
    }
    this.setWeigh = function(w) {
      weigh = w;
    }
    this.getWeigh = function() {
      return weigh;
    }
    this.setPrice = function(p) {
      price = p;
    }
    this.getPrice = function() {
      return price;
    }
    this.setImage = function(i) {
      img = i;
    }
    this.getImage = function() {
      return img;
    }
  }

  //class Bill
  function Bill() {
    var products = [];
    this.addProduct = function(product) {
      //if it is instanse of class Product 
      if(product instanceof Product) {
        products.push(product);
        //Add badge to weigh
        $(".navigation .weigh .badge").text(products.length);
      } else {
        alert("It is not a product");
      }
    }
    this.getProducts = function() {
      return products;
    }
  }

  Bill.prototype.makeBill = function() {

  }

  var bill = new Bill;
  addEvents();
})();