/// <reference path="../../typings/index.d.ts" />

console.log("10-Test");

$("#btn-nav-previous").click(function() {
  $(".menu-inner-box").animate({ scrollLeft: "-=200px" });
});

$("#btn-nav-next").click(function() {
  $(".menu-inner-box").animate({ scrollLeft: "+=200px" });
});


jQuery(function($){
	$(document).ajaxSend(function() {
		$("#overlay").fadeIn(300);　
	});
		
	$('#button').click(function(){
		$.ajax({
			type: 'GET',
			success: function(data){
				console.log(data);
			}
		}).done(function() {
			setTimeout(function(){
				$("#overlay").fadeOut(300);
			},500);
		});
	});	
});