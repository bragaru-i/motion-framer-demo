# **This article is about irst step in animation with React and Motion-Framer**
## So, I'm a little bit far from use of animation libraries and kind of, but at my last project we had such a request:
 - Clients want a webpage that will have similar effects like a presentation in PowerPoint.
 - This PowerPoint effects should be available only in a desktop view (viewport 1200px and up).
With mockup done in Figma, and running low on time resource I decided to find a good library, to switch on CRA and do some research (goodle, stackoferlow and medium - as usually).
Well, in short, I decided to use **Motion Framer** ( great library with good documentation, also 589,318 downloads/week ).
So, add it to  project:

```
npm i framer-motion
```

 Also add  **React implementation of the Intersection Observer API** aka  **react-intersection-observer** (nearly 450k downloads per week). What it does: 
React implementation of the Intersection Observer API to tell you when an element enters or leaves the viewport. Contains both a Hooks, render props and plain children implementation. We need lodash too. Otherwise we need to write by our own a debounce function

```
npm i react-intersection-observer lodash
```

Well, lets do some clean up and start to code. 
Screens attached, also first commit from repo will show you differencies

Now, we start to count steps:
1. Create Sections - Slides. That on every mouse-wheel will switch to another. Also a navigation that always stays fixed to top. 
Giving them a width and height of 100%, also setting them id. id must be different for all sections 

    *sections/Section1.jsx*

    ```
    import React from 'react'
    
    const Section1 = () => {
        return (
            <section id="section1">
                Section 1
            </section>
        )
    }
    
    export default Section1
    
    ```
    add some styles to sections, straight in App.css (well in a real project, you have a different folder structure)

    *./App.css*

     
        section {
          width:100%;
          height:100%;
          overflow: hidden;
          font-size: 60px;
          color: black;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        #section1 {
          background-color: bisque;
        }

        #section2 {
          background-color: coral;
        }

        #section3 {
          background-color: chartreuse;
        }

        #section4 {
          background-color:  blueviolet;
        }

    and of course we switch off scrolling on page 

        body {
             overflow: hidden;
        }

2. Now, we have sections, we have our packages setted up, let's do some coding!

    Every page has 4 effects: 
    1. Animation that is played when section is on viewport
    2. Animation that is playes when user is leaving outport
    3. If user goes next section, we play exit animation  for next section
    4. If user returns back to previous section, we play another exit animation.

 Well, everything goes as we planned, but we will encounter a problem. Motion Framer     provides us a wrapper that plays exit animations only on components that get unmounted.

Official docs : *AnimatePresence allows components to animate out when they're removed  from the React tree*

Well,we have intersection-observer package installed, that provides us *useInView* hook.

Official docs: 

        // Use object destructing, so you don't need to remember the exact order
        const { ref, inView, entry } = useInView(options);

        // Or array destructing, making it easy to customize the field names
        const [ref, inView, entry] = useInView(options);

A good configuration and some custom hooks will help us to define when it is on viewport our section.

*./hooks/useObserverHook.jsx*

    import {useState, useEffect} from 'react'
    import {useInView} from 'react-intersection-observer';
    import debounce from 'lodash.debounce';

    const useObserverEffect = (MAIN_DELAY, isFirst = false, isLast = false) => {

        const [variant, setVariant] = useState("hidden");
        const {ref, inView} = useInView({
            threshold: 0.3,
        });

        // observable to detect current position of a slide
        useEffect(() => {
            if (inView) {
                setVariant("visible");
            } else setVariant("hidden");
        }, [inView]);

        const onMouseScroll = debounce((e) => {
            if (e.deltaY > 0 && variant === "visible") setVariant(isLast ? "visible" : "exit")
            if (e.deltaY < 0 && variant === "visible") setVariant(isFirst ? "visible" : "exitUp")
        }, MAIN_DELAY)

        useEffect(() => {
            window.addEventListener('wheel', onMouseScroll)
            return () => {
                window.removeEventListener('wheel', onMouseScroll)
            }
        })

        return {
            ref, variant
            }
        }
    export default useObserverEffect

This hook provides us a ref for referencing it, and variant ( "hidden", "visible" , "exit" and "exitUp"). All of this variants we need for motion framer to animate our pages.
Well we are nearly done. let's implement it to the first section!

*./sections/Section1.jsx*


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
