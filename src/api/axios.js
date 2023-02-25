import axios from 'axios';

export default axios.create({
    baseURL: 'https://coccan-api20230202190409.azurewebsites.net/api'
});

//axios config
          // var config =  {
          //   headers: { 
          //     'Content-Type': 'application/json',
          //     'Access-Control-Allow-Origin': '*',
          //   }
          // };
          // auth.currentUser.getIdToken().then((token) => {
          //   config.headers.Authorization = token;
          //   axios.post(LOGIN_URL,config)
          //   .then((response) => {
          //     console.log(response?.data);
          //     if(response){
          //       navigate('/');
          //     }
          //   })
          //   .catch(function (error) {
          //     console.log(error);
          //   });
          // });