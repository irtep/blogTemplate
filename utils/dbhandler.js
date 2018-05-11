export function getArticles() {
  const giveData = "give data please";
  var receivedData;
  
  $.ajax({         
    url : '/checkArticles', 
    data: {"toBeSent" : giveData},
    type: 'post',
    success : (response) => {
      receivedData = response;
      //console.log("got the data in f: ", receivedData);
      // Store
      sessionStorage.setItem("article1", receivedData);
      return receivedData;
    }    
  });          
}
