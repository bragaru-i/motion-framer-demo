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
React implementation of the Intersection Observer API to tell you when an element enters or leaves the viewport. Contains both a Hooks, render props and plain children implementation.

```
npm i react-intersection-observer
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

      

1. 