import firebase from "firebase"; // 4.8.1
import * as RootNavigation from "../Utils/RootNavigation";

import Lesson from "../Modele/Lesson";
import { Cours } from "../Modele/Cours";
import Question from "../Modele/Question";


class FireCours {
  constructor() {
    this.list=[];
    this.observeAuth();
  }

  
    

  observeAuth = () =>
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

  onAuthStateChanged = user => {
    if (!user) {
      try {
        RootNavigation.navigate("testlogin");
      } catch ({ message }) {
        alert(message);
      }
    }
  };
  getAllCoourses=()=>{
    var list=[];
    this.ref.on("value",snapshot => {
      snapshot.forEach((childSnapshot)=> {
        var childData = childSnapshot.val();
        
        list.push(childData);
        
      });
          
    });
    return list;
   
   
  }
  getCoursByName=(name)=>{
    var list={};
   
 this.ref.orderByChild("name").equalTo(name).on("value",(snapshot) => {
      snapshot.forEach((childSnapshot)=> {
        var childData = childSnapshot.val();  
       
        list=childData.Lessons;
        
      });
          
    });
  
    return list;
   
  }

  

 
  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }
  get email(){
    return (firebase.auth().currentUser || {}).email;
  }

  get ref() {
    return firebase.database().ref("CoursList");
  }
  off() {
    this.refM.off();
  }
}

FireCours.shared = new FireCours();
export default FireCours;
