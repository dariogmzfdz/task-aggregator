import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./sign.css"

export function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { login, loginWithGoogle, resetPassword } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(user.email, user.password);
      navigate("/");
    } catch (error) {
      console.log(error.code)
      if (error.code === "auth/internal-error")return  setError("Correo invalido" );
        if (error.code === "auth/missing-email") return setError("Introduce email");
        if (error.code === "auth/invalid-email") return setError("Email no existe");
        if (error.code === "auth/weak-password") return setError("La contraseña debe tener 6 carácteres");
        if (error.code === "auth/user-not-found") return setError("Usuario no registrado");
        if (error.code === "auth/too-many-requests") return setError("Demasiados intentos. Intente cambiar la contraseña");
        if (error.code === "auth/wrong-password" ) return setError("Contraseña errónea");
        if (error.code === "auth/email-already-in-use" ) return setError("en uso ");
      
    }
  };

  const handleChange = ({ target: { value, name } }) =>
    setUser({ ...user, [name]: value });

  const handleGoogleSignin = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      if (error.code === "auth/popup-closed-by-user") return setError("Popup Cerrado");
      ;
    }
  };


  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!user.email) return setError("Write an email to reset password");
    try {
      await resetPassword(user.email);
      setError('We sent you an email. Check your inbox')
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="signupForm">
   <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="formInput">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="youremail@company.tld"
          />
        </div>
        <div className="formInput">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="*************"
          />
        </div>

        <div className="submitButtons">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#!"
            onClick={handleResetPassword}
          >
            Forgot Password?
          </a>
        </div>
      </form>
      <button
        onClick={handleGoogleSignin}
        className="signupGroup"
      >
             <img src='https://rotulosmatesanz.com/wp-content/uploads/2017/09/2000px-Google_G_Logo.svg_.png' alt='google'/>

      </button>
   
      <div className="signupGroup">
        Don't have an account?
        <Link to="/register" className="text-blue-700 hover:text-blue-900">
          <h3>Register</h3>
        </Link>
      </div>     
              {error &&  <h3 className='errTitle'>{error}</h3>}

    
    </div>
  );
}