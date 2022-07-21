import firebase from "firebase/app"
import "firebase/auth"
import  "firebase/database"

const { REACT_APP_FIREBASE_API_KEY, REACT_APP_FIREBASE_AUTH_DOMAIN, REACT_APP_FIREBASE_PROJECT_ID, REACT_APP_FIREBASE_STORAGE_BUCKET, REACT_APP_FIREBASE_MESSAGING_SENDER_ID, REACT_APP_FIREBASE_APP_ID, REACT_APP_FIREBASE_MEASUREMEMT_ID } = process.env;

// Firebase Configuration Object
const firebaseConfig = {
    apiKey: REACT_APP_FIREBASE_API_KEY,
    authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
    databaseURL: "https://ceni-flix-default-rtdb.europe-west1.firebasedatabase.app/",
    messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: REACT_APP_FIREBASE_APP_ID,
    measurementId: REACT_APP_FIREBASE_MEASUREMEMT_ID
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
    console.log(additionalData); 
    if (!userAuth) return;
    const userRef =  firebase.database().ref(`userList/${userAuth.uid}`)
    userRef.once("value", (snapshot)=> {
        if(snapshot.val() == undefined || snapshot.val() == null){
                const { displayName, email, photoURL } = userAuth;
                const createdAt = Date.now();
                const LastVisit =  Date.now();
                try {
                     userRef.set({
                        displayName,
                        email,
                        photoURL,
                        createdAt,
                        LastVisit,
                        ...additionalData,
                    }).then(()=>{
                        console.log("done")
                    }).catch(()=>{
                        console.log("fail")
                    })
                } catch (error) {
                    console.log("error creating user", error.message)
                }
            
        }
      });
    
       
    

    return userRef;
}
export const getUser=()=>{
    const userRef =  firebase.database().ref(`userList/${firebase.auth().currentUser.uid}`)
    return   userRef.once("value");

}
export const addToLastSeen=(movie)=>{
    console.log("movie",firebase.auth().currentUser);
    const userRef =  firebase.database().ref(`userList/${firebase.auth().currentUser.uid}`)
    userRef.once("value", (snapshot)=> {
                let {email, createdAt} = snapshot.val();
                let displayName =  snapshot.val().displayName == undefined ? null : snapshot.val().displayName;
                let listFavs    =  snapshot.val().listFavs == undefined ? null : snapshot.val().listFavs;
                let listLastSeen=  snapshot.val().listLastSeen == undefined ? null : snapshot.val().listLastSeen;
                let photoURL    =  snapshot.val().photoURL == undefined ? null : snapshot.val().photoURL;
                console.log(snapshot.val());
                const newVisit =  Date.now();
                let newList = [movie];
                if(listLastSeen != undefined){
                    listLastSeen =  newList.concat(listLastSeen);
                }else{
                    listLastSeen = newList;
                }
                
                try {
                     userRef.set({
                        displayName ,
                        email : email,
                        photoURL ,
                        createdAt ,
                        LastVisit : newVisit,
                        listFavs ,
                        listLastSeen : listLastSeen
                    }).then(()=>{
                        console.log("done")
                    }).catch(()=>{
                        console.log("fail")
                    })
                } catch (error) {
                    console.log("error creating user", error.message)
                }
            
        
      });
    
}
export const addTofavortes=(movie)=>{
    console.log("movie",movie)
    const userRef =  firebase.database().ref(`userList/${firebase.auth().currentUser.uid}`)
    userRef.once("value", (snapshot)=> {
                let {email, createdAt} = snapshot.val();
                let displayName =  snapshot.val().displayName == undefined ? null : snapshot.val().displayName;
                let listFavs    =  snapshot.val().listFavs == undefined ? null : snapshot.val().listFavs;
                let listLastSeen=  snapshot.val().listLastSeen == undefined ? null : snapshot.val().listLastSeen;
                let photoURL    =  snapshot.val().photoURL == undefined ? null : snapshot.val().photoURL;
                console.log(snapshot.val());
                const newVisit =  Date.now();
                let newList = [movie];
                if(listFavs != undefined){
                    listFavs =  newList.concat(listFavs);
                }else{
                    listFavs = newList;
                }
                
                try {
                     userRef.set({
                        displayName ,
                        email : email,
                        photoURL ,
                        createdAt ,
                        LastVisit : newVisit,
                        listFavs :listFavs,
                         listLastSeen
                    }).then(()=>{
                        console.log("done")
                    }).catch(()=>{
                        console.log("fail")
                    })
                } catch (error) {
                    console.log("error creating user", error.message)
                }
            
        
      });
    
}
export const removeFromFavs=(movie)=>{
    console.log("movie",movie)
    const userRef =  firebase.database().ref(`userList/${firebase.auth().currentUser.uid}`)
    userRef.once("value", (snapshot)=> {
                let {email, createdAt} = snapshot.val();
                let displayName =  snapshot.val().displayName == undefined ? null : snapshot.val().displayName;
                let listFavs    =  snapshot.val().listFavs == undefined ? null : snapshot.val().listFavs;
                let listLastSeen=  snapshot.val().listLastSeen == undefined ? null : snapshot.val().listLastSeen;
                let photoURL    =  snapshot.val().photoURL == undefined ? null : snapshot.val().photoURL;
                console.log(snapshot.val());
                const newVisit =  Date.now();
                if(listFavs != undefined){

                    var filtered = listFavs.filter(function(value){ 
                        console.log(value.id);
                        return value.id != movie.id;
                    });
                    listFavs = filtered;
                }
                
                try {
                     userRef.set({
                        displayName ,
                        email : email,
                        photoURL ,
                        createdAt ,
                        LastVisit : newVisit,
                        listFavs :listFavs,
                         listLastSeen
                    }).then(()=>{
                        console.log("done")
                    }).catch(()=>{
                        console.log("fail")
                    })
                } catch (error) {
                    console.log("error creating user", error.message)
                }
            
        
      });
    
}


export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth);
        }, reject);
    });
}

// Firebase web app init
firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()

// Sign in With Google Setup with popup
export const googleProvider = new firebase.auth.GoogleAuthProvider()
googleProvider.setCustomParameters({ prompt: "select_account" })
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider)

export default firebase
