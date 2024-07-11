import { useState, useEffect, useRef } from "react";
import MoreInformation from "./MoreInformation";
import { AnimatePresence, motion, usePresence } from "framer-motion";
import { gsap } from "gsap";

const HomeSection = () => {
  const [open, setOpen] = useState(false);
  const [go, setGo] = useState(false);
  const [speed, setSpeed] = useState(0);
  const [info, setInfo] = useState(false);
  const ref = useRef(null);
  const [isPresent, safeToRemove] = usePresence();
  const [isClicked, setIsclicked] = useState(false)

   const [currentColorIndex, setCurrentColorIndex] = useState(0);
   const colors = ["#8B8000", "#2A0134", "#AA336A", "#004D4F"]; 

   
   useEffect(() => {
     let interval;
     if (isClicked) {
       interval = setInterval(() => {
         setCurrentColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
       }, 3000);
     } else {
       clearInterval(interval);
     }
     return () => clearInterval(interval); 
   }, [isClicked]);

   useEffect(() => {
     document.body.style.backgroundColor = isClicked
       ? colors[currentColorIndex]
       : "black";
   }, [isClicked, currentColorIndex]);



  useEffect(() => {
    if (!isPresent) {
      gsap.to(ref.current, {
        opacity: 0,
        onComplete: () => safeToRemove?.(),
      });
    }
  }, [isPresent, safeToRemove]);

  useEffect(() => {
    let intervalId;
    if (go) {
      intervalId = setInterval(() => {
        setSpeed((prevSpeed) => {
          const newSpeed = prevSpeed + 5;

          if (newSpeed >= 175.31) {
            clearInterval(intervalId);
            setInfo(true);
            setGo(false);
            return 175.31;
          }
          return newSpeed;
        });
      }, 50);
    } else {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [go]);

  return (
    <>
      <motion.div
        transition={{ duration: 0.25 }}
        className="flex h-[83vh] justify-center items-center"
      >
        <div className="md:ml-auto flex-col md:items-center justify-center">
          <div className="flex-col flex justify-center md:flex-row md:items-center md:space-y-5 ">
            <div>
              <p className="text-7xl text-center md:text-[12rem] lg:text-[16rem] 3xl:text-[23rem] 4xl:text-[33rem] md:text-end">
                {speed}
              </p>
            </div>
            <div className="md:w-28 3xl:w-44 4xl:w-52 space-y-2 3xl:space-y-8 4xl:space-y-11 flex-col justify-center">
              <p className="text-2xl 3xl:text-4xl 4xl:text-5xl text-center tracking-widest">
                Mbps
              </p>
              <div className="flex md:hidden justify-center md:justify-end md:-mt-5">
                {info ? (
                  <button
                    onClick={() => {
                      setOpen(true);
                      setIsclicked(false);
                    }}
                    className="text-sm text-[#7F7F7F] tracking-widest"
                  >
                    MORE INFORMATION
                  </button>
                ) : (
                  <button
                    //onClick={() => setOpen(true)}
                    className="text-sm text-transparent tracking-widest"
                  >
                    MORE INFORMATION
                  </button>
                )}
              </div>
              {go ? (
                <div className="flex justify-center mt-6 md:mt-0">
                  <button
                    onClick={() => {
                      //setGo(false);
                      // setSpeed(175.31);
                      // setInfo(true);
                    }}
                    className="flex justify-center text-xl  mt-16 md:mt-5 tracking-widest border-2 border-[#009105] rounded-full px-5 py-6 3xl:py-6 3xl:px-6 4xl:py-8 4xl:px-8"
                  >
                    <svg
                      // fill="#009105"
                      width="35px"
                      height="28px"
                      viewBox="0 0 24 24"
                      id="down"
                      data-name="Multi Color"
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon multi-color 3xl:w-14 3xl:h-14 4xl:h-20 4xl:w-20 "
                    >
                      <title style={{ strokeWidth: 2 }}>down</title>
                      <path
                        id="primary-stroke"
                        d="M19,14l-7,7L5,14m7,7V3"
                        style={{
                          fill: "none",
                          stroke: "#009105",
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          strokeWidth: 3,
                        }}
                      ></path>
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="flex justify-center ">
                  <button
                    onClick={() => {
                      setGo(true);
                      setSpeed(0);
                      setInfo(false);
                      setIsclicked(true);
                    }}
                    className="text-xl  3xl:text-4xl 4xl:text-5xl mt-16 md:mt-5 tracking-widest border-2 border-[#FFFF00] rounded-full px-5 py-6 3xl:py-8 3xl:px-[1.3rem] 4xl:py-12 4xl:px-8"
                  >
                    GO
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="hidden md:flex justify-center md:justify-end ">
            {info ? (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setOpen(true);
                  setIsclicked(false);
                }}
                className="text-sm 3xl:text-xl 4xl:text-3xl text-[#7F7F7F] tracking-widest"
              >
                MORE INFORMATION
              </motion.button>
            ) : (
              <button
                //    onClick={() => setOpen(true)}
                className="text-sm 3xl:text-xl 4xl:text-3xl text-transparent tracking-widest"
              >
                MORE INFORMATION
              </button>
            )}
          </div>
        </div>
      </motion.div>

      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {open ? <MoreInformation setOpen={setOpen} /> : null}
      </AnimatePresence>
    </>
  );
};

export default HomeSection;
