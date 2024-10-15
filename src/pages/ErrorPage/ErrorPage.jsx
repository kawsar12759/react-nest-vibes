import { Link } from "react-router-dom";
import errorSvg from '../../assets/robot-404-error-errors.1024x851.png'

const ErrorPage = () => {
    return (
        <div className="h-screen bg-white text-black flex items-center justify-center p-8">
            <div className="text-center ">

                <div className="flex justify-center">
                <img className="w-56 mb-6" src={errorSvg} alt="" />
                </div>
                <p className="text-2xl font-bold mb-3">Page Not Found!</p>
                <p className="mb-3 text-slate-600">The page you are looking for doesn't exist or an other error occured.</p>
                <Link to="/"><button className="btn bg-[#111827] text-white px-6 py-2 hover:bg-[#374151] hover:text-[#F9FAFB]">Go to Home</button></Link>
            </div>
        </div>
    );
};

export default ErrorPage;