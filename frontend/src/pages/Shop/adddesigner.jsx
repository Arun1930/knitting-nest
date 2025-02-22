import React, { useEffect } from 'react'
import ShopCreate from "../../components/Shop/ShopCreate";
// ../components/Shop/ShopCreate
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar'

const AddDesigner = () => {
    // const navigate = useNavigate();
    // const { isSeller, seller } = useSelector((state) => state.seller);
    // // if user is login then redirect to home page
    // useEffect(() => {
    //     if (isSeller === true) {
    //         navigate(`/shop/${seller._id}`);
    //     }
    // })
    return (
        <div>
            <div>
      <DashboardHeader />
      <div className="w-full flex">
        <div className="flex items-start w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <DashboardSideBar active={12} />
          </div>
          <div className='shop-admin'>
          <ShopCreate />
          </div>
        </div>
      </div>
    </div>
        </div>
    )
}

export default AddDesigner