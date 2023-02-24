export const userInputs = [
    {
      id: 1,
      label: "Role",
      type: "select",
      name: "role",
      options:[
        {value: "STUDENT", label: "Student"},
        {value: "LECTURER", label: "Lecturer"},
        {value: "ADMIN", label: "Admin"},
      ]
    },
    {
      id: 2,
      label: "Username",
      type: "text",
      name: "username",
      placeholder: "Tiger Tran",
    },
    {
      id: 3,
      label: "Email",
      type: "mail",
      name: "email",
      placeholder: "ahuhu@fpt.edu.vn",
    },
    {
      id: 4,
      label: "Department",
      type: "select",
      name: "departmentId",
      options: []
    },
    {
      id: 5,
      label: "University",
      type: "select",
      name: "universityId",
      options: []
    },
  ];
  
export const productInputs = [
  {
    id: 1,
    label: "Title",
    type: "text",
    placeholder: "Apple Macbook Pro",
  },
  {
    id: 2,
    label: "Description",
    type: "text",
    placeholder: "Description",
  },
  {
    id: 3,
    label: "Category",
    type: "text",
    placeholder: "Computers",
  },
  {
    id: 4,
    label: "Price",
    type: "text",
    placeholder: "100",
  },
  {
    id: 5,
    label: "Stock",
    type: "text",
    placeholder: "in stock",
  },
];

export const orgInputs = [
  {
    id: 1,
    label: "Name",
    type: "text",
    name: "name",
    placeholder: "Highland coffee"
  },
  {
    id: 2,
    label: "Description",
    type: "text",
    name: "description",
    placeholder: "Ho Chi Minh city"
  },  
];

export const updateValue = (field,values) => {
  field = values;
};

export const updateOptions = (userForm,values,index) => {
  values.forEach((value)=>{
    userForm[index].options.push({value: value.id, label: value.name});
  });
};
