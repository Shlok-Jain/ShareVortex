import { motion } from "framer-motion";
const animationConfiguration = {
    initial: { x:-30,opacity: 0.1 },
    animate: { x:0,opacity: 1 },
    exit: {x:30, opacity: 0.1 }
};
export const Transition = ({ children }) => {
    return (
        <motion.div
            variants={animationConfiguration}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
        >
            {children}
        </motion.div>
    );
};