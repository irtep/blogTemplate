import React, { Component } from 'react';
import { render } from 'react-dom';
import MenuItem from '../components/menuitem'
import ItemInCenter from '../components/itemincenter'
import * as getArticles from '../utils/dbhandler'; 

class App extends Component {
  constructor() {
    super();
    this.state = {
    sideMenus: ["Quien soy?","Blog posts","Contactame"],
    showInCenter: "Quien soy?",
    infoBoxes: ["Soy una viajera que encanta viajar y vivir en diferentes países con mi maravilloso esposo.",
                "Articulos:","Si quires contactarme, por favor mandame un correo electrónico. Gracías"], 
    articles: [],
    articlesSet: false  
    };
    
  this.clickControl = this.clickControl.bind(this)  
  }
  componentDidMount() {
      this.setState({ articles : getArticles.getArticles() });
  }  
  
  clickControl(sideMenu, toCenter){
    const article1 =  sessionStorage.getItem("article1");
    const articlex = [];
    articlex.push(JSON.parse(article1));
    
    $('.atCenter').fadeOut();
    this.setState({ showInCenter : " " });

      setTimeout(() => { // timed for nicer fadeout/in effect.
         this.setState({ showInCenter : sideMenu, articles: articlex, articlesSet: true }); 
      }, 600);
      
    $('.atCenter').fadeIn('slow');
    console.log("clickControl, side, toCenter", sideMenu, toCenter);
  }  
    
  render() {
    let forCenterPage = [this.state.infoBoxes[0]]; // default
    let whatIsClicked = this.state.showInCenter; // new
    let isArticle = false;
    let articleNumber = 0;
    let copiedArts = this.state.articles;
    
    if (this.state.articlesSet === false) {
      console.log("copiedArts is undefi", copiedArts);
      copiedArts = [["filer"],["filler"]];
    }
     
    console.log("copiedA: ", copiedArts);
    for (let ii = 0; ii < copiedArts[0].length; ii++){
      if (copiedArts[0][ii].subject === this.state.showInCenter){
        isArticle = true;
        articleNumber = ii;
        console.log("found article that has same subject as click");
      }
    }
       
    if (isArticle === true) {
      let copyOfArticle = this.state.articles[0][articleNumber];
      forCenterPage = [];
      forCenterPage.push(copyOfArticle.subject);
      console.log("pushed subject from: ", copyOfArticle);
      
      for (let ix = 0; ix < copyOfArticle.paragraphs.length; ix++) {
        forCenterPage.push(copyOfArticle.paragraphs[ix]);
      }      
    } else { console.log("not center click. Activating switch");
    
      switch (this.state.showInCenter) {
        case "Quien soy?":
          forCenterPage = [this.state.infoBoxes[0]]; 
        break;
        case "Blog posts": // make this to work as array as well, and make a map action down there
          let copyState = this.state.articles;
          let articleTitles = [];
          for (let i = 0; i < copyState[0].length; i++) {
            articleTitles.push(copyState[0][i].subject)
          } 
          forCenterPage = articleTitles;
        break;
        case "Contactame":
          forCenterPage = [this.state.infoBoxes[2]];
        break;   
        case " ":
          forCenterPage = [" "];
        break;  
        default: console.log("state was not found");  
      }
    } 
    
    return(
      <div className= "theApp container-fluid">
        <div className= "headerSection">
          
          <h1>Blog de Amorcitos</h1>
        
        </div>
        
        <div className= "blogSection">
         
          <div className= "row">
            
            <div className="col-md-2"> 
      
              { this.state.sideMenus.map(sideMenu => {
              return (
              <MenuItem
              title={sideMenu}
              handleClick ={this.clickControl}
              key= {this.id}
              />
              )
              }) }  
              
            </div>      
            
            <div className="col-md-8"> 
              <div className= "blogPosts">
                { forCenterPage.map(toCenter => {
                return (
                <ItemInCenter
                title={toCenter}
                handleClick ={this.clickControl}
                key= {this.id}
                />
                )
                }) }                 
              </div>
            </div>
            
            <div className="col-md-2">  
            
            </div>      
          
          </div>
        </div>
      </div> 
    );
  }
}

render(<App/>, document.getElementById('application'));