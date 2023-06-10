import axios from "axios";

export const headersObject = () => {
  return {
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
};

export const uploadFileToCloudinary = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", import.meta.env.VITE_PRESET_KEY);
  return axios.post(import.meta.env.VITE_CLOUDINARY_URL, formData);
};
