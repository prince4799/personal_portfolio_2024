

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

  console.log("provider",provider);
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
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
        get_data_from_firebase();
      } else {
        console.log("Invalid");
        alert('Invalid Email', 'Your email is not verified.');
      }
    })
    .catch((error) => {
      // Handle errors (display error message or log to console)
      console.log(error);
    });
    console.log("signinpopup");
}

function save_data_in_firebase() {
  const all_details_of_users = getObjectFromSession('contact_links',
    "about_yourself",
    'basic_details',
    'domain',
    'name',
    'project_array',
    'skill_array',);

  const basic_details = JSON.parse(getfromSession('basic_details'));
  if (basic_details.isVerifiedUser && basic_details.isAnonymous == false) {
    db = firebase.database();
    const userRef = db.ref('users/' + basic_details.email.replace(new RegExp('\\.', 'g'), '^'));

    // Update individual keys within the "all_details_of_users" object
    const updates = {};
    for (const key in all_details_of_users) {
      updates[key] = all_details_of_users[key];
    }
    userRef.update(updates);

    console.log("Data saved successfully");
  } else {
    console.log("Data not saved ");

  }
}

function get_data_from_firebase(...params) {
  console.log("=======>", params)

  const basic_details = JSON.parse(getfromSession('basic_details'));

  let successfully_load = false;
  if (basic_details.isVerifiedUser && basic_details.isAnonymous == false) {

    if (db == undefined) {
      db = firebase.database();
    }
    const dbref = db.ref();
    console.log("basic_details", basic_details.email)
    let user = basic_details?.email ?? 'n/a'
    // ====================================================================================
    if (user != 'n/a') {

      user = user.replace(/\./g, '^')
      console.log("user", user)
      dbref.child('users/' + user).on('value', (snapshot) => {
        const userData = snapshot.val();
        // ====================================================================================
        // Loop through the properties of the userData object and print their values
        for (const key in userData) {
          if (userData.hasOwnProperty(key)) {
            console.log(`${key}: ${userData[key]}`);
            setInSession(`${key}`, `${userData[key]}`)
            successfully_load = true;
          } else {
            successfully_load = false
          }

        }
        if (successfully_load) {
          if (params && params[0] == 'Home') {
            sessionStorage.removeItem('searched_users')
            location.href = 'index.html'
          } else
            location.reload();
        }
      }, (errorObject) => {
        console.log('The read failed: ' + errorObject.name);
      });
    }
  }
}

function search_users_from_firebase() {
  const search_field = document.getElementById('searchbox-inputfield').value;
  console.log("search_field", search_field)
  let successfully_load = false;

  if (db == undefined) {
    db = firebase.database();
  }
  const dbref = db.ref();

  let searchedEmail = search_field.replace(/\./g, '^')
  console.log("user", searchedEmail)
  dbref.child('users/' + searchedEmail).on('value', (snapshot) => {
    const userData = snapshot.val();
    console.log(userData);
    if (userData != null) {
      for (let key in userData) {
        if (userData.hasOwnProperty(key)) {
          console.log(`${key}: ${userData[key]}`);
          if (key == 'basic_details') {
            key = 'searched_users'
            setInSession(`${key}`, `${userData['basic_details']}`)
          } else
            setInSession(`${key}`, `${userData[key]}`)
          successfully_load = true;
          location.reload()
        } else {
          successfully_load = false
          swal("No user found associated with the given email", "Please try another email.", "error")
        }

      }
    }else{
      swal("No user found associated with the given email", "Please try another email.", "error")
    }
    // ====================================================================================
    // Loop through the properties of the userData object and print their values

  }, (errorObject) => {
    console.log('The read failed: ' + errorObject.name);
    swal("No user found associated with the given email", "Please try another email.", "error")
  });
  // }


  // }
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