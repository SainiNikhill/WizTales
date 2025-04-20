import React, { useRef, useState, useEffect } from "react";
import { FaRegFileImage } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";

const ImageSelector = ({ image, setImage, handleDeleteImg}) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };
  const handleRemoveImage =()=>{
    setImage(null)
    handleDeleteImg()
    
  }

  useEffect(() => {
    if (typeof image === "string") {
      setPreviewUrl(image);
    } else if (image) {
      setPreviewUrl(URL.createObjectURL(image));
    } else {
      setPreviewUrl(null);
    }

    return () => {
      if (previewUrl && typeof previewUrl === "string" && !image) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [image]);

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />
      {!image ? (
        <button
          className="w-full h-[220px] flex flex-col items-center justify-center gap-4 bg-slate-50 rounded border border-slate-200/50"
          onClick={onChooseFile}
        >
          <div className="w-14 h-14 flex items-center justify-center bg-cyan-50 rounded-full border-cyan-100">
            <FaRegFileImage className="text-xl text-cyan-500" />
          </div>
          <p className="text-sm text-slate-500">Browse image file to upload</p>
        </button>
      ) : (
        <div className="w-full relative">
          <img
            src={previewUrl}
            alt="selected"
            className="object-contain w-full rounded-lg"
          />
          <button
            className="absolute top-2 right-2  bg-red-100 rounded-full px-2 py-2 text-red-600 hover:text-red-100 hover:bg-red-600 "
            onClick={handleRemoveImage}
          >
            <MdDeleteOutline />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageSelector;
