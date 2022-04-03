import React from "react";
import Logo from "./img/logo.png";
import { MdShoppingBasket } from "react-icons/md";
import Avatar from "./img/avatar.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className="fixed z-50  p-4 w-screen px-16">
      {/* destop and mobile */}
      <div className="hidden md:flex w-full h-full  items-center justify-between ">
        <Link to="/" className="flex items-center gap-2">
          <img className="w-10 object-cover" src={Logo} alt="logo" />
          <p className="text-headingColor text-xl font-bold"> Food</p>
        </Link>

        <div className="flex  items-center gap-8">
          <ul className="flex items-center gap-8 ">
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Home
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Menu
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              About Us
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Services
            </li>
          </ul>

          <div className="relative flex items-center justify-center   ">
            <MdShoppingBasket className="text-textColor text-2xl   cursor-pointer" />

            <div className="absolute   -top-1 -right-2 w-5  h-5  rounded-full bg-cartNumBg flex items-center justify-center">
              <p className="text-xs text-white font-semibold">2</p>
            </div>
          </div>

          <div>
            <motion.img
              whileTap={{ scale: 0.6 }}
              className="w-8 min-w-[32px] h-8 min-h-[32px] object-cover cursor-pointer drop-shadow-xl"
              src={Avatar}
              alt="userProfile"
            />
          </div>
        </div>
      </div>

      {/* destop and mobile */}
      <div className="flex md:hidden w-full h-full before:  "></div>
    </header>
  );
};

export default Header;
