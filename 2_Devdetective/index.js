//variables 

const searchbar =document.querySelector(".searchbar-container");
const profilecontainer =document.querySelector(".profile-container");
const root = document.documentElement.style;
// this function for colling element from html 

const get=(param)=>document.getElementById(`${param}`);

const url = "https://api.github.com/users/";
const noresults =get("no-results");
const btnmode =get("btn-mode");
const modetext =get("mode-text");
const modeicon =get("mode-icon");
const btnsubmit  =get("submit");
const input =get("input");
const  avatar=get("avatar");
const userName =get("name");
const  user=get("user");
const date =get("date");
const  months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
const bio =get("bio");
const repos =get("repos");
const followers =get("followers");
const following =get("following");
const user_location =get("location");
const page =get("page");
const twitter =get("twitter");
const company =get("company");
let darkMode=false;


// event listeners

//on butten 

btnsubmit.addEventListener("click",function(){
    if(input.value!=="")
    {
        getUserData(url+input.value);
    }
});

// on input keydown 

input.addEventListener("keydown",
function(e){
    if(e.key=="Enter"){
        if(input.value!==""){
            getUserData(url+input.value);  
        }
    }
},
false
);

// on input to hide the noresult line 

input.addEventListener("input",function(){
    noresults.style.display="none";
});

//on button to change mode 
btnmode.addEventListener("click",function(){
    if(darkMode==false){
        darkModeProperties();
    }else{
        lightModeProperties();
    }
});

///required function 

//Api Call

function getUserData(gitUrl)
{
    fetch(gitUrl)
    .then((response)=>response.json()) // fetch an convert responce in json fomat
    .then((data)=>{
      
        updateProfile(data);
    })
    .catch((error)=>{
        throw error;
    });

};


//Render function

function updateProfile(data)
{
    //this condition for checking the user name if present or not 
    if(data.message !=="Not Found")
    {
        noresults.style.display="none";


        //this function for to check the given fild from git is empty or not 
        function checkNull(param1, param2){
            if(param1 === "" || param1 === null)
            {
                param2.style.opacity=0.5;
                param2.previousElementSibling.style.opacity = 0.5;
                return false;
            }
            else{
                return true;
            }
        }
    
        avatar.src=`${data.avatar_url}`;
        userName.innerText=data.name===null?data.login:data.name;
        user.innerText = `@${data.login}`;
        user.href=`${data.html_url}`;
        datesegments = data.created_at.split("T").shift().split("-");
        bio.innerText=data.bio==null?"This profile has no bio":`${data.bio}`;
        date.innerText=`Joined ${datesegments[2]} ${months[datesegments[1] - 1]} ${datesegments[0]}`;
        repos.innerText=`${data.public_repos}`;
        followers.innerText=`${data.followers}`;
        following.innerText=`${data.following}`;
        user_location.innerText=checkNull(data.location,user_location)?data.location:"Not Available";
        page.innerText=checkNull(data.blog,page)?data.blog:"Not Available";
        page.href=checkNull(data.blog,page)?data.blog:"#";
        twitter.innerText = checkNull(data.twitter_username, twitter) ? data.twitter_username : "Not Available";
        twitter.href = checkNull(data.twitter_username, twitter) ? `https://twitter.com/${data.twitter_username}` : "#";
        company.innerText = checkNull(data.company, company) ? data.company : "Not Available";
        searchbar.classList.toggle("active");
        profilecontainer.classList.toggle("active");
        
    }
    else
    {
        noresults.style.display="block";
    }
     
}

// dark and light mode function

//switch to dark mode 

function darkModeProperties()
{
    root.setProperty("--lm-bg","#141D2F");
    root.setProperty("--lm-bg-content","#1E2A47");
    root.setProperty("--lm-text","white");
    root.setProperty("--lm-text-alt","white");
    root.setProperty("--lm-shadow-xl","rgb(70,88,109,0.15)");
    modetext.innerText="LIGHT";
    modeicon.src="./assets/images/sun-icon.svg";
    root.setProperty("--lm-icon-bg","brightness(100%)");
    darkMode =true;
    localStorage.setItem("dark-mode",true);
};


// switch to light mode 

function lightModeProperties()
{
    root.setProperty("--lm-bg","#f6f8ff");
    root.setProperty("--lm-bg-content","#fefefe");
    root.setProperty("--lm-text","#4b6a9b");
    root.setProperty("--lm-text-alt","#2b3442");
    root.setProperty("--lm-shadow-xl","rgb(70,88,109,0.15)");
    modetext.innerText="DARK";
    modeicon.src="./assets/images/moon-icon.svg";
    root.setProperty("--lm-icon-bg","brightness(100%)");
    darkMode =false;
    localStorage.setItem("dark-mode",false);

}


//INITIALISE UI
function init() {
    //initialise dark-mode variable to false;
    //darkMode = true -> dark mode enable karna h 
    //darMode = false -> light mode enable karna h 
    darkMode = false;
  
    //HW
  // const prefersDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  
    const value = localStorage.getItem("dark-mode");
  
    if(value === null) {
      console.log("null k andar");
      localStorage.setItem("dark-mode", darkMode);
      lightModeProperties();
    }
    else if(value == "true") {
      console.log("truer k andar");
      darkModeProperties();
    }
    else if(value == "false") {
      console.log("false k andar");
      lightModeProperties();
    }
  
  
    //by default, pranaygupta ki info show krre h UI pr
    getUserData(url + "sagar-1608");
  }
  
  init();



