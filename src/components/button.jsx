const Button = ({ title, children, className, ...props }) => {
    return (
        <button
            className={`w-full flex gap-1 items-center justify-center px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 ${className}`}
            {...props}
        >
            {children && children}
            {title}
        </button>
    );
};

export default Button;
