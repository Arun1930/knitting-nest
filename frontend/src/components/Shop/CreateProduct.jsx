import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../redux/actions/product";
import { categoriesData } from "../../static/data";
import { toast } from "react-toastify";


const CreateProduct = () => {
    const { seller } = useSelector((state) => state.seller);
    const { success, error } = useSelector((state) => state.products);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [images, setImages] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [tags, setTags] = useState("");
    const [originalPrice, setOriginalPrice] = useState();
    const [discountPrice, setDiscountPrice] = useState();
    const [stock, setStock] = useState();
    const [material, setMaterial] = useState("");
    const [assortment, setAssortment] = useState("");
    const [gender, setGender] = useState("");
    const [embellishment, setEmbellishment] = useState("");
    const [trimBorder, setTrimBorder] = useState("");
    const [pattern, setPattern] = useState("");
    const [colors, setColors] = useState([]);

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
        if (success) {
            toast.success("Product created successfully!");
            navigate("/dashboard");
            window.location.reload();
        }
    }, [dispatch, error, success]);

    const handleImageChange = (e) => {
        e.preventDefault();
        let files = Array.from(e.target.files);
        setImages((prevImages) => [...prevImages, ...files]);
    };


    const handleColorsChange = (e) => {
        setColors(e.target.value.split(",").map(color => color.trim()));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newForm = new FormData();

        images.forEach((image) => {
            newForm.append("images", image);
        });
        newForm.append("name", name);
        newForm.append("description", description);
        newForm.append("category", category);
        newForm.append("tags", tags);
        newForm.append("originalPrice", originalPrice);
        newForm.append("discountPrice", discountPrice);
        newForm.append("stock", stock);
        newForm.append("material", material);
        newForm.append("assortment", assortment);
        newForm.append("gender", gender);
        newForm.append("embellishment", embellishment);
        newForm.append("trim_border", trimBorder);
        newForm.append("pattern", pattern);
        newForm.append("colors", JSON.stringify(colors)); // send colors as an array
        newForm.append("shopId", seller._id);

        dispatch(createProduct(newForm));
    };

    return (
        <div className="w-[90%] 800px:w-[50%] bg-white shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
            <h5 className="text-[30px] font-Poppins text-center">Create Product</h5>
            <form onSubmit={handleSubmit}>
                <br />
                {/* Product Name */}
                <div>
                    <label className="pb-2">
                        Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your product name..."
                    />
                </div>
                <br />
                {/* Description */}
                <div>
                    <label className="pb-2">
                        Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        cols="30"
                        rows="8"
                        name="description"
                        value={description}
                        className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter your product description..."
                    ></textarea>
                </div>
                <br />
                {/* Category */}
                <div>
                    <label className="pb-2">
                        Category <span className="text-red-500">*</span>
                    </label>
                    <select
                        className="w-full mt-2 border h-[35px] rounded-[5px]"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="Choose a category">Choose a category</option>
                        {categoriesData &&
                            categoriesData.map((i) => (
                                <option value={i.title} key={i.title}>
                                    {i.title}
                                </option>
                            ))}
                    </select>
                </div>
                <br />
                {/* Tags */}
                <div>
                    <label className="pb-2">Tags</label>
                    <input
                        type="text"
                        name="tags"
                        value={tags}
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={(e) => setTags(e.target.value)}
                        placeholder="Enter your product tags..."
                    />
                </div>
                <br />
                {/* Material */}
                <div>
                    <label className="pb-2">Material</label>
                    <input
                        type="text"
                        name="material"
                        value={material}
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={(e) => setMaterial(e.target.value)}
                        placeholder="Enter product material..."
                    />
                </div>
                <br />
                {/* Assortment */}
                <div>
                    <label className="pb-2">Assortment</label>
                    <input
                        type="text"
                        name="assortment"
                        value={assortment}
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={(e) => setAssortment(e.target.value)}
                        placeholder="Enter product assortment..."
                    />
                </div>
                <br />
                {/* Gender */}
                <div>
                    <label className="pb-2">Gender</label>
                    <input
                        type="text"
                        name="gender"
                        value={gender}
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={(e) => setGender(e.target.value)}
                        placeholder="Enter gender..."
                    />
                </div>
                <br />
                {/* Embellishment */}
                <div>
                    <label className="pb-2">Embellishment</label>
                    <input
                        type="text"
                        name="embellishment"
                        value={embellishment}
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={(e) => setEmbellishment(e.target.value)}
                        placeholder="Enter embellishment details..."
                    />
                </div>
                <br />
                {/* Trim Border */}
                <div>
                    <label className="pb-2">Trim Border</label>
                    <input
                        type="text"
                        name="trimBorder"
                        value={trimBorder}
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={(e) => setTrimBorder(e.target.value)}
                        placeholder="Enter trim border details..."
                    />
                </div>
                <br />
                {/* Pattern */}
                <div>
                    <label className="pb-2">Pattern</label>
                    <input
                        type="text"
                        name="pattern"
                        value={pattern}
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={(e) => setPattern(e.target.value)}
                        placeholder="Enter pattern details..."
                    />
                </div>
                <br />
                {/* Colors */}
                <div>
                    <label className="pb-2">Colors</label>
                    <input
                        type="text"
                        name="colors"
                        value={colors.join(", ")}
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={handleColorsChange}
                        placeholder="Enter colors separated by commas..."
                    />
                </div>
                <br />
                {/* Stock */}
                <div>
                    <label className="pb-2">Stock</label>
                    <input
                        type="number"
                        name="stock"
                        value={stock}
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={(e) => setStock(e.target.value)}
                        placeholder="Enter stock amount..."
                    />
                </div>
                <br />
                {/* Original Price */}
                <div>
                    <label className="pb-2">Original Price</label>
                    <input
                        type="number"
                        name="originalPrice"
                        value={originalPrice}
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={(e) => setOriginalPrice(e.target.value)}
                        placeholder="Enter original price..."
                    />
                </div>
                <br />
                {/* Discount Price */}
                <div>
                    <label className="pb-2">Discount Price</label>
                    <input
                        type="number"
                        name="discountPrice"
                        value={discountPrice}
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={(e) => setDiscountPrice(e.target.value)}
                        placeholder="Enter discount price..."
                    />
                </div>
                <br />
                <br />
                <div>
                    <label className="pb-2">
                        Upload Images <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="file"
                        name=""
                        id="upload"
                        className="hidden"
                        multiple
                        onChange={handleImageChange}
                    />
                    <div className="w-full flex items-center flex-wrap">
                        <label htmlFor="upload">
                            <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
                        </label>
                        {images &&
                            images.map((i) => (
                                <img
                                    src={URL.createObjectURL(i)}
                                    key={i}
                                    alt=""
                                    className="h-[120px] w-[120px] object-cover m-2"
                                />
                            ))}
                    </div>
                    </div>
                    <br />
                    
                {/* Submit */}
                <button
                    type="submit"
                    className="w-full h-[35px] border border-gray-300 rounded-[5px] bg-blue-500 text-white font-bold hover:bg-blue-600 transition duration-300"
                >
                    Create Product
                </button>
            </form>
        </div>
    );
};

export default CreateProduct;
