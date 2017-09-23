var $el = {};
$(document).ready(function () {
    $el.init();
});

$el.init = function () {
    this.minicart();
    this.emailsubscriptipn();
};

$el.getData = function (e) {
    e.method = "GET";
    e.dataType = "json";
    $.ajax(e).done(function (data) {
        e.sucessFn(data);
    });
};
$el.minicart = function () {
    var $this = this, options = { url:"cart/get.json",  sucessFn: sucessData };
    $this.getData(options);
    function sucessData(data) {
        var source   = $("#minicart-data").html();
        var template = Handlebars.compile(source);
        var el_html    = template(data);
        $("#minicart .mini-cart-product-list").html(el_html);
    }
};
$el.emailsubscriptipn =function(){
    $('#emailSubscription').click(function (e) {
        e.preventDefault();
        var emailval = $('#email-val').val();
        var email_Pattern = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        if (emailval !== "") {
            if(emailval.match(email_Pattern)) {
                    $.ajax({
                        cache: false,
                        url: 'cart/get.json',
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            email: emailval
                        },
                        success: function (data) {
                            $('#status').empty();
                            $('<strong />', {
                                text: 'Subscription successful'
                            }).prependTo('#status');
                        }
                    });
                } else {
                $('#status').empty();
                $('<strong />', {
                    text: 'Email verification failed'
                }).prependTo('#status');
            }
        } else {
            $('#status').empty();
            alert("Insert a email!");
        }
    });
};
