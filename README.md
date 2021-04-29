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

Well, lets do some clean up and start to code