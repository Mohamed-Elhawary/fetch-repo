/* we will use the fetch API , to get the Repositories or data from an external website, the fetch API is just as JSON API and do the same thing .

the fetch API code structure is :
---------------------------------
fetch('http://the websiteName.com/the data or Repositories you want to get from the website')
  .then(y => y.json())
  .then(all-y => {your functions} );
  ---------------------------------------------------------------------------
  (y)     is a name you chose refers to :     the single one data of all data.
  (all-y) is a name you chose refers to : the all data
  ---------------------------------------------------------------------------
  - in our application here, we apply the fetch API to get the Repositories of the 
    users in Github website, and the link will be >>
	   
   (https://api.github.com/users/the userName that the person who use your application will enter in the input field/repos) , for example : https://api.github.com/users/ElzeroWebSchool/repos
*/

//define variables 

var input = document.querySelector('#get-repositories input'),
	button = document.querySelector('#get-repositories span'),
	repositoriesBox = document.getElementById("repositories");

button.onclick = function() {
	repositoriesFun();
}
	
//the repositories Function
function repositoriesFun() {
		
	if (input.value == "" || input.value == (" ") * 1) {
		repositoriesBox.innerHTML = `<span style="color: red"> Please Enter a Github Username !!</span>`
		
	} else {
		
		repositoriesBox.innerHTML = "";
		
		//get the Fitch API
		fetch(`https://api.github.com/users/${input.value}/repos`) 
		/*https://api.github.com/users/${input.value}/repos >> is the link that has all the repositories*/
  			.then(repos => repos.json())
  			.then((repositories) => {
			
				//forEach Loop 
				repositories.forEach(repository => {
					var mainDiv         = document.createElement('div'),
						theAvatarImg    = document.createElement('img'),
						theName         = document.createElement('a'),
						theHref         = document.createElement('a'),
					 	theStars        = document.createElement("span"),
						theForks        = document.createElement('span'),
						theWatchers     = document.createElement('span'),
						theStarsSign    = document.createElement('li'),
						theForksSign    = document.createElement("li"),
						theWatchersSign = document.createElement('li'),

						
						theNameText     = document.createTextNode(repository.name),
						theHrefText     = document.createTextNode("visit"),
						theStarsText    = document.createTextNode(repository.stargazers_count),
						theForksText    = document.createTextNode(repository.forks_count),
						theWatchersText = document.createTextNode(repository.watchers_count);
					
					
					theAvatarImg.src = `https://avatars2.githubusercontent.com/u/${repository.owner.id}?v=4`;
					theHref.href = `https://www.github.com/${input.value}/${repository.name}`;
					theHref.setAttribute('target', '_blank');
					theName.href = `https://www.github.com/${input.value}/${repository.name}`;
					theName.setAttribute('target', '_blank');
					theStarsSign.setAttribute('class', "fa fa-star");
					theForksSign.setAttribute('class', "fa fa-code-fork");
					theWatchersSign.setAttribute('class', "fa fa-eye");
					
					
					
					theHref.appendChild(theHrefText);
					theName.appendChild(theNameText);
					theStars.appendChild(theStarsSign);
					theStars.appendChild(theStarsText);
					theForks.appendChild(theForksSign);
					theForks.appendChild(theForksText);
					theWatchers.appendChild(theWatchersSign);
					theWatchers.appendChild(theWatchersText);
					
					
					mainDiv.appendChild(theAvatarImg);
					mainDiv.appendChild(theName);
					mainDiv.appendChild(theStars);
					mainDiv.appendChild(theForks);
					mainDiv.appendChild(theWatchers);
					mainDiv.appendChild(theHref);
										
					
					mainDiv.className     = "repo";
					theName.className     = "repo-name";
					theStars.className    = "repo-stars";
					theForks.className    = "repo-forks";
					theWatchers.className = "repo-watchers";
					theHref.className     =  "repo-href";
					
					repositoriesBox.appendChild(mainDiv);
				});
					wrongUsername();
			});		
	}
}

//If the user enter a wrong user name 
function wrongUsername () {
	if(repositoriesBox.childElementCount == 0) {
		var wrongSpan = document.createElement('span');
		var WrongText = document.createTextNode("Wrong Username, There is not Repositories for this Username in Github, Please Try again using the correct characters of the name and don't use Spaces between Words...");
		wrongSpan.appendChild(WrongText);
		repositoriesBox.appendChild(wrongSpan);
		wrongSpan.style.color = "red";
		wrongSpan.style.fontWeight = "bold";
	}
}

/*Trigger the Repositories button click on Enter Key (when you press enter it same as click the Repositories button)*/
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {  // 13 is the name code of the Enter key in the keyboard
   event.preventDefault();
   button.click();
  }
});
	
//remove the place holder when focus 
var placeholder = input.getAttribute("placeholder");
input.onfocus = function() {
	input.removeAttribute("placeholder");
}

//return the placeholder when blur
input.onblur = function() {
	input.setAttribute("placeholder", placeholder);
}