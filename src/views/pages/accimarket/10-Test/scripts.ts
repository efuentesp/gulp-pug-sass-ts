/// <reference path="../../typings/index.d.ts" />

console.log("10-Test");

$("#btnNavPrevious").click(function() {
  $(".amMenuInnerBox").animate({ scrollLeft: "-=200px" });
});

$("#btnNavNext").click(function() {
  $(".amMenuInnerBox").animate({ scrollLeft: "+=200px" });
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