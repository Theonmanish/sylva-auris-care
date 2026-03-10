import "./Navbar.css";


function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="navbar-brand">
          <span className="navbar-logo"><img src="sylva.png" alt="logo" /></span>
         <div className="navbar-brand">
          
            <a href="https://sylva-auris-landing.vercel.app/"
            className="navbar-name"
            target="_blank"
            rel="noopener noreferrer"
          >
            Sylva Auris
          </a>
          </div>
           <span className="navbar-divider" />
          <span className="navbar-sub">Care Companion</span>
        </div>
        
      </div>
    </header>
  );
}





export default Navbar;