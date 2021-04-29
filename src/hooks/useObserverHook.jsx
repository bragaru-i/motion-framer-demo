
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