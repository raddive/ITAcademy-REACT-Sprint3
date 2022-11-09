// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional

function saveObjectLocal(object,id) {
 
    var stringified = JSON.stringify(object);
    localStorage.setItem(id, stringified);
    return true;

}

function loadObjectLocal(id) {

    return JSON.parse(localStorage.getItem(id));

}

function cleanObjectLocal(id) {
 
    localStorage.removeItem(id);

}

// Array with products (objects) added directly with push(). Products in this array are repeated.
var cartList = [];

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
var cart=loadObjectLocal("cart");
if(!cart)
    cart = [];
var checkOutCart;

var total = 0;
var totalItems=loadObjectLocal("totalItems");
if(totalItems>0)
    document.getElementById("count_product").innerText = totalItems;

// Exercise 1
function buy(id) {
    // 1. Loop for to the array products to get the item to add to cart
    var bFound=false;
    for(i=0;i<products.length && !bFound;i++)
    {
        if (products[i].id==id)
        {
            bFound=true;
            // 2. Add found product to the cartList array
            cartList.push(products[i]);
        }
    }
    console.log({cartList});
    document.getElementById("count_product").innerText = cartList.length;
    calculateTotal();
}

// Exercise 2
function cleanCart() {
    cartList = [];
    cart =[];
    totalItems=0;
    total =0;
    console.log({total});
    console.log({cartList});
    document.getElementById("count_product").innerText = cartList.length;
    const cartTable=document.getElementById("cart_list");
    while(cartTable.rows.length > 0) {
        cartTable.deleteRow(0);
    }
    document.getElementById("total_price").innerText = "0,00";
    clearObjectLocal("cart");
    clearObjectLocal("totalItems");

}

// Exercise 3
function calculateTotal() {
    // Calculate total price of the cart using the "cartList" array
    var newTotal=0;
    for(i=0;i<cartList.length;i++)
    {
        newTotal+=cartList[i].price;
    }
    total=newTotal;
    console.log({total});
}

// Exercise 4
function generateCart() {
    // Using the "cartlist" array that contains all the items in the shopping cart, 
    // generate the "cart" array that does not contain repeated items, instead each item of this array "cart" shows the quantity of product.
    cart = [];
    for(i=0;i<cartList.length;i++)
    {
        bFound=false;
        alreadyQuantity=1;
        for(j=0;j<cart.length && !bFound;j++)
        {
            if(cartList[i].name == cart[j].name)
            {
                bFound=true;
                cartIndex=j;
            }

        }
        if(!bFound)
        {
            cartElement = {
                id : cartList[i].id,
                name : cartList[i].name,
                price : cartList[i].price,
                type :  cartList[i].type,
                quantity : 1,
                subtotal : cartList[i].price,
                subtotalWithDiscount: cartList[i].price
            }
            cart.push(cartElement);
        }
        else{
            cart[cartIndex].quantity++;
            cart[cartIndex].subtotal=cart[cartIndex].price*cart[cartIndex].quantity;
            cart[cartIndex].subtotalWithDiscount=cart[cartIndex].subtotal;
        }
    }

    applyPromotionsCart();
}

// Exercise 5
function applyPromotionsCart() {
    // Apply promotions to each item in the array "cart"
    var bFound;
    for(i=0;i<cart.length ;i++)
    {
        bFound=false;
        for(j=0;j<products.length && !bFound;j++)
        {
            if(cart[i].name == products[j].name)
            {
                bFound=true;
                if(products[j].hasOwnProperty("offer") && cart[i].quantity>=products[j].offer.number)
                {
                    var discount=(100-products[j].offer.percent)/100;
                    cart[i].subtotalWithDiscount = cart[i].quantity * cart[i].price * discount;
                }
            }
        }
    }
}

