import Navbar from"./Navbar";
import "./MainLayout.css";

const MainLayout = ({children}) => {
    return(
        <>
        <Navbar/>
        <main className="main-content">{children}</main>
        </>
    )
}


export default MainLayout;