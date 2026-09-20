import { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { PiCaretLeft, PiCaretRight, PiX, PiSquaresFour } from "react-icons/pi";
import { cld, cldSrcSet } from "../../lib/cloudinary";

const Gallery = ({ images, title }) => {
    const dialogRef = useRef(null);
    const [index, setIndex] = useState(0);
    const count = images.length;

    const open = (i) => {
        setIndex(i);
        dialogRef.current?.showModal();
    };
    const step = useCallback((delta) => setIndex((i) => (i + delta + count) % count), [count]);

    useEffect(() => {
        const dialog = dialogRef.current;
        const onKey = (e) => {
            if (!dialog?.open) return;
            if (e.key === "ArrowRight") step(1);
            if (e.key === "ArrowLeft") step(-1);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [step]);

    const [cover, ...rest] = images;
    const thumbs = rest.slice(0, 4);

    return (
        <>
            <div className={`grid gap-2 overflow-hidden rounded-card ${thumbs.length ? "md:grid-cols-[2fr_1fr]" : ""}`}>
                <button onClick={() => open(0)} className="group relative block overflow-hidden bg-sunken" aria-label="Open photo gallery">
                    <img
                        src={cld(cover.url, { w: 1400, h: 900 })}
                        srcSet={cldSrcSet(cover.url, [640, 1000, 1400, 1800], 0.64)}
                        sizes="(min-width: 768px) 66vw, 100vw"
                        alt={title}
                        className={`w-full object-cover transition duration-700 group-hover:scale-[1.02] ${thumbs.length ? "aspect-[16/11] md:h-full" : "aspect-[16/9] max-h-[620px]"}`}
                    />
                </button>
                {thumbs.length > 0 && (
                    <div className={`hidden gap-2 md:grid ${thumbs.length > 1 ? "grid-cols-2" : ""}`}>
                        {thumbs.map((img, i) => (
                            <button key={img.publicId || img.url} onClick={() => open(i + 1)} className="group relative overflow-hidden bg-sunken" aria-label={`Open photo ${i + 2}`}>
                                <img src={cld(img.url, { w: 500, h: 500 })} alt="" loading="lazy" className="h-full min-h-[140px] w-full object-cover transition duration-700 group-hover:scale-105" />
                            </button>
                        ))}
                    </div>
                )}
            </div>
            {count > 1 && (
                <button onClick={() => open(0)} className="btn-ghost mt-3 !py-2 text-sm">
                    <PiSquaresFour /> View all {count} photos
                </button>
            )}

            <dialog
                ref={dialogRef}
                className="m-0 h-full max-h-none w-full max-w-none bg-transparent p-0 text-white"
                onClick={(e) => e.target === dialogRef.current && dialogRef.current.close()}
                aria-label={`${title} photos`}
            >
                <div className="flex h-full flex-col bg-black/90">
                    <div className="flex items-center justify-between p-4">
                        <p className="text-sm font-semibold">{index + 1} / {count}</p>
                        <button onClick={() => dialogRef.current.close()} className="rounded-full p-2 text-2xl hover:bg-white/10" aria-label="Close gallery">
                            <PiX />
                        </button>
                    </div>
                    <div className="relative flex flex-1 items-center justify-center px-4 pb-6">
                        <img key={index} src={cld(images[index].url, { w: 2000, crop: "limit" })} alt={`${title}, photo ${index + 1}`} className="max-h-[80vh] max-w-full rounded-lg object-contain animate-rise [animation-duration:.3s]" />
                        {count > 1 && (
                            <>
                                <button onClick={() => step(-1)} className="absolute left-3 rounded-full bg-white/10 p-3 text-2xl hover:bg-white/20" aria-label="Previous photo"><PiCaretLeft /></button>
                                <button onClick={() => step(1)} className="absolute right-3 rounded-full bg-white/10 p-3 text-2xl hover:bg-white/20" aria-label="Next photo"><PiCaretRight /></button>
                            </>
                        )}
                    </div>
                    {count > 1 && (
                        <div className="flex justify-center gap-2 overflow-x-auto px-4 pb-6">
                            {images.map((img, i) => (
                                <button key={img.publicId || img.url} onClick={() => setIndex(i)} className={`shrink-0 overflow-hidden rounded-md ring-2 transition ${i === index ? "ring-white" : "opacity-50 ring-transparent hover:opacity-100"}`} aria-label={`Show photo ${i + 1}`}>
                                    <img src={cld(img.url, { w: 120, h: 90 })} alt="" className="h-14 w-20 object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </dialog>
        </>
    );
};

Gallery.propTypes = {
    images: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
};

export default Gallery;
