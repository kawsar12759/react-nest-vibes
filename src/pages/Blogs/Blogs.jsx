import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";


const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        fetch('blogs.json')
            .then(res => res.json())
            .then(data => setBlogs(data));
    }, [])
    return (
        <section className="py-12 bg-gray-100">
            <Helmet>
                <title>NestVibes | Blogs</title>
            </Helmet>
            <div className="container mx-auto">
                <h2 className="text-center text-3xl font-bold mb-8">Latest Blogs</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-10">
                    {blogs.map((blog) => (
                        <div key={blog.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                            <img
                                src={blog.imageUrl}
                                alt={blog.title}
                                className="w-full h-56 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold">{blog.title}</h3>
                                <p className="text-gray-600 mt-2">By <span className="font-semibold">{blog.author}</span> on {new Date(blog.date).toLocaleDateString()}</p>
                                <p className="mt-4 text-gray-600">{blog.excerpt}</p>
                                <a
                                    href={`/blogs/${blog.id}`}
                                    className="block mt-4 text-teal-500 font-semibold"
                                >
                                    Read more
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Blogs;