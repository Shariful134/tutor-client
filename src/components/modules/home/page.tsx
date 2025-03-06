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
import { getAllTutors } from "@/services/User";
import Link from "next/link";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const HomeComponent = () => {
  const [tutors, setTutors] = useState<ITutor[] | []>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  console.log(tutors);
  console.log(error);
  console.log(loading);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        setLoading(true);
        const data = await getAllTutors();
        setTutors(data?.data);
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
      {/* =============================Banner section=========================== */}
      <div className="flex flex-col md:flex-row px-5 md:px-10 items-center">
        <div className="pt-5 text-center md:text-start">
          <h2 className="text-2xl md:text-3xl lg:text-5xl  ">
            Learn Better, <span className="text-pink-500">Achieve More!</span>
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
              className=" w-full max-w-6xl rounded-md border border-gray-400 px-5 py-1 text-sm md:text-sm lg:text-lg text-gray-700"
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
          <Image src={banner} width={1100} height={650} alt="BannerImg"></Image>
        </div>
      </div>
      <div>
        <div className=" flex justify-center items-center bg-gray-200 px-10">
          <Image src={bkash} width={100} height={110} alt="BannerImg"></Image>
          <Image src={nagad} width={100} height={110} alt="BannerImg"></Image>
          <Image src={rocket} width={100} height={110} alt="BannerImg"></Image>
        </div>
      </div>

      {/* <div
        className="
      flex justify-center mt-5 px-10"
      >
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/g6BtbIiJ_rc?si=Vfv21ayikJ_JSci6"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div> */}
      {/* =========================category section ========================= */}
      <div>
        <div className="px-10 mt-5 ">
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
          <Image src={groupd} width={1100} height={650} alt="BannerImg"></Image>
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
                  <Link href={"/#"}>
                    <Button className="roudend-ful hover:text-gray-900 border-0 bg-gray-300 text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ...">
                      Details
                    </Button>
                  </Link>
                  <Link href={"/#"}>
                    <Button className="roudend-ful hover:text-gray-900 border-0 bg-gray-300 text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ...">
                      Booking
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* =====================================student sayas section====================== */}
      <div className="mt-10 px-10 pt-10">
        <div>
          <h2 className="text-xl md:text-2xl lg:text-4xl  ">
            Our Student <span className="text-pink-500">Says</span>
          </h2>
        </div>
        <div>
          <Carousel>
            <CarouselContent>
              {Array.from({ length: 10 }).map((_, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square h-[100px] items-center justify-center p-6">
                        <span className="text-3xl font-semibold">
                          {index + 1}
                        </span>
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
                  tutor's cancellation policy. Make sure to check the terms
                  before booking.
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
