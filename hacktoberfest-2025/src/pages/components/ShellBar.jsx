import logo from "../../assets/logo.svg";

const Shellbar = () => {
  return (
    <header>
      <div className="shellbar">
        <div className="shell-bar__left">
          <a href="/" className="shell-bar__home-link">
            <img src={logo} alt="SAP logo" className="logo" />
          </a>
        </div>
        <a href="/">
          <div className="shell-bar__center">
            <span className="shell-bar__title1">Hack</span>
            <span className="shell-bar__title2">toberFest</span>
          </div>
        </a>
      </div>
    </header>
  );
};

export default Shellbar;
