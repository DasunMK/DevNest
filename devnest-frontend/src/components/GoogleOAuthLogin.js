function loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then(result => {
        const user = result.user;
        console.log("Logged in:", user.displayName);
        // You can send token to backend here
      })
      .catch(error => console.error(error));
  }
  