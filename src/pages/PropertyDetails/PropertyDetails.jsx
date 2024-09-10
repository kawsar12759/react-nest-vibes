import { Link, useLoaderData, useParams } from "react-router-dom";
import bed from '../../assets/bed.png';
import bath from '../../assets/bathroom.png';

const PropertyDetails = () => {
    const properties = useLoaderData();
    const { id } = useParams();
    const property = properties.find(p => p.id === id);
    if (!property) {
        return <div className="h-96 flex items-center justify-center">
            <div>
                <p className="text-3xl font-bold mb-3">Property not found</p>
                <div className="flex justify-center">
                    <Link to='/'><button className="btn bg-[#111827] text-white px-5 py-3 hover:bg-[#374151] hover:text-[#F9FAFB] ">Go Back</button></Link>
                </div>
            </div>
        </div>;
    }

    return (
        <div className="container mx-auto p-6 space-y-12">


            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Image */}
                <div className="w-full h-96">
                    <img
                        src={property.image}
                        alt={property.estate_title}
                        className="w-full h-full object-cover rounded-lg shadow-lg"
                    />
                </div>
                {/* Title and Price */}
                <div className="flex flex-col justify-center space-y-4">
                    <h1 className="text-4xl font-bold text-gray-800">{property.estate_title}</h1>
                    <div className="flex flex-wrap items-center">
                        <p className="text-2xl text-green-500 font-semibold mr-3">{property.price}</p>
                        <span
                            className={`inline-block text-sm font-medium py-1 px-3 rounded-full ${property.status === 'Sale'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-blue-100 text-blue-700'
                                }`}
                        >
                            {property.status.toUpperCase()}
                        </span>
                    </div>
                    <p className="text-lg text-gray-600">{property.description}</p>
                    <p className="text-gray-700">Area: {property.area}</p>
                    <p className="text-gray-700">Location: {property.location}</p>
                    <div className="flex font-medium text-[#747272]">
                        <img className="w-8 h-6 mr-2" src={bed} alt="" />
                        <p className="mr-10">{property.bedrooms}</p>
                        <img className="w-8 h-6 mr-2" src={bath} alt="" />
                        <p className="mr-4">{property.washrooms}</p>

                    </div>
                </div>
                <div className="mt-2">
                    <h2 className="text-3xl font-bold mb-4 text-gray-800">Facilities</h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-lg text-gray-700">
                        {property.facilities.map((facility, index) => (
                            <li key={index} className="flex items-center">
                                <svg className="h-6 w-6 text-green-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M10 15l-3.5-3.5L7.91 10 10 12.09 16.09 6 17.5 7.41z" />
                                </svg>
                                {facility}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>




            {/* Reviews Section */}
            <div className="bg-white py-3 rounded-lg ">
                <h2 className="text-3xl font-bold mb-4 text-gray-800">What Our Customers Say</h2>
                <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {property.reviews.map((review, index) => (
                        <div key={index} className="shadow-md flex flex-col rounded-lg p-4 h-full">

                            <div className="flex-grow mb-3">
                                <p className="text-xl font-semibold text-gray-800 mb-4">{review.name}</p>
                                <p className="text-md text-gray-600">{review.comment}</p>
                            </div>
                            <div className="flex  justify-end ">
                                <p className="text-sm text-[#FF6F00] border border-[#FF6F00]  px-3 py-1 rounded-full">Rating: {review.rating}</p>
                            </div>

                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-white p-8 rounded-lg shadow-md md:flex md:justify-between md:items-center">
                <h3 className="text-2xl font-bold mb-5 md:mb-0">Interested in this property?</h3>
                <div className="space-x-4">
                    <button
                        className="btn bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600"
                    >
                        Contact Us
                    </button>
                    <button
                        className="btn bg-yellow-500 text-black py-3 px-6 rounded-lg hover:bg-yellow-600"
                    >
                        View Listing
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetails;