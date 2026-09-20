import { Helmet } from "react-helmet-async";
import BlogCard from "../../components/BlogCard";
import blogs from "../../data/blogs.json";

const sorted = [...blogs].sort((a, b) => b.date.localeCompare(a.date));

const Blogs = () => (
    <div className="container-page pt-12">
        <Helmet>
            <title>NestVibes | Journal</title>
        </Helmet>
        <p className="eyebrow">The journal</p>
        <h1 className="display mt-3 max-w-3xl text-5xl leading-[1.02] sm:text-6xl">Advice for renters, buyers and owners</h1>
        <div className="mt-14 grid gap-x-8 gap-y-16 md:grid-cols-2 xl:grid-cols-3">
            {sorted.map((b, i) => (
                <div key={b.id} className={i === 0 ? "md:col-span-2 xl:col-span-3" : ""}>
                    <BlogCard blog={b} featured={i === 0} />
                </div>
            ))}
        </div>
    </div>
);

export default Blogs;
