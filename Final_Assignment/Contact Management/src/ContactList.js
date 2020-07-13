import React from "react";
import { FaMinusCircle } from "react-icons/fa";
import "./ContactList.css";
import { useContactContext } from "./ContactProvider";
import { Link } from 'react-router-dom';
const ContactList = () => {
	const { contacts, deleteContact } = useContactContext();

	return (
		<>
		<h1>Contact List</h1>
		<table className="contacts-table">
			<thead>
				<tr>
					<th>Name</th>
					<th>Phone</th>
					<th>Email</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{contacts.map((contact) => (
					<tr key={contact.id}>
						<td>{contact.name}</td>
						<td>{contact.phone}</td>
						<td>{contact.email}</td>
						<td>
						<Link to={`/edit/${contact.id},${contact.name} ,${contact.email},${contact.phone}`}>Edit</Link>
						</td>
						<td>
							<FaMinusCircle
								className="action-icon"
								onClick={() => deleteContact(contact.id)}
							/>
						</td>
					</tr>
				))}
			</tbody>
		</table>
		</>
	);
};

export default ContactList;
