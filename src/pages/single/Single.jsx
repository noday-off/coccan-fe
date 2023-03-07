import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { updateOptions } from "../../formSource";
import { useNavigate } from "react-router-dom";

const Single = ({inputs,inputType,title}) => {
  const [data,setData] = useState(null);
  const [file,setFile] = useState('');
  const [logoLink,setLogoLink] = useState('');
  const [name,setName] = useState('');
  const [logoLinkFile,setLogoLinkFile] = useState('');
  const [description,setDescription] = useState('');
  const [email,setEmail] = useState('');
  const [username,setUsername] = useState('');

  const [vouchers,setVouchers] = useState('');
  
  const {auth} = useContext(AuthContext);
  const navigate = useNavigate();
  const id = new URLSearchParams(window.location.search).get('id');
  var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");
	myHeaders.append("Access-Control-Allow-Origin", "*");
	myHeaders.append("Authorization", `Bearer ${auth.accessToken}`);
	var requestOptions = {
		method: 'GET',
		headers: myHeaders,
		redirect: 'follow'
	};
  
  const fetchData = (id) =>{
    fetch(`${process.env.REACT_APP_API_KEY.concat(`/${inputType}`).concat(`/${id}`)}`, requestOptions)
    .then(response => response.json())
    .then((result) => {
      setData(result);
      setFile(result.logo || result.profilePhoto || '');
      setLogoLink(result.logo || result.profilePhoto || '');
      if(inputType == 'Users'){
        setUsername(result.username);
        setEmail(result.email);
      }else if(inputType == 'Organizations'){
        setName(result.name);
        setDescription(result.description);
      }
    })
    .catch(error => console.log('error', error));
  };
  useEffect(() =>{
    fetch(`${process.env.REACT_APP_API_KEY.concat(`/departments`)}`, requestOptions)
    .then(response => response.json())
    .then((result) => {
      updateOptions(inputs,result,3);
      fetch(`${process.env.REACT_APP_API_KEY.concat(`/universities`)}`, requestOptions)
      .then(response => response.json())
      .then((result) => updateOptions(inputs,result,4));
    })
    .catch(error => console.log('error', error));
    fetchData(id);
  },[inputs]);

  const handleUpdate = async (e) =>{
    e.preventDefault();
    switch(inputType){
      case 'Users':
        requestOptions.method = 'PUT';
        requestOptions.body = JSON.stringify({
          "role": document.getElementById("role")?.value,
          "username": document.getElementById("username")?.value,
          "email": document.getElementById("email")?.value,
          "profilePhoto": data.profilePhoto,
          "departmentId": document.getElementById("departmentId")?.value,
          "universityId": document.getElementById("universityId")?.value,
        });
          
        await fetch(`${process.env.REACT_APP_API_KEY.concat(`/users`).concat(`/${id}`)}`, requestOptions)
        .then(response => response.json())
        .then((result) => console.log(`Updated userId: ${result.id}`))
        .catch(error => console.log('error', error));
        navigate("/users");
        break;
      case 'Organizations':
        const XHR = new XMLHttpRequest();
        const formdata = new FormData();
        formdata.append("Name", 
                            //document.getElementById('name').value);
                            name);
        formdata.append("Description", 
                            //document.getElementById('description').value);
                            description);
        formdata.append("Logo", file);
        formdata.append("LogoLink",logoLink);
        XHR.onreadystatechange = function() {
          if (XHR.readyState == XMLHttpRequest.DONE) {
            navigate('/organizations');
          }else{
            navigate('/organizations');
          }
        };
        XHR.open("PUT",`${process.env.REACT_APP_API_KEY.concat(`/organizations`).concat(`/${id}`)}`);
        XHR.send(formdata);
        break;
      default:
        navigate('/');
        break;
    };
  };

  const handleChange = (e, key) =>{
    switch(key){
      case 'name': setName(e.target.value);data[key] = e.target.value;break;
      case 'description': setDescription(e.target.value);data[key] = e.target.value;break;
      case 'username': setUsername(e.target.value);data[key] = e.target.value;break;
      case 'email': setEmail(e.target.value);data[key] = e.target.value;break;
    }
  }
  
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
                typeof file === "string"
                  ? file
                  : file instanceof Blob? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleUpdate} id="new-form">
              <div className="formInput">
                <label htmlFor="file" style={{display: inputType == 'Users' ? 'none': 'inline'}}>
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  name="Logo"
                  onChange={(e) =>{ 
                    const reader = new FileReader();
                    console.log(reader.readAsText(e.target.files[0]));
                    return setFile(e.target.files[0])
                  }}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((field) => (
                <div key={field.index}>
                  <label htmlFor={field.name}>{field.label}</label>
                  {field.type === "select" ? (
                    <select id={field.name} name={field.name} >
                      {field.options.map((option, index) => (
                        <option key={index} 
                        selected={(field.name == 'departmentId' && option.value == data?.department?.id)|| (field.name == 'universityId' && option.value == data?.university?.id)}
                        value={option.value}>
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
                      onChange={(e) => handleChange(e,field.name)}
                      value ={data? data[field.name] : null}
                    />
                  )}
                </div>
              ))}
              <button type="submit">Update</button>
            </form>
          </div>
        </div>
      </div>
      {/* <div className="right">
        <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
      </div> */}
    </div>
  );
};

export default Single;
