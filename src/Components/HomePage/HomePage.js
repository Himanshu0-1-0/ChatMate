import "./HomePage.css"
import Link from "next/link"
export default function HomePage() {
  return (
    <>
      <div className="cont">
        <img src="/Logo.png" alt="Logo" />
        <Link href="/Signin" className="linkk"><button className="btn">Login/Signup</button></Link>
        <div className="bg"></div>
      </div>
    </>
  )
}
