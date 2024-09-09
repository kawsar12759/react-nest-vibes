import carouselImg1 from '../../assets/carouselImg1.jpg';
import carouselImg2 from '../../assets/carouselImg2.jpg';
import carouselImg3 from '../../assets/carouselImg3.jpg';
import carouselImg4 from '../../assets/carouselImg4.png';

const Banner = () => {

    
    return (
        <div>
            <div className="carousel w-full">
                <div id="slide1" className="carousel-item relative w-full">
                    <img style={{ height: '700px' }}
                        src={carouselImg1}
                        className="w-full" />
                    <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end px-16 md:px-32 lg:px-48 py-8 bg-gradient-to-b from-transparent to-gray-900 bg-opacity-75">
                        <h2 className="text-4xl text-white font-bold text-center mb-5">Find Your Perfect Home with NestVibes</h2>
                        <p className="text-lg text-gray-200 mt-2 text-center mb-4">
                            Discover a world of exceptional living spaces tailored to your needs. Whether you're searching for a cozy apartment, a spacious family home, or a charming vacation rental, NestVibes is here to help you find the ideal place. Explore our diverse property listings, connect with us, and start your journey to finding a home that truly feels like yours.
                        </p>
                        <div className='flex justify-center font-medium'>
                            <a href="/brochure" className="bg-[#0D9488] text-white py-3 px-5 rounded hover:bg-[#0F766E]">View Listing</a>
                            <a href="/contact" className=" ml-4 bg-[#38BDF8] text-white py-3 px-5 rounded hover:bg-[#0284C7]">Contact Us</a>
                        </div>
                    </div>
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide4" className="btn btn-circle">❮</a>
                        <a href="#slide2" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide2" className="carousel-item relative w-full">
                    <img style={{ height: '700px' }}
                        src={carouselImg2}
                        className="w-full" />
                    <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end px-16 md:px-32 lg:px-48 py-8 bg-gradient-to-b from-transparent to-gray-900 bg-opacity-75">
                        <h2 className="text-4xl text-white font-bold text-center mb-5">Find Your Perfect Home with NestVibes</h2>
                        <p className="text-lg text-gray-200 mt-2 text-center mb-4">
                            Discover a world of exceptional living spaces tailored to your needs. Whether you're searching for a cozy apartment, a spacious family home, or a charming vacation rental, NestVibes is here to help you find the ideal place. Explore our diverse property listings, connect with us, and start your journey to finding a home that truly feels like yours.
                        </p>
                        <div className='flex justify-center font-medium'>
                            <a href="/brochure" className="bg-[#0D9488] text-white py-3 px-5 rounded hover:bg-[#0F766E]">View Listing</a>
                            <a href="/contact" className=" ml-4 bg-[#38BDF8] text-white py-3 px-5 rounded hover:bg-[#0284C7]">Contact Us</a>
                        </div>
                    </div>
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide1" className="btn btn-circle">❮</a>
                        <a href="#slide3" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide3" className="carousel-item relative w-full">
                    <img style={{ height: '700px' }}
                        src={carouselImg3}
                        className="w-full" />
                    <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end px-16 md:px-32 lg:px-48 py-8 bg-gradient-to-b from-transparent to-gray-900 bg-opacity-75">
                        <h2 className="text-4xl text-white font-bold text-center mb-5">Find Your Perfect Home with NestVibes</h2>
                        <p className="text-lg text-gray-200 mt-2 text-center mb-4">
                            Discover a world of exceptional living spaces tailored to your needs. Whether you're searching for a cozy apartment, a spacious family home, or a charming vacation rental, NestVibes is here to help you find the ideal place. Explore our diverse property listings, connect with us, and start your journey to finding a home that truly feels like yours.
                        </p>
                        <div className='flex justify-center font-medium'>
                            <a href="/brochure" className="bg-[#0D9488] text-white py-3 px-5 rounded hover:bg-[#0F766E]">View Listing</a>
                            <a href="/contact" className=" ml-4 bg-[#38BDF8] text-white py-3 px-5 rounded hover:bg-[#0284C7]">Contact Us</a>
                        </div>

                    </div>
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide2" className="btn btn-circle">❮</a>
                        <a href="#slide4" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide4" className="carousel-item relative w-full">
                    <img style={{ height: '700px' }}
                        src={carouselImg4}
                        className="w-full" />
                    <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end px-16 md:px-32 lg:px-48 py-8 bg-gradient-to-b from-transparent to-gray-900 bg-opacity-75">
                        <h2 className="text-4xl text-white font-bold text-center mb-5">Find Your Perfect Home with NestVibes</h2>
                        <p className="text-lg text-gray-200 mt-2 text-center mb-4">
                            Discover a world of exceptional living spaces tailored to your needs. Whether you're searching for a cozy apartment, a spacious family home, or a charming vacation rental, NestVibes is here to help you find the ideal place. Explore our diverse property listings, connect with us, and start your journey to finding a home that truly feels like yours.
                        </p>
                        <div className='flex justify-center font-medium'>
                            <a href="/brochure" className="bg-[#0D9488] text-white py-3 px-5 rounded hover:bg-[#0F766E]">View Listing</a>
                            <a href="/contact" className=" ml-4 bg-[#38BDF8] text-white py-3 px-5 rounded hover:bg-[#0284C7]">Contact Us</a>
                        </div>
                    </div>
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide3" className="btn btn-circle">❮</a>
                        <a href="#slide1" className="btn btn-circle">❯</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;