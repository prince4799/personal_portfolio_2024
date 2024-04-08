

firebase.initializeApp(firebaseConfig)
// const defaultStorage = firebase.storage();
// const defaultFirestore = firebase.firestore();

// console.log(firebase.app().name);
// log ("default storage",defaultFirestore)

// function signUp() {
//     firebase.auth().createUserWithEmailAndPassword("kreate.moto@gmail.com", "password")
//     .then((userCredential) => {
//         var user = userCredential.user;
//         // Send email verification
//         user.sendEmailVerification()
//         .then((res) => {
//             console.log("result verify mail", res);
//             // Email verification sent!
//             // ...
//         })
//         .catch(err => {
//             console.log("error", err);
//         });

//     })
//     .catch((error) => {
//         var errorCode = error.code;
//         var errorMessage = error.message;
//         console.log("error", errorCode, errorMessage);
//         // ..
//     });
// }


// signUp()

function signIn(){firebase.auth().signInWithEmailAndPassword("kreate.moto@gmail.com", "password")
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      // ...
    //   log("signIn",userCredential)
      firebase.auth().userCredential.user.sendEmailVerification()
      .then((res) => {
        log("result verify mail",res)
        // Email verification sent!
        // ...
      })
      .catch(err=>{
        log("error ",err)
      })
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    });}

  

    // signIn()

    