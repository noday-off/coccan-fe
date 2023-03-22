export const UsersColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.profilePhoto ? params.row.profilePhoto: 'https://illustoon.com/photo/2241.png'} alt="avatar" />
          {params.row.profilePhoto}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },
  {
    field: "role",
    headerName: "Role",
    width: 100,
    renderCell: (params) =>{
      return (
        <div className={`cellWithRole ${params.row.role}`}>
            {params.row.role}
        </div>
      );
    }
  },
];

//temporary data


export const dataFormat ={
  Transactions: [
    {
      field: "description",
      headerName: "Description",
      width: 300,
    },
    {
      field: "points",
      headerName: "Points",
      width: 100
    }, 
    {
      field: "createdDatetime",
      headerName: "Date",
      width: 180
    }
  ],
  Vouchers: [
    { 
      field: "id", 
      headerName: "ID",
      width: 70 
    },
    {
      field: "description",
      headerName: "Description",
      width: 250,
    },
    {
      field: "requiredPoints",
      headerName: "Price",
      width:100
    },
    {
      field: "expiredDate",
      headerName: "Expire Date",
      width: 180
    },
    {
      field: "amountLeft",
      headerName: "Amount Left",
      width: 120
    },
    {
      field: "address",
      headerName: "Address",
      width: 250
    },
    {
      field: "organization",
      headerName: "Organization",
      width:180,
      renderCell: (params) => {
        const org = params.row.organization;
        if (!org || !org.logo) {
          return null;
        }
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={org.logo} alt="avatar"/>
            {org.name}
          </div>
        );
      }
    }
  ],
  Organizations: [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "organization",
      headerName: "Organization",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.logo} alt="avatar" />
            {params.row.name}
          </div>
        );
      },
    },
    {
      field: "description",
      headerName: "Description",
      width: 250,
    }
  ],
  Users: [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "user",
      headerName: "User",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.profilePhoto ?? 'https://illustoon.com/photo/2241.png'} alt="avatar" />
            {params.row.username}
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 230,
    },
    {
      field: "role",
      headerName: "Role",
      width: 100,
      renderCell: (params) =>{
        return (
          <div className={`cellWithRole ${params.row.role}`}>
              {params.row.role}
          </div>
        );
      }
    },
  ],
  Universities: [
    {field: "id", headername: "ID", width: 70},
    {field: "name", headerName: "Name", width: 200}
  ],
  Departments: [
    {field: "id", headername: "ID", width: 70},
    {field: "name", headerName: "Name", width: 200}
  ]
}
  export const userRows = [
    {
      id: 1,
      username: "Snow",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      status: "active",
      email: "1snow@gmail.com",
      age: 35,
    },
    {
      id: 2,
      username: "Jamie Lannister",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "2snow@gmail.com",
      status: "passive",
      age: 42,
    },
    {
      id: 3,
      username: "Lannister",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "3snow@gmail.com",
      status: "pending",
      age: 45,
    },
    {
      id: 4,
      username: "Stark",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "4snow@gmail.com",
      status: "active",
      age: 16,
    },
    {
      id: 5,
      username: "Targaryen",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "5snow@gmail.com",
      status: "passive",
      age: 22,
    },
    {
      id: 6,
      username: "Melisandre",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "6snow@gmail.com",
      status: "active",
      age: 15,
    },
    {
      id: 7,
      username: "Clifford",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "7snow@gmail.com",
      status: "passive",
      age: 44,
    },
    {
      id: 8,
      username: "Frances",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "8snow@gmail.com",
      status: "active",
      age: 36,
    },
    {
      id: 9,
      username: "Roxie",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "snow@gmail.com",
      status: "pending",
      age: 65,
    },
    {
      id: 10,
      username: "Roxie",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "snow@gmail.com",
      status: "active",
      age: 65,
    },
  ];
  
  export const OrganizationsColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "organization",
      headerName: "Organization",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.img} alt="avatar" />
            {params.row.name}
          </div>
        );
      },
    },
    {
      field: "address",
      headerName: "Address",
      width: 250,
    }
  ];
  
   var orgRows = [
    {
      id: 1,
      name: "Starbucks",
      address: "Ho Chi Minh city",
      img: "https://upload.wikimedia.org/wikipedia/vi/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/125px-Starbucks_Corporation_Logo_2011.svg.png"
    },
    {
      id: 2,
      name: "Phuc Long",
      address: "Ho Chi Minh city",
      img: "https://static.mservice.io/placebrand/s/momo-upload-api-200218150929-637176353692616410.jpg"
    },
    {
      id: 3,
      name: "Cong Caphe",
      address: "Ho Chi Minh city",
      img: "https://cdn.haitrieu.com/wp-content/uploads/2022/03/Logo-Cong-Ca-Phe.png"
    }
  ];
  
  export {orgRows};