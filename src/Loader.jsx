import Lottie from "lottie-react";
import animationData from "./animation.json"; // Подставь свой путь

const MyAnimation = () => {
    return <Lottie animationData={animationData} loop={false} />;
};

export default MyAnimation;