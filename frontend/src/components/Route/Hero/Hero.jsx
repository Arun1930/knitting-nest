import React from 'react'
import { Link } from "react-router-dom";
import about from "../../../Assests/abous-img-1.jpeg";
import styles from "../../../styles/styles";
import servicesimg from "../../../Assests/services-img.jpeg"

const Hero = () => {
    return (
        <>
        <div
            className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.noramlFlex}`}
            style={{
                backgroundImage:
                    "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)",
            }}
        >
            <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
                <h1
                    className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize text-oneby-one`}
                >
                    Best Collection for <br /> Costume Dresses
                </h1>
                <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-[#000000ba]">
                Discover the finest collection of costume dresses perfect for any occasion! From elegant period outfits to bold, modern styles, our range has something for everyone.<br /> <br /> Whether you’re preparing for a themed party, cosplay event, or theatrical performance, our costumes are designed to impress with intricate detailing and quality craftsmanship.
                </p>
                <Link className="link" to="/products" className="inline-block">
                    <div className={`${styles.button} mt-5`}>
                        <span className="text-[#fff] font-[Poppins] text-[18px]">
                            Shop Now
                        </span>
                    </div>
                </Link>

            </div>

        </div>

        <div className='about-us-section'>
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-6 col-sm-12 col-md-6'>
                       <img className='img-abut img-fluid' src={about} alt="" />
                    </div>
                    <div className='col-lg-6 col-sm-12 col-md-6'>
                        <h3 className='us-heading'>About Us</h3>
                        <h4 className='creativity-meets'>Welcome to Knitting Nest, where creativity meets opportunity!</h4>  
                        <p>We are a unique e-commerce platform proudly rooted in Saveetha College, designed to showcase the incredible talents of our fashion design students. Our platform empowers budding designers to share their creations with the world, bringing you an exclusive collection of one-of-a-kind fashion pieces.
                        <br /><br /> At Knitting Nest, you’re not just shopping; you’re supporting the next generation of designers. Whether you're drawn to a design from our gallery or dreaming of something custom-made, our students are here to bring your vision to life. By choosing us, you’re not only wearing innovation but also encouraging a community of creative minds. </p>
                        <h5 className='creativity-meetss'>Explore, engage, and elevate your style while championing young talent. Your perfect design awaits!

</h5>
                    </div>
                </div>
            </div>
        </div>

        <div className='services-section'>
            <div className="container service-sam">
                <div className="row">
                <div className='col-lg-6 col-sm-12 col-md-6'>
    <h3 className='ser-heading'>Our Services</h3>
    <h4 className='creativity-meets'>Discover how Knitting Nest brings your fashion ideas to life!</h4>  
    <p> 
    <strong>1. Ready-to-Wear Collections:</strong> Explore our curated gallery of unique, student-designed fashion pieces that are ready for purchase. Each piece reflects the creativity and innovation of budding designers.  
    <br /><br />
    <strong>2. Custom Design Services:</strong> Have a specific design in mind? Share your ideas with us, and our talented students will craft a bespoke piece tailored to your exact preferences and requirements.  
    <br /><br />
    <strong>3. Collaborative Fashion Projects:</strong> Work closely with our students on personalized projects, ensuring every detail aligns with your vision.  
 </p>
    <h5 className='creativity-meetss redefine'>Let us help you redefine your wardrobe with innovation and style. Your dream design is just a step away!</h5>
</div>

                <div className='col-lg-6 col-sm-12 col-md-6'>
                    <img className='img-fluid servic-style-img' src={servicesimg} alt="" />
                </div>
                </div>
            </div>
        </div>
        </>

    )
}

export default Hero