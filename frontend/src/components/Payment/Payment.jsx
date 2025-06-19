import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";


const Payment = () => {
    const [orderData, setOrderData] = useState([]);
    const [open, setOpen] = useState(false);
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        const orderData = JSON.parse(localStorage.getItem("latestOrder"));
        setOrderData(orderData);
    }, []);
    const paymentHandler = async () => {
    try {
    const options = {
    key: "rzp_test_U2XWpODmhRkL0l", // Replace with your Razorpay key
    amount:Math.round(orderData?.totalPrice * 100),
    currency: "INR",
    name: "Knitting Nest",
    description: "Manual Payment",
    handler: function (response) {
      // Payment success - do something here (optional)
      console.log("Payment ID:", response.razorpay_payment_id);
      alert("Payment successful! ID: " + response.razorpay_payment_id);
    },
    prefill: {
      name: user?.name || "",
      email: user?.email || "",
    },
    theme: {
      color: "#f63b60",
    },
  };

  const razorpay = new window.Razorpay(options);
  razorpay.open();
    } catch (error) {
        console.error("Payment Error:", error);
        toast.error("Something went wrong with payment.");
    }
    };

    

    // Pay-pal
    const createOrder = (data, actions) => {
        return actions.order
            .create({
                purchase_units: [
                    {
                        description: "Sunflower",
                        amount: {
                            currency_code: "USD",
                            value: orderData?.totalPrice,
                        },
                    },
                ],
                // not needed if a shipping address is actually needed
                application_context: {
                    shipping_preference: "NO_SHIPPING",
                },
            })
            .then((orderID) => {
                return orderID;
            });
    };

    const order = {
        cart: orderData?.cart,
        shippingAddress: orderData?.shippingAddress,
        user: user && user,
        totalPrice: orderData?.totalPrice,
    };

    const onApprove = async (data, actions) => {
        return actions.order.capture().then(function (details) {
            const { payer } = details;

            let paymentInfo = payer;

            if (paymentInfo !== undefined) {
                paypalPaymentHandler(paymentInfo);
            }
        });
    };

    const paypalPaymentHandler = async (paymentInfo) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        order.paymentInfo = {
            id: paymentInfo.payer_id,
            status: "succeeded",
            type: "Paypal",
        };

        await axios
            .post(`${server}/order/create-order`, order, config)
            .then((res) => {
                setOpen(false);
                navigate("/order/success");
                toast.success("Order successful!");
                localStorage.setItem("cartItems", JSON.stringify([]));
                localStorage.setItem("latestOrder", JSON.stringify([]));
                window.location.reload();
            });

    }

    const paymentData = {
        amount: Math.round(orderData?.totalPrice * 100),
    }


    


    //  Cash on Delevery Handler (COD)
    const cashOnDeliveryHandler = async (e) => {
        e.preventDefault();

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const transformedCart = orderData?.cart?.map((item) => ({
            product: item._id,
            shop: item.shop._id || item.shop, // in case it's populated
            name: item.name,
            quantity: item.quantity || 1, // default quantity if not set
            price: item.discountPrice || item.price,
          }));
          
          const order = {
            cart: transformedCart,
            shippingAddress: orderData?.shippingAddress,
            user: user._id,
            totalPrice: Number(orderData?.totalPrice),
            paymentInfo: {
              type: "Cash On Delivery",
            },
          };

        order.paymentInfo = {
            type: "Cash On Delivery",
        };
        console.log("Order being sent:", order);
        await axios
            .post(`${server}/order/create-order`, order, config)
            .then((res) => {
                setOpen(false);
                navigate("/order/success");
                toast.success("Order successful!");
                localStorage.setItem("cartItems", JSON.stringify([]));
                localStorage.setItem("latestOrder", JSON.stringify([]));
                window.location.reload();
            });
    }


    return (
        <div className="w-full flex flex-col items-center py-8">
            <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
                <div className="w-full 800px:w-[65%]">
                    <PaymentInfo
                        user={user}
                        open={open}
                        setOpen={setOpen}
                        onApprove={onApprove}
                        createOrder={createOrder}
                        cashOnDeliveryHandler={cashOnDeliveryHandler}
                        paymentHandler={paymentHandler}

                    />
                </div>
                <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
                    <CartData
                        orderData={orderData}
                    />
                </div>
            </div>
        </div>
    );
};

