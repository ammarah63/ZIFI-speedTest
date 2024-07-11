import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, usePresence } from "framer-motion";


const MoreInformation = ({ setOpen }) => {
  const [location, setLocation] = useState(null);
  const [currentDateTime, setCurrentDateTime] = useState("");
  const [ipAddress, setIpAddress] = useState("");

   const dropIn = {
    hidden: {
      y: "100vh",
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      y: "100vh", 
      opacity: 0,
    },
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api64.ipify.org?format=json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setIpAddress(data.ip);
      } catch (error) {
        console.error("Error fetching IP address:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const currentDate = now.toLocaleDateString();
      const currentTime = now.toLocaleTimeString();
      setCurrentDateTime({
        currentDate: currentDate || null,
        currentTime: currentTime || null,
      });
    };

    updateDateTime();

    const interval = setInterval(() => {
      updateDateTime();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const res = await fetch(`https://ipapi.co/${ipAddress}/json/`);
        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }
        const data = await res.json();

        setLocation({
          city: data.city || null,
          country: data.country || null,
          countryCode: data.country_code || null,
          lat: data.latitude || null,
          lon: data.longitude || null,
          isp: data.isp || null,
          query: data.query || null,
          org: data.org || null,
        });
      } catch (error) {
        console.error("Error fetching IP data:", error);
        setLocation(null);
      }
    };

    if (ipAddress) {
      fetchLocation();
    }
  }, [ipAddress]);

  return (
    <>
      <motion.div   onClick={(e) => e.stopPropagation()}
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit" className="bg-black md:bg-opacity-95 h-3/4 z-50 fixed inset-x-0 inset-y-[2rem] md:inset-y-[4.2rem] lg:inset-y-[4.5rem] 3xl:inset-y-[5.3rem] 4xl:inset-y-[6.9rem]">
        <p className="text-sm 3xl:text-xl my-4 md:my-0 3xl:mt-10 4xl:mt-16 4xl:text-3xl text-center md:text-start md:ms-5 md:mt-3 text-[#7F7F7F] tracking-widest">
          MORE INFORMATION
        </p>
        <div className="absolute -top-6 left-2 md:ml-5 3xl:ml-4 4xl:ml-4 md:static ">
          <button onClick={() => setOpen(false)} className=" ">
            {" "}
            <svg
              fill="#000000"
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              id="left"
              data-name="Flat Color"
              xmlns="http://www.w3.org/2000/svg"
              className="icon flat-color ms-10 md:ms-0 mt-10 lg:mt-5 4xl:my-10 3xl:my-6 3xl:w-10 3xl:h-10 4xl:w-12 4xl:h-12"
            >
              <path
                id="primary"
                d="M21,11H5.41l5.3-5.29A1,1,0,1,0,9.29,4.29l-7,7a1,1,0,0,0,0,1.42l7,7a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L5.41,13H21a1,1,0,0,0,0-2Z"
                style={{ fill: "#ffffff" }}
              ></path>
            </svg>
          </button>
        </div>

        <div className="flex flex-col md:mt-4 lg:mt-5 3xl:mt-6 4xl:mt-7 md:grid md:grid-cols-2 text-[0.6rem] whitespace-nowrap  md:text-xs 3xl:text-xl 4xl:text-3xl uppercase">
          <div className="space-y-4 mt-[4vh] md:mt-[0vh] md:space-y-8 3xl:space-y-10 4xl:space-y-16 order-last md:order-first">
            <div className="grid grid-cols-5 md:grid-cols-6 3xl:grid-cols-5 md:mt-0 tracking-widest">
              <div className="flex  items-center justify-center">
                {location && (
                  <>
                    <Image
                      src={`https://flagcdn.com/${location.countryCode.toLowerCase()}.svg`}
                      width={100}
                      height={100}
                      alt={"Flag"}
                      className="rounded-lg w-5 h-5 md:w-8 md:h-8 3xl:w-14 3xl:h-14 object-cover"
                    />
                  </>
                )}
              </div>
              <div className="col-span-2 3xl:col-span-2 lg:col-span-1 space-y-1 md:space-y-2 3xl:space-y-2 text-[#7F7F7F]">
                {" "}
                <p>CITY</p>
                <p>COUNTRY</p>
              </div>
              <div className="col-span-2 3xl:col-span-2 lg:col-span-1 space-y-1 md:space-y-2 3xl:space-y-2">
                <p>{location?.city}</p>
                <p>{location?.country}</p>
              </div>
              <div className="hidden md:col-span-3 "></div>
            </div>

            <div className="grid grid-cols-5 md:grid-cols-6 3xl:grid-cols-5 tracking-widest">
              <div className="flex items-center justify-center">
                <svg
                  width="40px"
                  height="40px"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 md:w-8 md:h-8 3xl:w-14 3xl:h-14"
                >
                  <path
                    fill="#ffffff"
                    d="M9.99296258,10.5729355 C12.478244,10.5729355 14.4929626,8.55821687 14.4929626,6.0729355 C14.4929626,3.58765413 12.478244,1.5729355 9.99296258,1.5729355 C7.5076812,1.5729355 5.49296258,3.58765413 5.49296258,6.0729355 C5.49296258,8.55821687 7.5076812,10.5729355 9.99296258,10.5729355 Z M10,0 C13.3137085,0 16,2.6862915 16,6 C16,8.20431134 14.8113051,10.1309881 13.0399615,11.173984 C16.7275333,12.2833441 19.4976819,15.3924771 19.9947005,19.2523727 C20.0418583,19.6186047 19.7690435,19.9519836 19.3853517,19.9969955 C19.0016598,20.0420074 18.6523872,19.7816071 18.6052294,19.4153751 C18.0656064,15.2246108 14.4363723,12.0699838 10.034634,12.0699838 C5.6099956,12.0699838 1.93381693,15.231487 1.39476476,19.4154211 C1.34758036,19.7816499 0.998288773,20.0420271 0.614600177,19.9969899 C0.230911582,19.9519526 -0.0418789616,19.6185555 0.00530544566,19.2523267 C0.500630192,15.4077896 3.28612316,12.3043229 6.97954305,11.1838052 C5.19718955,10.1447285 4,8.21217353 4,6 C4,2.6862915 6.6862915,0 10,0 Z"
                  />
                </svg>
              </div>
              <div className="col-span-2 3xl:col-span-2 lg:col-span-1 space-y-1 md:space-y-2 3xl:space-y-2 text-[#7F7F7F]">
                <p>LATITUDE</p>
                <p>LONGITUDE</p>
                <p>INTERNAL IP</p>
                <p>EXTERNAL IP</p>
                <p>MAC ADDRESS</p>
              </div>
              <div className="col-span-2 3xl:col-span-2 lg:col-span-1 space-y-1 md:space-y-2 3xl:space-y-2">
                <p>{location?.lat}</p>
                <p> {location?.lon}</p>
                <p>ipAddress</p>
                <p>ipAddress</p>
                <p>MAC ADDRESS</p>
              </div>
              <div className="hidden lg:col-span-3 "></div>
            </div>

            <div className="grid grid-cols-5 md:grid-cols-6 3xl:grid-cols-5 tracking-widest">
              <div className="flex items-center justify-center">
                <svg
                  // fill="#000000"
                  width="40px"
                  height="40px"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 md:w-8 md:h-8 3xl:w-14 3xl:h-14"
                >
                  <path
                    fill="#ffffff"
                    d="M13.4,16.6 C14.2,17.4 14.2,18.6 13.4,19.4 C13,19.8 12.5,20 12,20 C11.5,20 11,19.8 10.6,19.4 C9.8,18.6 9.8,17.4 10.6,16.6 C11.4,15.8 12.6,15.8 13.4,16.6 Z M12,12 C13.6,12 15.1,12.6 16.2,13.8 C16.6,14.2 16.6,14.8 16.2,15.2 C16,15.4 15.7,15.5 15.5,15.5 C15.2428571,15.5 15.0591837,15.4265306 14.8860058,15.2795918 L14.8,15.2 C13.3,13.7 10.8,13.7 9.3,15.2 C8.9,15.6 8.3,15.6 7.9,15.2 C7.53076923,14.8307692 7.50236686,14.2911243 7.8147929,13.8956759 L7.9,13.8 C8.9,12.6 10.4,12 12,12 Z M12,8 C14.6,8 17.1,9 18.9,10.9 C19.3,11.3 19.3,11.9 18.9,12.3 C18.7,12.5 18.5,12.6 18.2,12.6 C17.9428571,12.6 17.7591837,12.5265306 17.5860058,12.3795918 L17.5,12.3 C16,10.8 14.1,10 12,10 C9.9,10 8,10.8 6.5,12.3 C6.1,12.7 5.5,12.7 5.1,12.3 C4.7,11.9 4.7,11.3 5.1,10.9 C6.9,9 9.4,8 12,8 Z M12,4 C15.7,4 19.1,5.5 21.7,8.1 C22.1,8.5 22.1,9.1 21.7,9.5 C21.5,9.7 21.3,9.8 21,9.8 C20.7,9.8 20.5,9.7 20.3,9.5 C18.1,7.2 15.1,6 12,6 C8.9,6 5.9,7.2 3.7,9.5 C3.3,9.9 2.7,9.9 2.3,9.5 C1.9,9.1 1.9,8.5 2.3,8.1 C4.9,5.5 8.3,4 12,4 Z"
                  />
                </svg>
              </div>
              <div className="col-span-2 3xl:col-span-2 lg:col-span-1 space-y-1 3xl:space-y-2 md:space-y-2 text-[#7F7F7F]">
                <p>PROVIDER</p>
                <p>ROUTER NAME</p>
                <p>SERVER</p>
                <p>PING</p>
              </div>
              <div className="col-span-2 3xl:col-span-2 lg:col-span-1 space-y-1 3xl:space-y-2 md:space-y-2">
                <p>{location?.org}</p>
                <p>ROUTER NAME</p>
                <p>SERVER</p>
                <p>PING</p>
              </div>
              <div className="hidden lg:col-span-3 "></div>
            </div>
            <div className="grid grid-cols-5 md:grid-cols-6 3xl:grid-cols-5 tracking-widest">
              <div className="flex items-center justify-center">
                <svg
                  // fill="#000000"
                  width="40px"
                  height="40px"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 md:w-8 md:h-8 3xl:w-14 3xl:h-14"
                >
                  <path
                    fill="transparent"
                    d="M13.4,16.6 C14.2,17.4 14.2,18.6 13.4,19.4 C13,19.8 12.5,20 12,20 C11.5,20 11,19.8 10.6,19.4 C9.8,18.6 9.8,17.4 10.6,16.6 C11.4,15.8 12.6,15.8 13.4,16.6 Z M12,12 C13.6,12 15.1,12.6 16.2,13.8 C16.6,14.2 16.6,14.8 16.2,15.2 C16,15.4 15.7,15.5 15.5,15.5 C15.2428571,15.5 15.0591837,15.4265306 14.8860058,15.2795918 L14.8,15.2 C13.3,13.7 10.8,13.7 9.3,15.2 C8.9,15.6 8.3,15.6 7.9,15.2 C7.53076923,14.8307692 7.50236686,14.2911243 7.8147929,13.8956759 L7.9,13.8 C8.9,12.6 10.4,12 12,12 Z M12,8 C14.6,8 17.1,9 18.9,10.9 C19.3,11.3 19.3,11.9 18.9,12.3 C18.7,12.5 18.5,12.6 18.2,12.6 C17.9428571,12.6 17.7591837,12.5265306 17.5860058,12.3795918 L17.5,12.3 C16,10.8 14.1,10 12,10 C9.9,10 8,10.8 6.5,12.3 C6.1,12.7 5.5,12.7 5.1,12.3 C4.7,11.9 4.7,11.3 5.1,10.9 C6.9,9 9.4,8 12,8 Z M12,4 C15.7,4 19.1,5.5 21.7,8.1 C22.1,8.5 22.1,9.1 21.7,9.5 C21.5,9.7 21.3,9.8 21,9.8 C20.7,9.8 20.5,9.7 20.3,9.5 C18.1,7.2 15.1,6 12,6 C8.9,6 5.9,7.2 3.7,9.5 C3.3,9.9 2.7,9.9 2.3,9.5 C1.9,9.1 1.9,8.5 2.3,8.1 C4.9,5.5 8.3,4 12,4 Z"
                  />
                </svg>
              </div>
              <div className="col-span-2 3xl:col-span-2 lg:col-span-1 space-y-1 md:space-y-2 3xl:space-y-2 text-[#7F7F7F]">
                <p>DATE</p>
                <p>TIME</p>
              </div>
              <div className="col-span-2 3xl:col-span-2 lg:col-span-1 space-y-1 md:space-y-2 3xl:space-y-2">
                <p>{currentDateTime.currentDate}</p>
                <p>{currentDateTime.currentTime}</p>
              </div>
              <div className="hidden lg:col-span-3 "></div>
            </div>
          </div>

          <div className=" md:mt-0 lg:ml-auto md:pe-10 lg:pe-16 flex-col justify-center items-center text-center">
            <div className="flex flex-col md:flex-row space-x-5 md:justify-end md:items-center">
              <div>
                <p className="text-6xl md:text-7xl lg:text-9xl 3xl:text-[12rem] 4xl:text-[16rem] md:text-end">
                  175.31
                </p>
              </div>
              <p className="md:hidden text-sm text-center md:text-end tracking-widest">
                DOWNLOAD
              </p>
              <div className="flex flex-row md:flex-col justify-center md:text-center">
                <p className="text-xl md:text-2xl 3xl:text-4xl 4xl:text-5xl md:my-5 normal-case tracking-widest order-last">
                  Mbps
                </p>
                <div className="flex md:justify-center mx-1 md:items-center">
                  <button>
                    <svg
                      // fill="#009105"
                      width="35px"
                      height="35px"
                      viewBox="0 0 24 24"
                      id="down"
                      data-name="Multi Color"
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon multi-color w-5 h-5 md:w-9 md:h-9 3xl:w-14 3xl:h-14 4xl:w-20 4xl:h-20"
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
              </div>
            </div>
            <p className="hidden md:block 3xl:text-3xl 4xl:text-4xl md:text-end tracking-widest">
              DOWNLOAD
            </p>
            <div className="flex flex-col mt-3 md:mt-5 3xl:mt-14 4xl:mt-20 md:flex-row space-x-5 md:justify-end md:items-center">
              <div>
                <p className="text-6xl md:text-7xl lg:text-9xl 3xl:text-[12rem] 4xl:text-[16rem] md:text-end">
                  52.97
                </p>
              </div>
              <p className="md:hidden text-sm md:text-end tracking-widest">
                UPLOAD
              </p>
              <div className="flex flex-row md:flex-col justify-center md:text-center">
                <p className="text-xl md:text-2xl md:my-5 3xl:text-4xl 4xl:text-5xl normal-case tracking-widest order-last">
                  Mbps
                </p>
                <div className="flex md:justify-center mx-1 md:items-center">
                  <button>
                    <svg
                      fill="#000000"
                      width="35px"
                      height="35px"
                      viewBox="0 0 24 24"
                      id="up"
                      data-name="Multi Color"
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon multi-color w-5 h-5 md:w-9 md:h-9 3xl:w-14 3xl:h-14 4xl:w-20 4xl:h-20"
                    >
                      <title style={{ strokeWidth: 2 }}>up</title>
                      <path
                        id="primary-stroke"
                        d="M5,10l7-7,7,7M12,3V21"
                        style={{
                          fill: "none",
                          stroke: "#3E00AC",
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          strokeWidth: 3,
                        }}
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <p className="hidden md:block 3xl:text-3xl 4xl:text-4xl text-center md:text-end tracking-widest">
              UPLOAD
            </p>
          </div>
        </div>
       </motion.div>
    </>
  );
};

export default MoreInformation;
