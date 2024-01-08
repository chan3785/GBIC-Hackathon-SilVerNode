import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import "../index.css"

export default function CreateAccount() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (isLoading || name === "" || email === "" || password === "") return;
    try {
      setLoading(true);
      const credentials = await createUserWithEmailAndPassword(auth,email,password);
      await updateProfile(credentials.user, {displayName: name,});
      navigate("/sign-up-success");
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full h-full bg-white text-black min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 border border-gray-300 rounded-lg">
        <h1 className="text-4xl font-bold mb-4">Sign Up</h1>
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            onChange={onChange}
            name="name"
            value={name}
            placeholder="Name"
            type="text"
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            onChange={onChange}
            name="email"
            value={email}
            placeholder="Email"
            type="email"
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            onChange={onChange}
            value={password}
            name="password"
            placeholder="Password"
            type="password"
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="submit"
            value={isLoading ? "Loading..." : "Create Account"}
            className="w-full p-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600"
          />
        </form>
        {error !== "" ? <div className="text-red-500 mt-4">{error}</div> : null}
        <div className="mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Log in &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
} 