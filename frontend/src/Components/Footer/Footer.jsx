// React
import React from "react";

// CSS
import "./Footer.css";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer id="footer">
      <p>Parallel &copy; 2024.</p>
      <p>
        Created by{" "}
        <a href="https://github.com/TitanCodeXD" target="_blank">
          Wesley Santos <FaGithub />
        </a>
      </p>
    </footer>
  );
};

export default Footer;
