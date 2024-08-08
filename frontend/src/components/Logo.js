import React from "react";
import LogoImg from "../assest/logo.png";

const Logo = () => {
  return (
    <div>
      <div>
        <a
          href="/"
          className="font-bold text-2xl sm:text-3xl flex gap-2 text-[#0fcae2]"
        >
          <img src={LogoImg} alt="LogoImg" className="w-10" />
          Trendify
        </a>
      </div>
    </div>
  );
};

export default Logo;
