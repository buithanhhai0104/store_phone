import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export const googleLogin = async () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    localStorage.setItem(
      "user",
      JSON.stringify({
        user_name: user.displayName,
        user_img: user.photoURL,
        id: user.uid,
      })
    );
  } catch (error) {
    console.error("Error during Google login:", error.message);
    alert("Failed to login with Google.");
  }
};
