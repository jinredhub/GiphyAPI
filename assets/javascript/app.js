
			var topics = ["witch", "skull", "zombie", "ghost", "spider", "mummy", "coffin", "haunted house", "frankenstein" ];
			var cameraIsOn = false;

			$("#submitBtn").on("click", function(event){
				console.log("submit btn clicked");
				event.preventDefault();
				var animalName = $("#textAnimalName").val();
				topics.push(animalName);
				renderBtns();
			});

			function renderBtns(){
				console.log("rendering buttons");
				$("#animalBtns").empty();
				for (var i=0; i<topics.length; i++){
					newBtn = $("<button>");
					newBtn.text(topics[i]);
					newBtn.addClass("btn");
					$("#animalBtns").append(newBtn);
				}
			}

			$(document).on("click", ".btn", function(){
				console.log("btn clicked");
				renderRequest(this);
				turnBgImgLight();
				playScaryAudio();
			});

			// $(document).on("click", ".btn", renderRequest);

			function renderRequest(that){
				console.log("rendering request");
				$("#gifResult").empty();

				var animal = $(that).text();
				var queryURL = "https://api.giphy.com/v1/gifs/search";

				queryURL += "?" + $.param({
					"api_key": "1bafd13581464249a37388d6d55fe348",
					"q": animal,
					"limit": 10,
					"rating": "pg",
				});

				$.ajax({
					url: queryURL,
					method: "GET",
				}).done(function(response){
					console.log(response.data);

					// response.data[i].images.fixed_height.url
					// response.data[i].images.fixed_height_still.url

					for (var i=0; i<response.data.length; i++){
						var newDiv = $("<div>");
						var newImg = $("<img>");
						var newSpan = $("<span>");
						// newDiv.html("<img src='" + response.data[i].images.fixed_height_still.url + "''>");
						newImg.attr({"data-state":"still", "src":response.data[i].images.fixed_width_still.url, "data-still":response.data[i].images.fixed_width_still.url, "data-animate":response.data[i].images.fixed_width.url});
						newImg.addClass("gif");
						newSpan.text(response.data[i].rating);

						newDiv.append(newImg);
						newDiv.append("<br>");
						newDiv.append(newSpan);
						$("#gifResult").append(newDiv);
					}
				});
			}

			$(document).on("click", ".gif", function(){
				console.log("img clicked");
				if ($(this).attr("data-state") === "still"){
					console.log("still");
					$(this).attr("src", $(this).attr("data-animate"));
					$(this).attr("data-state", "animate");
				}
				else {
					console.log("animate");
					$(this).attr("src", $(this).attr("data-still"));
					$(this).attr("data-state", "still");
				}
			});

			function turnBgImgDark(){
				if(cameraIsOn === true){
					console.log("change bgImg to dark");
					$("#bgImg").css("background-image", "url(assets/images/bgDark.jpg)");
					cameraIsOn = false;
				}
			}

			function turnBgImgLight(){
				if (cameraIsOn === false){
					console.log("change bgImg to light");
					$("#bgImg").css("background-image", "url(assets/images/bgLight.jpg)");
					cameraIsOn = true;
				}
			}

			var audioScary = document.getElementById("scaryAudio");
			function playScaryAudio(){
				audioScary.play();
			}

			$("#stopBtn").on("click", function(event){
				event.preventDefault();
				console.log("stopBtn pressed");
				audioScary.pause();
				$("#gifResult").empty();
				turnBgImgDark();

			})

			renderBtns();

