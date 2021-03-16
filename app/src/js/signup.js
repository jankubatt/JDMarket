userExists = false;

$('#signupSubmit').on("click", () => {
    if ($("#signupEmail").val() == "") {
        $("#errorMessage").html("You need to give me your email 🤔");
    } else if ($("#signupTerms").prop("checked") == false) {
        $("#errorMessage").html("Check out my terms! 😡");
    } else if (!userExists) {
        $("#errorMessage").html("");

        let signupPass, signupName, signupEmail = "";
        signupName = $("#signupName").val().escape();
        signupPass = $("#signupPassword").val();
        signupEmail = $("#signupEmail").val().escape();

        $.ajax({
            method: "POST",
            url: "/insertUser",
            data: {
                name: signupName,
                pass: signupPass,
                email: signupEmail
            }
        })
    }

    window.location.replace("../index.html");
});

$("#signupName").on("blur", () => {
    $.ajax({
            method: "POST",
            url: "/checkIfUserExists",
            data: {
                name: $("#signupName").val()
            }
        })
        .done(function (exists) {
            console.log(exists);
            if (exists.msg) {
                $("#errorMessage").html("User already exists! 🥱");
                userExists = true;
            } else {
                $("#errorMessage").html("");
                userExists = false;
            }
        });
});

$("form").submit(function (e) {
    e.preventDefault();
});

String.prototype.escape = function () {
    var tagsToReplace = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;'
    };
    return this.replace(/[&<>]/g, function (tag) {
        return tagsToReplace[tag] || tag;
    });
};