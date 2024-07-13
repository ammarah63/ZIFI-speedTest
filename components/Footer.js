import { useTextColor } from "@/ColorContext";
import ImageComponent from "./ImageComponent";
import Logo1Component from "./Logo1Component";
import Logo2Component from "./Logo2Component";

const Footer = () => {
  const { textColor } = useTextColor();
  return (
    <>
      <div className="grid grid-cols-3 md:hidden">
        <div>
          <Logo1Component fill={textColor} />
         
        </div>
        <div className="flex justify-center">
          <ImageComponent fill={textColor} />
        
        </div>
        <div className="flex justify-end">
          {" "}
          <Logo2Component fill={textColor} />
        
        </div>
      </div>
      <div className="hidden md:grid md:grid-cols-2">
        <div className="mt-auto">
          <ImageComponent fill={textColor} />
       
        </div>
        <div className="flex ml-auto space-x-3 mt-auto">
          <Logo1Component  fill={textColor} />
        
          <Logo2Component  fill={textColor} />
         
        </div>
      </div>
    </>
  );
};

export default Footer;
