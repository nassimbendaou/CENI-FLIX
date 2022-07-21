import firebase from "firebase"; // 4.8.1
import * as RootNavigation from "../Utils/RootNavigation";
import Question from "../Modele/Question";
import List from "collections/list"

class FireTestLogique {
  constructor() {
    const list=[];
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
  getAllTestesLogiques=()=>{
   
    var listT=[]
      this.ref.on("value",(snapshot) => {  
        snapshot.forEach((childSnapshot)=> {
          var childData = childSnapshot.val();
          listT.push(childData);  
          
        }); 
      })

      return listT; 
  
  }
  
  getestByName=(name)=>{
    var listT=[]
    this.ref.orderByChild("name").equalTo(name).on("value", (snapshot)=> {
      snapshot.forEach((childSnapshot)=> {
        var childData = childSnapshot.val();
        listT.push(childData);  
        
      });
    });  
    return listT;
  }
  AddTest=( answer, picture, quest,optiens)=>{
    
    var test = { answer, picture, quest,optiens };
   
    this.ref.push(test);
  }
  
  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }
  get email(){
    return (firebase.auth().currentUser || {}).email;
  }

  get ref() {
    return firebase.database().ref("LogiqueTest");
  }
  off() {
    this.refM.off();
  }
}

FireTestLogique.shared = new FireTestLogique();
export default FireTestLogique;
