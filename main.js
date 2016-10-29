$(document).ready(function() {
	$("#pages").hide()

	setTimeout(function(){
		$("#logo").removeClass("active")
		console.log("Fuck the system")
		setTimeout(function(){

			$("#pages").fadeIn(500)
		}, 1000);
	}, 1000);
})