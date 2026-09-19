import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { PiCaretLeft, PiCaretRight, PiCloudArrowUp, PiTrash, PiWarningCircle, PiArrowClockwise } from "react-icons/pi";
import { ACCEPT_ATTR, cld, deleteByToken, uploadImage, validateImage } from "../lib/cloudinary";

let keySeq = 0;
const nextKey = () => `img-${++keySeq}`;

/**
 * Multi-image uploader backed by Cloudinary. Files upload as soon as they're chosen; the first
 * image is the cover. Reports finished images via onChange and whether uploads are in flight via onBusyChange.
 */
const ImageUploader = ({ initial = [], max = 10, onChange, onBusyChange }) => {
    const [items, setItems] = useState(() =>
        initial.map((img) => ({ key: nextKey(), status: "done", progress: 100, ...img }))
    );
    const [dragging, setDragging] = useState(false);
    const [notice, setNotice] = useState("");
    const inputRef = useRef(null);
    const filesByKey = useRef(new Map());
    const callbacks = useRef({ onChange, onBusyChange });
    callbacks.current = { onChange, onBusyChange };

    useEffect(() => {
        callbacks.current.onChange?.(items.filter((i) => i.status === "done"));
        callbacks.current.onBusyChange?.(items.some((i) => i.status === "uploading"));
    }, [items]);

    // Release object URLs on unmount.
    useEffect(() => () => items.forEach((i) => i.preview && URL.revokeObjectURL(i.preview)), []); // eslint-disable-line react-hooks/exhaustive-deps

    const patch = (key, changes) => setItems((prev) => prev.map((i) => (i.key === key ? { ...i, ...changes } : i)));

    const start = (key, file) => {
        patch(key, { status: "uploading", progress: 0, error: null });
        uploadImage(file, { tags: ["listing"], onProgress: (progress) => patch(key, { progress }) })
            .then((result) => {
                filesByKey.current.delete(key);
                patch(key, { ...result, status: "done", progress: 100 });
            })
            .catch((err) => patch(key, { status: "error", error: err.message }));
    };

    const addFiles = (fileList) => {
        const files = Array.from(fileList);
        const room = max - items.length;
        const problems = [];
        const accepted = [];
        for (const file of files) {
            const problem = validateImage(file);
            if (problem) problems.push(problem);
            else if (accepted.length < room) accepted.push(file);
        }
        if (files.length - problems.length > room) problems.push(`A listing can have up to ${max} photos.`);
        setNotice(problems.join(" "));

        const added = accepted.map((file) => {
            const key = nextKey();
            filesByKey.current.set(key, file);
            return { key, status: "uploading", progress: 0, preview: URL.createObjectURL(file), name: file.name };
        });
        setItems((prev) => [...prev, ...added]);
        added.forEach((item) => start(item.key, filesByKey.current.get(item.key)));
    };

    const remove = (item) => {
        if (item.deleteToken) deleteByToken(item.deleteToken);
        if (item.preview) URL.revokeObjectURL(item.preview);
        filesByKey.current.delete(item.key);
        setItems((prev) => prev.filter((i) => i.key !== item.key));
    };

    const move = (index, delta) =>
        setItems((prev) => {
            const next = [...prev];
            const target = index + delta;
            if (target < 0 || target >= next.length) return prev;
            [next[index], next[target]] = [next[target], next[index]];
            return next;
        });

    const onDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files);
    };

    return (
        <div>
            {items.length < max && (
                <label
                    onDragOver={(e) => {
                        e.preventDefault();
                        setDragging(true);
                    }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={onDrop}
                    className={`flex cursor-pointer flex-col items-center justify-center rounded-card border-2 border-dashed px-6 py-10 text-center transition ${
                        dragging ? "border-plum bg-plum-soft" : "border-line bg-surface hover:border-plum/60"
                    }`}
                >
                    <PiCloudArrowUp className="mb-3 text-4xl text-plum" />
                    <span className="font-bold">Drop photos here or <span className="text-plum underline underline-offset-4">browse</span></span>
                    <span className="mt-1 text-sm text-muted">
                        JPG, PNG, WebP, AVIF or HEIC · up to 8 MB each · {max - items.length} of {max} slots left
                    </span>
                    <input
                        ref={inputRef}
                        type="file"
                        accept={ACCEPT_ATTR}
                        multiple
                        className="sr-only"
                        onChange={(e) => {
                            addFiles(e.target.files);
                            e.target.value = "";
                        }}
                    />
                </label>
            )}

            {notice && (
                <p className="mt-3 flex items-start gap-2 text-sm text-danger" role="alert">
                    <PiWarningCircle className="mt-0.5 shrink-0" /> {notice}
                </p>
            )}

            {items.length > 0 && (
                <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                    {items.map((item, index) => (
                        <li key={item.key} className="group relative overflow-hidden rounded-xl border border-line bg-sunken">
                            <img
                                src={item.url ? cld(item.url, { w: 400, h: 300 }) : item.preview}
                                alt={index === 0 ? "Cover photo" : `Photo ${index + 1}`}
                                className={`aspect-[4/3] w-full object-cover ${item.status !== "done" ? "opacity-50" : ""}`}
                            />
                            {index === 0 && item.status === "done" && (
                                <span className="absolute left-2 top-2 rounded-full bg-plum px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-plum-ink">
                                    Cover
                                </span>
                            )}

                            {item.status === "uploading" && (
                                <div className="absolute inset-x-3 bottom-3">
                                    <div className="h-1.5 overflow-hidden rounded-full bg-surface/70">
                                        <div className="h-full bg-plum transition-[width]" style={{ width: `${item.progress}%` }} />
                                    </div>
                                    <p className="mt-1 text-center text-xs font-bold">{item.progress}%</p>
                                </div>
                            )}

                            {item.status === "error" && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-surface/85 p-2 text-center">
                                    <p className="text-xs font-semibold text-danger">{item.error}</p>
                                    {filesByKey.current.has(item.key) && (
                                        <button type="button" onClick={() => start(item.key, filesByKey.current.get(item.key))} className="btn-ghost !px-3 !py-1 text-xs">
                                            <PiArrowClockwise /> Retry
                                        </button>
                                    )}
                                </div>
                            )}

                            <div className="absolute right-2 top-2 flex gap-1 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
                                {item.status === "done" && index > 0 && (
                                    <button type="button" onClick={() => move(index, -1)} className="rounded-full bg-surface/95 p-1.5 shadow" aria-label="Move earlier">
                                        <PiCaretLeft />
                                    </button>
                                )}
                                {item.status === "done" && index < items.length - 1 && (
                                    <button type="button" onClick={() => move(index, 1)} className="rounded-full bg-surface/95 p-1.5 shadow" aria-label="Move later">
                                        <PiCaretRight />
                                    </button>
                                )}
                                <button type="button" onClick={() => remove(item)} className="rounded-full bg-surface/95 p-1.5 text-danger shadow" aria-label="Remove photo">
                                    <PiTrash />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            {items.length > 1 && <p className="field-hint">The first photo is the cover. Use the arrows to reorder.</p>}
        </div>
    );
};

ImageUploader.propTypes = {
    initial: PropTypes.array,
    max: PropTypes.number,
    onChange: PropTypes.func,
    onBusyChange: PropTypes.func,
};

export default ImageUploader;
