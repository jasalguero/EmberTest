var App = Em.Application.create();

App.MyView = Em.View.extend({
});


/******************************************************/
/*				BASIC FUNCTIONALITY					  */
/******************************************************/
$(document).ready(function() {
    
	//Add event for expand and collapse post content
	$(".postMore .toggleButton").on("click", function(){
		$(this).closest(".post").find(".fullText").fadeToggle("400","linear");
		$(this).parent().children(".toggleButton").toggle();
	});

});