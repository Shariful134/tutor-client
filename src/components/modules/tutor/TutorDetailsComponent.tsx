import { getSingleTutors } from "@/services/User";
import Image from "next/image";

import React from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const TutorDetailsComponent = async ({ id }: { id: string }) => {
  console.log(id);
  const tutor = await getSingleTutors(id);
  const tutorData = tutor?.data;

  console.log(tutorData);
  return (
    <div className="pt-20 px-10 ">
      <div className=" p-5 card bg-base-100 mx-auto min-w-[70%] max-w-xl h-full flex flex-col md:flex-row justify-center items-center shadow-xl">
        <div className="flex flex-col justify-center items-center">
          <Image
            src={tutorData?.profileImage}
            width={200}
            height={200}
            alt={tutorData?.name}
            className="rounded-md"
          ></Image>
          <span className="text-sm">{tutorData?.email}</span>
          <div className="flex gap-1 text-sm md:text-sm lg:text-lg justify-center text-gray-700">
            <FaStar className="text-yellow-500" />
            <FaStar className="text-yellow-500" />
            <FaStarHalfAlt className="text-yellow-500" />
            <FaRegStar className="text-yellow-500" />
          </div>
        </div>
        <div className="card-body">
          <div className="flex justify-center items-center">
            <h2 className="card-title text-xl ">{tutorData?.name} </h2>
            <p className=" text-sm md:text-sm  text-gray-700 ">
              ( {tutorData?.gradeLevel})
            </p>
          </div>
          <p className=" text-sm md:text-sm font-semibold lg:text-lg text-gray-700 ">
            {tutorData?.category}
          </p>
          <p className=" text-sm md:text-sm lg:text-lg text-gray-700 ">
            <span className="text-gray-900">Subject: </span>{" "}
            {tutorData?.subjects?.join(", ")}
          </p>
          <p className=" text-sm md:text-sm lg:text-lg text-gray-700 ">
            <span className="text-gray-900">HourlyRatelity:</span>{" "}
            {tutorData?.hourlyRate} $
          </p>

          <p className=" text-sm md:text-sm lg:text-lg text-gray-700 ">
            Phone: {tutorData?.phoneNumber}
          </p>

          <p className=" text-sm md:text-sm lg:text-lg text-gray-700 ">
            <span className="text-gray-900"> </span>{" "}
            {tutorData?.availability
              ?.map(
                (avail: { day: string; time: string }) =>
                  `${avail.day}: ${avail.time}`
              )
              .join(", ")}
          </p>
          <p className=" text-sm md:text-sm lg:text-lg text-gray-700 ">
            <span className="text-gray-900">Details: {tutorData?.bio}</span>{" "}
          </p>
          {/* <div className="card-actions justify-between items-center">
                  <p>
                    <span className="text-sm md:text-sm lg:text-lg text-gray-700">
                      ${tutor.hourlyRate}
                    </span>{" "}
                    hr
                  </p>
                  <div className="flex gap-1 text-sm md:text-sm lg:text-lg text-gray-700">
                    <FaStar className="text-yellow-500" />
                    <FaStar className="text-yellow-500" />
                    <FaStarHalfAlt className="text-yellow-500" />
                    <FaRegStar className="text-yellow-500" />
                  </div>
                </div> */}
          {/* <div className="card-actions justify-between items-center">
            <Link href={`/tutors/${tutor._id}`}>
              <Button className="roudend-ful cursor-pointer hover:text-gray-900 border-0 bg-gray-300 text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ...">
                Home
              </Button>
            </Link>
            <Link href={"/#"}>
              <Button className="roudend-ful cursor-pointer hover:text-gray-900 border-0 bg-gray-300 text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ...">
                Booking
              </Button>
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default TutorDetailsComponent;
