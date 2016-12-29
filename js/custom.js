jQuery(function($) {
    //Ajax contact
    var form = $('#contact-us-form');
    form.submit(function () {
        $this = $(this);
        var formURL = $(this).attr("action");
        var data = {
            "name": $('#contact_name').val(),
            "email": $('#contact_email').val(),
            "telephone": $('#contact_telephone').val(),
            "subject": $('#contact_subject').val(),
            "message": $('#contact_message').val()
        };

        $.ajax({
            type: "POST",
            url: formURL,
            dataType: 'json',
            async: true,
            data: JSON.stringify(data)
        }).done(function() {
            var $toastContent = $('<span>已发送</span>');
            Materialize.toast($toastContent, 3000);
        	$this[0].reset();
        }).fail(function() {
        	var $toastContent = $('<span>发送失败</span>');
            Materialize.toast($toastContent, 3000);
        });

        return false;
    });
});
