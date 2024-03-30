'use client';
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import { db } from '../firebase.js';

import React, { useState } from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';


// async function fetchDataFromFirestore(){
//   const querySnapshot = await getDocs(collection(db, "users"))

//   const data = [];
//   querySnapshot.forEach((doc) => {
//     data.push({ id: doc.id, ...doc.data()});
//   });

//   return data; 
// }


//^^^might be needed later to fetch data

export default withPageAuthRequired(function CSRPage() {

  const [newItem, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    status: '',
    careerPath: '',
    blurb: ''
  });

  const addItem = async (e) => {
    e.preventDefault();
    if (newItem.firstName !== '' && newItem.lastName !== '' && newItem.email !== '' && newItem.status !== '' && newItem.careerPath !== '' && newItem.blurb !== '') {
      await addDoc(collection(db, 'users'), {
        firstName: newItem.firstName, 
        lastName: newItem.lastName,
        email: newItem.email, 
        status: newItem.status,
        careerPath: newItem.careerPath,
        blurb: newItem.blurb, 
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...newItem,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(newItem);
  };
return (
    <>
      <div className="mb-5" data-testid="csr">
        <h1 data-testid="csr-title">Update Profile</h1>
        <div data-testid="csr-text">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="firstName">First Name:</label>
              <input
                value={newItem.firstName} 
                type="text"
                id="firstName"
                name="firstName"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="lastName"
>Last Name:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={newItem.lastName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={newItem.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="status">Select status:</label>
              <select
                id="status"
                name="status"
                value={newItem.status}
                onChange={handleChange}
              >
                <option value="mentor">Mentor </option>
                <option value="mentee">Mentee </option>
</select>
            </div>
            <div>
              <label htmlFor="careerPath">Select one main career path:</label>
              <select
                id="careerPath"
                name="careerPath"
                value={newItem.careerPath}
                onChange={handleChange}
              >
                <option value="path0">Select </option>
                <option value="All">Open to all </option>
                <option value="Computer Science">Computer Science</option>
                <option value="Medicine">Medicine</option>
                <option value="Finance">Finance</option>
                <option value="Writing">Writing</option>
</select>
            </div>
            <div>
              <label htmlFor="blurb">Blurb about your goals and interests:</label>
              <textarea
                id="blurb"
                name="blurb"
                value={newItem.blurb}
                onChange={handleChange}
              />
            </div>
            <button 
            type="submit"
            onClick={addItem}
            >Submit</button>
          </form>
        </div>
      </div>
    </>
  );
});
