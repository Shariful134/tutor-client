"use client";
import Image from "next/image";
import photo from "../../../app/assest/images/ContactImg.png";
import Link from "next/link";
import { FaGreaterThan, FaTag } from "react-icons/fa";
import { useEffect, useState } from "react";
import { NewsArticle } from "@/types/blogs";
import { RiAdminFill } from "react-icons/ri";
import { Input } from "@/components/ui/input";
import { MdDateRange } from "react-icons/md";
import { SkeletonLoading } from "@/components/ui/shared/SkeletonLoading";
import { useUser } from "@/context/UserContext";

const BlogsComponents = () => {
  const [education, setEducation] = useState<NewsArticle[] | []>([]);
  const [industrial, setIndustrial] = useState<NewsArticle[] | []>([]);
  const [educationData, setEducationData] = useState(false);
  const [industrialData, setIndustrialData] = useState(false);
  // const [blogs, setBlogs] = useState<string>("");
  const { setIsLoading, isLoading } = useUser();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=education%20tips&language=en&sortBy=publishedAt&apiKey=
d09cf0c70d334857803d42a640b4e7bb
`
        );
        const industrialRresponse = await fetch(
          `https://newsapi.org/v2/everything?q=industry&language=en&sortBy=publishedAt&apiKey=
d09cf0c70d334857803d42a640b4e7bb
`
        );

        const industrialResult = await industrialRresponse.json();
        const educationResult = await response.json();
        setIndustrial(industrialResult?.articles || []);
        setEducation(educationResult?.articles || []);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const curretntdate = new Date().toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  // educational data
  const contentword = education?.map((item: NewsArticle) =>
    item.content.split("").slice(0, 2)
  );
  const contentwords = industrial?.map((item: NewsArticle) =>
    item.content.split("").slice(0, 100)
  );
  // industrial data
  const contentwordIndustrial = education?.map((item: NewsArticle) =>
    item.content.split("").slice(0, 2)
  );
  const contentwordsIndustrial = industrial?.map((item: NewsArticle) =>
    item.content.split("").slice(0, 100)
  );

  if (isLoading)
    return (
      <div className="pt-20 flex justify-center">
        <SkeletonLoading />
      </div>
    );
  console.log(education);
  return (
    <div className="pb-5 px-10">
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
      <div className="flex flex-col md:flex-row gap-15 sm:justify-center">
        <div className="max-w-[70%] order-2 md:order-1">
          {education?.slice(0, 1)?.map((article: NewsArticle, index) => (
            <div key={index} className="mt-5">
              <Image
                src={article?.urlToImage}
                width={1900}
                height={1300}
                priority={true}
                alt="blogImage"
                className="rounded-lg"
              ></Image>
              <div className="flex  items-center gap-5 pt-1 pb-2">
                <div className="flex justify-center items-center  text-xs sm:text-sm md:text-sm lg:text-lg text-gray-700 ">
                  {" "}
                  <RiAdminFill />
                  Admin
                </div>
                <div className="flex justify-center items-center  text-xs sm:text-sm md:text-sm lg:text-lg text-gray-700 ">
                  {" "}
                  <MdDateRange />
                  {curretntdate}
                </div>
                <div className=" sm:flex hidden  justify-center items-center text-xs sm:text-sm md:text-sm lg:text-lg text-gray-700 ">
                  {" "}
                  <FaTag />
                  HandeMade
                </div>
              </div>
              <h2 className="text-2xl font-semibold text-gray-700 ">
                <Link
                  className="hover:underline hover:text-purple-500"
                  href={"https://typeforyou.org/vanguard-529/"}
                >
                  {article?.title}
                </Link>
              </h2>
              {educationData ? (
                <p className="text-sm md:text-sm lg:text-lg text-gray-700 ">
                  {contentwords}{" "}
                  <button
                    onClick={() => setEducationData(false)}
                    className="text-purple-500 hover:underline"
                  >
                    Read Less...
                  </button>
                </p>
              ) : (
                <p className="text-sm md:text-sm lg:text-lg text-gray-700">
                  {contentword}{" "}
                  <button
                    onClick={() => setEducationData(true)}
                    className="text-purple-500 hover:underline"
                  >
                    Read More...
                  </button>
                </p>
              )}
            </div>
          ))}
          {industrial?.slice(3)?.map((article: NewsArticle, index) => (
            <div key={index}>
              <Image
                src={article?.urlToImage}
                width={1900}
                height={1300}
                priority={true}
                alt="blogImage"
                className="rounded-lg"
              ></Image>
              <div className="flex  items-center gap-5 pt-1 pb-2">
                <div className="flex justify-center items-center  text-xs sm:text-sm md:text-sm lg:text-lg text-gray-700 ">
                  {" "}
                  <RiAdminFill />
                  Admin
                </div>
                <div className="flex justify-center items-center  text-xs sm:text-sm md:text-sm lg:text-lg text-gray-700 ">
                  {" "}
                  <MdDateRange />
                  {curretntdate}
                </div>
                <div className=" sm:flex hidden  justify-center items-center text-xs sm:text-sm md:text-sm lg:text-lg text-gray-700 ">
                  {" "}
                  <FaTag />
                  HandeMade
                </div>
              </div>
              <h2 className="text-2xl font-semibold text-gray-700">
                <Link
                  className="hover:underline hover:text-purple-500"
                  href={"https://screenrant.com/the-studio-episode-4-review/"}
                >
                  {article?.title}
                </Link>
              </h2>
              {industrialData ? (
                <p className="text-sm md:text-sm lg:text-lg text-gray-700">
                  {contentwordsIndustrial}{" "}
                  <button
                    onClick={() => setIndustrialData(false)}
                    className="text-purple-500 hover:underline"
                  >
                    Read Less...
                  </button>
                </p>
              ) : (
                <p className="text-sm md:text-sm lg:text-lg text-gray-700">
                  {contentwordIndustrial}{" "}
                  <button
                    onClick={() => setIndustrialData(true)}
                    className="text-purple-500 hover:underline"
                  >
                    Read More...
                  </button>
                </p>
              )}
            </div>
          ))}
        </div>

        {/* ==================search and rescently posted========================  */}
        <div className=" max-w-[30%] mt-5 order-1 md:order-2">
          <Input
            // onChange={(e) => setBlogs(e.target.value)}
            placeholder="Search haere"
            className="max-w-lg"
          ></Input>
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
              <p>{industrial?.length}</p>
            </div>
            <div className="flex justify-between pt-3 ">
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
          <div>
            {" "}
            <h2 className="text-2xl pt-10">Recently Posted</h2>
            <div>
              {education?.slice(0, 1)?.map((article: NewsArticle, index) => (
                <div
                  key={index}
                  className="mt-5 flex flex-col md:flex-row gap-2 "
                >
                  <Image
                    src={article?.urlToImage}
                    width={100}
                    height={100}
                    priority={true}
                    alt="blogImage"
                    className="rounded-lg"
                  ></Image>
                  <div className="">
                    <h2 className="text-lg font-semibold text-gray-700 line-clamp-1">
                      <Link
                        className="hover:underline hover:text-purple-500"
                        href={"https://typeforyou.org/vanguard-529/"}
                      >
                        {article?.title}
                      </Link>
                    </h2>
                    <div className="flex items-center  text-xs sm:text-sm md:text-sm lg:text-lg text-gray-700 ">
                      {" "}
                      {article?.publishedAt}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div>
              {industrial?.slice(5, 10)?.map((article: NewsArticle, index) => (
                <div
                  key={index}
                  className="mt-5 flex flex-col md:flex-row gap-2 "
                >
                  <Image
                    src={article?.urlToImage}
                    width={100}
                    height={1300}
                    priority={true}
                    alt="blogImage"
                    className="rounded-lg"
                  ></Image>
                  <div className="">
                    <h2 className="text-lg font-semibold text-gray-700 line-clamp-1">
                      <Link
                        className="hover:underline hover:text-purple-500"
                        href={
                          "https://screenrant.com/the-studio-episode-4-review/"
                        }
                      >
                        {article?.title}
                      </Link>
                    </h2>
                    <div className="flex items-center  text-xs sm:text-sm md:text-sm lg:text-lg text-gray-700 ">
                      {" "}
                      {article?.publishedAt}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogsComponents;
