import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";


const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {

    fetch('reviews.json')
      .then(res => res.json())
      .then(data => setReviews(data));

  }, []);

  return (
    
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-center text-3xl font-bold mb-8">What Our Clients Say</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Loop through the reviews JSON data */}
            {reviews.map((review) => (
              <div key={review.id} className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center">
                  <div className="flex items-center space-x-1">
                    {/* Display rating stars */}
                    {[...Array(review.rating)].map((_, index) => (
                      <span key={index} className="text-yellow-500">★</span>
                    ))}
                    {[...Array(5 - review.rating)].map((_, index) => (
                      <span key={index} className="text-gray-300">★</span>
                    ))}
                  </div>
                </div>

                <p className="mt-4 text-gray-600">{review.review}</p>

                <div className="mt-4">
                  <p className="font-semibold">{review.name}</p>
                  <p className="text-gray-500 text-sm">{review.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

  );
};

export default Reviews;