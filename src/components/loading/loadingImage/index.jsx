const Loading = ({ className }) => {
    return (
        <>
            <div className={`loadingImage ${className}`}></div>
            <div className={`loadingImage ${className}`}></div>
            <div className={`loadingImage ${className}`}></div>
            <div className={`loadingImage ${className}`}></div>
        </>
    );
};

export default Loading;
