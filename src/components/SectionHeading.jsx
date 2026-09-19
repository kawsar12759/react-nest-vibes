import PropTypes from "prop-types";

const SectionHeading = ({ eyebrow, title, children, action, className = "" }) => (
    <div className={`mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between ${className}`}>
        <div className="max-w-2xl">
            {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
            <h2 className="display text-4xl leading-[1.05] sm:text-5xl">{title}</h2>
            {children && <p className="mt-4 text-lg text-muted">{children}</p>}
        </div>
        {action && <div className="shrink-0">{action}</div>}
    </div>
);

SectionHeading.propTypes = {
    eyebrow: PropTypes.string,
    title: PropTypes.node.isRequired,
    children: PropTypes.node,
    action: PropTypes.node,
    className: PropTypes.string,
};

export default SectionHeading;
