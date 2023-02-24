import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useContext, useEffect, useState } from "react";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { logoRef } from "../../components/googleAuth/firebase";
import { orgRows } from "../../datatablesource";
import { updateOptions } from "../../formSource";
import AuthContext from "../../context/AuthContext";

const New = ({ inputs,inputType, title }) => {
  const [file, setFile] = useState("");
  const [data,setData] = useState(orgRows);
  const [departments,setDepartments] = useState([]);
  const [universities,setUniversities] = useState([]);
  const {auth} = useContext(AuthContext);
  const navigate = useNavigate();

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Access-Control-Allow-Origin", "*");
  myHeaders.append("Authorization", `Bearer ${auth.accessToken}`);
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  // get departments, universities list for input form
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_KEY.concat(`/departments`)}`, requestOptions)
    .then(response => response.json())
    .then((result) => setDepartments(result))
    .catch(error => console.log('error', error));
    updateOptions(inputs,departments,3);

    fetch(`${process.env.REACT_APP_API_KEY.concat(`/universities`)}`, requestOptions)
    .then(response => response.json())
    .then((result) => setUniversities(result))
    .catch(error => console.log('error', error));
    updateOptions(inputs, universities,4);
    
  }, []);
  
  const handleAdd = (e) =>{
    e.preventDefault();
    switch(inputType){
      case 'user':
        requestOptions.method = 'POST';
        requestOptions.body = JSON.stringify({
          "role": document.getElementById("role")?.value,
          "username": document.getElementById("username")?.value,
          "email": document.getElementById("email")?.value,
          "departmentId": document.getElementById("departmentId")?.value,
          "universityId": document.getElementById("universityId")?.value
        });
        
        fetch(`${process.env.REACT_APP_API_KEY.concat(`/users`)}`, requestOptions)
        .then(response => response.json())
        .then((result) => console.log(`Created userId: ${result.id}`))
        .catch(error => console.log('error', error));
        navigate("/users");
        break;
      case 'organization':
        requestOptions.method = 'POST';
        var formdata = new FormData();
        formdata.append("Name", document.getElementById("name")?.value);
        formdata.append("Description", document.getElementById("description")?.value);
        uploadBytes(ref(logoRef,file.name), file).then((snapshot) => {
          console.log('Uploaded a logo file to Firebase Storage!');
        });
        getDownloadURL(ref(logoRef, file.name))
        .then((url) =>{
          formdata.append("Logo",url);
          requestOptions.body = formdata;
          console.log(requestOptions);
          fetch(`${process.env.REACT_APP_API_KEY.concat(`/organizations`)}`, requestOptions)
          .then(response => response)
          .then(result => result.data)
        });

        break;
      default:
        navigate('/organization');
        break;
    }
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

              {/* {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input type={input.type} id={input.label} placeholder={input.placeholder} />
                </div>
              ))} */}

              {inputs.map((field) => (
                <div key={field.index}>
                  <label htmlFor={field.name}>{field.label}</label>
                  {field.type === "select" ? (
                    <select id={field.name} name={field.name} >
                      {field.options.map((option, index) => (
                        <option key={index} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      placeholder={field.placeholder}
                    />
                  )}
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
