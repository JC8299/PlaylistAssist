export default function Box({ children, className }) {
    return (
        <div 
            className={`
                bg-[#121212]
                rounded-lg
                w-full
                ${className ? className : "h-fit"}
            `}
        >
            {children}
        </div>
    )
}