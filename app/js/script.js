//This checkes what card is clicked ant then loads the corresponding card
$("#backButton").hide();
//Global variables
var socialMediaHrefAdresses=["https://medium.com/dplus","https://twitter.com/Capt_dt","https://github.com/capdt"];
var projectWebsiteHrefAdresses=["https://kuelii.com/","http://penguinerun.appspot.com/","http://zombie-attack.appspot.com/"];
var projectGitHrefAdresses=["https://github.com/Capdt/penguinRunDemoRepo","https://github.com/Capdt/zombieAttackDemoRepo"," https://github.com/Capdt/kueliiDemoRepo"];
var loadCard;
var colorChange;
var experiencDataRecieved=false;
var projectDataRecieved=false;
var t0,t1;
var k=0;
var nullTimes=0;
var cardClicked;
var allowRun=false;
var profileButtonMovement=[];
var cards=['profileButton','experienceButton','projectWindow','contactButton','educationButton','resumeButton'];
var browserStack=[];
var onCards=false;
//animation that runs every 12 seconds
setInterval(function(){
    //get the class on the main menu item
    var temp=$('#mainMenu').attr('class');
    var temp2="";
    //run a for loop to get the first class attached to the mainMenu
    for(var i=0;i<temp.length;i++){
        if(temp[i]==" "){
            break;
        }
        else{
            temp2+=temp[i];
        }
    }
    k=0;
    //Run the shuffle animation if the screen of the window is greater than 550 and the user is not hovering over a card
    if (!onCards){
        if($(document).width()>550){
            if(temp2=="active"){
                shuffleCard2(cards[getRandomInt(0,5)],getRandomInt(2,4));
            }
        }
    }
}, 15000);
//when you enter the mainMenu set on cards variable to true 
document.getElementById("mainMenu").addEventListener("mouseenter", function(){
    onCards=true;
});
//when you leave the mainMenu set on cards variable to false
document.getElementById("mainMenu").addEventListener("mouseleave", function(){
    onCards=false;
});
//Register onclick listener
$("a").click(function(){
    var hrefValue=$(this).attr("href");
    //Go through the href values 
    switch(hrefValue){
        //Send a link click event to google analytics
        case  socialMediaHrefAdresses[0]:
            ga('send', 'event', {
                'eventCategory': 'Links',
                'eventAction': 'click',
                'eventLabel': "Medium blog viewed"
            });
            
            case  socialMediaHrefAdresses[1]:
            ga('send', 'event', {
                'eventCategory': 'Links',
                'eventAction': 'click',
                'eventLabel': "Twitter account viewed"
            });
            case  socialMediaHrefAdresses[2]:
            ga('send', 'event', {
                'eventCategory': 'Links',
                'eventAction': 'click',
                'eventLabel': "Github account viewed"
            });

        default:
        //do nothing
    }
});
enableClickListner();
//Register click listener for the cards in the main menu
function enableClickListner(){
    $(".button").click(function(){
        //Send card-item click data to google analytics 
        cardClicked=$(this).find("p").text();
        ga('send', 'event', {
                'eventCategory': 'Card item',
                'eventAction': 'click',
                'eventLabel': cardClicked
        });
        if(cardClicked=="ABOUT ME")
        {
            //get the time when the card was clicked
            t0=performance.now();
            loadCard="profile-card";
            colorChange="#009fd4"
            browserStack.push("profile-card");        
        }
        else if (cardClicked=="EXPERIENCE")
        {
            //get the time when the card was clicked
            t0=performance.now();
            loadCard="experience-card";
            colorChange="#8c3"
            browserStack.push("experience-card");
            if(!experiencDataRecieved){
                window.getExperience(myExperienceCallBack);
            }
            
        }
        else if (cardClicked=="CONTACT ME")
        {
            // get the time when the card was clicked
            t0=performance.now();
            loadCard="contact-card";
            colorChange="#e6c32d"
            browserStack.push("contact-card");
        }
        else if (cardClicked=="EDUCATION")
        {
            //get the time when the card was clicked
            t0=performance.now();
            loadCard="education-card";
            colorChange="#e67e30"
            browserStack.push("education-card");
        } 
        else if (cardClicked=="PROJECTS")
        {
            //get the time when the card was clicked
            t0=performance.now();
            loadCard="project-card";
            colorChange="#de2643";
            browserStack.push("project-card");
            //Makes sure we do not get new data if we have what we need
            if(!projectDataRecieved){
                //Call the get projects method and pass in a call back
                window.getProjects(myProjectCallBack);
            }
        }
        //If the resume tab is clicked then opena new tab with a link to the pdf file        
        else if (cardClicked=="RESUME"){
            loadCard="Null"
            var win = window.open("https://firebasestorage.googleapis.com/v0/b/dolapo-websiteapi.appspot.com/o/Dolapos%20Resume_2016_final2.pdf?alt=media&token=88436c87-b67d-4d05-8869-21e461cf1c91", '_blank');
            win.focus();
        }
        // Animate transition to detailed view.
        if(loadCard!="Null")
        {
            //Remove the main menu
            $("#mainMenu").attr("class","deactivate");
            setTimeout(cardTransition,500);
            //Add the detailed view
            $("#"+loadCard).addClass("popin");
            $("#backButton").addClass("popin");
            //change the color of the back button to that of the card
            matchColor();
        }
        else{
            goToDesccription();
        }
        //Listen for a page change event
        window.onpopstate=function()
        {   //If the stack greater than 0 then there we're in a card
            if(browserStack.length>0){
                ///If the location on the browser afer the hash is pointing to the description
                if (window.location.hash=="#toTheDescription"){
                    //remove the detailed view and load the main menu
                    $("#"+loadCard).addClass("display-none");
                    $("#mainMenu").attr("class","active");
                    $("#backButton").hide();
                    //Remove item from stack
                    browserStack.pop();
                }
                //IF the hash is empty then we are trying to go back to the main menu
                else if(window.location.hash==""){
                    $("#"+loadCard).addClass("display-none");
                    $("#mainMenu").attr("class","active");
                    $("#backButton").hide();
                    //Remove item from stack
                    browserStack.pop();
                }
                
            }
        }
    });
}
function cardTransition(){
    $("#backButton").show();
    $("#mainMenu").addClass("display-none");
    // last thing i do is deactivate the menu so i can see the animation play propelly.
    $("#"+loadCard).removeClass("display-none");
};
// Back button this disables the -card and loads the the mainMenu cards
$("#backButton").click(function(){
    // get the time when the back button was pressed 
    t1=performance.now();
    var timeSpent=t1-t0;
    //console.log("time spent looking at " +cardClicked+" :"+timeSpent+ " miliseconds" )
    //send time spent looking at the page to google analytics
    ga('send', {
        hitType: 'timing',
        timingCategory: cardClicked,
        timingVar: 'time-spent',
        timingValue: timeSpent
    });
    //Remove the detailed view and load the main menu
    $("#"+loadCard).addClass("display-none");
    $("#mainMenu").attr("class","active");
    $("#backButton").hide();
    goToDesccription();



});
$(".button").click(function(){
    //Incase it's a mobile device it moves back button directly to the top 
    if(loadCard!="Null"){
        setTimeout(goToButton,500);
    }

});
//When the view is shrunk this makes the content in the setailed view srart with the back button at the top of the screen
function goToButton(){
    window.location.href = '#toTheButton';
}
//When the view is shrunk this makes the content srart with profile view at the top
function goToDesccription(){
    window.location.href = '#toTheDescription';
}
//Change color of back button
function matchColor(){
    $("#backButton").css("background-color","#8c8c8c");
    $(".leftColumn").css("background-color",colorChange);
    $(".leftLabel").css("background-color",colorChange);
}
//Callback method for creating the project detailed view when the asyncronus call to the api is made
function myProjectCallBack(message){
        var output = message.items;
        //console.log(output.length);
        //Get each project
        for(i = 0; i < output.length; i++){
            //console.log(i);
            createProject(output[i].videoUrl,output[i].projectTitle,output[i].description,output[i].technolgyUsed,output[i].websiteLink,output[i].gitHubUrl);
        }
        //Add click listner for the a tags after the projects have been loaded. needs to be done here after the html has been added 
    $("a").click(function(){
        var hrefValue=$(this).attr("href");
    //console.log(hrefValue);
    switch(hrefValue){
        case  projectWebsiteHrefAdresses[0]:
            ga('send', 'event', {
                'eventCategory': 'Links',
                'eventAction': 'click',
                'eventLabel': "Kuelii website viewed"
            });
            
            case  projectWebsiteHrefAdresses[1]:
            ga('send', 'event', {
                'eventCategory': 'Links',
                'eventAction': 'click',
                'eventLabel': "Penguin run game viewed"
            });
            case  projectWebsiteHrefAdresses[2]:
            ga('send', 'event', {
                'eventCategory': 'Links',
                'eventAction': 'click',
                'eventLabel': "Zombie attack game viewed"
            });

        default:
        //do nothing
        }
    });
}
//Callback method for creating a experience detailed view when the asyncronus call to the api is made
function myExperienceCallBack(message){
        var output = message.items;
        for(i=0;i<output.length;i++){
            createExperienceCard(" ",output[i].company,output[i].role,output[i].workDetails);
        }
}
//Method to generate the the project detailed view and add it to the index.html document
function createProject(videoUrl,projectTitle,projectDescription,projectTags,projectUrl,projectRepo){
    //Local Variables
    var uid="";
    var expandedProjectTags=" ";
    var localTag=[];
    var previousComaLocation=0;
    var currentComaLocation=0;
    for (var index=0;index<projectTitle.length;index++){
        if(projectTitle[index]!=" "){   
            uid=uid+projectTitle[index];
                //console.log("uid ="+uid);
        }
        else{
            //console.log("final uid = "+uid);
            //console.log(uid.length);
            break;
        }

    }
    //Run throug the length of the project tags
    for(j=0;j<=projectTags.length;j++){
        //Search for a coma aymbol
        if(projectTags[j]==','){
            currentComaLocation=j;
            //Push new found tag into localTag array
            localTag.push(projectTags.substring(previousComaLocation,currentComaLocation));
            //The previous locaiton is now the current location
            previousComaLocation=currentComaLocation+1;
        }
        //Add the last tag afer the coma
        if(j==projectTags.length){
            localTag.push(projectTags.substring(previousComaLocation,j));
        }
    }
    //Generate html code for each tag
    for(k=0;k<localTag.length;k++){
        var item= '<P class="tagParagraphWhite">'+localTag[k]+'</P>';
        expandedProjectTags=expandedProjectTags.concat(item);
    }
    //Fill boilerplate layout with the data recieved  
    var doc='<div class="col-4of10 leftDisplayBox"> <iframe width="200" height="200" src="'+videoUrl+'" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> </div> <div class="col-6of10 rightDisplayBox cardSpacer"><div id="profile-cardMain"> <h1 class="leftTag projectTitle">'+projectTitle+'</h1> <div class="underline"></div> <p class="paragraphWhite kick">'+projectDescription+'</p> <h1 class="leftTag projectDetails"> Project details</h1> <div class="underline"></div> <div class="col-10of10" id="projectDetails"> <div class="col-3of10 projectDetailsItems marginProjectDetails" id="projectTagSection"> '+expandedProjectTags+'</div> <div class="col-3of10 projectDetailsItems" id="websiteSection"> <button type="button" class="websiteProjectButton fade2" id="projectButton'+uid+'">Website</button> </div> <div class="col-3of10 projectDetailsItems" id="gitProjectSection"> <a id="repo" href="'+projectRepo+'" target="_blank" class="fade2"><img src="img/icons/github-logo.svg" width="30px"></a> </div> </div> </div> </div> </div>';
    //Get the project detailed view section and add this data to it.
    var d1 = document.getElementById('project-card');
    //Incsert the html content
    d1.insertAdjacentHTML('beforeend', doc);
    //Ensure we dont have to run this method a second time when the page is reloaded
    projectDataRecieved=true;
    
    $('#projectButton'+uid).click(function(){
        var win = window.open(projectUrl, '_blank');
        win.focus();
    });
}
//Method to generate the the experience detailed view and add it to the index.html document
function createExperienceCard(image,company,role,workDetails){
    //Defaulf varibles for creating the detailed experience view 
    var pathToImage="img/skynation.png";
    var id="defaultCompanyImage";
    //Change defaulf variables if the name of the company is sfu
    if(company=="Simon Fraser University"){
        pathToImage="img/sfuImage.png";
        id="sfuImage";
    }
    //Fill the boilerplate layout with data
    var doc='<div class="col-4of10 leftDisplayBox"> <img  id= '+id+' class="companyImage" src='+pathToImage+' alt="Company image"> </div> <div class="col-6of10 rightDisplayBox cardSpacer"> <!--<span class="glyphicon glyphicon-user white" aria-hidden="true"></span>--> <div id="profile-cardMain"> <!--<p class="leftTag">Profile</p>--> <!--<div class="underline"></div>--> <table> <tr> <td class="leftColumn">Comapany</td> <td class="rightColumn">'+company+'</td> </tr> <tr class="spacer"></tr> <tr> <td class="leftColumn">Role</td> <td class="rightColumn">'+role+'</td> </tr></table><p class="leftTag projectDetails">Work Details</p> <div class="underline"></div> <p class="kick">'+workDetails+'</p> </div> </div> ';
    var d2 = document.getElementById('experience-card');
    d2.insertAdjacentHTML('beforeend',doc);
    //Need to let the call match color after the card is loaded
    matchColor();
        //Ensure we dont have to run this method a second time when the page is reloaded
    experiencDataRecieved=true;
}
//Typed.js script to animate the bio
$(function(){
    $("#typed").typed({
        stringsElement: $('#typed-strings'),
        typeSpeed: 25,
        backDelay: 2000,
        loop: false,
        contentType: 'html', // or text
        // defaults to false for infinite loop
        loopCount: false,
        callback: function(){ foo(); },
        resetCallback: function() { newTyped(); }
    });

    $(".reset").click(function(){
        $("#typed").typed('reset');
    });

});

