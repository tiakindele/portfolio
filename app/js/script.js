$(document).ready(function () {
    //This checkes what card is clicked ant then loads the corresponding card
    $("#backButton").hide();
    var loadCard;
    var colorChange;
    $(".button").click(function(){
        var cardClicked=$(this).find("p").text();
        if(cardClicked=="Profile")
        {
            loadCard="profile-card";
            colorChange="#009fd4"
            //alert(loadCard);
        }
        else if (cardClicked=="Experience")
        {
            loadCard="Null";
            colorChange="#8c3"
            //alert(loadCard);
        }
        else if (cardClicked=="Contact me")
        {
            loadCard="contact-card";
            colorChange="#e6c32d"
            //alert(loadCard);

        }
         else if (cardClicked=="Education")
        {
            loadCard="education-card";
            colorChange="#e67e30"
            //colorChange="rgba(235, 116, 27, 0.87)"
            //alert(loadCard);
        }
        else if (cardClicked=="Projects")
        {
            loadCard="project-card";
            colorChange="#0a9"
            //alert(loadCard);
            // window.getProjects();
           window.getProjects(myCallBack);
            
            //console.log(JSON.stringify(window.getProjects()));
            // JSON.parse();
        }
        else if (cardClicked=="Resume"){
            loadCard="Null"
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
    function myCallBack(message){
         //console.log(message);
         var output = message.items;
         console.log(output.length);
         for(i=0;i<output.length;i++){
             console.log(output[i].projectTitle);
             //document.getElementById("projectTitle").innerHTML=output[i].projectTitle;
             addVard();
         }

    }
    function addVard(){
        var doc='<div class="col-4of10 leftDisplayBox"> <iframe width="100" height="100" src="https://www.youtube.com/embed/ziwDvejyrA0?controls=0"></iframe> </div> <div class="col-6of10 rightDisplayBox"> <span class="glyphicon glyphicon-user white" aria-hidden="true"></span> <div id="profile-cardMain"> <h1 class="leftTag" id="projectTitle">'+"test"+' Title</h1> <div class="underline"></div> <p class="paragraphWhite">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin non congue lectus, in gravida mauris. Quisque libero felis, aliquet sit amet lectus ac, malesuada efficitur erat. In quam ante, sagittis ut ante non, viverra tempor mauris. Nunc et rutrum nunc. Pellentesque id ornare quam. Quisque consectetur urna in hendrerit luctus. Nullam varius lacinia mi ut elementum. Ut mattis hendrerit lorem, ut auctor purus scelerisque convallis</p> <h1 class="leftTag" id="projectDetailsTitle"> Project details</h1> <div class="underline"></div> <div class="col-10of10" id="projectDetails"> <div class="col-3of10 projectDetailsItems" id="projectTagSection"> <P class="tagParagraphWhite">C++</P> <P class="tagParagraphWhite">D++</P> <P class="tagParagraphWhite">C++</P> <P class="tagParagraphWhite">D++</P> </div> <div class="col-3of10 projectDetailsItems" id="websiteSection"> <a href="http://www.w3schools.com">Project website</a> </div> <div class="col-3of10 projectDetailsItems" id="gitProjectSection"> <img src="img/icons/github-logo.svg" width="30px"> </div> </div> </div> </div> </div>';
        var d1 = document.getElementById('project-card');
        d1.insertAdjacentHTML('beforeend', doc);
    }

});
