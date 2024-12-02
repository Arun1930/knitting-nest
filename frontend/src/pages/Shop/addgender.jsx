import React, { useState, useEffect } from 'react';
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader';
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar';
import Table from 'react-bootstrap/Table';
import { Button } from "@material-ui/core";
import { AiOutlineDelete } from "react-icons/ai";
import axios from 'axios';
import { toast } from "react-toastify";

const AddGender = () => {
    const [genderName, setGenderName] = useState("");
    const [genderList, setGenderList] = useState([]);

    useEffect(() => {
        fetchGenders();
    }, []);

    const fetchGenders = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/v2/getallgender');
            setGenderList(response.data || []);
        } catch (error) {
            console.error("Error fetching genders:", error);
        }
    };

    const handleAddGender = async (e) => {
        e.preventDefault();
        if (!genderName) {
            toast.error("Please enter a gender name.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/v2/addgender', { Gender: genderName });
                toast.success("Gender added successfully!");
                setGenderName("");  
                fetchGenders();    
                window.location.reload()
        } catch (error) {
            console.error("Error adding gender:", error);
            toast.error("Failed to add gender. Please try again.");
        }
    };

    const handleDeleteGender = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/v2/deletegender/${id}`);
                toast.success("Gender deleted successfully!");
                fetchGenders(); 
                window.location.reload()

        } catch (error) {
            console.error("Error deleting gender:", error);
            toast.error("Failed to delete gender. Please try again.");
        }
    };

    return (
        <div>
            <DashboardHeader  />
            <div className="flex items-center justify-between w-full">
                <div className="w-[80px] 800px:w-[330px]">
                    <DashboardSideBar active={7} />
                </div>
                <div className="w-full justify-center flex">
                    <div className="w-[90%] 800px:w-[100%] bg-white shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
                        <h5 className="text-[30px] font-Poppins text-center">Add Gender</h5>
                        <div className='genr-tebl'>
                            <form onSubmit={handleAddGender}>
                                <label className="pb-2">
                                    Add Gender <span className="text-red-500">*</span>
                                </label>
                                <div className='split-grn'>
                                    <div>
                                        <input
                                            type="text"
                                            name="genderName"
                                            value={genderName}
                                            className="mt-2 appearance-none block px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            onChange={(e) => setGenderName(e.target.value)}
                                            placeholder="Enter gender name..."
                                        />
                                    </div>
                                    <div>
                                        <button type="submit" className='gen-submit-bt'>Submit</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Gender Id</th>
                                    <th>Gender</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {genderList.length > 0 ? genderList.map((gender) => (
                                    <tr key={gender._id}>
                                        <td>{gender._id}</td>
                                        <td>{gender.Gender}</td>
                                        <td>
                                            <Button onClick={() => handleDeleteGender(gender._id)}>
                                                <AiOutlineDelete size={20} />
                                            </Button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="3" className="text-center">No genders found</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddGender;
