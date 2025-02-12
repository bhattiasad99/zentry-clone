'use client'
import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer';
import { motion, AnimatePresence } from "framer-motion";


const Discover = () => {
    const { ref, inView: headingInView } = useInView({
        threshold: 0.1,
    });

    const headingVariants = {
        hidden: {
            opacity: 0,
            y: 0,
            transition: { staggerChildren: 0.2, staggerDirection: -1 },
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.2 },
        },
    };

    const wordVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };


    useEffect(() => {
        console.log({ headingInView })
    }, [headingInView])

    return (
        <div className='min-h-screen' ref={ref}>
            <AnimatePresence>
                {headingInView && (
                    <motion.h2
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={headingVariants}
                        className="uppercase text-center"
                    >
                        <motion.span variants={wordVariants}>Welcome</motion.span>{" "}
                        <motion.span variants={wordVariants}>to</motion.span>{" "}
                        <motion.span variants={wordVariants}>Zentry</motion.span>
                    </motion.h2>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Discover