$(document).ready(function () {
    //This checkes what card is clicked ant then loads the corresponding card
    $("#backButton").hide();
    //Global variables
    var socialMediaHrefAdresses=["https://medium.com/dplus","https://twitter.com/Capt_dt","https://github.com/capdt"];
    var projectWebsiteHrefAdresses=["https://kuelii.com/","http://penguinerun.appspot.com/","http://zombie-attack.appspot.com/"];
    //todo
    var projectGitHrefAdresses=[];
    var loadCard;
    var colorChange;
    var experiencDataRecieved=false;
    var projectDataRecieved=false;
    var t0,t1;
    var cardClicked;
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
    //Register click listener for the cards in the main menu
    $(".button").click(function(){
        //Send card-item click data to google analytics 
        cardClicked=$(this).find("p").text();
        ga('send', 'event', {
                'eventCategory': 'Card item',
                'eventAction': 'click',
                'eventLabel': cardClicked
        });
        if(cardClicked=="PROFILE")
        {
            //get the time when the card was clicked
            t0=performance.now();
            loadCard="profile-card";
            colorChange="#009fd4"        
        }
        else if (cardClicked=="EXPERIENCE")
        {
             //get the time when the card was clicked
            t0=performance.now();
            loadCard="experience-card";
            colorChange="#8c3"
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
        }
         else if (cardClicked=="EDUCATION")
        {
             //get the time when the card was clicked
            t0=performance.now();
            loadCard="education-card";
            colorChange="#e67e30"
        } 
        else if (cardClicked=="PROJECTS")
        {
             //get the time when the card was clicked
            t0=performance.now();
            loadCard="project-card";
            colorChange="#de2643";
            //Makes sure we do not get new data if we have what we need
            if(!projectDataRecieved){
                //Call the get projects method and pass in a call back
                window.getProjects(myProjectCallBack);
            }
        }
        //If the resume tab is clicked then opena new tab with a link to the pdf file        
        else if (cardClicked=="RESUME"){
            loadCard="Null"
            var win = window.open("https://firebasestorage.googleapis.com/v0/b/dolapo-websiteapi.appspot.com/o/Dolapos%20Resume(2016)_updated_reduced.pdf?alt=media&token=9e84b5a3-4062-47c8-bd04-74a4f08f4dc1", '_blank');
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

    });
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
        console.log("time spent looking at " +cardClicked+" :"+timeSpent+ " miliseconds" )
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
        $("#backButton").css("background-color",colorChange);
        $(".leftColumn").css("background-color",colorChange);
        $(".leftLabel").css("background-color",colorChange);
    }
    //Callback method for creating the project detailed view when the asyncronus call to the api is made
    function myProjectCallBack(message){
         var output = message.items;
         console.log(output.length);
         //Get each project
         for(i = 0; i < output.length; i++){
             console.log(i);
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
        var expandedProjectTags=" ";
        var localTag=[];
        var previousComaLocation=0;
        var currentComaLocation=0;
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
        var doc='<div class="col-4of10 leftDisplayBox"> <iframe width="100" height="100" src="'+ videoUrl+'"></iframe> </div> <div class="col-6of10 rightDisplayBox cardSpacer"><div id="profile-cardMain"> <h1 class="leftTag projectTitle">'+projectTitle+'</h1> <div class="underline"></div> <p class="paragraphWhite kick">'+projectDescription+'</p> <h1 class="leftTag projectDetails"> Project details</h1> <div class="underline"></div> <div class="col-10of10" id="projectDetails"> <div class="col-3of10 projectDetailsItems marginProjectDetails" id="projectTagSection"> '+expandedProjectTags+'</div> <div class="col-3of10 projectDetailsItems" id="websiteSection"> <a href="'+projectUrl+'" target="-blank">Project website</a> </div> <div class="col-3of10 projectDetailsItems" id="gitProjectSection"> <a id="repo" href="'+projectRepo+'" target="_blank" class="fade2"><img src="img/icons/github-logo.svg" width="30px"></a> </div> </div> </div> </div> </div>';
        //Get the project detailed view section and add this data to it.
        var d1 = document.getElementById('project-card');
        //Incsert the html content
        d1.insertAdjacentHTML('beforeend', doc);
        //Ensure we dont have to run this method a second time when the page is reloaded
        projectDataRecieved=true;
    }
    //Method to generate the the experience detailed view and add it to the index.html document
    function createExperienceCard(image,company,role,workDetails){
        //Defaulf varibles for creating the detailed experience view 
        var pathToImage="img/skynation.png";
        var id="defaultCompanyImage";
        //Change defaulf variables if the name of the company is sfu
        if(company=="Simon Fraser University"){
            pathToImage="img/sfuImage.jpg";
            id="sfuImage";
        }
        //Fill the boilerplate layout with data
        var doc='<div class="col-4of10 leftDisplayBox"> <img  id= '+id+' class="companyImage" src='+pathToImage+' alt="Company image"> </div> <div class="col-6of10 rightDisplayBox cardSpacer"> <!--<span class="glyphicon glyphicon-user white" aria-hidden="true"></span>--> <div id="profile-cardMain"> <!--<p class="leftTag">Profile</p>--> <!--<div class="underline"></div>--> <table> <tr> <td class="leftColumn">Comapany</td> <td class="rightColumn">'+company+'</td> </tr> <tr class="spacer"></tr> <tr> <td class="leftColumn">Role</td> <td class="rightColumn">'+role+'</td> </tr> <tr class="spacer"></tr> <!--<tr> <td class="leftColumn">Ocupation</td> <td class="rightColumn"> Student </td> </tr>--> <tr class="spacer"></tr> </table> <p class="leftTag projectDetails">Work Details</p> <div class="underline"></div> <p class="kick">'+workDetails+'</p> </div> </div> ';
        var d2 = document.getElementById('experience-card');
        d2.insertAdjacentHTML('beforeend',doc);
         //Ensure we dont have to run this method a second time when the page is reloaded
        experiencDataRecieved=true;
    }
    //Typed.js script to animate the bio
    $(function(){
        $("#typed").typed({
            stringsElement: $('#typed-strings'),
            typeSpeed: 40,
            backDelay: 500,
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

    function foo(){ console.log("Callback"); }
    /************************************** */
});

   