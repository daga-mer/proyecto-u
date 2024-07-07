"use client"
import { useState } from "react";
import "./page.css";
import dataUsers from "./users_data.json"
import { useRouter } from 'next/navigation';

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [disabled, setDisabled] = useState("")
  const router = useRouter();

  // Función para comparar
  const compareData = (item) => {
    return item.username === userName && item.password === password;
  };

  return (
    <form action={() => {
      setMessage("")
      console.log(userName, password);
      setLoading(true)
      setTimeout(function () {
        let user = dataUsers.filter(compareData);
        console.log("user: ", user);
        if (user.length == 0) {
          setMessage("UserName o Password incorrectos intente otra vez.")
        } else {
          sessionStorage.setItem('user', JSON.stringify(user[0]));
          router.push("/home")
        }
        setLoading(false)
      }, 5000)
    }} className="formLogin">
      <h1>Log in</h1>

      <label htmlFor="UserName">UserName: </label>
      <input name="UserName" id="UserName" type="text" value={userName} onChange={(e)=>{
        setUserName(e.target.value)
        if (e.target.value.length == 0) {
          setMessage("UserName debe ser mayor a 0")
          return ""
        }
        setMessage("")
      }} />

      <label htmlFor="Password">Password: </label>
      <input name="Password" id="Password" type="password" value={password} onChange={(e)=>{
        setPassword(e.target.value)
        if (e.target.value.length == 0) {
          setMessage("Password debe ser mayor a 0")
          return ""
        }
        setMessage("")
      }} />

      {
        message.length > 0 && <div style={{ margin: "0.5rem", color: "red", background: "#fff", padding: "0.5rem", borderRadius: "1rem" }}>
          {message}
        </div>
      }

      <button className="buttonLogin" disabled={userName == 0 || password == 0}>
        {loading ? "Loading..." :"Log in"}
      </button>
    </form>
  );
}
