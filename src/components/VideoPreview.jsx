import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef, useState } from "react"


gsap.registerPlugin(ScrollTrigger)
const VideoPreview = ({children}) => {
    const [isHovering,setIsHovering] = useState(false);

    const sectionRef = useRef(null);
    const contentRef = useRef(null);

    const handleMouseMove = ({clientX,clientY, currentTarget}) =>{
        const rect = currentTarget.getBoundingClientRect();

        const xOffset = clientX - (rect.left + rect.widtg/2);
        const yOffset = clientY - (rect.top + rect.height/2);

        if(isHovering){
            gsap.to(sectionRef.current,{
                x:xOffset,
                y:yOffset,
                rotationY:-yOffset/2,
                rotationX:-yOffset/2,
                transformPerspective:500,
                duration:1,
                ease:"power1.inOut"
            })

            gsap.to(contentRef.current,{
                x:-xOffset,
                y:-yOffset,
                duration:1,
                ease:"power1.out"
            })
        }
    }

    useEffect(()=>{
        if(!isHovering){
            gsap.to(sectionRef,{
                x:0,
                y:0,
                rotationY:0,
                rotationX:0,
                duration:1,
                ease:"power1.inOut"
            })
            gsap.to(contentRef,{
                x:0,
                y:0,
                duration:1,
                ease:"power1.out"
            })
        }
    },[isHovering])


  return (
    <section
        ref={sectionRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={()=>setIsHovering(true)}
        onMouseLeave={()=>setIsHovering(false)}
        className="absolute z-50 size-full overflow-hidden rounded-lg"
        style={{
            perspective:"500px",
        }}
    >
    <div
        ref={contentRef}
        className="origin-center rounded-lg"
        style={{
            transformStyle:"preserve-3d"
        }}
    >
        {children}
    </div>

    </section>
  )
}

export default VideoPreview