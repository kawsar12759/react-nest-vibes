import backImg from '../../assets/360_F_624450057_1yJSSgoCaRyoC1EbNoWkjdDukpnaSrqo.png';
import customerCentricPng from '../../assets/customer-centricity.png';
import integrityPng from '../../assets/integration.png';
import excellencePng from '../../assets/excellence.png';
import innovationPng from '../../assets/innovation.png';
import companyHistoryImg from '../../assets/2558.jpg'
import teamMember1 from '../../assets/teamMember1.jpg';
import teamMember2 from '../../assets/teamMember2.jpg';
import teamMember3 from '../../assets/teamMember3.jpg';
import teamMember4 from '../../assets/teamMember4.jpg';
import teamMember5 from '../../assets/teamMember5.jpg';
import teamMember6 from '../../assets/teamMember6.jpg';
import checkPng from '../../assets/correct.png';
import { Helmet } from 'react-helmet-async';
const About = () => {
    return (
        <div>
            <section style={{ backgroundImage: `url(${backImg})`, backgroundSize: 'cover', height: '500px' }} className="relative h-96 bg-cover bg-center">
                <Helmet>
                    <title>NestVibes | About Us</title>
                </Helmet>
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-center text-white">
                        <h1 className="text-3xl sm:text-4xl font-bold">Welcome to NestVibes</h1>
                        <p className="mt-2 text-md sm:text-lg">Your Partner in Finding the Perfect Home</p>
                    </div>
                </div>
            </section>
            <section className="py-20 bg-gray-100 text-black">
                <div className="container mx-auto ">

                    <div className='text-center px-12 md:px-16 lg:px-28 mb-10'>
                        <h2 className="text-2xl sm:text-3xl font-bold">Our Mission</h2>
                        <p className="mt-4 text-gray-600">At NestVibes, we believe that finding a home is about more than just a transaction. It’s about finding a place where life happens. We are committed to connecting you with homes that fit your lifestyle and exceed your expectations.</p>

                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 p-12 ">

                        <div className="text-center">
                            <div className="bg-teal-500 text-white p-4 rounded-full w-16 h-16 mx-auto">

                                <img src={customerCentricPng} alt="" />
                            </div>
                            <h3 className="mt-4 font-semibold">Customer-Centric</h3>
                            <p className="text-gray-600">We prioritize your needs by offering personalized service and expert advice to ensure you find the perfect home.</p>
                        </div>


                        <div className="text-center">
                            <div className="bg-teal-500 text-white p-4 rounded-full w-16 h-16 mx-auto">

                                <img src={integrityPng} alt="" />
                            </div>
                            <h3 className="mt-4 font-semibold">Integrity</h3>
                            <p className="text-gray-600">We uphold the highest standards of honesty and transparency in all our transactions and interactions.</p>
                        </div>


                        <div className="text-center">
                            <div className="bg-teal-500 text-white p-4 rounded-full w-16 h-16 mx-auto">

                                <img src={excellencePng} alt="" />
                            </div>
                            <h3 className="mt-4 font-semibold">Excellence</h3>
                            <p className="text-gray-600">We strive for excellence in every aspect of our business, from our customer service to the quality of our properties.</p>
                        </div>


                        <div className="text-center">
                            <div className="bg-teal-500 text-white p-4 rounded-full w-16 h-16 mx-auto">

                                <img src={innovationPng} alt="" />
                            </div>
                            <h3 className="mt-4 font-semibold">Innovation</h3>
                            <p className="text-gray-600">We embrace new technologies and ideas to provide you with cutting-edge solutions for finding and managing your home.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12 px-6 bg-white text-black">
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

                    <div className="relative h-full">
                        <img src={companyHistoryImg} alt="Company History" className="rounded-lg shadow-lg h-full" />
                    </div>


                    <div className='flex items-center'>
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold">Our Story</h2>
                            <p className="mt-4 text-gray-600">NestVibes was founded by a team of real estate enthusiasts with a vision to revolutionize the home-buying and renting experience. Our journey began with a single office and a passion for helping people find their ideal homes.</p>


                            <div className="mt-6 space-y-4">
                                <div>
                                    <h4 className="font-semibold">2017: Founded</h4>
                                    <p className="text-gray-500">Started as a local business in 2017 with a focus on providing exceptional apartment listings.</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold">2018: Expanded</h4>
                                    <p className="text-gray-500">Began offering vacation rentals, catering to a growing market of travelers and tourists.</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold">2020: Innovation</h4>
                                    <p className="text-gray-500">Launched a new online platform with advanced search features and virtual tours to enhance the user experience.</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold">2023: Growth</h4>
                                    <p className="text-gray-500">Expanded our services to include student housing, supporting the needs of academic communities.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-12 bg-gray-100 text-black">
                <div className="container mx-auto">
                    <h2 className="text-center text-2xl sm:text-3xl font-bold mb-8">Meet the Team</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-10">

                        <div className="text-center">
                            <img src={teamMember1} alt="John Doe" className="rounded-full w-24 h-24 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold">John Doe</h3>
                            <p className="text-gray-600">Founder & CEO</p>
                            <p className="mt-2 text-sm text-gray-500">John has over 15 years of experience in real estate, leading our company with vision and dedication. His expertise in market trends and client relations ensures that NestVibes remains at the forefront of the industry.</p>
                        </div>


                        <div className="text-center">
                            <img src={teamMember2} alt="Jane Smith" className="rounded-full w-24 h-24 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold">Jane Smith</h3>
                            <p className="text-gray-600">Chief Operating Officer</p>
                            <p className="mt-2 text-sm text-gray-500">Jane brings a wealth of experience in operations management, streamlining processes and ensuring the highest level of service for our clients. Her strategic approach helps drive our company's growth and efficiency.</p>
                        </div>


                        <div className="text-center">
                            <img src={teamMember3} alt="Mark Jones" className="rounded-full w-24 h-24 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold">Mark Jones</h3>
                            <p className="text-gray-600">Head of Marketing</p>
                            <p className="mt-2 text-sm text-gray-500">With a strong background in digital marketing and brand development, Mark is responsible for creating compelling campaigns that enhance our online presence and attract new clients.</p>
                        </div>


                        <div className="text-center">
                            <img src={teamMember4} alt="Susan Lee" className="rounded-full w-24 h-24 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold">Susan Lee</h3>
                            <p className="text-gray-600">Senior Real Estate Agent</p>
                            <p className="mt-2 text-sm text-gray-500">Susan’s extensive knowledge of the local real estate market and her exceptional client service skills make her an invaluable asset to our team, helping clients find their dream homes with ease.</p>
                        </div>


                        <div className="text-center">
                            <img src={teamMember5} alt="David Choi" className="rounded-full w-24 h-24 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold">David Choi</h3>
                            <p className="text-gray-600">Financial Analyst</p>
                            <p className="mt-2 text-sm text-gray-500">David specializes in financial analysis and market research, providing insights that guide our strategic decisions and ensure the financial health of our operations.</p>
                        </div>


                        <div className="text-center">
                            <img src={teamMember6} alt="Emily Wang" className="rounded-full w-24 h-24 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold">Emily Blunt</h3>
                            <p className="text-gray-600">Customer Service Manager</p>
                            <p className="mt-2 text-sm text-gray-500">Emily’s role is to ensure that every client interaction is positive and productive. Her dedication to customer satisfaction helps maintain our reputation for excellent service.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-12 bg-white text-black">
                <div className="lg:w-3/5 w-4/5 mx-auto flex justify-between">

                    <div className='w-3/5  mr-5'>
                        <h2 className="text-2xl sm:text-3xl font-bold">Why Choose Us?</h2>
                        <p className="mt-4 text-gray-600">We understand that finding a home is one of the biggest decisions in life. Here’s why NestVibes is the perfect partner:</p>
                    </div>


                    <div className='w-fit'>
                        <ul className="space-y-4">
                            <li className="flex items-center">
                                <img src={checkPng} className='w-5 h-5 mr-2' alt="" />
                                <p>Wide Range of Options</p>
                            </li>
                            <li className="flex items-center">
                                <img src={checkPng} className='w-5 h-5 mr-2' alt="" />
                                <p>Personalized Service</p>
                            </li>
                            <li className="flex items-center">
                                <img src={checkPng} className='w-5 h-5 mr-2' alt="" />
                                <p>Expert Knowledge</p>
                            </li>
                            <li className="flex items-center">
                                <img src={checkPng} className='w-5 h-5 mr-2' alt="" />
                                <p>Flexible Payment Plans</p>
                            </li>
                            <li className="flex items-center">
                                <img src={checkPng} className='w-5 h-5 mr-2' alt="" />
                                <p>Trusted by Many</p>
                            </li>
                            <li className="flex items-center">
                                <img src={checkPng} className='w-5 h-5 mr-2' alt="" />
                                <p>Innovative Technology</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>



        </div>
    );
};

export default About;