import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { PiArrowLeft, PiNewspaper } from "react-icons/pi";
import { cld } from "../../lib/cloudinary";
import { formatDate, readingMinutes } from "../../lib/format";
import Avatar from "../../components/Avatar";
import BlogCard from "../../components/BlogCard";
import EmptyState from "../../components/EmptyState";
import blogs from "../../data/blogs.json";

/** The seed posts are one long paragraph; split into paragraphs of roughly three sentences. */
function paragraphs(text) {
    const sentences = text.match(/[^.!?]+[.!?]+(\s|$)/g) || [text];
    const out = [];
    for (let i = 0; i < sentences.length; i += 3) out.push(sentences.slice(i, i + 3).join("").trim());
    return out;
}

const BlogDetails = () => {
    const { id } = useParams();
    const blog = blogs.find((b) => String(b.id) === id);

    if (!blog) {
        return (
            <div className="container-page py-20">
                <EmptyState icon={PiNewspaper} title="Article not found" action={<Link to="/blogs" className="btn-primary">Back to the journal</Link>}>
                    The link may be mistyped, or the article was removed.
                </EmptyState>
            </div>
        );
    }

    const more = blogs.filter((b) => b.id !== blog.id).slice(0, 2);

    return (
        <article className="pt-8">
            <Helmet>
                <title>{`${blog.title} | NestVibes Journal`}</title>
                <meta name="description" content={blog.excerpt} />
            </Helmet>
            <div className="container-page max-w-3xl">
                <Link to="/blogs" className="btn-quiet -ml-3 !px-3 text-sm"><PiArrowLeft /> Journal</Link>
                <p className="mt-8 text-sm font-bold uppercase tracking-wider text-plum">
                    {formatDate(blog.date, { month: "long", day: "numeric", year: "numeric" })} · {readingMinutes(blog.content)} min read
                </p>
                <h1 className="display mt-4 text-4xl leading-[1.05] sm:text-6xl">{blog.title}</h1>
                <p className="mt-6 text-xl leading-8 text-muted">{blog.excerpt}</p>
                <div className="mt-8 flex items-center gap-3">
                    <Avatar name={blog.author} size={44} />
                    <p className="font-bold">{blog.author}</p>
                </div>
            </div>
            <div className="container-page mt-10 max-w-5xl">
                <img src={cld(blog.image.url, { w: 1600, h: 860 })} alt="" className="aspect-[16/8.6] w-full rounded-card object-cover" />
            </div>
            <div className="prose-nest container-page mt-14 max-w-3xl">
                {paragraphs(blog.content).map((p, i) => <p key={i}>{p}</p>)}
            </div>

            <section className="container-page mt-24 max-w-5xl border-t border-line pt-14">
                <h2 className="display mb-10 text-3xl">Keep reading</h2>
                <div className="grid gap-10 md:grid-cols-2">
                    {more.map((b) => <BlogCard key={b.id} blog={b} />)}
                </div>
            </section>
        </article>
    );
};

export default BlogDetails;
