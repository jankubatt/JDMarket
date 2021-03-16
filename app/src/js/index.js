/*
    Author: Jan Kubat
    Web: jankubat-it.cz
    Twitter: JanKubat8
*/

let priceFrom = 0;
let priceTo = 100000;
let stars = 0;
let vehicles = "";

$(function () {
    $("#slider-range").slider({
        range: true,
        min: 0,
        max: 100000,
        values: [0, 100000],
        slide: function (event, ui) {
            $("#amountFrom").val("$" + ui.values[0]);
            $("#amountTo").val("$" + ui.values[1]);
            priceFrom = ui.values[0];
            priceTo = ui.values[1];
        }
    });
    $("#amountFrom").val("$" + $("#slider-range").slider("values", 0));
    $("#amountTo").val("$" + $("#slider-range").slider("values", 1));
});

$("body").on('change','.form-check-input', function () {
    var self = $(this);
    if (self.is(":checked")) {
        vehicles += `'${$("#" + self.attr("id")).val()}',`;
    }
    else {
        vehicles = vehicles.replace(`'${$("#" + self.attr("id")).val()}',`, "");
    }
});

$("#star1").on("click", () => {
    stars = 1;
    addStars(stars);
});

$("#star2").on("click", () => {
    stars = 2;
    addStars(stars);
});

$("#star3").on("click", () => {
    stars = 3;
    addStars(stars);
});

$("#star4").on("click", () => {
    stars = 4;
    addStars(stars);
});

$("#star5").on("click", () => {
    stars = 5;
    addStars(stars);
});

checkCookie();

function addStars(stars) {
    for (let i = 1; i <= stars; i++) {
        $("#star" + i).removeClass("far");
        $("#star" + i).addClass("fas");
    }

    for (let i = stars + 1; i <= 5; i++) {
        $("#star" + i).removeClass("fas");
        $("#star" + i).addClass("far");
    }
}

$("#makeYear").append(`<option>All</option>`);
for (let i = 1975; i <= 2021; i++) {
    $("#makeYear").append(`<option>${i}</option>`);
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var username = getCookie("loggedin");
    if (username != "") {
        $("#items").html(`   <li class="nav-item">
                                <a class="nav-link" href="../views/cart.html"><i class="fas fa-shopping-cart"></i></a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">${sessionStorage.getItem("user")}</i></a>
                            </li>
                            <li class="nav-item">
                                <a onclick="logout()" class="nav-link" href="#">Logout</i></a>
                            </li>`);

    } else {
        $("#items").html(`   <li class="nav-item">
                                <a class="nav-link" href="./views/signup.html">Sign Up</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="./views/login.html">Log In</a>
                            </li>`);
    }
}

function logout() {
    sessionStorage.setItem("user", null);
    document.cookie = "loggedin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.replace("./index.html");
}

$("#filter").on("click", () => {
    $.ajax({
        method: "GET",
        url: "/filterProducts",
        data: {
            filter: {
                priceFrom: priceFrom,
                priceTo: priceTo,
                rating: stars,
                makeYear: $("#makeYear").val(),
                kilometers: $("#kilometers").val(),
                vehicles: vehicles
            }
        }
    }).done((result) => {
        $("#products").html("");
        let stars = "";
        for (let i = 0; i < result.length; i++) {
            for (let j = 0; j < result[i].rating; j++) {
                stars += `<i class="fas fa-star"></i>`;
            }
            $("#products").append(`
                <div class="card mt-5">
                <div class="card-body">
                  <h5 class="card-title d-inline">${result[i].name}</h5>
                  ` + ((sessionStorage.getItem("user") != null && getCookie("loggedin") != "") ? `<button onclick=\'putInCart(${JSON.stringify(result[i])})\' class="btn btn-dark float-right d-inline">Put in cart</button>` : ``) + `<p class="card-text">${result[i].description}<br>
				  $${result[i].price}<br>
				   ${stars}<br>
				   ${result[i].makeYear}<br>
				   ${result[i].kilometers} Km</p>
				   </div>
				 </div>`);
            stars = "";
        }
    });
});

$("#filterRemove").on("click", () => {
    priceFrom = 0;
    priceTo = 100000;
    stars = 0;
    vehicles = "";
    $("#makeYear").val("All");
    $("#kilometers").val("200000+");
    addStars(stars);

    $.ajax({
        method: "GET",
        url: "/filterProducts",
        data: {
            filter: {
                priceFrom: priceFrom,
                priceTo: priceTo,
                rating: stars,
                makeYear: $("#makeYear").val(),
                kilometers: $("#kilometers").val()
            }
        }
    }).done((result) => {
        $("#products").html("");
        let stars = "";
        for (let i = 0; i < result.length; i++) {
            for (let j = 0; j < result[i].rating; j++) {
                stars += `<i class="fas fa-star"></i>`;
            }
            $("#products").append(`
                <div class="card mt-5">
                <div class="card-body">
                  <h5 class="card-title d-inline">${result[i].name}</h5>
                  ` + ((sessionStorage.getItem("user") != null && getCookie("loggedin") != "") ? `<button onclick=\'putInCart(${JSON.stringify(result[i])})\' class="btn btn-dark float-right d-inline">Put in cart</button>` : ``) + `<p class="card-text">${result[i].description}<br>
				  $${result[i].price}<br>
				   ${stars}<br>
				   ${result[i].makeYear}<br>
				   ${result[i].kilometers} Km</p>
				   </div>
				 </div>`);
            stars = "";
        }
    });
});

function putInCart(item) {
    $.ajax({
        method: "POST",
        url: "/putInCart",
        data: {
            email: sessionStorage.getItem("user"),
            item: item
            }
    });
}