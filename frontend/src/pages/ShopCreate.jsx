import React, { useEffect } from 'react'
import ShopCreate from "../components/Shop/ShopCreate";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AdminHeader from "../components/Layout/AdminHeader";
import AdminSideBar from "../components/Admin/Layout/AdminSideBar";

const ShopCreatePage = () => {
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
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <AdminSideBar active={6} />
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

export default ShopCreatePage