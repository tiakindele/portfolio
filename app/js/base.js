
//GLobal name space
var dplus=dplus || {};

//The specific project under the global name space
dplus.website= dplus.website || {};

//Init functioin needed to load the api's
dplus.website.init= function (apiRoot){
 // Loads the OAuth and dolapotoki's' APIs asynchronously   
  var apisToLoad;
  var callback = function () {
    if (--apisToLoad == 0) {
      //Enable ui elements or data that needed to ensure a connection to the endpoint
      enableUiElements()
      if(!experiencDataRecieved){
          window.getExperience(myExperienceCallBack);
      }
      if(!projectDataRecieved){
          //Call the get projects method and pass in a call back
          window.getProjects(myProjectCallBack);
      }
    }
  }
  apisToLoad = 1; // must match number of calls to gapi.client.load()
  gapi.client.load('dolapoapi', 'v1', callback, apiRoot);
}

//Api call to get the projects 
function getProjects(callback){
    var message;
    //Actuall call to the api using the gapi client
    gapi.client.dolapoapi.getProject(
    {
      'appid': "test4"
    }).execute(function (resp) {
      if (!resp.code) {
        //get the responce assign it to message 
        message=resp;
      }
      //Call back to make afer we get the resp : reason async call
      if(callback && typeof callback == "function") {
        //Return the message
        return callback(message);
      }
    });
}
//Api call to get the work experiences
function getExperience(callback){
    var message;
    //Actuall call to the api using the gapi client
    gapi.client.dolapoapi.getExperience(
    {
      'appid': "test4"
    }).execute(function (resp) {
      if (!resp.code) {
        //Get the responce assign it to message
        message=resp;
      }
      //Call back to make afer we get the resp : reason async call
      if(callback && typeof callback == "function") {
        //Return the message
        return callback(message);
        }
    });
    
}
//Visually enable ui elements that deped on having the gapi client loaded 
function enableUiElements(){
  $("#projectWindow").addClass("cardLoaded");
  $("#experienceButton").addClass("cardLoaded");
}