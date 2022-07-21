import firebase from "firebase"; // 4.8.1
import MyDB from './MyDB'
import {uuid} from '../utils'

class Fire {
  constructor() {
    this.init();
    this.observeAuth();
    this.googleProvider = new firebase.auth.GoogleAuthProvider()
    this.googleProvider.setCustomParameters({ prompt: "select_account" })
    this.auth = firebase.auth();
  }

  signInWithGoogle = () => auth.signInWithPopup(googleProvider)

  init = () =>{
    MyDB.shared.Connect();
  } 
  createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firebase.database().ref(`UserList/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { email } = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
              profilePic :email,
              lastVisit : createdAt,
              creationDate :createdAt,
            })
        } catch (error) {
            console.log("error creating user", error.message)
        }
    }

    return userRef;
}
  observeAuth = () =>{ return new Promise((resolve, reject) => {
    const unsubscribe =  firebase.auth().onAuthStateChanged(userAuth => {
        unsubscribe();
        resolve(userAuth);
    }, reject);
  });}

  setUserData = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth);
        }, reject);
    });
}
  // get count of profile childs 
  getNumberOfProfils=()=>{
    return firebase.database().ref(`UsersList/${this.uid}`).onWrite((change, context) => {
      const data = change.after.val();
      return Object.keys(data).length;  
  });
    
  }
  
  CreateProfile=( image,ProfileName)=>{
    let user = {};
    if(image ==''&& ProfileName == '') return {sucess:0,message:'Error : Data is not valid'}
    user.profilePic = image;
    user.profileName = ProfileName;
    user.lastVisit = Date.now();
    user.creationDate = Date.now();
    user.lastSeen = {};
    user.ListFavourites = [];
    this.ref.child(this.uid+"/"+uuid()).set(user);
    return {sucess:1,message:'Profile created succefully'}
  }
  updateProfil = (ProfileName,pofilePic,profileId) =>{
    if(ProfileName ==''&& pofilePic == '') return {sucess:0,message:'Error : Data is not valid'}
    this.ref.child(this.uid+"/"+profileId).get((snapshot) => {
      const data = snapshot.val();
      let user = {};
      user.profilePic = image;
      user.profileName = ProfileName;
      user.lastVisit = Date.now();
      user.creationDate =data.creationDate;
      user.lastSeen = data.lastSeen;
      user.ListFavourites = data.ListFavourites
      this.ref.child(this.uid+"/"+profileId).set(user);
    });
    return {sucess:1,message:'Profile updated succefully'}
  }
  getProfileData=(pid)=>{
    return new Promise((resolve, reject) => {
      this.ref.child(this.uid+"/"+pid).get((snapshot) => {
        const data = snapshot.val();
        let user = {};
        user.profilePic = data.profilePic;
        user.profileName = data.profileName;
        user.lastVisit = data.profilePic;
        user.creationDate =data.creationDate;
        user.lastSeen = data.lastSeen;
        user.ListFavourites = data.ListFavourites;
        resolve(user);
      },reject);
  });
  }
  updateProfilLastSeen = (lastSeen,profileId) =>{
    if(ProfileName ==''&& pofilePic == '') return {sucess:0,message:'Error : Data is not valid'}
    this.ref.child(this.uid+"/"+profileId).get((snapshot) => {
      const data = snapshot.val();
      let user = {};
      user.profilePic = data.profilePic;
      user.profileName = data.profileName;
      user.lastVisit = Date.now();
      user.creationDate = data.creationDate;
      user.lastSeen = user.lastSeen.push(lastSeen);
      user.ListFavourites = data.ListFavourites
      this.ref.child(this.uid+"/"+profileId).set(user);
    });
    return {sucess:1,message:'Profile updated succefully'}
  }
  updateProfilListFavourites = (lastSeen,profileId) =>{
    if(ProfileName ==''&& pofilePic == '') return {sucess:0,message:'Error : Data is not valid'}
    this.ref.child(this.uid+"/"+profileId).get((snapshot) => {
      const data = snapshot.val();
      let user = {};
      user.profilePic = data.profilePic;
      user.profileName = data.profileName;
      user.lastVisit = Date.now();
      user.creationDate = data.creationDate;
      user.lastSeen = data.lastSeen;
      if(Array.isArray(data.ListFavourites)){
        user.ListFavourites = data.ListFavourites.push(lastSeen);
      }else{
        user.ListFavourites = [lastSeen];
      }
      this.ref.child(this.uid+"/"+profileId).set(user);
    });
    return {sucess:1,message:'Profile updated succefully'}
  }
 

  SetToken=( token)=>{
    var key=null;
    this.ref
      .orderByChild("id")
      .equalTo(firebase.auth().currentUser.uid)
      .on("value", (snapshot)=>{
         key = Object.keys(snapshot.val())[0];
      });
      
   this.user={...this.user,...{token:token}}
    firebase.database().ref("UsersList/"+key).set(this.user)
  }
  Signin = (email, password) => {
    try {
      firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then(res => {
         this.readUserData();
        
        })
        .catch(function(error) {
          var errorMessage = error.message;
          console.log(errorMessage);
         // Toast.show(errorMessage);
          // ...
        });
     
    } catch (error) {}
  };
  getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth);
        }, reject);
    });
}
 
  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }
  get email(){
    return (firebase.auth().currentUser || {}).email;
  }

  get ref() {
    return firebase.database().ref("UsersList");
  }
  off() {
    this.refM.off();
  }
}

Fire.shared = new Fire();
export default Fire;
