import Image from "next/image";
import Logo from "../public/assets/Group 6480.svg";
import Logo1 from "../public/assets/Group 5945.svg";
import Logo2 from "../public/assets/Group 4797.svg";

const Footer = () => {
  return (
    <>
      <div className="grid grid-cols-3 md:hidden">
        <div>
          <Image
            src={Logo1}
            width={100}
            height={100}
            className="w-10 h-8 mt-auto"
          />
        </div>
        <div className="flex justify-center">
          <Image
            src={Logo}
            width={100}
            height={100}
            className="w-14 md:w-24 h-8 mt-auto"
          />
        </div>
        <div className="flex justify-end">
          {" "}
          <Image
            src={Logo2}
            width={100}
            height={100}
            className="w-10 h-8 mt-auto"
          />
        </div>
      </div>
      <div className="hidden md:grid md:grid-cols-2">
        <div className="mt-auto">
          <Image
            src={Logo}
            width={100}
            height={100}
            className="w-24 3xl:w-36 3xl:h-12 4xl:w-44 4xl:h-14 h-8 mt-auto"
          />
        </div>
        <div className="flex ml-auto space-x-3 mt-auto">
          <Image
            src={Logo1}
            width={100}
            height={100}
            className="w-16 3xl:w-24 3xl:h-12 4xl:w-32 4xl:h-14 h-8 mt-auto"
          />
          <Image
            src={Logo2}
            width={100}
            height={100}
            className="w-14 3xl:w-20 3xl:h-12 4xl:w-28 4xl:h-14 h-8 mt-auto"
          />
        </div>
      </div>
    </>
  );
};

export default Footer;
