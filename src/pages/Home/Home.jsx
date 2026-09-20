import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { PiArrowRight } from 'react-icons/pi';
import Hero from './Hero';
import Categories from './Categories';
import HowItWorks from './HowItWorks';
import OwnersCta from './OwnersCta';
import Testimonials from './Testimonials';
import SectionHeading from '../../components/SectionHeading';
import PropertyCard, { PropertyCardSkeleton } from '../../components/PropertyCard';
import BlogCard from '../../components/BlogCard';
import useAsync from '../../hooks/useAsync';
import { fetchAllListings } from '../../lib/listings';
import blogs from '../../data/blogs.json';

const Home = () => {
    const { data: listings = [], loading } = useAsync(fetchAllListings);

    return (
        <>
            <Helmet>
                <title>NestVibes | Homes to rent and buy</title>
            </Helmet>
            <Hero listings={listings} />

            <section className="container-page py-20">
                <SectionHeading
                    eyebrow="Just listed"
                    title="Fresh on the market"
                    action={<Link to="/properties" className="btn-ghost">View all homes <PiArrowRight /></Link>}
                >
                    The newest homes from owners and the NestVibes team.
                </SectionHeading>
                <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
                    {loading
                        ? Array.from({ length: 6 }, (_, i) => <PropertyCardSkeleton key={i} />)
                        : listings.slice(0, 6).map((p, i) => (
                              <PropertyCard key={p.id} property={p} style={{ animationDelay: `${i * 60}ms` }} />
                          ))}
                </div>
            </section>

            <Categories listings={listings} />
            <HowItWorks />
            <OwnersCta />
            <Testimonials />

            <section className="container-page py-20">
                <SectionHeading
                    eyebrow="The journal"
                    title="Advice for renters, buyers and owners"
                    action={<Link to="/blogs" className="btn-ghost">All articles <PiArrowRight /></Link>}
                />
                <div className="grid gap-x-8 gap-y-14 md:grid-cols-2">
                    {blogs.slice(0, 3).map((b, i) => (
                        <BlogCard key={b.id} blog={b} featured={i === 0} />
                    ))}
                </div>
            </section>
        </>
    );
};

export default Home;
