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
var _USER_DATA = {
    name: "loading",
    level: 0,
    goal: 0,
    talktime: 0
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
        _USER_DATA = docSnap.data();
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
        if (!alert('No User Found!')) { window.location.reload(); }

    }

    //Set Ui
    setUserData();
    $(".step-2").hide()
    $(".step-3").show()
})

const counterAnim = (qSelector, start = 0, end, duration = 1000) => {
    const target = document.querySelector(qSelector);
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        target.innerText = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};

function setUserData() {
    $("#userName").html(_USER_DATA.name + "!")
    console.log(_USER_DATA.goal)
    $("#goalTime").html(_USER_DATA.goal)
    $("#counterAnimation").html(_USER_DATA.talktime)
    let percent = (_USER_DATA.talktime / _USER_DATA.goal) * 100
    $(".prog-bar").css("maxWidth", (percent + "%"));
    try {
        counterAnim("#counterAnimation", 0, _USER_DATA.talktime, 1000);
    } catch (e) {
        console.log(e)
    }

    if (percent >= 0 && percent <= 30) {
        $("#talkTimeMsg").html("ಅಯ್ಯೋ!!! ನೀವು ಇಂದು ತುಂಬಾ ಕಡಿಮೆ ಮಾತನಾಡಿದ್ದೀರಿ. ಪರವಾಗಿಲ್ಲ, ನಾಳೆ ನಾವು ಹೆಚ್ಚು ಮಾತನಾಡುವ ಗುರಿಯನ್ನು ಹೊಂದೋಣ!")
    } else if (percent >= 31 && percent <= 70) {
        $("#talkTimeMsg").html("ಉತ್ತಮ ಪ್ರಯತ್ನ, ಆದರೆ ನೀವು ನಿಮ್ಮ ಗುರಿಯನ್ನು ತಲುಪಲಿಲ್ಲ. ಚಿಂತಿಸಬೇಡಿ, ನಾಳೆ ನಿಮಗೆ ಮತ್ತೊಂದು ಅವಕಾಶ ಸಿಗುತ್ತದೆ.")
    } else if (percent >= 71 && percent <= 99) {
        $("#talkTimeMsg").html("ಒಳ್ಳೆ ಪ್ರಯತ್ನ! ನೀವು ಬಹುತೇಕ ನಿಮ್ಮ ಗುರಿಯನ್ನು ತಲುಪಿದ್ದೀರಿ. ನಾಳೆ ಕಷ್ಟಪಟ್ಟು ಪ್ರಯತ್ನಿಸಿ, ನೀವು ಖಂಡಿತವಾಗಿಯೂ ನಿಮ್ಮ ಗುರಿಯನ್ನು ತಲುಪುತ್ತೀರಿ")
    } else if (percent >= 100) {
        $("#talkTimeMsg").html("ಒಳ್ಳೆಯ ಪ್ರದರ್ಶನ!!! ನಿಮ್ಮ ಗುರಿಯನ್ನು ಮೀರಿಸಿದ್ದೀರಿ. ಅಭಿನಂದನೆಗಳು. ನೀವು ನಕ್ಷತ್ರವನ್ನು ಗಳಿಸಿದ್ದೀರಿ.")
    } else {
        $("#talkTimeMsg").html("");
    }




    for (var j = 1; j <= 5; j++) {
        if ((_USER_DATA.level >= j)) {
            $(".medal-" + j).show()
            $(".medalPlaceholder-" + (j - 1)).hide()
        } else {
            $(".medal-" + j).hide()
            $(".medalPlaceholder-" + (j - 1)).show()

        }
    }

    $("#minutes").html(_USER_DATA.goal)

    for (var j = 1; j <= 3; j++) {
        if (_USER_DATA.stars >= j) {
            $(".star-filled-" + j).show()
            $(".star-empty-" + j).hide()
        } else {
            $(".star-filled-" + j).hide()
            $(".star-empty-" + j).show()

        }
    }


}