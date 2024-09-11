import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLoaderData, useParams } from "react-router-dom";


const BlogDetails = () => {
    const { id } = useParams();
    const blogs = useLoaderData();
    const blog = blogs.find((b) => b.id === parseInt(id));

    if (!blog) {
        return <div className="h-96 flex items-center justify-center">
            <div>
                <p className="text-3xl font-bold mb-3">Blog not found</p>
                <div className="flex justify-center">
                    <Link to='/blogs'><button className="btn bg-[#111827] text-white px-5 py-3 hover:bg-[#374151] hover:text-[#F9FAFB] ">Go Back</button></Link>
                </div>
            </div>
        </div>;
    }
    return (
        <div className="container mx-auto p-12">
            <Helmet>
                <title>NestVibes | Blog Details</title>
            </Helmet>
            <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
            <p className="text-gray-600 mb-8">By {blog.author} on {new Date(blog.date).toLocaleDateString()}</p>
            <img style={{ height: '600px' }}
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full object-cover rounded-lg mb-8"
            />
            <div className="prose">
                <p>{blog.content}</p>
            </div>
        </div>
    );
};

export default BlogDetails;