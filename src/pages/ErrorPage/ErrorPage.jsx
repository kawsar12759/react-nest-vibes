import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { PiArrowLeft, PiHouseLine } from "react-icons/pi";
import Logo from "../../components/Logo";

const ErrorPage = () => {
    const error = useRouteError();
    const notFound = isRouteErrorResponse(error) && error.status === 404;

    return (
        <div className="flex min-h-screen flex-col">
            <Helmet>
                <title>{notFound ? "NestVibes | Page not found" : "NestVibes | Something went wrong"}</title>
            </Helmet>
            <header className="container-page flex h-[4.5rem] items-center"><Logo /></header>
            <main className="container-page flex flex-1 flex-col items-center justify-center pb-20 text-center">
                <div className="relative flex h-56 w-44 items-end justify-center rounded-arch border-2 border-plum/40 pb-8" aria-hidden="true">
                    <span className="font-display text-7xl font-light italic text-plum">{notFound ? "404" : "!"}</span>
                    <span className="absolute -right-3 top-6 h-10 w-7 rounded-arch bg-coral" />
                </div>
                <h1 className="display mt-10 text-4xl sm:text-5xl">{notFound ? "This address doesn’t exist" : "Something went wrong"}</h1>
                <p className="mt-3 max-w-md text-muted">
                    {notFound
                        ? "The page may have moved, or the link is mistyped. Try browsing homes instead."
                        : "The page failed to load. Refresh to try again, or head back home."}
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <button onClick={() => window.history.back()} className="btn-ghost"><PiArrowLeft /> Go back</button>
                    <Link to="/" className="btn-primary"><PiHouseLine /> Go to home</Link>
                </div>
            </main>
        </div>
    );
};

export default ErrorPage;
