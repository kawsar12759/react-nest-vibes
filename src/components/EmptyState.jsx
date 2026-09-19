import PropTypes from "prop-types";

const EmptyState = ({ icon: Icon, title, children, action }) => (
    <div className="card flex flex-col items-center px-6 py-14 text-center">
        {Icon && (
            <span className="mb-5 flex h-16 w-12 items-end justify-center rounded-arch bg-plum-soft pb-3 text-2xl text-plum">
                <Icon />
            </span>
        )}
        <h3 className="display text-2xl">{title}</h3>
        {children && <p className="mt-2 max-w-md text-muted">{children}</p>}
        {action && <div className="mt-6">{action}</div>}
    </div>
);

EmptyState.propTypes = {
    icon: PropTypes.elementType,
    title: PropTypes.string.isRequired,
    children: PropTypes.node,
    action: PropTypes.node,
};

export default EmptyState;
