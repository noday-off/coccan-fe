import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation } from "react-router-dom";
import { toast } from "react-toastify";
import "./importForm.scss";

const ImportForm = ({ setImportForm }) => {
  const [file,setFile] = useState(null);
  const navigate = useNavigation;
  const inputRef = useRef();

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setFile(e.dataTransfer.files[0]);
  };
  useEffect(()=>{
    if(file){
      toast.success("File committed!");
    }else{
      toast.info("File is not committed!");
    }
  },[file]);
  const handleUpload = () => {
    const XHR = new XMLHttpRequest();
    const formdata = new FormData();
    formdata.append("formFile",file);
    XHR.onreadystatechange = function() {
      if (XHR.readyState == XMLHttpRequest.DONE) {
        toast.success("Import users successfully!");
        navigate('/users');
      }else{
        toast.error("Fail to import users!");
        navigate('/users');
      }
    };
    XHR.open("POST","https://coccan-api20230202190409.azurewebsites.net/api/users/import");
    XHR.setRequestHeader('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('jwt')));
    XHR.send(formdata);
  };
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setImportForm(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>Import your excel file to create users</h1>
        </div>
        <div className="body">
          {!file && (
            <div className="dropzone"
              onDragOver={e=>handleDragOver(e)}
              onDrop={e=>handleDrop(e)}
            >
              <h1>Drag and Drop Files to Upload</h1>
              <h1>Or</h1>
              <input type="file" 
              id="file"
              onChange={(e)=>setFile(e.target.files[0])} 
              ref={inputRef}
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              hidden 
              >
              
              </input>
              <button onClick={() => inputRef.current.click()}>Select Files</button>
            </div>
          )}
        </div>
        <div className="footer">
          <button
            onClick={() => {
              setImportForm(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          {file && (
            <button onClick={handleUpload}>Import</button>
          )}
          
        </div>
      </div>
    </div>
  );
}

export default ImportForm;