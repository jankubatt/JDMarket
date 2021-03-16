let cartTemp = "";
loadCart();

function loadCart() {
    let price = 0;
    let overallPrice = 0;
    
    $.ajax({
        method: "GET",
        url: "/getCart",
        data: {
            user: sessionStorage.getItem("user")
        }
    }).done((cart) => {
        cart = cart[0].cart.replace(" ", "");
        cartTemp = cart;
        cart = cart.split("");
        
        $.ajax({
            method: "GET",
            url: "/getProducts",
            data: {
                search: ""
            }
        }).done((products) => {  
            $("#items").html("");
    
            if(cart[0] != "") {
                $("#items").append(`<h5 class="mb-4">Cart (<span>${cart.length}</span> items)</h5>`);
            
                for (let i = 0; i < cart.length; i++) {
                    $("#items").append(`
                    <hr class="mb-4">
                    <div class="row mb-4">
                        <div class="col-md-7 col-lg-9 col-xl-9">
                            <div>
                                <div class="d-flex justify-content-between">
                                    <div>
                                        <h5>${products[cart[i]-1].name}</h5>
                                        <p class="mb-1 text-muted text-uppercase small">${products[cart[i]-1].description}</p>
                                        <p class="mb-1 text-muted text-uppercase small">${products[cart[i]-1].makeYear}</p>
                                        <p class="mb-1 text-muted text-uppercase small">${products[cart[i]-1].kilometers} km</p>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                        <a href="#!" type="button" onclick="removeFromCart(${products[cart[i]-1].id})"
                                            class="card-link-secondary small text-uppercase mr-3 text-dark"><i
                                                class="fas fa-trash-alt mr-1"></i> Remove item </a>
                                    </div>
                                    <p class="mb-0"><span><strong>$${products[cart[i]-1].price}</strong></span></p>
                                </div>
                            </div>
                        </div>
                    </div>`);
    
                    price += products[cart[i]-1].price;
                }
    
                overallPrice = price + (price/100*21);
    
                $("#price").html(`$${price}`);
                $("#overallPrice").html(`$${overallPrice}`);
            }
            
            
        });
    });
}

function removeFromCart(id) {
    cartTemp = cartTemp.replace(id, "");;

    $.ajax({
        method: "POST",
        url: "/removeFromCart",
        data: {
            user: sessionStorage.getItem("user"),
            cart: cartTemp
        }
    }).done((status) => {
        loadCart();
    });
}