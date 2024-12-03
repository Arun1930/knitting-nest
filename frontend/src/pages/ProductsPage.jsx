import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import { server } from "../server";

const ProductsPage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [selectedAssortment, setSelectedAssortment] = useState("");
  const [genderoptions , setgenderoptions ] = useState([]);
  const [materialoptions , setmaterialoptions] = useState([]);
  const [assortmentoptions , setassortmentoptions] = useState([])

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try { 
        const response = await axios.get(`${server}/product/get-all-products`);
        setAllProducts(response.data.products || []);
        setFilteredProducts(response.data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error.message);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() =>{
    const fetchgender = async () =>{
      try {
        const response = await axios.get(`${server}/getallgender`)
        setgenderoptions(response.data || [])
      } catch (error) {
        console.error("Error fetching gender:", error.message);
      }
    }
fetchgender()
  },[])


  useEffect(() =>{
    const assortment = async () =>{
      try {
        const response = await axios.get(`${server}/getassortment`)
        setassortmentoptions(response.data)
      } catch (error) {
        console.error("Error fetching gender:", error.message);
      }
    }
    assortment()
  },[])

  useEffect(() =>  {
   const fetchmaterial = async () =>{
    try {
      const response = await axios.get(`${server}/getmaterial`)
      setmaterialoptions(response.data || [])
    } catch (error) {
      console.error("Error fetching gender:", error.message);
      
    }
   }
   fetchmaterial()
  },[])

  // Filter products based on selected options
  useEffect(() => {
    let filtered = allProducts;

    if (selectedGender) {
      filtered = filtered.filter((product) => product.gender === selectedGender);
    }

    if (selectedMaterial) {
      filtered = filtered.filter((product) => product.material === selectedMaterial);
    }

    if (selectedAssortment) {
      filtered = filtered.filter((product) => product.assortment === selectedAssortment);
    }

    setFilteredProducts(filtered);
  }, [selectedGender, selectedMaterial, selectedAssortment, allProducts]);

  return (
    <>
      <Header activeHeading={3} />
  <div className="container-fluid prodv">
        <div className="row">
          <div className="col-lg-2">
            <h4 className="forlter-pridct">Filter Product</h4>
            <select
              className="form-select filter-gen-cate"
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
            >
              <option value="">Select gender</option>
              {genderoptions.map((gender) =>(
              <option key={gender._id} value={gender.Gender}>{gender.Gender}</option>
              ))}
            </select>

            <select
              className="form-select filter-gen-cate"
              value={selectedMaterial}
              onChange={(e) => setSelectedMaterial(e.target.value)}
            >
              <option value="">Select material</option>
              {materialoptions.map((material) => (
              <option key={material._id} value={material.material}>{material.material}</option>
              ))}
            </select>

            <select
              className="form-select filter-gen-cate"
              value={selectedAssortment}
              onChange={(e) => setSelectedAssortment(e.target.value)}
            >
              <option value="">Select assortment</option>
              {assortmentoptions.map((assortment) =>(
              <option key={assortment._id} value={assortment.Assortment}>{assortment.Assortment}</option>
              ))}
            </select>
          </div>

          <div className="col-lg-10">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id} data={product} />
                ))}
              </div>
            ) : (
              <h2 className="text-center">No products found!</h2>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductsPage;
