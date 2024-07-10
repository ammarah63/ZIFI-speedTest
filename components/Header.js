import Image from "next/image";
import Logo from "../public/assets/Group 7924.svg";
import { useEffect, useState } from "react";

const Header = () => {
  const [location, setLocation] = useState(null);
  const [ipAddress, setIpAddress] = useState("");
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
  }, [ipAddress]);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const res = await fetch(`http://ip-api.com/json/${ipAddress}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }

        const { city, country, countryCode } = data;

        setLocation({
          city: city || null,
          country: country || null,
          countryCode: countryCode || null,
        });
      } catch (error) {
        console.error("Error fetching IP data:", error);
        setLocation(null);
      }
    };

    fetchLocation();
  }, []);
  return (
    <>
      <div className="grid grid-cols-4 md:hidden pt-2">
        <div></div>
        <div className="col-span-2">
          <div className="flex justify-center">
            <Image
              src={Logo}
              width={100}
              height={100}
              className="w-9 h-6 md:h-9 "
            />
          </div>
          <br />
          <p className="text-xs mt-3 tracking-[0.2em] text-center text-nowrap">
            YOUR INTERNET SPEED
          </p>
        </div>
        <div>
          {location && (
            <>
              <Image
                src={`https://flagcdn.com/${location.countryCode.toLowerCase()}.svg`}
                width={100}
                height={100}
                alt={"Flag"}
                className="ml-auto rounded-lg w-6 h-6 object-cover"
              />
            </>
          )}
        </div>
      </div>
      <div className="hidden md:grid md:grid-cols-4 pt-5 3xl:pt-8 4xl:pt-12">
        <div>
          <Image
            src={Logo}
            width={100}
            height={100}
            className="w-16 h-9 3xl:w-24 3xl:h-14 4xl:w-36 4xl:h-16"
          />
        </div>

        <div className="md:col-span-2 flex justify-center items-center ">
          <p className="text-sm tracking-[0.2em] text-center 3xl:text-xl 4xl:text-3xl">
            YOUR INTERNET SPEED
          </p>
        </div>
        <div>
          {location && (
            <>
              <Image
                src={`https://flagcdn.com/${location.countryCode.toLowerCase()}.svg`}
                width={100}
                height={100}
                alt={"Flag"}
                className="ml-auto rounded-lg w-8 h-8 md:w-10 md:h-10 3xl:w-12 3xl:h-12 4xl:w-16 4xl:h-16 object-cover"
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
