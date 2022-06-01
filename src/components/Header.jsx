import React, { useState } from "react";
import Logo from "./img/logo.png";
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import Avatar from "./img/avatar.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [{ user }, dispatch] = useStateValue();
  const [isMenu, setIsmenu] = useState(false);

  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);

      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });

      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setIsmenu(!isMenu);
    }
  };
  const logOut =()=>{
    setIsmenu(false)
    localStorage.clear()
    dispatch({
      type:actionType.SET_USER,
      user: null
    })

  }


  return (
    <header className="fixed z-50  p-3 w-screen px-4 md:p-3 md:px-16 bg-primary">
      {/* destop  */}
      <div className="hidden md:flex w-full h-full  items-center justify-between ">
        <Link to="/" className="flex items-center gap-2">
          <img className="w-10 object-cover" src={Logo} alt="logo" />
          <p className="text-headingColor text-xl font-bold"> Food</p>
        </Link>

        <div className="flex  items-center gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-8 "
          >
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
          </motion.ul>

          <div className="relative flex items-center justify-center   ">
            <MdShoppingBasket className="text-textColor text-2xl   cursor-pointer" />

            <div className="absolute   -top-1 -right-2 w-5  h-5  rounded-full bg-cartNumBg flex items-center justify-center">
              <p className="text-xs text-white font-semibold">2</p>
            </div>
          </div>

          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              className="w-8 min-w-[32px] h-8 min-h-[32px] object-cover cursor-pointer drop-shadow-xl rounded-full "
              src={user ? user.photoURL : Avatar}
              alt="userProfile"
              onClick={login}
            />
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-9  right-0 "
              >
                {user && user.email === "alashik032@gmail.com" && (
                  <Link to="/createItem">
                    <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base  rounded-full " onClick={()=>setIsmenu(false)}>
                      New Item <MdAdd />{" "}
                    </p>
                  </Link>
                )}
                <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base " onClick={logOut}>
                  Log Out <MdLogout />{" "}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* destop and mobile */}
      
      <div className="flex items-start justify-between md:hidden w-full h-full  ">

      <div className="relative flex items-center justify-center   ">
            <MdShoppingBasket className="text-textColor text-2xl   cursor-pointer" />

            <div className="absolute   -top-1 -right-2 w-5  h-5  rounded-full bg-cartNumBg flex items-center justify-center">
              <p className="text-xs text-white font-semibold">2</p>
            </div>
          </div>

        <Link to="/" className="flex items-center gap-2">
          <img className="w-10 object-cover" src={Logo} alt="logo" />
          <p className="text-headingColor text-xl font-bold"> Food</p>
        </Link>

        

        <div className="relative">
          <motion.img
            whileTap={{ scale: 0.6 }}
            className="w-8 min-w-[32px] h-8 min-h-[32px] object-cover cursor-pointer drop-shadow-xl rounded-full "
            src={user ? user.photoURL : Avatar}
            alt="userProfile"
            onClick={login}
          />
          {isMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-9  right-0 "
            >
              {user && user.email === "alashik032@gmail.com" && (
                <Link to="/createItem">
                  <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base  marker: " onClick={()=>setIsmenu(false)}>
                    New Item <MdAdd />{" "}
                  </p>
                </Link>
              )}

              <ul
                initial={{ opacity: 0, x: 200 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 200 }}
                className="flex flex-col "
              >
                <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2" 
              onClick={()=>setIsmenu(false)} >
                  Home
                </li>
                <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2" 
               onClick={()=>setIsmenu(false)}>
                  Menu
                </li>
                <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2" 
               onClick={()=>setIsmenu(false)}>
                  About Us
                </li>
                <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2" 
                 onClick={()=>setIsmenu(false)}>
                  Services
                </li>
              </ul>
              <p className=" m-2 p-2 rounded-md shadow-md  flex justify-center items-center gap-3 cursor-pointer bg-gray-200 hover:bg-slate-300 transition-all duration-100 ease-in-out text-textColor text-base  " 
              
               onClick={logOut}>
                Log Out <MdLogout />{" "}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
