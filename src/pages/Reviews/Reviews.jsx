import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";


const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [reviewsToDisplay, setReviewsToDisplay] = useState(6);

  useEffect(() => {

    fetch('reviews.json')
      .then(res => res.json())
      .then(data => setReviews(data));

  }, []);

  return (

    <section className="p-12 bg-gray-100 text-black">
      <Helmet>
        <title>NestVibes | Reviews</title>
      </Helmet>
      <div className="container mx-auto">
        <h2 className="text-center text-3xl font-bold mb-8">What Our Clients Say</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {reviews.slice(0, reviewsToDisplay).map((review) => (
            <div key={review.id} className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center">
                <div className="flex items-center space-x-1">

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
        <div className={reviewsToDisplay === reviews.length ? "hidden" : "mt-10 flex justify-center"}>
          <button onClick={() => setReviewsToDisplay(reviews.length)} className="btn bg-[#111827] text-white px-5 py-2 hover:bg-[#374151] hover:text-[#F9FAFB]">Show All</button>
        </div>
      </div>
    </section>

  );
};

export default Reviews;