// Exercise 6
function printCart(currentCart,table_id) {
    // Fill the shopping cart modal manipulating the shopping cart dom
    const cartTable=document.getElementById(table_id);
    while(cartTable.rows.length > 0) {
        cartTable.deleteRow(0);
    }

    var grandTotal=0;
    for(i=0;i<currentCart.length ;i++)
    {
        let row = cartTable.insertRow();
        let product = row.insertCell(0);
        product.innerHTML = "<b>"+currentCart[i].name+"<b>";
        let quantity = row.insertCell(1);
        quantity.innerText = currentCart[i].quantity;    
        let price = row.insertCell(2);
        price.innerText = "$"+currentCart[i].price;    
        let totalDiscount = row.insertCell(3);
        totalDiscount.innerText = "$"+currentCart[i].subtotalWithDiscount.toFixed(2);
        let btnRemove = row.insertCell(4);
        let btnType;        
        if(cart[i].quantity==1)
            btnType="<i class='fas fa-trash me-1'></a>"
        else
            btnType="<i class='fas fa-minus me-1'></a>"
        
        btnRemove.innerHTML = "<a href='javascript:void(0)' class='btn flex-center' type='button' onclick='removeFromCart("+currentCart[i].id+")'>"+btnType;


        grandTotal+=currentCart[i].subtotalWithDiscount;
    }

    document.getElementById("total_price").innerText = grandTotal.toFixed(2);

    saveObjectLocal(cart,"cart");
    saveObjectLocal(totalItems,"totalItems");
}


// ** Nivell II **

// Exercise 8
function addToCart(id) {
    // Refactor previous code in order to simplify it 
    // 1. Loop for to the array products to get the item to add to cart
    var bFound=false;
    for(i=0;i<products.length && !bFound;i++)
    {
        if (products[i].id==id)
        {
            bFound=true;
            totalItems++;
            // 2. Add found product to the cart array or update its quantity in case it has been added previously.
            bFoundAtCart=false;
            alreadyQuantity=1;
            for(j=0;j<cart.length && !bFoundAtCart;j++)
            {
                if(products[i].name == cart[j].name)
                {
                    bFoundAtCart=true;
                    cartIndex=j;
                }
    
            }
            if(!bFoundAtCart)
            {
                cartElement = {
                    id : products[i].id,
                    name : products[i].name,
                    price : products[i].price,
                    type :  products[i].type,
                    quantity : 1,
                    subtotal : products[i].price,
                    subtotalWithDiscount: products[i].price
                }
                cart.push(cartElement);
            }
            else{
                cart[cartIndex].quantity++;
                cart[cartIndex].subtotal=cart[cartIndex].price*cart[cartIndex].quantity;
                cart[cartIndex].subtotalWithDiscount=cart[cartIndex].subtotal;
            }
        }
    }
    document.getElementById("count_product").innerText = totalItems;
    applyPromotionsCart();
}

// Exercise 9
function removeFromCart(id) {
    // 1. Loop for to the array products to get the item to add to cart
    var bFound=false;
    for(i=0;i<products.length && !bFound;i++)
    {
        if (products[i].id==id)
        {
            bFound=true;
            var bFoundAtCart=false
            for(j=0;j<cart.length && !bFoundAtCart;j++)
            {
                if(products[i].name == cart[j].name)
                {
                    bFoundAtCart=true;
                    totalItems--;
                    if(cart[j].quantity==1)
                    {
                        cart.splice(j,1);
                    }
                    else if(cart[j].quantity>1)
                    {
                        cart[j].quantity--;
                        cart[j].subtotal=cart[j].price*cart[j].quantity;
                        cart[j].subtotalWithDiscount=cart[j].subtotal;
                    }

                }
            }
        }
    }
    document.getElementById("count_product").innerText = totalItems;
    applyPromotionsCart();
    printCart(cart,"cart_list");




    for(i=0;i<cartList.length && !bFound ;i++)
    {
        if(cartList[i].id==id)
        {
            bFound=true;
            cartList.splice(i,1);
        }
    }
    printCart(cart,"cart_list");
    document.getElementById("count_product").innerText = cartList.length;
}

function open_modal(){
	console.log("Open Modal");
	printCart(cart,"cart_list");
}