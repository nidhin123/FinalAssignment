import React, { createContext, useState, useEffect } from "react";
import { useContext } from "react";
import axios from "axios";

var data=[];
const baseApiUrl = "http://localhost:8080";

const ContactContext = createContext();
export const useContactContext = () => useContext(ContactContext);

const ContactProvider = ({ children }) => {
	const [contacts, setContacts] = useState(data);
	const [contact, setContact] = useState(data);

	useEffect(() => {
		axios.get(`${baseApiUrl}/contact/`).then((res) => {
			setContacts(res.data);
		});
	}, []);

	const deleteContact = (contactid) => {
		axios.delete(`${baseApiUrl}/contact/${contactid}`).then(() => {
			axios
				.get(`${baseApiUrl}/contact/`)
				.then((res) => {
					setContacts(res.data);
				})
				.catch((error) => {
					console.error(error);
					alert("Something went wrong!");
				});
		});
	};

	const addContact = (name, phone, email) => {
		const contact = {
			name,
			email,
			phone,
		};

		axios
			.post(`${baseApiUrl}/contact/`, contact)
			.then((res) => {
				const newContact = res.data;
				const newContacts = [...contacts, newContact];
				setContacts(newContacts);
			})
			.catch((error) => {
				console.error(error);
				alert("Something went wrong!");
			});
	};

	const BindContacts = () => {
		axios
		  .get(`${baseApiUrl}/contact`).then((result) => {
			//debugger;
			console.log(result);
			setContacts(result.data);
		  });
	  };
	const updateContact = (id,name, email,phone) => {
		const newContact = {     
		name,
		email,
		phone,
	  };     
  
	  axios
		.put(`${baseApiUrl}/contact/${id}`, newContact).then((result) => {
		  BindContacts();
		});   
	};

	const editContact =(contact) =>{
		// alert(contact.id);  
		 setContact(contact);   
		 //window.location.href = '/edit?id=' + contact.id
		};
	  
  
	


	return (
		<ContactContext.Provider value={{ contacts, deleteContact, addContact, editContact,updateContact,contact }}>
			{children}
		</ContactContext.Provider>
	);
};

export default ContactProvider;
