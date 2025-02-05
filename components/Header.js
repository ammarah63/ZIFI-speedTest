import Image from "next/image";
import Logo from "../public/assets/Group 7924.svg";
import { useEffect, useState } from "react";
import LogoComponent from "./LogoComponent";
import { useTextColor } from "@/ColorContext";

const Header = () => {
  const [location, setLocation] = useState(null);
  const [ipAddress, setIpAddress] = useState("");
  const { textColor } = useTextColor();

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
      <div
        style={{ color: textColor }}
        className="grid grid-cols-4 md:hidden pt-2"
      >
        <div></div>
        <div className="col-span-2">
          <div className="flex justify-center">
            <LogoComponent fill={textColor} />
          </div>
          <br />
          <p
            style={{ color: textColor }}
            className={`text-xs mt-3 tracking-[0.2em] text-center text-nowrap`}
          >
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
          <LogoComponent fill={textColor} />
        </div>

        <div className="md:col-span-2 flex justify-center items-center ">
          <p
            style={{ color: textColor }}
            className="text-sm tracking-[0.2em] text-center 3xl:text-xl 4xl:text-3xl"
          >
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
