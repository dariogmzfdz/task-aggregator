import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./sign.css";

export function Register() {
  const { signin } = useAuth();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signin(user.email, user.password);
      navigate("/");
    } catch (error) {
      console.log(error.code);
      if (error.code === "auth/internal-error"){
      setError("Correo invalido" )
      }
      if (error.code === "auth/email-already-in-use" ) return setError("en uso ");

      if (error.code === "auth/missing-email") return setError("Introduce email")
      if (error.code === "auth/invalid-email") return setError("Email no existe")
      if (error.code === "auth/weak-password") return setError("La contraseña debe tener 6 carácteres")
    }
  };

  return (
    <div className="signupForm">
    <form onSubmit={handleSubmit}>
      <h1>New user</h1>
      <div className="formInput">
        <label>Email</label>
        <input
          controlId="email"
          type="email"
          required
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="youremail@company.tld"
          //   onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="formInput">
        <label>Password</label>
        <input
          type="password"
          required
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="password"
          //   onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="formFooter">
        <div className="submitButtons">
          <div>
            <button type="submit">Register</button>
          </div>
          <div className="signupGroup">
            Already have an account?
            <div>
      <Link to="/login" className="text-blue-700 hover:text-blue-900">

            <button>Sign up</button>
      </Link>

            <div className="socialIcons">
       
        </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
);
}