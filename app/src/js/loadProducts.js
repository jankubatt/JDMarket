getProducts("");

function getProducts(data) {
	$.ajax({
		method: "GET",
		url: "/getProducts",
		data: {
			search: data
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