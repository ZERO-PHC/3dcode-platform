import Navbar from "../components/Navbar";

export default function Layout({ children }) {
    return (
      <main style={{height:"100vh", maxHeight:"100vh", overflow: "hidden"}}>
        <Navbar style={{height:"%"}} />
        <main style={{height:"100%", overflowX: "hidden"}} >{children}</main>
      </main>
    )
  }