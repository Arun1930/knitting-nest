import React, { useState, useEffect } from 'react';
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader';
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar';
import Table from 'react-bootstrap/Table';
import { Button } from '@mui/material';
import { AiOutlineDelete } from "react-icons/ai";
import axios from 'axios';
import { toast } from "react-toastify";

const AddMaterial = () => {
    const [genderName, setGenderName] = useState("");
    const [genderList, setGenderList] = useState([]);

    useEffect(() => {
        fetchGenders();
    }, []);

    const fetchGenders = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/v2/getmaterial');
            setGenderList(response.data || []);
        } catch (error) {
            console.error("Error fetching Material:", error);
        }
    };

    const handleAddGender = async (e) => {
        e.preventDefault();
        if (!genderName) {
            toast.error("Please enter a Material name.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/v2/addmaterial', { material: genderName });
                toast.success("Material added successfully!");
                setGenderName("");  
                fetchGenders();    
                window.location.reload()
        } catch (error) {
            console.error("Error adding Material:", error);
            toast.error("Failed to add Material. Please try again.");
        }
    };

    const handleDeleteGender = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/v2/deletematerial/${id}`);
                toast.success("Material deleted successfully!");
                fetchGenders(); 
                window.location.reload()

        } catch (error) {
            console.error("Error Material Material:", error);
            toast.error("Failed to delete Material. Please try again.");
        }
    };
    return (
        <div>
            <DashboardHeader />
            <div className="flex items-center justify-between w-full">
                <div className="w-[80px] 800px:w-[330px]">
                    <DashboardSideBar active={6} />
                </div>
                <div className="w-full justify-center flex">
                    <div className="w-[90%] 800px:w-[100%] bg-white shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
                        <h5 className="text-[30px] font-Poppins text-center">Add Material</h5>
                        <div className='genr-tebl'>
                            <form onSubmit={handleAddGender}>
                                <label className="pb-2">
                                    Add Material <span className="text-red-500">*</span>
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
                                    <th>Material Id</th>
                                    <th>Material</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {genderList.length > 0 ? genderList.map((gender) => (
                                    <tr key={gender._id}>
                                        <td>{gender._id}</td>
                                        <td>{gender.material}</td>
                                        <td>
                                            <Button onClick={() => handleDeleteGender(gender._id)}>
                                                <AiOutlineDelete size={20} />
                                            </Button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="3" className="text-center">No Material found</td>
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

export default AddMaterial;
