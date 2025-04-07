import photo from "../../../app/assest/images/ContactImg.png";
import Image from "next/image";
import Link from "next/link";
import { FaLocationDot } from "react-icons/fa6";
import { FaGreaterThan } from "react-icons/fa";

const ContactComponents = () => {
  return (
    <div className="pb-5">
      <div className="relative ">
        <Image
          src={photo}
          priority={true}
          width={1900}
          height={600}
          alt="BannerImg"
        ></Image>
        <div className="absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
          <h2 className=" text-xs md:text-xl lg:text-5xl">Contact</h2>
          <div className="flex items-center text-xs md:text-sm gap-1">
            <Link
              className="hover:underline hover:text-fuchsia-700 "
              href={"/"}
            >
              Home
            </Link>
            <FaGreaterThan className=" text-rose-500" />
            <Link
              className="hover:underline hover:text-fuchsia-700 "
              href={"/contact"}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-20 flex flex-col items-center justify-center">
        <h2 className="text-xl md:text-2xl lg:text-4xl text-center md:text-start max-w-[344px] font-semibold ">
          Get In Touch With Us
        </h2>
        <p className="text-sm md:text-sm lg:text-lg  mt-4  max-w-[644px] text-center">
          For More Information About Our Product & Services. Please Feel Free To
          Drop Us An Email. Our Staff Always Be There To Help You Out. Do Not
          Hesitate!
        </p>
      </div>
      <div className="mt-20 ">
        <div>
          <div className="flex gap-1 items-center">
            <FaLocationDot />

            <h2 className="text-xl text-center md:text-start font-semibold ">
              Address
            </h2>
          </div>
          <p className="text-sm md:text-sm lg:text-lg ps-5">
            236 5th SE Avenue, New York NY10000, United States
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactComponents;
