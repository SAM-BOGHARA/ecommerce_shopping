import React from "react";
import playStore from "../../../images/playStore.png"
import appStore from "../../../images/appStore.png"
import "./Footer.css"


const Footer = () => {
  return (
    <footer id="footer">

      <div className="leftFooter">
        <h4>DOWNLOAD FROM APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="PlayStore"></img>
        <img src={appStore} alt="AppStore"></img>
      </div>

      <div className="midFooter">
        <h1>Buy It Now</h1>
        <p>High Quality is our First Priority.</p>
        <p>Copyrights 2023 &copy; Buy It Now</p>
      </div>

      <div className="rightFooter">
        <h4>Follow us</h4>
        <a href="https://instagram.com/sumit.singh_18?igshid=MzNlNGNkZWQ4Mg==">Instagram</a>
        <a href="https://twitter.com/sumitsingh____">Twitter</a>
        <a href="https://www.linkedin.com/in/sumitkumar-singh-b572821b9/">LinkedIn</a>
        <a href="https://github.com/sumit1617">Github</a>
      </div>

    </footer>
  );
};

export default Footer;
