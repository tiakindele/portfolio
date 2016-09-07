$(document).ready(function () {
    //This checkes what card is clicked ant then loads the corresponding card
    $("#backButton").hide();
    var loadCard;
    var colorChange;
    var experiencDataRecieved=false;
    var projectDataRecieved=false;
    $(".button").click(function(){
        var cardClicked=$(this).find("p").text();
        if(cardClicked=="PROFILE")
        {
            loadCard="profile-card";
            colorChange="#009fd4"
            //alert(loadCard);
        }
        else if (cardClicked=="EXPERIENCE")
        {
            loadCard="experience-card";
            colorChange="#8c3"
            if(!experiencDataRecieved){
                window.getExperience(myExperienceCallBack);
            }
            
            //alert(loadCard);
        }
        else if (cardClicked=="CONTACT ME")
        {
            loadCard="contact-card";
            colorChange="#e6c32d"
            //alert(loadCard);

        }
         else if (cardClicked=="EDUCATION")
        {
            loadCard="education-card";
            colorChange="#e67e30"
            //colorChange="rgba(235, 116, 27, 0.87)"
            //alert(loadCard);
        }
        else if (cardClicked=="PROJECTS")
        {
            loadCard="project-card";
            colorChange="#de2643"
            //alert(loadCard);
            // window.getProjects();
            if(!projectDataRecieved){
                window.getProjects(myProjectCallBack);
            }
           
            
            //console.log(JSON.stringify(window.getProjects()));
            // JSON.parse();
        }
        else if (cardClicked=="RESUME"){
            loadCard="Null"
            var win = window.open("https://firebasestorage.googleapis.com/v0/b/dolapo-websiteapi.appspot.com/o/Dolapos%20Resume(2016)_updated_reduced.pdf?alt=media&token=9e84b5a3-4062-47c8-bd04-74a4f08f4dc1", '_blank');
            win.focus();
        }
        // This runs a series of steps to see the transition animation you see.
        if(loadCard!="Null")
        {

            $("#mainMenu").attr("class","deactivate");
            setTimeout(dothis,500);

            $("#"+loadCard).addClass("popin");
            $("#backButton").addClass("popin");
            matchColor();
        }
        else{
            goToDesccription();
        }

    });
    function dothis(){
        $("#backButton").show();
        $("#mainMenu").addClass("display-none");
        // last thing i do is deactivate the menu so i can see the animation play propelly.
        $("#"+loadCard).removeClass("display-none");
    };
    // Back button this disables the -card and loads the the mainMenu cards
    $("#backButton").click(function(){
        $("#"+loadCard).addClass("display-none");
        $("#mainMenu").attr("class","active");
        $("#backButton").hide();
        goToDesccription();

    });
    $(".button").click(function(){
        // Incase it's a mobile device it moves back button directly to the top 
        if(loadCard!="Null"){
            setTimeout(goToButton,500);
        }

    });
    function goToButton(){
        window.location.href = '#toTheButton';
    }
    function goToDesccription(){
        window.location.href = '#toTheDescription';
    }
    function matchColor(){
        $("#backButton").css("background-color",colorChange);
        $(".leftColumn").css("background-color",colorChange);
        $(".leftLabel").css("background-color",colorChange);
    }
    // call back method when the asyncronus call to the api is made
    function myProjectCallBack(message){
         //console.log(message);
         var output = message.items;
         console.log(output.length);
         //get each project
         for(i = 0; i < output.length; i++){
             console.log(i);
             //console.log(output[i]);
             //document.getElementById("projectTitle").innerHTML=output[i].projectTitle;
             console.log("run");
             createProject(output[i].videoUrl,output[i].projectTitle,output[i].description,output[i].technolgyUsed,output[i].websiteLink,output[i].gitHubUrl);
         }

    }
    function myExperienceCallBack(message){
         //console.log(message);
         var output = message.items;
         //console.log(output.length);
         //get each project
         for(i=0;i<output.length;i++){
             //console.log(output[i]);
             //document.getElementById("projectTitle").innerHTML=output[i].projectTitle;
             
             createExperienceCard(" ",output[i].company,output[i].role,output[i].workDetails);
         }

    }
    function createProject(videoUrl,projectTitle,projectDescription,projectTags,projectUrl,projectRepo){
       //console.log(projectTitle);
        var expandedProjectTags=" ";
        var localTag=[];
        var previousComaLocation=0;
        var currentComaLocation=0;
        console.log(projectTags);
        for(j=0;j<=projectTags.length;j++){
            if(projectTags[j]==','){
                //console.log("found coma");
                currentComaLocation=j;
                //take substring from previous to current loacation
                localTag.push(projectTags.substring(previousComaLocation,currentComaLocation));
                //console.log(localTag);
                previousComaLocation=currentComaLocation+1;
            }
            if(j==projectTags.length){
                localTag.push(projectTags.substring(previousComaLocation,j));
                //console.log(localTag);
            }
        }
        for(k=0;k<localTag.length;k++){
           var item= '<P class="tagParagraphWhite">'+localTag[k]+'</P>';
           expandedProjectTags=expandedProjectTags.concat(item);
           //console.log(expandedProjectTags);
        }
        
        var doc='<div class="col-4of10 leftDisplayBox"> <iframe width="100" height="100" src="'+ videoUrl+'"></iframe> </div> <div class="col-6of10 rightDisplayBox cardSpacer"><div id="profile-cardMain"> <h1 class="leftTag projectTitle">'+projectTitle+'</h1> <div class="underline"></div> <p class="paragraphWhite kick">'+projectDescription+'</p> <h1 class="leftTag projectTitle"> Project details</h1> <div class="underline"></div> <div class="col-10of10" id="projectDetails"> <div class="col-3of10 projectDetailsItems marginProjectDetails" id="projectTagSection"> '+expandedProjectTags+'</div> <div class="col-3of10 projectDetailsItems" id="websiteSection"> <a href="'+projectUrl+'">Project website</a> </div> <div class="col-3of10 projectDetailsItems" id="gitProjectSection"> <a href="'+projectRepo+'" target="_blank" class="fade2"><img src="img/icons/github-logo.svg" width="30px"></a> </div> </div> </div> </div> </div>';
        var d1 = document.getElementById('project-card');
        d1.insertAdjacentHTML('beforeend', doc);
        projectDataRecieved=true;
       
    }
    function createExperienceCard(image,company,role,workDetails){
        var doc='<div class="col-4of10 leftDisplayBox"> <img  class="companyImage" src="img/skynation.png" alt="Company image"> </div> <div class="col-6of10 rightDisplayBox cardSpacer"> <!--<span class="glyphicon glyphicon-user white" aria-hidden="true"></span>--> <div id="profile-cardMain"> <!--<p class="leftTag">Profile</p>--> <!--<div class="underline"></div>--> <table> <tr> <td class="leftColumn">Comapany</td> <td class="rightColumn">'+company+'</td> </tr> <tr class="spacer"></tr> <tr> <td class="leftColumn">Role</td> <td class="rightColumn">'+role+'</td> </tr> <tr class="spacer"></tr> <!--<tr> <td class="leftColumn">Ocupation</td> <td class="rightColumn"> Student </td> </tr>--> <tr class="spacer"></tr> </table> <p class="leftTag">Work Details</p> <div class="underline"></div> <p class="kick">'+workDetails+'</p> </div> </div> ';
        var d2 = document.getElementById('experience-card');
        d2.insertAdjacentHTML('beforeend',doc);
        experiencDataRecieved=true;
    }

    
    

});

   