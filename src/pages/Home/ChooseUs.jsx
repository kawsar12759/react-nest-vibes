import { Link } from 'react-router-dom';
import chooseImg from '../../assets/chooseSection.png'
const ChooseUs = () => {
    return (
        <div className='sm:flex text-black'>
            <div className='sm:w-1/2'>
                <img className='h-96 w-full' src={chooseImg} alt="" />
            </div>
            <div className='sm:w-1/2 px-6 pt-6 sm:pt-0 sm:pl-8 bg-gray-100 flex items-center'>
                <div>
                    <h6 className='text-2xl sm:text-3xl font-semibold mb-4'>Why Choose Us?</h6>
                    <p className='mb-3'>At NestVibes, we prioritize your comfort and satisfaction. With a wide range of properties, expert guidance, and a commitment to quality, we make finding your perfect home easy and stress-free. Trust us to connect you with the ideal space tailored to your needs</p>
                    <Link to='/about'><button className='btn text-black border border-black bg-white hover:bg-black hover:text-white px-5 py-1 sm:py-2 rounded-md mb-4 sm:mb-0'>
                        Read more</button></Link>
                </div>
            </div>
        </div>
    );
};

export default ChooseUs;