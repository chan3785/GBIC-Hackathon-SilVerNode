import { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import "../index.css"

export default function CreateAccount() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (isLoading || email === "" || password === "") return;
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="font-sans w-full h-full bg-white text-black min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 border border-gray-300 rounded-lg">
        <h1 className="text-4xl font-bold mb-4">Log In</h1>
        <form onSubmit={onSubmit} className="space-y-4">
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
            value={isLoading ? "Loading..." : "Log in"}
            className="w-full p-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600"
          />
        </form>
        {error !== "" ? <div className="text-red-500 mt-4">{error}</div> : null}
        <div className="mt-4">
          Don't have an account?{" "}
          <Link to="/create-account" className="text-blue-500 hover:underline">
            Create one &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}