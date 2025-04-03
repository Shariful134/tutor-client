/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Image from "next/image";
import banner from "../../../app/assest/images/banner-2.png";
import bkash from "../../../app/assest/images/bkash1.png";
import nagad from "../../../app/assest/images/Nagad-Logo.wine.png";
import rocket from "../../../app/assest/images/rocket.png";
import groupd from "../../../app/assest/images/Groupe.jpg";

import computer from "../../../app/assest/images/computer.png";
import science from "../../../app/assest/images/physics2.jpeg";
import arts from "../../../app/assest/images/arts.png";
import math from "../../../app/assest/images/math.jpeg";
import english from "../../../app/assest/images/english'.jpeg";

import { Card, CardContent } from "@/components/ui/card";
import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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

import { Button } from "@/components/ui/button";

import { useEffect, useState } from "react";
import { getAllTutors, getAllUsers } from "@/services/User";
import Link from "next/link";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { getAllReviewComments } from "@/services/User/ReviewComment";
import { IReview } from "@/types/review";
import { useUser } from "@/context/UserContext";
import {
  getAllBooking,
  getAllBookings,
  requestBooking,
} from "@/services/request";
import { toast } from "sonner";
import { TBooking } from "@/types/bookings";
import { SkeletonLoading } from "@/components/ui/shared/SkeletonLoading";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const HomeComponent = () => {
  const [tutors, setTutors] = useState<ITutor[] | []>([]);
  const [isUser, setIsUser] = useState<ITutor[] | []>([]);
  const [reviews, setReviews] = useState<IReview[] | []>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [requestedTutors, setRequestedTutors] = useState<string[]>([]);
  const [acceptedTutors, setAccetedTutors] = useState<string[]>([]);

  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedPrice, setSelectedPrice] = useState<string>("");
  const [filteredSubjects, setFilteredSubjects] = useState<string[]>([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        setLoading(true);

        const usersData = await getAllUsers();

        const loggedUser = usersData?.data?.filter(
          (item: ITutor) => item.email === user?.userEmail
        );

        setIsUser(loggedUser);
        console.log("loggedUser: ", loggedUser, isUser);

        const allTutor = usersData?.data?.filter(
          (item: ITutor) => item.role === "tutor"
        );
        setTutors(allTutor);

        if (user) {
          const bookingsData = await getAllBooking();

          const tutorIdList = bookingsData?.data
            ?.filter((item: any) => item.student?._id === loggedUser[0]?._id)
            .map((item: any) => item.tutor);
          setRequestedTutors(tutorIdList);

          // filter out the checking accepted request
          const acceptedTutorId = bookingsData?.data
            ?.filter((item: any) => item.bookingRequest === true)
            .map((item: any) => item.tutor);
          setAccetedTutors(acceptedTutorId);
          setLoading(false);
        }

        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchTutors();
  }, [user]);

  useEffect(() => {
    const allSubjects = [...new Set(tutors.flatMap((tutor) => tutor.subjects))];

    setFilteredSubjects(allSubjects);
  }, [tutors]);

  const filteredTutors = tutors
    .filter((tutor) => {
      const searchQuery = searchValue.trim().toLowerCase();

      const categoryMatch =
        !selectedCategory ||
        selectedCategory === "All" ||
        tutor.category === selectedCategory;

      const subjectMatch =
        !selectedSubject ||
        selectedSubject === "All" ||
        tutor.subjects.includes(selectedSubject);

      const priceMatch =
        !selectedPrice ||
        selectedPrice === "All" ||
        (() => {
          const [min, max] = selectedPrice.split("-").map(Number);
          return tutor.hourlyRate >= min && tutor.hourlyRate <= max;
        })();

      const searchMatch =
        !searchQuery ||
        tutor.name.toLowerCase().includes(searchQuery) ||
        tutor.category.toLowerCase().includes(searchQuery) ||
        tutor.subjects.some((subject) =>
          subject.toLowerCase().includes(searchQuery)
        ) ||
        (!isNaN(Number(searchQuery)) &&
          tutor.hourlyRate <= Number(searchQuery));

      return categoryMatch && subjectMatch && priceMatch && searchMatch;
    })
    .slice(0, 8);

  //handle Booking Request
  const handleRequest = async (id: string) => {
    const requestData = {
      student: isUser[0]?._id,
      tutor: id,
    };

    try {
      const res = await requestBooking(requestData);

      if (res.success) {
        toast.success(res.message);
        setRequestedTutors((prev) => [...(prev || []), id]);
      } else {
        toast.success(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="pt-20 flex justify-center">
        <SkeletonLoading />
      </div>
    );
  }

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);

    const filteredTutors = tutors.filter((tutor) => tutor.category === value);
    const subjectsInCategory = [
      ...new Set(filteredTutors.flatMap((tutor) => tutor.subjects)),
    ];

    setFilteredSubjects(["All", ...subjectsInCategory]);
  };

  const handleSubjectChange = (value: string) => {
    setSelectedSubject(value);
  };

  const handlePriceChange = (value: string) => {
    setSelectedPrice(value);
  };
  console.log("value:", tutors);
  return (
    <div>
      {/* =============================Banner section=========================== */}
      <div className="flex flex-col md:flex-row px-5 md:px-10 items-center pt-20">
        <div className="pt-5 text-center md:text-start">
          <h2 className="text-2xl md:text-3xl lg:text-5xl  ">
            Learn Better, <span className="text-pink-500">AcademyNest !</span>
          </h2>
          <p className="text-sm md:text-sm lg:text-lg text-gray-700 mt-4">
            Looking for the best tutors? TutorLink 🎓 connects students with
            expert tutors for personalized learning. Find tutors by subject,
            grade, or expertise and book sessions effortlessly. Learn smarter,
            achieve more!
          </p>

          <div className="max-w-md  flex-grow my-2 mx-auto md:mx-0">
            <input
              type="text"
              placeholder="Search for tutors"
              className=" w-full max-w-6xl rounded-md border border-gray-400 px-5  text-sm md:text-sm lg:text-lg text-gray-700"
            />
          </div>
          <Button
            variant="outline"
            className="roudend-full border-0 bg-gray-300 text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ..."
          >
            Explore Tutors
          </Button>
        </div>
        <div className="flex justify-center">
          <Image
            src={banner}
            priority={true}
            width={1100}
            height={650}
            alt="BannerImg"
          ></Image>
        </div>
      </div>
      <div>
        <div className=" flex justify-center items-center bg-gray-200 px-10">
          <Image
            src={bkash}
            priority={true}
            width={100}
            height={110}
            alt="BannerImg"
          ></Image>
          <Image
            src={nagad}
            priority={true}
            width={100}
            height={110}
            alt="BannerImg"
          ></Image>
          <Image
            src={rocket}
            priority={true}
            width={100}
            height={110}
            alt="BannerImg"
          ></Image>
        </div>
      </div>

      {/* =========================category section ========================= */}
      <div>
        <div className="px-10 mt-5  ">
          <h2 className="text-xl md:text-2xl lg:text-4xl text-center md:text-start  mb-5 ">
            Course <span className="text-pink-500">Categories ____</span>
          </h2>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-y-3 mb-5 items-center gap-2 mt-2">
              <Card className="w-[95%] border border-gray-200 hover:shadow-lg">
                <Link href={"/computer"}>
                  <CardContent className="flex flex-col items-center">
                    <Image
                      className=""
                      priority={true}
                      src={computer}
                      width={100}
                      height={100}
                      alt="BannerImg"
                    ></Image>
                    <p className="text-sm md:text-sm lg:text-lg  ">Computer</p>
                    <p className="text-sm md:text-sm lg:text-lg text-gray-700 ">
                      PostGraduate
                    </p>
                    <div className="flex gap-1">
                      <FaStar className="text-yellow-500" />
                      <FaStar className="text-yellow-500" />
                      <FaStarHalfAlt className="text-yellow-500" />
                      <FaRegStar className="text-yellow-500" />
                    </div>
                  </CardContent>
                </Link>
              </Card>
              <Card className="w-[95%] border-gray-200 hover:shadow-2xl">
                <Link href={"#"}>
                  <CardContent className="flex flex-col items-center">
                    <Image
                      className=""
                      src={english}
                      priority={true}
                      width={100}
                      height={100}
                      alt="BannerImg"
                    ></Image>
                    <p className="text-sm md:text-sm lg:text-lg  ">Computer</p>
                    <p className="text-sm md:text-sm lg:text-lg text-gray-700 ">
                      High School
                    </p>
                    <div className="flex gap-1">
                      <FaStar className="text-yellow-500" />
                      <FaStar className="text-yellow-500" />
                      <FaStarHalfAlt className="text-yellow-500" />
                      <FaRegStar className="text-yellow-500" />
                    </div>
                  </CardContent>
                </Link>
              </Card>
              <Card className="w-[95%] border-gray-200 hover:shadow-2xl">
                <Link href={"#"}>
                  <CardContent className="flex flex-col items-center">
                    <Image
                      className=""
                      src={math}
                      priority={true}
                      width={100}
                      height={100}
                      alt="BannerImg"
                    ></Image>
                    <p className="text-sm md:text-sm lg:text-lg  ">Computer</p>
                    <p className="text-sm md:text-sm lg:text-lg text-gray-700 ">
                      UnderGraduate
                    </p>
                    <div className="flex gap-1">
                      <FaStar className="text-yellow-500" />
                      <FaStar className="text-yellow-500" />
                      <FaStarHalfAlt className="text-yellow-500" />
                      <FaRegStar className="text-yellow-500" />
                    </div>
                  </CardContent>
                </Link>
              </Card>
              <Card className="w-[95%] border-gray-200 hover:shadow-2xl">
                <Link href={"#"}>
                  <CardContent className="flex flex-col items-center">
                    <Image
                      className=""
                      src={arts}
                      priority={true}
                      width={100}
                      height={100}
                      alt="BannerImg"
                    ></Image>
                    <p className="text-sm md:text-sm lg:text-lg  ">Computer</p>
                    <p className="text-sm md:text-sm lg:text-lg text-gray-700 ">
                      UnderGraduate
                    </p>
                    <div className="flex gap-1">
                      <FaStar className="text-yellow-500" />
                      <FaStar className="text-yellow-500" />
                      <FaStarHalfAlt className="text-yellow-500" />
                      <FaRegStar className="text-yellow-500" />
                    </div>
                  </CardContent>
                </Link>
              </Card>
              <Card className="w-[95%] border-gray-200 hover:shadow-2xl">
                <Link href={"#"}>
                  <CardContent className="flex flex-col items-center">
                    <Image
                      className=""
                      src={science}
                      priority={true}
                      width={100}
                      height={100}
                      alt="BannerImg"
                    ></Image>
                    <p className="text-sm md:text-sm lg:text-lg  ">Computer</p>
                    <p className="text-sm md:text-sm lg:text-lg text-gray-700 ">
                      PostGraduate
                    </p>
                    <div className="flex gap-1">
                      <FaStar className="text-yellow-500" />
                      <FaStar className="text-yellow-500" />
                      <FaStarHalfAlt className="text-yellow-500" />
                      <FaRegStar className="text-yellow-500" />
                    </div>
                  </CardContent>
                </Link>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* =============================benifit section======================== */}
      <div className="flex flex-col-reverse md:flex-row px-5 md:px-10 items-center gap-5 mt-10 pt-10">
        <div className="flex justify-center">
          <Image
            src={groupd}
            width={1100}
            priority={true}
            height={650}
            alt="BannerImg"
          ></Image>
        </div>
        <div className="pt-5 text-start">
          <h2 className="text-xl md:text-2xl lg:text-4xl  ">
            Benifits of <span className="text-pink-500">e_Learn Tutorlink</span>
          </h2>
          <p className="text-sm md:text-sm lg:text-lg text-gray-700 mt-4">
            Looking for the best tutors? TutorLink 🎓 connects students with
            expert tutors for personalized learning. Find tutors by subject,
            grade, or expertise and book sessions effortlessly. Learn smarter,
            achieve more!
          </p>
          <ul className="list-disc pl-5 text-start text-sm md:text-sm lg:text-lg text-gray-700 mt-4">
            <li>Find expert tutors by subject, grade, and expertise.</li>
            <li>Personalized learning experience tailored to your needs.</li>
            <li>Book sessions at your convenience.</li>
            <li>Access a variety of subjects and grades for learning.</li>
            <li>Affordable and reliable education from experienced tutors.</li>
          </ul>

          <Button
            variant="outline"
            className="roudend-full border-0 bg-gray-300 text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ..."
          >
            Start Learning
          </Button>
        </div>
      </div>

      {/* ====================tutors section========================== */}
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
          <div className="py-5 flex flex-wrap gap-2">
            <input
              type="text"
              onChange={(e) => setSearchValue(e.currentTarget.value)}
              placeholder="Search for tutors"
              className=" w-full max-w-[30%] rounded-md border border-gray-400 px-5  text-sm md:text-sm lg:text-lg text-gray-700"
            />
            <Select onValueChange={handleCategoryChange}>
              <SelectTrigger className="max-w-[30%] rounded-md border border-gray-400 ">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent className="bg-white rounded-md border border-gray-400">
                <SelectGroup>
                  <SelectItem value="All">All</SelectItem>
                  {[...new Set(tutors?.map((tutor) => tutor.category))].map(
                    (category, index) => (
                      <SelectItem key={index} value={category}>
                        {category}
                      </SelectItem>
                    )
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>

            {selectedCategory === "All" ? (
              <Select onValueChange={handleSubjectChange}>
                <SelectTrigger className="max-w-[30%] rounded-md border border-gray-400 ">
                  <SelectValue placeholder="Select Subjects" />
                </SelectTrigger>
                <SelectContent className="bg-white rounded-md border border-gray-400">
                  <SelectGroup>
                    <SelectItem value="All">All</SelectItem>
                    {[
                      ...new Set(tutors.flatMap((tutor) => tutor.subjects)),
                    ].map((subject, index) => (
                      <SelectItem key={index} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            ) : (
              <Select onValueChange={handleSubjectChange}>
                <SelectTrigger className="max-w-[30%] rounded-md border border-gray-400 ">
                  <SelectValue placeholder="Select Subjects" />
                </SelectTrigger>
                <SelectContent className="bg-white rounded-md border border-gray-400">
                  <SelectGroup>
                    <SelectItem value="All">All</SelectItem>
                    {filteredSubjects.map(
                      (subject, index) =>
                        subject !== "All" && (
                          <SelectItem key={index} value={subject}>
                            {subject}
                          </SelectItem>
                        )
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}

            <Select onValueChange={handlePriceChange}>
              <SelectTrigger className="max-w-[30%] rounded-md border border-gray-400 ">
                <SelectValue placeholder="Select Price" />
              </SelectTrigger>
              <SelectContent className="bg-white rounded-md border border-gray-400">
                <SelectGroup>
                  <SelectLabel>HourlyRate</SelectLabel>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="1-3">1-3</SelectItem>
                  <SelectItem value="4-6">4-6</SelectItem>
                  <SelectItem value="7-9">7-9</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-y-3">
          {filteredTutors?.map((tutor, index) => (
            <div
              key={tutor._id || index}
              className="card bg-base-100 w-[95%] group border border-gray-200 hover:shadow-lg"
            >
              <figure className="relative ">
                <Image
                  src={tutor?.profileImage}
                  priority={true}
                  width={1100}
                  height={650}
                  alt="BannerImg"
                ></Image>
                <Link
                  className="roudend-ful w-full absolute text-center py-1 top-1/2 left-0 -translate-y-1/2 opacity-0 group-hover:opacity-100 cursor-pointer hover:text-gray-900 border-0 bg-gray-300 text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                  href={`/tutors/${tutor._id}`}
                >
                  Details
                </Link>
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
                <div className=" flex flex-wrap gap-y-2 justify-between  items-center">
                  {user?.role === "student" && (
                    <div>
                      {acceptedTutors?.includes(tutor?._id) ? (
                        <Button className="roudend-ful cursor-pointer hover:text-gray-900 border-0 bg-gray-300 text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ...">
                          Accpted
                        </Button>
                      ) : requestedTutors?.includes(tutor?._id) ? (
                        <Button className="roudend-ful cursor-pointer hover:text-gray-900 border-0 bg-gray-300 text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ...">
                          Request
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleRequest(tutor?._id)}
                          className="roudend-ful cursor-pointer hover:text-gray-900 border-0 bg-gray-300 text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ..."
                        >
                          Add
                        </Button>
                      )}
                    </div>
                  )}

                  <Link href={`/booking/${tutor._id}`}>
                    <Button className="roudend-ful  cursor-pointer hover:text-gray-900 border-0 bg-gray-300 text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ...">
                      Booking
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mx-auto text-center mt-5">
          <Link href={"/tutors"}>
            <Button className="roudend-full cursor-pointer hover:text-gray-900 border-0 bg-gray-300 text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ...">
              View All
            </Button>
          </Link>
        </div>
      </div>
      {/* =====================================student sayas section====================== */}
      <div className="mt-10 px-10 pt-10">
        <div>
          <h2 className="text-xl md:text-2xl lg:text-4xl mb-5">
            Our Student <span className="text-pink-500">Says</span>
          </h2>
        </div>
        <div>
          <Carousel>
            <CarouselContent>
              {reviews?.map((review) => (
                <CarouselItem
                  key={review._id}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <div className="p-1">
                    <Card className="border-gray-300">
                      <CardContent className="flex flex-col items-center justify-center p-4">
                        <Image
                          className="rounded-full"
                          src={review.student.profileImage}
                          width={100}
                          height={200}
                          alt={`${review.student.name}'s profile`}
                        />
                        <h3 className="text-lg font-semibold">
                          {review.student.name}
                        </h3>
                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                          {review.comment}
                        </p>

                        <div className="flex gap-1 text-sm md:text-sm lg:text-lg text-gray-700">
                          <FaStar className="text-yellow-500" />
                          <FaStar className="text-yellow-500" />
                          <FaStarHalfAlt className="text-yellow-500" />
                          <FaRegStar className="text-yellow-500" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="ms-15" />
            <CarouselNext className="me-15" />
          </Carousel>
        </div>
      </div>
      {/* =========================ask qs ====================== */}
      <div className="px-10 mt-10 pt-10">
        <div className="flex gap-5">
          <div>
            <h2 className="text-xl md:text-2xl lg:text-4xl  ">
              Frequently Asked <span className="text-pink-500">Questions</span>
            </h2>
            <p className="text-sm md:text-sm lg:text-lg text-gray-700 mt-4 max-w-3xl pb-5">
              Here are some of the most common questions students and tutors ask
              about our platform. If you have more queries, feel free to contact
              us.
            </p>
          </div>
          <div>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-sm md:text-sm lg:text-lg text-gray-700 mt-4 max-w-3xl pb-5">
                  How can I find the right tutor for the right tutor find the
                  right tutor my needs?
                </AccordionTrigger>
                <AccordionContent className="text-sm md:text-sm lg:text-lg text-gray-700 mt-4 max-w-3xl pb-5">
                  Once you find a tutor, you can check their availability and
                  book a session at a convenient time. Payment is processed
                  securely through our platform.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-sm md:text-sm lg:text-lg text-gray-700 mt-4 max-w-3xl pb-5">
                  What subjects can I get tutoring for on the platform?
                </AccordionTrigger>
                <AccordionContent className="text-sm md:text-sm lg:text-lg text-gray-700 mt-4 max-w-3xl pb-5">
                  Yes, you can reschedule or cancel a session according to the
                  cancellation policy. Make sure to check the terms before
                  booking.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-sm md:text-sm lg:text-lg text-gray-700 mt-4 max-w-3xl pb-5">
                  Is it possible to reschedule or cancel my sessions?
                </AccordionTrigger>
                <AccordionContent className="text-sm md:text-sm lg:text-lg text-gray-700 mt-4 max-w-3xl pb-5">
                  You can browse tutors by subject, grade level, or expertise.
                  Use the search bar or explore categories to find the right
                  tutor for you.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-sm md:text-sm lg:text-lg text-gray-700 mt-4 max-w-3xl pb-5">
                  How can I find the right tutor for the right tutor find the
                  right tutor my needs?
                </AccordionTrigger>
                <AccordionContent className="text-sm md:text-sm lg:text-lg text-gray-700 mt-4 max-w-3xl pb-5">
                  Once you find a tutor, you can check their availability and
                  book a session at a convenient time. Payment is processed
                  securely through our platform.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-sm md:text-sm lg:text-lg text-gray-700 mt-4 max-w-3xl pb-5">
                  How can I find the right tutor for the right tutor find the
                  right tutor my needs?
                </AccordionTrigger>
                <AccordionContent className="text-sm md:text-sm lg:text-lg text-gray-700 mt-4 max-w-3xl pb-5">
                  Once you find a tutor, you can check their availability and
                  book a session at a convenient time. Payment is processed
                  securely through our platform.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
