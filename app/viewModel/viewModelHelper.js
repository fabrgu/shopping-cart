var viewModelHelper = (function(){
    return {
        //create a table with info provided by json file
        jsonTable: function (json) {
            $.getJSON(json, function (data) {
                $.each(data.ArrayO, function (i, ArrayO) {

                    var name_row = "<td id='a_name'>" + ArrayO.Name +"</td>";

                    var price_row = "<td id='a_price'> $ " + ArrayO.Price + "</td>";

                    var description_row = "<td>" + ArrayO.Description + "</td>";

                    var button_row = "<td> <button id='button_add' type='button' class='btn btn-primary btn-sm pull-right' + " +
                        "data-name=" + ArrayO.Name + " data-price=" + ArrayO.Price
                        + " onclick='viewModelHelper.addToCartClick(this)'>Add to Cart</button> </td>";

                    var table_html = "<tr>" + name_row + price_row + description_row + button_row + "</tr>";
                    $(table_html).appendTo('#a_listing');
                });
            });
        },

        addToCartClick: function (item) {
            var itemName = $(item).attr('data-name');
            var itemPrice = $(item).attr('data-price');
            shoppingCart.addItemToCart(itemName, itemPrice, 1);
            viewModelHelper.renderCart();
        },

        //display up-to-date info about user's shopping cart
        renderCart: function() {
            var cartArray = shoppingCart.listCart();
            var add_to_cart_html = "";
            var cart_total_text = "";
            var cartItemTotal = shoppingCart.countCart();
            var price = shoppingCart.totalCart();

            for (var i in cartArray){

                var list_name_html  = "<li id='a_count' class='list-group-item'>" + cartArray[i].name;

                var list_price_html = "<span ='label label-default'> Price: $" + cartArray[i].price;

                var list_count_html = " Count: " + cartArray[i].count +  "</span></li>";

                var change_count_html = "<li>Change Item Count: <input id='quantity' type='number' min='1' value='"+cartArray[i].count
                    +"'class='form-control input-sm' data-name='"+cartArray[i].name
                    +"'onchange='viewModelHelper.changeCount(this)'></li>";

                var add_item_button = "<li><ul class='list-inline'><li><button id='button_addItem' data-name='"+cartArray[i].name
                    +"'type='button' class='btn btn-primary btn-xs' onclick='viewModelHelper.addAnItemClick(this)'>Add An Item</button>";

                var remove_item_button  = "<li><button id='button_removeItem' data-name='" +
                    cartArray[i].name+"'type='button' class='btn btn-primary btn-xs' onclick='viewModelHelper.removeItemClick(this)'>Remove An Item</button></ul></li>";

                add_to_cart_html +=  list_name_html + list_price_html + list_count_html + change_count_html + add_item_button + remove_item_button;
            }

            if (cartItemTotal > 0) {
                cart_total_text = "You have " + cartItemTotal + " item(s) in your cart.";
            } else {
                cart_total_text = "Your cart is empty.";
            }

            $('.list-unstyled').html(add_to_cart_html);
            $('#count_items_cart').text(cart_total_text);
            $('#total_amount').text(price);
        },

        addAnItemClick: function(item){
            var itemName = $(item).attr('data-name');
            shoppingCart.addItemToCart(itemName, 0, 1);
            viewModelHelper.renderCart();
        },

        removeItemClick: function(item){
            var itemName = $(item).attr('data-name');
            shoppingCart.removeItemFromCart(itemName);
            viewModelHelper.renderCart();
        },

        removeAllClick: function(){
            shoppingCart.clearCart();
            viewModelHelper.renderCart();
        },

        changeCount: function(countChange){
            var itemName = $(countChange).attr('data-name');
            var count = Number($(countChange).val());
            if (count <= 0){
                alert('Only positive integers are allowed!');
                return;
            } else{
                shoppingCart.setCountForItem(itemName,count);
                viewModelHelper.renderCart();
            }
        },

        completeCheckout: function(){
            $('.alert').show();
            shoppingCart.clearCart();
            viewModelHelper.renderCart();
        }
    }

}());
