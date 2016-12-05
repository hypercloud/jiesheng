jQuery(function($) {
    //Ajax contact
    var form = $('#contact-us-form');
    form.submit(function () {
    	$this = $(this);
    	var formURL = $(this).attr("action");
    	var data = {
    	    "from": $('#contact_email').val(),
    	    "to": "kevinprotoss.wei@gmail.com",
    	    "subject": $('#contact_subject').val(),
    	    "text": $('#contact_message').val()
    	};
    
    	$.ajax({
    		type: "POST",
    		url: formURL,
    		username: 'api',
    		password: 'key-79080355940d6338a6d937945598c2b0',
    		dataType: 'json',
    		async: true,
    		data: data
    	}).done(function() {
    		console.log( 'mail sent: ' );
    	}).fail(function() {
    		console.log( 'mail sent failed: ' );
    	});
    
    	return false;
    });
});
