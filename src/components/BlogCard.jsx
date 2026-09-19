import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { cld } from "../lib/cloudinary";
import { formatDate, readingMinutes } from "../lib/format";

const BlogCard = ({ blog, featured = false }) => (
    <article className={`group ${featured ? "md:col-span-2 md:grid md:grid-cols-2 md:items-center md:gap-10" : ""}`}>
        <Link to={`/blogs/${blog.id}`} className="block overflow-hidden rounded-card bg-sunken">
            <img
                src={cld(blog.image.url, { w: featured ? 1000 : 700, h: featured ? 700 : 460 })}
                alt=""
                loading="lazy"
                className={`w-full object-cover transition duration-700 group-hover:scale-[1.04] ${featured ? "aspect-[10/7]" : "aspect-[3/2]"}`}
            />
        </Link>
        <div className={featured ? "mt-5 md:mt-0" : "mt-5"}>
            <p className="text-xs font-bold uppercase tracking-wider text-muted">
                {formatDate(blog.date)} · {readingMinutes(blog.content)} min read
            </p>
            <h3 className={`display mt-2 leading-tight ${featured ? "text-3xl sm:text-4xl" : "text-2xl"}`}>
                <Link to={`/blogs/${blog.id}`} className="hover:text-plum">{blog.title}</Link>
            </h3>
            <p className="mt-3 line-clamp-3 text-muted">{blog.excerpt}</p>
            <p className="mt-4 text-sm font-semibold">By {blog.author}</p>
        </div>
    </article>
);

BlogCard.propTypes = { blog: PropTypes.object.isRequired, featured: PropTypes.bool };

export default BlogCard;
