"use client";
import { Button } from "@/components/ui/button";
import { getAllTutors } from "@/services/User";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

export interface Availability {
  day: string;
  time: string;
}

export interface ITutor {
  _id: string;
  name: string;
  email: string;
  bio: string;
  category: string;
  gradeLevel: string;
  hourlyRate: number;
  phoneNumber: string;
  profileImage: string;
  role: "tutor" | "student" | "admin";
  subjects: string[];
  ratings: number[];
  availability: Availability[];
  createdAt: string;
  updatedAt: string;
}
const AllTutorComponents = () => {
  const [tutors, setTutors] = useState<ITutor[] | []>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  console.log(error);
  console.log(loading);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        setLoading(true);
        const tutorData = await getAllTutors();
        setTutors(tutorData?.data);

        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchTutors();
  }, []);
  return (
    <div>
      <div className="px-10 mt-10 pt-10">
        <div>
          {" "}
          <h2 className="text-xl md:text-2xl lg:text-4xl  ">
            Tutors of <span className="text-pink-500">e_Learn Tutorlink</span>
          </h2>
          <p className="text-sm md:text-sm lg:text-lg text-gray-700 mt-4 max-w-3xl pb-5">
            Looking for the best tutors? TutorLink 🎓 connects students with
            expert tutors for personalized learning. Find tutors by subject,
            grade, or expertise and book sessions effortlessly. Learn smarter,
            achieve more!
          </p>
        </div>
        <div className="max-w-md  flex-grow my-2 mx-auto md:mx-0">
          <input
            type="text"
            placeholder="Search for tutors"
            className=" w-full max-w-6xl rounded-md border border-gray-400 px-5 py-1 text-sm md:text-sm lg:text-lg text-gray-700"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-y-3">
          {tutors?.map((tutor) => (
            <div
              key={tutor._id}
              className="card bg-base-100 w-[95%]  border border-gray-200 hover:shadow-lg"
            >
              <figure>
                <Image
                  src={tutor.profileImage}
                  width={1100}
                  height={650}
                  alt="BannerImg"
                ></Image>
              </figure>
              <div className="card-body">
                <h2 className="card-title text-xl">{tutor.name}</h2>
                <p className=" text-sm md:text-sm lg:text-lg text-gray-700 ">
                  {tutor.category}
                </p>
                <p className=" text-sm md:text-sm lg:text-lg text-gray-700 line-clamp-2">
                  {tutor.gradeLevel}
                </p>
                <div className="card-actions justify-between items-center">
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
                </div>
                <div className="card-actions justify-between items-center">
                  <Link href={`/tutors/${tutor._id}`}>
                    <Button className="roudend-ful cursor-pointer hover:text-gray-900 border-0 bg-gray-300 text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ...">
                      Details
                    </Button>
                  </Link>
                  <Link href={`/booking/${tutor._id}`}>
                    <Button className="roudend-ful cursor-pointer hover:text-gray-900 border-0 bg-gray-300 text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ...">
                      Booking
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllTutorComponents;
