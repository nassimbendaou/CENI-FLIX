import firebase from "firebase"; // 4.8.1
import * as RootNavigation from "../Utils/RootNavigation";
import Fire from "./Fire";


class FirePosts {
  constructor() {
     this.list=[];
     this.i=0;
     this.fire=0;
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
  getImage= async (imguser,image)=>{
  
      let img=[];
     
    const refu = firebase.storage().ref().child(imguser);
    const urlu = await  refu.getDownloadURL();
    img.push(urlu)
    
    const ref = firebase.storage().ref().child( image);
    const url = await ref.getDownloadURL();
    img.push(url);
    return img;
    }
    getImagecom= async (imguser)=>{
      console.log(imguser)
    const refu = firebase.storage().ref().child(imguser);
    const urlu = await  refu.getDownloadURL();   
    return urlu;
    }
  
  getAllPosts=  ()=>{
    this.i=this.i+1;
    console.log(this.i)
    var listT=[]
      this.ref.on("value", (snapshot) => {  
        
       
          console.log("fired")
        snapshot.forEach((childSnapshot)=> {
          var childData = childSnapshot.val();
            listT.push({
                image:childData.image,
                id:childData.id,
                fname: childData.fname,
                lname:childData.lname,
                owner: childData.owner,
                imguser:childData.imguser,
                title:childData.title,
                text:childData.text ,
                date:childData.date}); 
              
          })
          
        
      })
      
      console.log(listT)
      return listT; 
     
  
  }
  sendComment= async (text,idpost)=>{
    
    const utcDate1 = new Date(); 
    let date = utcDate1.toUTCString();
        console.log("sended")
      this.getImagecom('images/'+firebase.auth().currentUser.uid).then((img)=>{
        var comment={
          idpost:idpost,
          username: Fire.shared.user.fname+' '+Fire.shared.user.lname,
          owner: firebase.auth().currentUser.uid,
          imguser:img,
          text:text,
          date:date

      }
      firebase.database().ref("CommentList").push(comment);
      })
    
    return false;
  }
  sendQuiz= async (title,questions,uid,obj)=>{
    
    const utcDate1 = new Date(); 
    let date = utcDate1.toUTCString();
        console.log("sended")
      this.getImagecom('images/'+firebase.auth().currentUser.uid).then((img)=>{
        var comment={
          id:uid,
          username: Fire.shared.user.fname+' '+Fire.shared.user.lname,
          owner: firebase.auth().currentUser.uid,
          imguser:img,
          title:title,
          questions:questions,
          date:date,
          obj:obj

      }
      firebase.database().ref("QuizList").push(comment);
      })
    
    return false;
  }
  sendPost= async (text,title,img,uid)=>{
    
    const utcDate1 = new Date();
    console.log(img)
    let date = utcDate1.toUTCString();
        console.log(img)
        if(img==="null"){
        
            this.getImagecom('images/'+firebase.auth().currentUser.uid).then((img)=>{
              console.log("phase2")
              var post={
               
                id:uid,
                fname: Fire.shared.user.fname,
                lname: Fire.shared.user.lname,
                owner: firebase.auth().currentUser.uid,
                imguser:img,
                title:title,
                text:text ,
                date:date
      
            }
            this.ref.push(post);
            })
          
        }
        else{
          this.uploadImage(img,uid).then((data)=>{ 
            console.log("phase1")
            console.log("phase1.1")
            this.getImage('images/'+firebase.auth().currentUser.uid,'images/'+uid).then((img)=>{
              console.log("phase2")
              var post={
                image: img[1],
                id:uid,
                fname: Fire.shared.user.fname,
                lname: Fire.shared.user.lname,
                owner: firebase.auth().currentUser.uid,
                imguser:img[0],
                title:title,
                text:text ,
                date:date
      
            }
            this.ref.push(post);
            })
          })
        }
    
    return false;
   
  }
  uploadImage = async (uri, uid) => {
    const response = await fetch(uri);
    const blob = await response.blob();
   
    var ref = firebase.storage().ref().child("images/" +uid)
    
   return  ref.put(blob);
  }
  getestMyPosts=(id)=>{
    var listT=[]
    this.ref.orderByChild("owner").equalTo(id).on("value", (snapshot)=> {
      snapshot.forEach((childSnapshot)=> {
        var childData = childSnapshot.val();
        listT.push({ id:childData.id,
          image:childData.image,
          
          fname: childData.fname,
          lname:childData.lname,
          owner: childData.owner,
          imguser:childData.imguser,
          title:childData.title,
          text:childData.text ,
          date:childData.date,
          post:true});  
        
      });
    });  
    return listT;
  }
  
  
  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }
  get email(){
    return (firebase.auth().currentUser || {}).email;
  }

  get ref() {
    return firebase.database().ref("PostList");
  }
  off() {
    this.refM.off();
  }
}

FirePosts.shared = new FirePosts();
export default FirePosts;
