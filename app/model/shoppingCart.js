var shoppingCart = (function(){

    //Private properties and methods
    var cart = [];

    function Item(name, price, count){
        this.name = name;
        this.price = price;
        this.count = count;
    };

    function saveCart(){
        localStorage.setItem("shoppingCart", JSON.stringify(cart));
    }

    function loadCart(){
        cart = JSON.parse(localStorage.getItem("shoppingCart"));
        
        /*The cart would somtimes appear as null on the website
         when the page first loads and the loadCart method returned null. This is a workaround.*/
        if (cart === null){
            cart = [];
        }
    }

    loadCart();

    //Public properties and methods
    var pub = {};

    pub.addItemToCart = function(name, price, count){
        for(var i in cart){
            if (cart[i].name === name){
                cart[i].count += count;
                saveCart();
                return;
            }
        }
        var item = new Item(name, price, count);
        cart.push(item);
        saveCart();
    };

    pub.setCountForItem = function(name, count){
        for (var i in cart){
            if(cart[i].name === name){
                cart[i].count = count;
                break;
            }
        }
        saveCart();
    };

    pub.removeItemFromCart = function(name){
        for(var i in cart) {
            if (cart[i].name === name) {
                cart[i].count--;
                if (cart[i].count === 0) {
                    cart.splice(i, 1);
                }
                break;
            }
        }
        saveCart();
    };

    pub.removeItemFromCartAll = function(name){
        for(var i in cart){
            if(cart[i].name === name){
                cart.splice(i, 1);
                break;
            }
        }
        saveCart();
    };

    pub.clearCart = function(){
        cart = [];
        saveCart();
    };

    pub.countCart = function(){
        var totalCount = 0;
        for (var i in cart){
            totalCount += cart[i].count;
        }
        return totalCount;
    };

    pub.totalCart = function () {
        var totalCost = 0;
        for(var i in cart){
            totalCost += cart[i].price * cart[i].count;
        }
        return totalCost.toFixed(2);
    };

    pub.listCart = function(){
        var cartCopy = [];
        for (var i in cart){
            var item = cart[i];
            var itemCopy = {};
            for(var j in item){
                itemCopy[j] = item[j];
            }
            itemCopy.total = (item.price * item.count).toFixed(2);
            cartCopy.push(itemCopy);
        }
        return cartCopy;
    };

    return pub;

})();
