import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateOptions } from "../../formSource";
import AuthContext from "../../context/AuthContext";
import { async } from "@firebase/util";

const VoucherNew = ({inputs}) => {
  const {auth} = useContext(AuthContext);
  const navigate = useNavigate();

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Access-Control-Allow-Origin", "*");
  myHeaders.append("Authorization", `Bearer ${localStorage.getItem('jwt')}`);
  var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    useEffect( async () => {
      // get organizations, categories list for input form
      const array = [
        fetch(`${process.env.REACT_APP_API_KEY.concat(`/organizations`)}`, requestOptions),
        fetch(`${process.env.REACT_APP_API_KEY.concat(`/categories`)}`, requestOptions)
      ]
      try {
      const res = await Promise.allSettled(array);
      console.log(res);
      const successFetch = [];
      res.map(obj => {
        if (obj.status==="fulfilled")
        successFetch.push(obj.value);
      })
      console.log(successFetch);
    }catch(e) {
      console.log(e);
    }

    
  }, [inputs]);
    
  const handleAdd = async (e) =>{
    e.preventDefault();
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
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Voucher</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleAdd} id="new-form">
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

export default VoucherNew;
