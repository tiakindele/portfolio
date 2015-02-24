$(document).ready(function(){
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
            loadCard="experience-card";
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
        }
        else if (cardClicked=="Resume"){
            loadCard="Resume"
        }
        // This runs a series of steps to see the transition animation yo see.
        if(loadCard!="Resume")
        {

            $("#mainMenu").attr("class","deactivate");
            setTimeout(dothis,500);

            $("#"+loadCard).addClass("popin");
            $("#backButton").addClass("popin");
            matchColor();
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
        if(loadCard!="Resume"){
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

});
