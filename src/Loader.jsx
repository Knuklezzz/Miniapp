import Lottie from "lottie-react";
import animationData from "./animation.json"; // Подставь свой путь

const MyAnimation = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div >
                <Lottie animationData={animationData} loop autoplay />
            </div>
        </div>
    );
};

export default MyAnimation;
