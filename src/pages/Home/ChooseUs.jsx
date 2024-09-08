import { Link } from 'react-router-dom';
import chooseImg from '../../assets/chooseSection.png'
const ChooseUs = () => {
    return (
        <div className='flex'>
            <div className='w-1/2'>
                <img className='h-72 w-full' src={chooseImg} alt="" />
            </div>
            <div className='w-1/2 pl-8 bg-gray-100 flex items-center'>
                <div>
                    <h6 className='text-3xl font-semibold mb-4'>Why Choose Us?</h6>
                    <p className='mb-3'>At NestVibes, we prioritize your comfort and satisfaction. With a wide range of properties, expert guidance, and a commitment to quality, we make finding your perfect home easy and stress-free. Trust us to connect you with the ideal space tailored to your needs</p>
                    <Link><button className='text-black border border-black bg-white hover:bg-black hover:text-white px-5 py-2 rounded-md'>
                        Read more</button></Link>
                </div>
            </div>
        </div>
    );
};

export default ChooseUs;