// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js'
import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js'
import { getFirestore, addDoc, collection, setDoc, query, where, getDocs, getDoc, doc, updateDoc, Timestamp, orderBy, deleteDoc } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBZxt4wYOB_8RMOkor4dNnHUefjFXr0W_8",
    authDomain: "nudge-gamification-project.firebaseapp.com",
    projectId: "nudge-gamification-project",
    storageBucket: "nudge-gamification-project.appspot.com",
    messagingSenderId: "1073076846196",
    appId: "1:1073076846196:web:312257ab580e0b33e69b21",
    measurementId: "G-B8MP4E9JE5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
var phoneNumber;
var _USER_DATA={
    name:"loading",
    level:0,
    goal: 0,
    talktime:0
}
setUserData()

$("#phoneNumberSubmit").on('click', async function () {
    $(".step-1").hide()
    $(".step-2").show()
    phoneNumber = $("#phoneNumber").val()
    phoneNumber = phoneNumber.trim()
    const docRef = doc(db, "users", phoneNumber);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        _USER_DATA= docSnap.data();
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
        if(!alert('No User Found!')){window.location.reload();}

    }

    //Set Ui
    setUserData();



    $(".step-2").hide()
    $(".step-3").show()
})

function setUserData(){
    $("#userName").html(_USER_DATA.name + "!")
    $("#showTt").html(_USER_DATA.talktime + "/8 Minutes" )
    $( ".prog-bar" ).css( "maxWidth", ( (_USER_DATA.talktime/8)*100) + "%" );

    for(var j=1; j<=5; j++){
        if(_USER_DATA.level>=j){
            $(".medal-"+j).show()
            $(".medalPlaceholder-"+(j-1)).hide()
        }else{
            $(".medal-"+j).hide()
        $(".medalPlaceholder-"+(j-1)).show()

        } 
    }

    $("#minutes").html(_USER_DATA.talktime)

    for(var j=1; j<=3; j++){
        if(_USER_DATA.goal>=j){
            $(".star-filled-"+j).show()
            $(".star-empty-"+j).hide()
        }else{
            $(".star-filled-"+j).hide()
            $(".star-empty-"+j).show()

        } 
    }
}