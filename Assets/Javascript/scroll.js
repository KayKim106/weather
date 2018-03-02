
$(document).ready(function(){
	("a").on("click",function(event){
		alert("Hello world");
		if(this.hash !==""){
			event.preventDefault();
			var hash =this.hash;

			$('html,body').animate({
				scrollTop:$(hash).offset().top},800,function(){ window.location.hash=hash;})
			}
		});
});

		/*
		if(this.hash !==""){
			event.preventDefault();
			var hash = this.hash;

			$("html, body").animate({
				scrollTop:$(hash).offset().top
				},800,function(){
					window.location.hash=hash;
				});
			}
*/	