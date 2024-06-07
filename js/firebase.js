

firebase.initializeApp(firebaseConfig)

let db = undefined;

function signIn() {
  firebase.auth().signInWithEmailAndPassword("kreate.moto@gmail.com", "password")
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    // ...
    //   log("signIn",userCredential)
    firebase.auth().userCredential.user.sendEmailVerification()
      .then((res) => {
        log("result verify mail", res)
        // Email verification sent!
        // ...
      })
      .catch(err => {
        log("error ", err)
      })
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });
}

function signInWithPopUp() {
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      // Handle successful sign-in (access user data from result.user)
      if (result?.additionalUserInfo?.profile?.verified_email === true) {
        const user = result.user;
        let basic_details = {
          isVerifiedUser: user.emailVerified,
          profilePic: user.photoURL,
          isAnonymous: user.isAnonymous,
          name: user.displayName,
          email: user.email,
        };
        setInSession('basic_details', JSON.stringify(basic_details));
      } else {
        alert('Invalid Email', 'Your email is not verified.');
      }
    })
    .catch((error) => {
      // Handle errors (display error message or log to console)
      console.log(error);
    });
}
function save_data_in_firebase() {
  const all_details_of_users = getObjectFromSession("about-yourself", 'basic_details', 'domain', 'name', 'project_array', 'skill_array');

  const basic_details = JSON.parse(getfromSession('basic_details'));
  if (basic_details.isVerifiedUser && basic_details.isAnonymous == false) {
    db = firebase.database();
    const userRef = db.ref('users/' + basic_details.email.replace(new RegExp('\\.', 'g'), '@'));

    // Update individual keys within the "all_details_of_users" object
    const updates = {};
    for (const key in all_details_of_users) {
      updates[key] = all_details_of_users[key];
    }
    userRef.update(updates);

    console.log("Data saved successfully");
  }
}





// const userRef = db.ref('firebase_users/' + userId);
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