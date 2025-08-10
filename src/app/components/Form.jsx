'use client';
import React, { useEffect, useState } from 'react';

function Form() {
    const [item, setItem] = useState([]);
    const [inputData, setInputData] = useState({
        firstName: '',
        lastName: '',
        presentAdress: '',
        mobileNumber: '',
        contact: '',
    });
    const [editForm, setEditForm] = useState(null);

    // Fetch all data
    const fetchData = async () => {
        try {
            const res = await fetch('http://localhost:3005/api/v1/form/');
            const resData = await res.json();
            setItem(resData);
        } catch (error) {
            console.error('fetchData error', error);
        }
    };

    // Post data
    const postData = async () => {
        try {
            const res = await fetch('http://localhost:3005/api/v1/form/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(inputData),
            });
            if (res.ok) {
                await fetchData();
                clearForm();
            }
        } catch (error) {
            console.error('postData error', error);
        }
    };

    // Update data
    const updateData = async () => {
        try {
            const res = await fetch(`http://localhost:3005/api/v1/form/${editForm}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(inputData),
            });
            if (res.ok) {
                await fetchData();
                clearForm();
            }
        } catch (error) {
            console.error('updateData error', error);
        }
    };

    // Delete data
    const deleteData = async (_id) => {
        try {
            const res = await fetch(`http://localhost:3005/api/v1/form/${_id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                await fetchData();
                clearForm();
            }
        } catch (error) {
            console.error('deleteData error', error);
        }
    };

    // Clear form
    const clearForm = () => {
        setInputData({
            firstName: '',
            lastName: '',
            presentAdress: '',
            mobileNumber: '',
            contact: '',
        });
        setEditForm(null);
    };

    // Handle input change

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        if (editForm) {
            updateData();
        } else {
            postData();
        }
    };

    // Edit existing item
    const handleEdit = (form) => {
        setEditForm(form._id);
        setInputData({
            firstName: form.firstName,
            lastName: form.lastName,
            presentAdress: form.presentAdress,
            mobileNumber: form.mobileNumber,
            contact: form.contact,
        });
    };

    useEffect(() => {
        fetchData();
    }, []);
    console.log(item)
    return (
        <div className="w-full max-w-6xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6 text-center">
                {editForm ? 'Update Form' : 'Create New Form'}
            </h1>

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-4"
            >
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={inputData.firstName}
                    onChange={(e) =>
                        setInputData({ ...inputData, firstName: e.target.value })
                    }
                    className="border p-2 rounded"
                    required
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={inputData.lastName}
                    onChange={(e) =>
                        setInputData({ ...inputData, lastName: e.target.value })
                    }
                    className="border p-2 rounded"
                    required
                />
                <input
                    type="text"
                    name="presentAdress"
                    placeholder="Present Address"
                    value={inputData.presentAdress}
                    onChange={(e) =>
                        setInputData({ ...inputData, presentAdress: e.target.value })
                    }
                    className="border p-2 rounded col-span-1 md:col-span-2"
                    required
                />
                <input
                    type="number"
                    name="mobileNumber"
                    placeholder="Mobile Number"
                    value={inputData.mobileNumber}
                    onChange={(e) =>
                        setInputData({ ...inputData, mobileNumber: e.target.value })
                    }
                    className="border p-2 rounded"
                    required
                />
                <input
                    type="number"
                    name="contact"
                    placeholder="Contact"
                    value={inputData.contact}
                    onChange={(e) =>
                        setInputData({ ...inputData, contact: e.target.value })
                    }
                    className="border p-2 rounded"
                    required
                />

                <div className="flex gap-4 col-span-1 md:col-span-2">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        {editForm ? 'Update' : 'Save'}
                    </button>
                    {editForm && (
                        <button
                            type="button"
                            onClick={clearForm}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            {/* Data Table */}
            <div className="mt-8 overflow-x-auto">
                <table className="w-full table-auto border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">First Name</th>
                            <th className="border p-2">Last Name</th>
                            <th className="border p-2">Address</th>
                            <th className="border p-2">Mobile</th>
                            <th className="border p-2">Contact</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {item.length > 0 ? (
                            item.map((element) => (
                                <tr key={element._id} className="hover:bg-gray-50">
                                    <td className="border p-2">{element.firstName}</td>
                                    <td className="border p-2">{element.lastName}</td>
                                    <td className="border p-2">{element.presentAdress}</td>
                                    <td className="border p-2">{element.mobileNumber}</td>
                                    <td className="border p-2">{element.contact}</td>
                                    <td className="border p-2 flex gap-2">
                                        <button
                                            onClick={() => handleEdit(element)}
                                            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteData(element._id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center p-4">
                                    No Data Found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Form;
