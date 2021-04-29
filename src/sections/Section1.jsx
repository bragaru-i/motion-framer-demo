import React from 'react'
import {motion} from 'framer-motion';

import useObserverHook from '../hooks/useObserverHook'
import {MAIN_DELAY} from '../constants'

const drawerVariants = {
    hidden :{
        opacity:1,
    },
    visible: {
        opacity:0,
        display :"none"
    },
    exit: {
        width: ["0%","100%"],
        backgroundColor:"red",
        opacity: [1,1,0]
    }
}

const Section1 = () => {

    // using our custom hook to get the current position in viewport and a ref for our section
    const {ref, variant} = useObserverHook(MAIN_DELAY, true);
    
    return (
        <section ref ={ref} id="section1">
            Section 1
            <motion.div animate={variant} variants={drawerVariants}/>          
        </section>
    )
}

export default Section1
