$('#loginSubmit').on("click", () => {
    if ($("#loginEmail").val() == "") {
        $("#errorMessage").html("You need to give me your email ๐ค");
    } else if ($("#loginPassword").val() == "") {
        $("#errorMessage").html("You need to give me your password ๐ค");
    } else {
        $("#errorMessage").html("");

        loginPass = $("#loginPassword").val();
        loginEmail = $("#loginEmail").val();

        $.ajax({
            method: "POST",
            url: "/authUser",
            data: {
                pass: loginPass,
                email: loginEmail
            }
        }).done((result) => {
            if (!result.msg) {
                $("#errorMessage").html("Wrong password ๐คจ");
            } else {
                setCookie("loggedin", "true", 1);
                sessionStorage.setItem("user", loginEmail);
                window.location.replace("../index.html");
            }
        });
    }
});

$("form").submit(function (e) {
    e.preventDefault();
});

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}