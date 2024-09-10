import { FaLocationDot } from "react-icons/fa6";
import bed from '../../../assets/bed.png';
import bath from '../../../assets/bathroom.png';
import areaPng from '../../../assets/area-chart.png';
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
const EachFeatured = ({ property }) => {

    const {user,setPrivateClicked} = useContext(AuthContext);
    const { id,image, estate_title, price, category, description, status, area, location, facilities, bedrooms, washrooms } = property;

    const getCategoryBgColor = () => {
        if (category === "Apartment") {
            return 'bg-[#1E3A8A]';
        }
        else if (category === "Student Housing") {
            return 'bg-[#F59E0B]';
        }
        else if (category === "Vacation Rental") {
            return 'bg-[#10B981]';
        }
    }
    const getStatusBgColor = () => {
        if (status === "Rent") {
            return 'bg-[#3B82F6]';
        }
        else if (status === "Sale") {
            return 'bg-[#D32F2F]';
        }

    }

    return (
        <div className="border pb-6 rounded-md flex flex-col h-full shadow-md">
            <div className="relative">
                <img className="h-64 w-full" src={image} alt="" />
                <div className="absolute flex items-center bottom-1 pl-4">
                    <FaLocationDot className="text-white text-lg font-medium mr-1" />
                    <p className="text-white text-lg font-medium">{location}</p>
                </div>
                <div className="absolute flex items-center top-2 right-0 pr-4">
                    <p className={`${getStatusBgColor()} text-white opacity-80 mr-4 px-2 py-1 text-md font-medium`}>For {status}</p>
                    <p className={`${getCategoryBgColor()} opacity-80 px-2 py-1  text-white text-md font-medium`}>{category}</p>
                </div>
            </div>

            <div className="flex-grow mb-2">
                <h4 className=" px-4 mt-4 text-2xl font-semibold">{estate_title}</h4>
                <h6 className="px-4 mt-1 text-[#10B981] text-xl font-semibold ">{price}</h6>
                <p className="px-4 mt-2 text-base">{description}</p>
            </div>
            <div className="px-4 flex justify-between items-center">
                <div className="flex font-medium text-[#747272]">
                    <img className="w-6 h-6 mr-2" src={bed} alt="" />
                    <p className="mr-4">{bedrooms}</p>
                    <img className="w-6 h-6 mr-2" src={bath} alt="" />
                    <p className="mr-4">{washrooms}</p>
                    <img className="w-6 h-6 mr-2" src={areaPng} alt="" />
                    <p>{area}</p>
                </div>
                <Link to={`/property/${id}`}><button className="btn bg-[#34D399] hover:bg-[#10B981] rounded-none">View Details</button></Link>
            </div>

        </div>
    );
};

export default EachFeatured;