

var dplus=dplus || {};

dplus.website= dplus.website || {};

dplus.website.init= function (apiRoot){
 // Loads the OAuth and dolapotoki's' APIs asynchronously   
  var apisToLoad;
  var callback = function () {
    if (--apisToLoad == 0) {
      //Enable ui elements or data that needed to ensure a connection to the endpoint
      
    }
  }

  apisToLoad = 1; // must match number of calls to gapi.client.load()
  gapi.client.load('dolapoapi', 'v1', callback, apiRoot);
  //gapi.client.load('oauth2', 'v2', callback);
}

function getProjects(callback){
    var message;
    gapi.client.dolapoapi.getProject(
    {
      'appid': "test4"
    }).execute(function (resp) {
      if (!resp.code) {
        //get the responce and convert it to a string 
        message=resp;
        //console.log(resp);
      }
      if(callback && typeof callback == "function") {
        return callback(message);
        //console.log(message);
        }
    });
    //console.log(message);
    
}


// getMyProjects(
//     function(message) {
//   //using a callback to get the data
//   console.log(message);
// });