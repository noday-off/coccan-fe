import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useContext, useEffect, useState } from "react";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { logoRef } from "../../components/googleAuth/firebase";
import { updateOptions } from "../../formSource";
import AuthContext from "../../context/AuthContext";

const New = ({ inputs,inputType, title }) => {
  const [file, setFile] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const {auth} = useContext(AuthContext);
  const navigate = useNavigate();
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Access-Control-Allow-Origin", "*");
  myHeaders.append("Authorization", `Bearer ${auth}`);
  var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
  // get departments, universities list for input form
  useEffect( () => {
    switch(inputType) {
      case 'user':
        fetch(`${process.env.REACT_APP_API_KEY.concat(`/departments`)}`, requestOptions)
        .then(response => response.json())
        .then((result) => {
          updateOptions(inputs,result,3);
          fetch(`${process.env.REACT_APP_API_KEY.concat(`/universities`)}`, requestOptions)
          .then(response => response.json())
          .then((result) => {
            updateOptions(inputs,result,4);
            setIsLoading(false);
          })
        })
        .catch(error => console.log('error', error));
        break;        
      case 'voucher':
        fetch(`${process.env.REACT_APP_API_KEY.concat(`/organizations`)}`, requestOptions)
        .then(response => response.json())
        .then((result) => {
          updateOptions(inputs,result,0);
        })
        .catch(error => console.log('error', error));

        fetch(`${process.env.REACT_APP_API_KEY.concat(`/categories`)}`, requestOptions)
        .then(response => response.json())
        .then((result) => {
          updateOptions(inputs,result,1);
          setIsLoading(false);
        })
        .catch(error => console.log('error', error));
        break;
      case 'organization': 
        setIsLoading(false);break;
      default:
        break;
    }
    
  }, [inputs]);
    
  const handleAdd = async (e) =>{
    e.preventDefault();
    switch(inputType){
      case 'user':
        requestOptions.method = 'POST';
        requestOptions.body = JSON.stringify({
          "role": document.getElementById("role")?.value,
          "username": document.getElementById("username")?.value,
          "email": document.getElementById("email")?.value,
          "departmentId": document.getElementById("departmentId")?.value,
          "universityId": document.getElementById("universityId")?.value,
        });
          
        await fetch(`${process.env.REACT_APP_API_KEY.concat(`/users`)}`, requestOptions)
        .then(response => response.json())
        .then((result) => console.log(`Created userId: ${result.id}`))
        .catch(error => console.log('error', error));
        navigate("/users");
        break;
      case 'organization':          
        const XHR = new XMLHttpRequest();
        const formdata = new FormData();
        formdata.append("Name", document.getElementById('name').value);
        formdata.append("Description", document.getElementById('description').value);
        formdata.append("Logo", file);
        XHR.onreadystatechange = function() {
          if (XHR.readyState == XMLHttpRequest.DONE) {
            navigate('/organizations');
          }else{
            navigate('/organizations');
          }
        };
        XHR.open("POST","https://coccan-api20230202190409.azurewebsites.net/api/Organizations");
        XHR.send(formdata);
        break;
      
      case 'voucher':
        requestOptions.method="POST";
        requestOptions.body = JSON.stringify({
          "organizationId":document.getElementById("organizationId")?.value,
          "categoryId":document.getElementById("categoryId")?.value,
          "description":document.getElementById("description")?.value,
          "address":document.getElementById("address")?.value,
          "number":document.getElementById("number")?.value,
          "expiredDate":document.getElementById("expiredDate")?.value
        });
        await fetch(`${process.env.REACT_APP_API_KEY.concat(`/vouchers`)}`, requestOptions)
          .then(response => response.json())
          .then((result) => console.log(result))
          .catch(error => console.log('error', error));
        navigate("/vouchers");
        break;
      default:
        navigate('/');
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
        {isLoading 
        ? <h4>Loading...</h4>
        :
          <div className="bottom">
              {inputType!=="voucher" &&
            <div className="left">
              <img
                src={
                  file
                    ? URL.createObjectURL(file)
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt=""
              />
            </div>}
            <div className="right">
              <form onSubmit={handleAdd} id="new-form">
                {inputType!=="voucher" &&
                  <div className="formInput">
                    <label htmlFor="file">
                      Image: <DriveFolderUploadOutlinedIcon className="icon" />
                    </label>
                    <input
                      type="file"
                      id="file"
                      name="Logo"
                      onChange={(e) => setFile(e.target.files[0])}
                      style={{ display: "none" }}
                    />
                  </div>
                }

                {/* {inputs.map((input) => (
                  <div className="formInput" key={input.id}>
                    <label>{input.label}</label>
                    <input type={input.type} id={input.label} placeholder={input.placeholder} />
                  </div>
                ))} */}

                {inputs.map((field) => (
                  <div key={field.index} className="formInput">
                    <label htmlFor={field.name}>{field.label}</label>
                    {field.type === "select" ? (
                      <select id={field.name} name={field.name}>
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
        }
      </div>
    </div>
  );
};

export default New;
