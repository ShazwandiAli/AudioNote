var API_ENDPOINT = "https://fp9kawu47i.execute-api.ap-southeast-1.amazonaws.com/DEV"

document.getElementById("sayButton").onclick = function(){

	var inputData = {
		"voice": $('#voiceSelected option:selected').val(),
		"text" : $('#postText').val(),
		"userName" : sessionStorage.getItem("userName"),
		"email": sessionStorage.getItem("email"),
		"subject" : $('#subject').val()
	};

	$.ajax({
	      url: API_ENDPOINT,
	      type: 'POST',
	      data:  JSON.stringify(inputData)  ,
	      contentType: 'application/json; charset=utf-8',
	      success: function (response) {
					document.getElementById("postIDreturned").textContent="Post ID: " + response;
					console.log(response);
	      },
	      error: function () {
	          alert("error");
	      }
	  });
}


function getPosts(){

	var subject = $('#subjectGet').val();

	$.ajax({
		url: 'https://dzdhoroxqsxhhnbmaywfkb4fgi0rrknu.lambda-url.ap-southeast-1.on.aws?Subject=' + subject + "&postId=*" + "&userName=" + sessionStorage.getItem("userName"),
		type: 'GET',
		success: function (response) {

			$('#posts tr').slice(1).remove();

		jQuery.each(response, function(i,data) {

				var player = "<audio controls><source src='" + data['url'] + "' type='audio/mpeg'></audio>"

				if (typeof data['url'] === "undefined") {
					var player = ""
				}																			



				$("#posts").append("<tr> \
						<td>" + data['id'] + "</td> \
						<td>" + data['voice'] + "</td> \
						<td>" + data['text'] + "</td> \
						<td>" + data['status'] + "</td> \
						<td>" + data['Subject'] + "</td> \
						<td>" + player + "</td> \
						<td> <button onclick = deletePost(this.id) type='delete' class = 'delete' id = '" + data['id'] + "'><img src='images/delete.png' alt='X' height=22px width=22px></button> </td>\
						</tr>");
		});
		},
		error: function () {
				alert("error");
		}
	});
}

function deletePost(id){

    $.ajax({
        url: "https://llldvgmpphncutijsl7vlbdode0ssuak.lambda-url.ap-southeast-1.on.aws/?id=" + id,
        type: 'GET',
        success: function(response) {
           getPosts()
        }
    })
}

function translateText(){
    var inputText = $('#inputText').val();
    var translatedText = document.getElementById('inputText');

    $.ajax({
        url: "https://gwqb6hmgs5rslt53qbuojdgoee0mlnhq.lambda-url.ap-southeast-1.on.aws/?inputText=" + inputText,
        type: 'GET',
        success: function(response) {
            console.log(response['TranslatedText']);
            translatedText.value = response['TranslatedText'];
        }
    })
}

function showTranslate() {
	var translateTextBox = document.getElementById('translator');

	if(translateTextBox.style.display === "none") {
		translateTextBox.style.display = "block";
	} else {
		translateTextBox.style.display = "none";
	}
}


document.getElementById("postText").onkeyup = function(){
	var length = $(postText).val().length;
	document.getElementById("charCounter").textContent="Characters: " + length;
}

function logOut(){
	sessionStorage.removeItem("userName");
	sessionStorage.removeItem("email");
	window.location.href = "index.html";
}
