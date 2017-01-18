import firebase from 'firebase';

class Firebase {
	static initialise() {
		firebase.initializeApp({
		apiKey: "AIzaSyDVrz_oz9ZVYGWDXK2h1WQZ8MkKyJyinQ4",    
			authDomain: "moim-456a5.firebaseapp.com",
			databaseURL: "https://moim-456a5.firebaseio.com",
			storageBucket: "moim-456a5.appspot.com",
		})
	}

}

module.exports = Firebase;

//var firebaseConfig = {
//	apiKey: "AIzaSyDVrz_oz9ZVYGWDXK2h1WQZ8MkKyJyinQ4",    
//	authDomain: "moim-456a5.firebaseapp.com",
//	databaseURL: "https://moim-456a5.firebaseio.com",
//	storageBucket: "moim-456a5.appspot.com",
//};

//var FbApp = firebase.initializeApp(firebaseConfig);

//module.exports.FBApp = FbApp.database();


