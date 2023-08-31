import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';


const About = () => {
  const visitInstagram = () => {
    window.location = "https://instagram.com/sumit.singh_18";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Me</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "15vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/ddn6o2reb/image/upload/v1693478089/IMG-20230223-WA0054_ownmav.jpg"
              alt="Founder"
            />
            <Typography>Sumit Kumar Singh</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
              This is a sample wesbite made by @sumit. With the sole intention
              of learning the MERN Stack and improving my web development
              skills.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Follow Me</Typography>
            <a href="https://instagram.com/sumit.singh_18">
              <InstagramIcon fontSize="large" />
            </a>
            <a href="https://twitter.com/sumitsingh____">
              <TwitterIcon fontSize="large" />
            </a>
            <a href="https://linkedin.com/in/singh-sumitkumar">
              <LinkedInIcon fontSize="large" />
            </a>
            <a href="https://github.com/sumit1617">
              <GitHubIcon fontSize="large" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
