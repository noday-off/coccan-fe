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
      placeholder: "Thinh Nguyen",
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
    }
  ];
  
export const voucherInputs = [
  {
    id: 1,
    label: "Organization",
    type: "select",
    name: "organizationId",
    options: []
  },
  {
    id: 2,
    label: "Category",
    type: "select",
    name: "categoryId",
    options: []
  },
  {
    id: 3,
    label: "Description",
    type: "text",
    name: "description",
    placeholder: "ABC's voucher bonus for customer who ...."
  },
  {
    id: 4,
    label: "Address",
    type: "text",
    name: "address",
    placeholder: "123 Str.456",
  },
  {
    id: 5,
    label: "Expired Date",
    type: "datetime-local",
    name: "expiredDate",
    placeholder: "2023-03-08T10:56:45.900",
  },
  {
    id: 6,
    label: "Quantity",
    type: "number",
    name: "number",
    placeholder: "100",
  }
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

export const 
updateOptions = (userForm,values,index) => {
  userForm[index].options = values.map((item) => {
    return {value: item.id, label: item.name};
  });
};