const PaymentInfo = ({
    user,
    open,
    setOpen,
    onApprove,
    createOrder,
    paymentHandler,
    cashOnDeliveryHandler,
}) => {
    const [select, setSelect] = useState(1);



    return (
        <div className="w-full 800px:w-[95%] bg-[#fff] rounded-md p-5 pb-8">
            {/* select buttons */}
            <div className="flex w-full pb-5 border-b mb-2">
                <div
                    className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center cursor-pointer"
                    onClick={() => setSelect(1)}
                >
                    {select === 1 && (
                    <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
                    )}
                </div>
                <h4
                    className="text-[18px] pl-2 font-[600] text-[#000000b1] cursor-pointer"
                    onClick={() => setSelect(1)}
                >
                    Pay with Debit/credit card
                </h4>
                </div>

                {select === 1 && (
                <div className="w-full flex border-b pb-5 mb-2">
                    <div
                    className={`${styles.button} !bg-[#f63b60] text-white h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
                    onClick={paymentHandler}
                    >
                    Pay Now
                    </div>
                </div>
                )}

            <br />
            {/* paypal payment */}
            <div>
                <div className="flex w-full pb-5 border-b mb-2">
                    <div
                        className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
                        onClick={() => setSelect(2)}
                    >
                        {select === 2 ? (
                            <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
                        ) : null}
                    </div>
                    <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
                        Pay with Paypal
                    </h4>
                </div>

                {/* pay with payment  */}
                {select === 2 ? (
                    <div className="w-full flex border-b">
                        <div
                            className={`${styles.button} !bg-[#f63b60] text-white h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
                            onClick={() => setOpen(true)}
                        >
                            pay Now
                        </div>
                        {
                            open && (
                                <div className="w-full fixed top-0 left-0 bg-[#00000039] h-screen flex items-center justify-center z-[99999]">
                                    <div className="w-full 800px:w-[40%] h-screen 800px:h-[80vh] bg-white rounded-[5px] shadow flex flex-col justify-center p-8 relative overflow-y-scroll">
                                        <div className="w-full flex justify-end p-3">
                                            <RxCross1
                                                size={30}
                                                className="cursor-pointer absolute top-5 right-3"
                                                onClick={() => setOpen(false)}
                                            />
                                        </div>
                                        <PayPalScriptProvider
                                            options={{
                                                "client-id":
                                                    "AXRhO4eNGo3L8MUFazEFnW9hNwBP2rTwUWNqMMRcFtjpbCrDVt6vS8HoWa7hyLlfO0fxG3OU_9zit7KN",
                                                    currency: "USD",
                                            }}
                                        >
                                            <PayPalButtons
                                                style={{ layout: "vertical" }}
                                                onApprove={onApprove}
                                                createOrder={createOrder}
                                            />
                                        </PayPalScriptProvider>
                                    </div>
                                </div>
                            )
                        }

                    </div>
                ) : null}
            </div>

            <br />
            {/* cash on delivery */}
            <div>
                <div className="flex w-full pb-5 border-b mb-2">
                    <div
                        className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
                        onClick={() => setSelect(3)}
                    >
                        {select === 3 ? (
                            <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
                        ) : null}
                    </div>
                    <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
                        Cash on Delivery
                    </h4>
                </div>


                {/* cash on delivery */}
                {select === 3 ? (
                    <div className="w-full flex">
                        <form className="w-full" onSubmit={cashOnDeliveryHandler}>
                            <input
                                type="submit"
                                value="Confirm"
                                className={`${styles.button} !bg-[#f63b60] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
                            />
                        </form>
                    </div>
                ) : null}
                {select === 4 && (
                    <div className="w-full flex">
                        <div
                        className={`${styles.button} !bg-[#f63b60] text-white h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
                        onClick={paymentHandler} // Make sure this prop is passed from the parent
                        >
                        Pay Now
                        </div>
                    </div>
                    )}
            </div>

        </div>
    );
};




const CartData = ({ orderData }) => {
    const shipping = orderData?.shipping?.toFixed(2);
    return (
        <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
            <div className="flex justify-between">
                <h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
                <h5 className="text-[18px] font-[600]">₹{orderData?.subTotalPrice}</h5>
            </div>
            <br />
            <div className="flex justify-between">
                <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
                <h5 className="text-[18px] font-[600]">₹{shipping}</h5>
            </div>
            <br />
            <div className="flex justify-between border-b pb-3">
                <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
                <h5 className="text-[18px] font-[600]">{orderData?.discountPrice ? "₹" + orderData.discountPrice : "-"}
                </h5>
            </div>
            <h5 className="text-[18px] font-[600] text-end pt-3">
                 ₹{orderData?.totalPrice}
            </h5>
            <br />

        </div>
    );
};

export default Payment;