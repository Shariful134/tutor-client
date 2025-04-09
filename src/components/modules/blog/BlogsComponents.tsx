"use client";
import Image from "next/image";
import photo from "../../../app/assest/images/ContactImg.png";
import Link from "next/link";
import { FaGreaterThan } from "react-icons/fa";
import { useEffect, useState } from "react";
import { NewsArticle } from "@/types/blogs";
import { RiAdminFill } from "react-icons/ri";
import { Input } from "@/components/ui/input";
const BlogsComponents = () => {
  const [education, setEducation] = useState<NewsArticle[] | []>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://gnews.io/api/v4/search?q=education&lang=en&token=33b6dfeb530be2d1acbede3ad6af7965`
      );
      const result = await response.json();
      setEducation(result?.articles);
    };
    fetchData();
  }, []);

  console.log(education);
  return (
    <div>
      <div className="relative">
        <Image
          src={photo}
          priority={true}
          width={1900}
          height={600}
          alt="BannerImg"
        ></Image>
        <div className="absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
          <h2 className=" text-xs md:text-xl lg:text-5xl">NewsLatter</h2>
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
              href={"/blog"}
            >
              Blog
            </Link>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12">
        <div className="col-span-8">
          {education?.map((article: NewsArticle, index) => (
            <div key={index}>
              <Image
                src={article?.image}
                width={1100}
                height={100}
                priority={true}
                alt="blogImage"
              ></Image>
              <RiAdminFill />
            </div>
          ))}
        </div>
        <div className="col-span-4 max-w-lg">
          <Input placeholder="Search haere" className="max-w-lg"></Input>
          <div>
            <h2 className="text-2xl pt-5">Categories</h2>
            <div className="flex justify-between pt-5">
              <p className="text-sm md:text-sm lg:text-lg text-gray-700 ">
                Educational
              </p>{" "}
              <p>{education?.length}</p>
            </div>
            <div className="flex justify-between pt-3">
              <p className="text-sm md:text-sm lg:text-lg text-gray-700 ">
                Industrial
              </p>{" "}
              <p>2</p>
            </div>
            <div className="flex justify-between pt-3">
              <p className="text-sm md:text-sm lg:text-lg text-gray-700 ">
                Handmade
              </p>{" "}
              <p>2</p>
            </div>
            <div className="flex justify-between pt-3">
              <p className="text-sm md:text-sm lg:text-lg text-gray-700 ">
                Interior
              </p>{" "}
              <p>2</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogsComponents;