function newTyped(){ /* A new typed object */ }
//call back method after the words have finished their animation
function foo(){ 
    
    }
/************************************** */
//Click listner for the test shuffle button on the html
$("#testButton").click(function(){
    shuffleCard2("profileButton",10);

});

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//Shuffle card usisng zoomin and out effect
function shuffleCard(card1Id,card2Id){
    //animate the cards leaving 
    $("#"+card1Id).addClass('animated  zoomOut');
    $("#"+card2Id).addClass('animated  zoomOut');
    
    //Get the items
    var card1Name=document.getElementById(card1Id+"Text").innerHTML;
    var card1Icon=document.getElementById(card1Id+"Icon").className;
    var card1Color=(window.getComputedStyle(document.getElementById(card1Id))).getPropertyValue('background-color');
    //Get the second ites details
    var card2Name=document.getElementById(card2Id+"Text").innerHTML;
    var card2Icon=document.getElementById(card2Id+"Icon").className;
    var card2Color=(window.getComputedStyle(document.getElementById(card2Id))).getPropertyValue('background-color');;

    $("#"+card2Id).one(' mozAnimationEnd MSAnimationEnd oanimationend animationend',function(){
    
        $("#"+card1Id).removeClass('zoomOut');
        $("#"+card2Id).removeClass('zoomOut');
        
        //Switch the items
        document.getElementById(card1Id+"Text").innerHTML=card2Name;
        document.getElementById(card1Id+"Icon").className=card2Icon;
        document.getElementById(card1Id).style.backgroundColor=card2Color;

        document.getElementById(card2Id+"Text").innerHTML=card1Name;
        document.getElementById(card2Id+"Icon").className=card1Icon;
        document.getElementById(card2Id).style.backgroundColor=card1Color;
        
        $("#"+card1Id).addClass('animated  zoomIn');
        $("#"+card2Id).addClass('animated  zoomIn');
        $("#"+card2Id).one('mozAnimationEnd MSAnimationEnd oanimationend animationend',function(){
            $("#"+card1Id).removeClass('zoomIn');
            $("#"+card2Id).removeClass('zoomIn');
        });
        
    });
}
//Shuffle card using card slideing effect
function shuffleCard2(card1Id,times){
    //The the index of the card passed in
    var indexOfCard=cards.indexOf(card1Id);
    //array to hold the possibleDirections that can be moved to based on the card selected
    var possibleDirection=[];
    switch(indexOfCard){
        case 0:
                possibleDirection.push("right");
                possibleDirection.push("down");
                break;
        case 1:
                possibleDirection.push("right");
                possibleDirection.push("left");
                possibleDirection.push("down");
                break;
        case 2:
                possibleDirection.push("left");
                possibleDirection.push("down");
                break;
        case 3:
                possibleDirection.push("right");
                possibleDirection.push("up");
                break;
        case 4:
                possibleDirection.push("right");
                possibleDirection.push("left");
                possibleDirection.push("up");
                break;
        case 5:
                possibleDirection.push("left");
                possibleDirection.push("up");
                break;
            default:
                //do nothing
                break;
    }
    //chose a card to switch with
    var cardToShuffleWith=possibleDirection[getRandomInt(0,(possibleDirection.length)-1)];
    //Perform switch animation based on the card that you chose to switch with
    switch(cardToShuffleWith){
        case "down":
                //console.log("shuffle with down");
                var indexOftempCard1=cards.indexOf(card1Id);
                var indexOftempCard2=cards.indexOf(card1Id)+3;
                
                var card2Id=cards[indexOftempCard2];
                
                //run anim
                $("#"+card1Id).addClass('animated  slideOutDown');
                $("#"+card2Id).addClass('animated  slideOutUp');
                //change the datastructure in the card
                var cardvalue1=cards[indexOftempCard1];
                cards[indexOftempCard1]=cards[indexOftempCard2];
                cards[indexOftempCard2]=cardvalue1;
                break;
            case "right":
                //console.log("shuffle with right");
                var indexOftempCard1=cards.indexOf(card1Id);
                var indexOftempCard2=cards.indexOf(card1Id)+1;
                
                var card2Id=cards[indexOftempCard2];
                
                //run anim
                $("#"+card1Id).addClass('animated  slideOutRight');
                $("#"+card2Id).addClass('animated  slideOutLeft');
                //change the datastructure in the card
                var cardvalue1=cards[indexOftempCard1];
                cards[indexOftempCard1]=cards[indexOftempCard2];
                cards[indexOftempCard2]=cardvalue1;
                
                break;
            case "left":
                //console.log("shuffle with left");
                var indexOftempCard1=cards.indexOf(card1Id);
                var indexOftempCard2=cards.indexOf(card1Id)-1;
                
                var card2Id=cards[indexOftempCard2];
                
                //run anim
                $("#"+card1Id).addClass('animated  slideOutLeft');
                $("#"+card2Id).addClass('animated  slideOutRight');
                //change the datastructure in the card
                var cardvalue1=cards[indexOftempCard1];
                cards[indexOftempCard1]=cards[indexOftempCard2];
                cards[indexOftempCard2]=cardvalue1;

                break;
            case "up":
                //console.log("shuffle with up");
                var indexOftempCard1=cards.indexOf(card1Id);
                var indexOftempCard2=cards.indexOf(card1Id)-3;        
                var card2Id=cards[indexOftempCard2];
                //change the datastructure in the card
                var cardvalue1=cards[indexOftempCard1];
                cards[indexOftempCard1]=cards[indexOftempCard2];
                cards[indexOftempCard2]=cardvalue1;           
                //run anim
                $("#"+card1Id).addClass('animated  slideOutUp');
                $("#"+card2Id).addClass('animated  slideOutDown');    
                break;    
            default:
                break;
            }
        
        //console.log('k ='+k);
        k++;
        //Register callback that keeps on calling the method the ammount of times neesed;
        $('#'+card1Id).one('mozAnimationEnd MSAnimationEnd oanimationend animationend',function(){
            if(k<times){
                rewriteButtons(cards);
                var temp=times;
                shuffleCard2(cards[getRandomInt(0,5)],temp);
            }
            else{
                rewriteButtons(cards);
            } 
        });      
    }
    //This mehtod rewrites the html code for the main menu after every card is swapped needed so that the animations 
    //can be rerun again because the effect of the class cannot be added multiple times to the html;
    function rewriteButtons(array){
        //console.log(array);
        var doc1=''
        var doc2='';
        for (i=0; i<3; i++){
            if(array[i]=='profileButton'){
                doc1=doc1+'<div class="col-3of10 button" id="profileButton"> <p id="profileButtonText">ABOUT ME</p> <span id="profileButtonIcon" class="glyphicon glyphicon-user white" aria-hidden="true"></span> </div>';
            }
            else if(array[i]=='experienceButton'){
                doc1=doc1+'<div class="col-3of10 button cardLoaded" id="experienceButton"> <p id="experienceButtonText">EXPERIENCE</p> <span id="experienceButtonIcon" class="glyphicon glyphicon-briefcase white" aria-hidden="true"></span> </div>';
            }
            else if(array[i]=='projectWindow'){
                doc1=doc1+'<div class="col-3of10 button cardLoaded" id="projectWindow"><p id="projectWindowText">PROJECTS</p> <span id="projectWindowIcon" class="glyphicon glyphicon-folder-close white" aria-hidden="true"></span> </div>';
            }
            else if(array[i]=='contactButton'){
                doc1=doc1+'<div class="col-3of10 button" id="contactButton"><p id="contactButtonText">CONTACT ME</p><span id="contactButtonIcon" class="glyphicon glyphicon-send white" aria-hidden="true"></span> </div>';
            }
            else if(array[i]=='educationButton'){
                doc1=doc1+'<div class="col-3of10 button" id="educationButton"><p id="educationButtonText">EDUCATION</p><span id="educationButtonIcon" class="glyphicon glyphicon-book white" aria-hidden="true"></span> </div>';
            }
            else if(array[i]=='resumeButton'){
                doc1=doc1+'<div class="col-3of10 button" id="resumeButton" > <p id="resumeButtonText">RESUME</p> <span id="resumeButtonIcon" class="glyphicon glyphicon-download white" aria-hidden="true"></span> </div>';
            }
        }
        for (j=3;j<6;j++){
            if(array[j]=='profileButton'){
                doc2=doc2+'<div class="col-3of10 button" id="profileButton"> <p id="profileButtonText">ABOUT ME</p> <span id="profileButtonIcon" class="glyphicon glyphicon-user white" aria-hidden="true"></span> </div>';
            }
            else if(array[j]=='experienceButton'){
                doc2=doc2+'<div class="col-3of10 button cardLoaded" id="experienceButton"> <p id="experienceButtonText">EXPERIENCE</p> <span id="experienceButtonIcon" class="glyphicon glyphicon-briefcase white" aria-hidden="true"></span> </div>';
            }
            else if(array[j]=='projectWindow'){
                doc2=doc2+'<div class="col-3of10 button cardLoaded" id="projectWindow"> <p id="projectWindowText">PROJECTS</p> <span id="projectWindowIcon" class="glyphicon glyphicon-folder-close white" aria-hidden="true"></span> </div>';
            }
            else if(array[j]=='contactButton'){
                doc2=doc2+'<div class="col-3of10 button" id="contactButton"> <p id="contactButtonText">CONTACT ME</p> <span id="contactButtonIcon" class="glyphicon glyphicon-send white" aria-hidden="true"></span> </div>';
            }
            else if(array[j]=='educationButton'){
                doc2=doc2+'<div class="col-3of10 button" id="educationButton" > <p id="educationButtonText">EDUCATION</p> <span id="educationButtonIcon" class="glyphicon glyphicon-book white" aria-hidden="true"></span> </div>';
            }
            else if(array[j]=='resumeButton'){
                doc2=doc2+'<div class="col-3of10 button" id="resumeButton" > <p id="resumeButtonText" >RESUME</p> <span id="resumeButtonIcon" class="glyphicon glyphicon-download white" aria-hidden="true"></span> </div>';
            }
        }
        document.getElementById('firstRow').innerHTML = doc1;
        document.getElementById('secondRow').innerHTML = doc2;
        enableClickListner();
        //console.log(doc1);
        //console.log(doc2);
    }
//end of doc