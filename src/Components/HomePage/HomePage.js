import "./HomePage.css"
import Signin from "../Signin/Signin"
import Link from "next/link"
export default function HomePage() {
  return (
    <>
      <div className="cont">
        <img src="/Logo.png" alt="Logo" />
        <button className="btn" ><Link href="/Signin" className="linkk">Login/Signup</Link></button>
        <div className="bg"></div>
      </div>
      {/* <Signin id="signin"/> */}
    </>
  )
}
