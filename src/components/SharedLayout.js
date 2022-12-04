import { Outlet } from "react-router-dom"
import NavBar from './Navbar'


const SharedLayout = () => {
    return (
    <>
        <NavBar/>    
        <Outlet></Outlet>
    </>)
}

export default SharedLayout