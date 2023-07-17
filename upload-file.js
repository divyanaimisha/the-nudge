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

//Global Variables


//Read CSV On upload
$("#submitCsv").on('click', async function () {
    $("#submitCsv").hide()
    $("#loading").show()
    const reader = new FileReader();
    var csv = document.getElementById("myfile");
    csv = csv.files[0];
    reader.readAsText(csv)
    reader.onload = async function () {
        console.log("Text", reader.result)
        var res = csvToArray(reader.result)
        console.log("Array", res)
        await uploadInDatabase(res)
    };
})

function csvToArray(str, delimiter = ",", omitFirstRow = true) {
    return (
        str
            .slice(omitFirstRow ? str.indexOf('\n') + 1 : 0)
            .split('\n')
            .map(v => v.split(delimiter))
    );
}

async function uploadInDatabase(array) {
    var arrayLength = array.length;
    for (var i = 0; i < arrayLength; i++) {
        console.log(array[i]);
        //Upload in firestore

        if (typeof (array[i][0]) != "undefined" && array[i].length >= 5) {
            await setDoc(doc(db, 'users', array[i][0]), {
                level: parseInt(array[i][4]),
                goal: parseInt(array[i][2]),
                name: array[i][1],
                talktime: parseFloat(array[i][3]),
                stars: parseInt(array[i][5])
            });
        }

        $("#loading").hide()
        $("#success").show()
    }
}



console.log("aa")