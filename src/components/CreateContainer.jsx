import React, { useState } from "react";
import { motion } from "framer-motion";
import { MdFastfood, MdCloudUpload, MdDelete,MdFoodBank, MdAttachMoney } from "react-icons/md";
import { categories } from "../utils/data";
import Loader from "./Loader";
import { storage } from "../firebase.config";
import {ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
const CreateContainer = () => {
  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fields, setFields] = useState(false);

  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage,`Images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error)
        setFields(true);
        setMsg("Error while uploading : Try AGain 🙇");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageAsset(downloadURL);
          setIsLoading(false);
          setFields(true);
          setMsg("Image uploaded successfully 😊");
          setAlertStatus("success");
          setTimeout(() => {
            setFields(false);
          }, 4000);
        });
      }
    );
  };


  const deleteImage = () => {};
  const saveDetails=()=>{}

  return (
    <div className="w-full min-h-screen items-center flex justify-center">
      <div className="w-[90%] md:w-[75%] border border-gray rounded-lg p-4 flex flex-col items-center justify-center gap-4">
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-center font-semibold ${
              alertStatus === "danger"
                ? "bg-red-400 text-red-800 "
                : "bg-emerald-400 text-emerald-800"
            }   `}
          >
            {msg}{" "}
          </motion.p>
        )}
        <div className="w-full p-2 border-gray-300 flex item-center gap-2">
          <MdFastfood className="text-xl text-gray-700" />
          <input
            className="w-full h-full bg-transparent font-semibold  placeholder:text-gray-500 text-textColor outline-none border-none"
            type="text"
            required
            value={title}
            placeholder=" Give me a title..."
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="w-full  ">
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="outline-none w-full text-base border-b-2 p-2 border-gray-200 rounded-md cursor-pointer "
          >
            <option value="other" className="bg-white">
              
              Select Category
            </option>
            {categories &&
              categories.map((item) => (
                <option
                  key={item.id}
                  className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                  value={item.urlParamName}
                >
                  
                  {item.name}
                </option>
              ))}
          </select>
        </div>
        <div className="group flex justify-center item-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-420 cursor-pointer rounded-lg ">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!imageAsset ? (
                <>
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-full h-full flex flex-col items-center justify-center cursor-pointer gap-2">
                      <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                      <p className="text-gray-500 hover:text-gray-700">
                        Click here to upload
                      </p>
                    </div>
                    <input
                      type="file"
                      name="uploadImage"
                      accept="image/*"
                      onChange={uploadImage}
                      className="w-0 h-0"
                    />
                  </label>
                </>
              ) : (
                <>
                
                  <div className="h-ful relative">
                    <img 
                    className="w-full h-full object-cover" 
                    src={imageAsset} alt="upload image" />
                    <button
                      type="button "
                      className="absolute bottom-3 right-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out "
                      onClick={deleteImage}
                    >
                      <MdDelete className="text-white" /> 
                    </button>
                  </div> 
                </>
              )}
            </>
          )}
        </div>
          
          <div className="w-full flex flex-col md:flex-row items-center gap-3">
                  <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
                    <MdFoodBank className="text-gray-700 text-2xl" />
                    <input type="text" required placeholder="Calories"
                    value={calories}
                    onChange ={(e)=>setCalories(e.target.value)}
                    className="w-full h-full bg-transparent font-semibold  placeholder:text-gray-500 text-textColor outline-none border-none"

                    />
                  </div>

                  <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
                    <MdAttachMoney className="text-gray-700 text-2xl" />
                    <input type="text" required placeholder="Price"
                     value={price}
                     onChange ={(e)=>setPrice(e.target.value)}
                    className="w-full h-full bg-transparent font-semibold  placeholder:text-gray-500 text-textColor outline-none border-none"
                    
                    />
                  </div>
          </div>

          <div className="flex items-center w-full">
                  <button type="button" className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg test-white font-semibold" onClick={saveDetails}>Save</button>
          </div>

      </div>
    </div>
  );
};

export default CreateContainer;
