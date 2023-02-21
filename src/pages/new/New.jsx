import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { logoRef } from "../../components/googleAuth/firebase";
import { orgRows } from "../../datatablesource";

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [data,setData] = useState(orgRows);
  const navigate = useNavigate();
  const handleAdd = (e) =>{
    e.preventDefault();
    console.log(file);
    uploadBytes(ref(logoRef,file.name), file).then((snapshot) => {
      console.log('Uploaded a logo to Firebase Storage');
    }).catch((error) => {
      console.log(error.message);
    });
    getDownloadURL(ref(logoRef, file.name))
    .then((url) => {
      console.log(url);
    }).catch((e)=>{
      console.log(e.message);
    });
    navigate('/organizations');
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleAdd}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input type={input.type} id={input.label} placeholder={input.placeholder} />
                </div>
              ))}
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
