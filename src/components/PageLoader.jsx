const PageLoader = () => (
    <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-live="polite">
        <div className="flex flex-col items-center gap-4">
            <span className="block h-12 w-9 animate-pulse rounded-arch border-2 border-plum/60" />
            <span className="text-sm font-semibold text-muted">Loading…</span>
        </div>
    </div>
);

export default PageLoader;
