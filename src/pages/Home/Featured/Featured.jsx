import { useLoaderData } from "react-router-dom";
import EachFeatured from "./EachFeatured";
import { useState } from "react";


const Featured = () => {
    const [propertyToDisplay,setPropertyToDisplay] = useState(6);

    const allProperties = useLoaderData();
    return (
        <div className="py-24 px-10 sm:px-20 bg-white text-black">
            <h3 className="text-3xl font-semibold mb-10 text-center ">Featured</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2  2xl:grid-cols-3  gap-8">
                {
                    allProperties.slice(0,propertyToDisplay).map(property=><EachFeatured key={property.id} property={property}></EachFeatured>)
                }
            </div>
            <div  className={propertyToDisplay===allProperties.length? "hidden":"mt-10 flex justify-center"}>
            <button onClick={()=>setPropertyToDisplay(allProperties.length)} className="btn bg-[#111827] text-white px-5 py-2 hover:bg-[#374151] hover:text-[#F9FAFB]">Show More</button>
          </div>
        </div>
    );
};

export default Featured;