import apartmentImg from '../../assets/apartment.png';
import studentHousingImg from '../../assets/student-housing.png';
import vacationRentalsImg from '../../assets/resort.png';


const Options = () => {
    return (
        <div className="py-10 px-12 sm:px-24 bg-white text-black">
            <h3 className="text-3xl font-semibold text-center mb-8">What Are You Looking For?</h3>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                <div className='flex items-start justify-center h-full  p-8'>
                    <div >
                        <div className='flex justify-center'>
                            <img className='h-12 w-12 mb-4' src={apartmentImg} alt="" />
                        </div>
                        <h4 className='text-xl font-semibold text-center mb-3'>Apartments</h4>
                        <p className='text-base text-center'>Discover modern apartments designed for comfort and style, perfect for singles, families, or anyone seeking convenience in prime locations.</p>
                    </div>
                </div>
                <div className='flex items-start justify-center  p-8'>
                    <div>
                        <div className='flex justify-center'>
                            <img className='h-12 w-12 mb-4' src={studentHousingImg} alt="" />
                        </div>
                        <h4 className='text-xl font-semibold text-center mb-3'>Student Housing</h4>
                        <p className='text-base text-center'>Affordable, safe, and close to campuses, our student housing offers the ideal environment for living and learning.</p>
                    </div>
                </div>
                <div className='flex items-start justify-center p-8'>
                    <div>
                        <div className='flex justify-center'>
                            <img className='h-12 w-12 mb-4' src={vacationRentalsImg} alt="" />
                        </div>
                        <h4 className='text-xl font-semibold text-center mb-3'>Vacation Rentals</h4>
                        <p className='text-base text-center'>Escape to our vacation rentals, offering unique and relaxing stays, from beachside retreats to cozy cabins.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Options;