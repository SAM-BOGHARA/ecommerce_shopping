import React from "react";
import playStore from "../../../images/playStore.png"
import appStore from "../../../images/appStore.png"
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import "./Footer.css"


const Footer = () => {
  return (
    <footer id="footer">

      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
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
        <a href="https://instagram.com/sumit.singh_18"><InstagramIcon fontSize="large" /></a>
        <a href="https://twitter.com/sumitsingh____"><TwitterIcon fontSize="large" /></a>
        <a href="https://linkedin.com/in/singh-sumitkumar"><LinkedInIcon fontSize="large" /></a>
        <a href="https://github.com/sumit1617"><GitHubIcon fontSize="large" /></a>
      </div>

    </footer>
  );
};

export default Footer;
