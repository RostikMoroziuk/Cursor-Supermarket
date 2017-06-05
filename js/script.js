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
    $(".navigation .find").click(function (e) { //Find tab
      //toggle field
      toggleField.call(this, ".products");
    })
    $(".navigation .weigh").click(function (e) { //Weigh tab
      //toggle field
      toggleField.call(this, ".weigh-field");
    })
    $(".navigation .buy").click(function (e) { //Buy tab
      //toggle field
      toggleField.call(this, ".bill-field");
    })

    function toggleField(activateField) {
      //Change active field
      $(".field[data-active=true]").addClass("hide").attr("data-active", "false");
      $(activateField).removeClass("hide").attr("data-active", "true");

      //change active navigation button
      $(".navigation .active").removeClass("active");
      $(this).addClass("active");
    }

    //Add event for buy product
    $(".card-btn").click(function (e) {
      var card = $(this).parents(".card"); //find what is it product
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
    var name, weight, price, img, priceToPay; //private
    this.setName = function (n) {
      name = n;
    }
    this.getName = function () {
      return name;
    }
    this.setWeight = function (w) {
      weigh = w;
    }
    this.getWeight = function () {
      return weight;
    }
    this.setPrice = function (p) {
      price = p;
    }
    this.getPrice = function () {
      return price;
    }
    this.setImage = function (i) {
      img = i;
    }
    this.getImage = function () {
      return img;
    }
    this.setPriceToPay = function (p) {
      priceToPay = p;
    }
    this.getPriceToPay = function () {
      return priceToPay;
    }
  }

  //class Bill
  function Bill() {
    //private
    var products = [];
    var self = this;

    //Add cards to weigh tab
    function renderWeighField() {
      var card = buildCard(self.getProducts().slice(-1)[0]);
      //add card to field
      $(".weigh-field").append(card);
    }

    //Add tabs to buy tab
    function renderBuyField(product) {
      //this - button ok
      var currentCard = $(this).closest(".card");
      //On buy field must be only img, prices, name and button accept or cancel
      currentCard.find(".weight.form-control").hide();
      //change ok button event. When click ok, products go to bill
      currentCard.find(".card-btn.ok").click(function() {
        //add product to bill list
        bill.makeBill(product);
        //delete card and product
        cancelBuy.call(this, product);
      })

      //Buy field
      var buyField = $(".field.buy-field");
      buyField.append(currentCard);
      changeBadge(".weigh");
      changeBadge(".buy");
    }

    function buildCard(product) {
      var card = $("<article></article>").addClass("card"); //biuld card

      var img = $("<figure></figure>").addClass("image"); //add image section
      img.append($("<img>").attr("src", product.getImage())) //add image

      var content = $("<div></div>").addClass("content"); //content
      content.append($("<h3></h3>").addClass("name").text(product.getName()));
      var price = $("<div></div>").addClass("price"); //price per kg and to pay
      price.append($("<span></span>").addClass("label label-primary").text(product.getPrice() + " per kg"));
      price.append($("<span></span>").addClass("label label-primary").attr("data-priceToPay", "")
        .text(calcPrice(product.getPrice(), 10) //min weigh 10grams
          +
          "$ to pay"));
      content.append(price);
      //weigh
      content.append($("<input>").addClass("weight form-control").attr({
        type: "number",
        name: "weigh",
        placeholder: "Weight product",
        value: 10,
        min: "10",
        max: "100000"
      }).on("input", function () {
        if (!(+this.value)) {
          alert("NaN");
        } else if (this.value<10 || this.value>100000) {
          alert("Range 10-100000");
          this.value = 10;
        } else {
          var priceToPay = calcPrice(product.getPrice(), this.value);
          price.find(".label[data-priceToPay]").text(priceToPay + "$ to pay");
        }
      }));
      //buttons
      var buttons = $("<div></div>").addClass("buttons");
      buttons.append($("<button></button>").addClass("card-btn ok")
        .on("click", function() {
          renderBuyField.call(this, product);
        }).text("Ok"));
      buttons.append($("<button></button>").addClass("card-btn cancel")
        .on("click", function () {
          cancelBuy.call(this, product);
        }).text("Cancel"));
      content.append(buttons);

      card.append(img, content);
      return card;
    }

    function calcPrice(price, weigh) {
      price = parseInt(price);
      return (price * weigh / 1000).toFixed(2);
    }

    function cancelBuy(cancelProduct) {//event for both cancel: on buy field and weigh field
      //remove current card from html
      $(this).closest(".card").remove();
      //remove product from array
      products.splice(products.indexOf(cancelProduct), 1);
      changeBadge(".weigh");
      changeBadge(".buy");
    }

    function changeBadge(selector) {
      //find purpose field and find cards number
      var fieldSelector = (selector===".weigh") ? ".weigh-field" : ".buy-field";
      var numberOfCards = $(fieldSelector).children().length;
      if (numberOfCards > 0) {
        $(selector + " .badge").text(numberOfCards)
      } else {
        $(selector + " .badge").text("")
      }
    }

    //public
    this.addProduct = function (product) {
      //if it is instanse of class Product 
      if (product instanceof Product) {
        products.push(product);
        //Add badge to weigh
        renderWeighField();
        changeBadge(".weigh");
      } else {
        alert("It is not a product");
      }
    }
    this.getProducts = function () {
      return products;
    }

  }

  Bill.prototype.makeBill = function (product) {

  }

  var bill = new Bill;
  addEvents();
})();