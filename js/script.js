$(document).ready(function(){
    //This checkes what card is clicked ant then loads the corresponding card
    $("#backButton").hide();
    var loadCard;
    $(".button").click(function(){
        var cardClicked=$(this).find("p").text();
        if(cardClicked=="Profile")
        {
            loadCard="profile-card";
            //alert(loadCard);
        }
        else if (cardClicked=="Experience")
        {
            loadCard="experience-card";
            //alert(loadCard);
        }
        else if (cardClicked=="Contact me")
        {
            loadCard="contact-card";
            //alert(loadCard);

        }
         else if (cardClicked=="Education")
        {
            loadCard="education-card";
            //alert(loadCard);
        }
        else if (cardClicked=="Resume")
        {
            loadCard="resume-card";
            //alert(loadCard);
        }
        // This runs a series of steps to see the transition animation yo see.
        $("#"+loadCard).removeClass("display-none");
        $("#mainMenu").attr("class","deactivate");
        setTimeout(dothis,500);
        $("#"+loadCard).addClass("popin");
        $("#backButton").addClass("popin");

    });
    function dothis(){
        $("#backButton").show();
        $("#mainMenu").addClass("display-none");
    };
    // Back button this disables the -card and loads the the mainMenu cards
    $("#backButton").click(function(){
        $("#"+loadCard).addClass("display-none");
        $("#mainMenu").attr("class","active");
        $("#backButton").hide();

    });

});
