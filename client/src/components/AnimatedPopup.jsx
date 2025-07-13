import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/AnimatedPopup.css";

export default function AnimatedPopup({ type, message, show, onClose }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 3500); // 3.5s até desaparecer
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

 const variants = {
  initial: { opacity: 0, y: -40, scale: 0.9 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 20, scale: 0.9 }
};

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={`animated-popup ${type}`}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <p>{type === "success" ? "✔️" : "❌"} {message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}