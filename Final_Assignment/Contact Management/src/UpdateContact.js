import React from "react";
import { useContactContext } from "./ContactProvider";
import { useInput } from "./hooks";
import "./ContactForm.css";
import { useHistory } from "react-router-dom";
// import Axios from 'axios';
// import queryString from 'query-string';


// const Base_Api = 'http://localhost:8080';

const UpdateContact = (props) => {
  // const {contact, updateContact} = useContactContext();
  const { updateContact} = useContactContext();

  const history = useHistory();
  const [name, updateName] = useInput(props.match.params.name);
  const [email, updateEmail] = useInput(props.match.params.email);
  const [phone, updatePhone] = useInput(props.match.params.phone);

  const id = props.match.params.id;

  // useEffect(() => {   
  //   Axios
  //     .get(`${Base_Api}/contact/${id}`).then((result) => {      

  //     });
  // }, []);

  const submit = (event) => {
    event.preventDefault();
    updateContact(id.trim(), name.trim(), email.trim(), phone.trim());
    history.push('/');
  };

  return (
    <>
      <h1>Contact form</h1>
      <form onSubmit={submit} className="contact-form">
        <label htmlFor="email">Name:</label>
        <br></br>
        <input
          id="name"   
          value={name}      
          onChange={updateName}
          type="text"          
          placeholder="name..."
          required
        />
        <br></br>
        <label htmlFor="email">Email:</label>
        <br></br>
        <input
          id="email"
          value={email}
          onChange={updateEmail}
          type="text"
          placeholder="email..."
          required
        />
        <br></br>
        <label htmlFor="phone">Phone:</label>
        <br></br>
        <input id="phone"
          value={phone}
          onChange={updatePhone}
          type="number"
          placeholder="phone..."
          required />
        <button className="update-button">Update</button>
      </form>
    </>
  );
};

export default UpdateContact;
