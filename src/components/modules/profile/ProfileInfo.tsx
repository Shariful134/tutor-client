// "use client";
// import { Button } from "@/components/ui/button";
// import { useUser } from "@/context/UserContext";
// import { getAllTutors } from "@/services/User";
// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useState } from "react";

// const ProfileInfo = () => {
//   const { user } = useUser();

//   const [tutor, setTutor] = useState<any>([]);

//   useEffect(() => {
//     const fetchTutor = async () => {
//       try {
//         const data = await getAllTutors();
//         if (data?.data) {
//           const finedTutor = data?.data?.filter(
//             (item: any) => item.email === user?.userEmail
//           );
//           setTutor(finedTutor);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchTutor();
//   }, [user?.userEmail]);
//   console.log(tutor);

//   return (
//     <div>
//       {tutor?.map((tutor: any) => (
//         <div key={tutor._id} className="w-xl border-1">
//           <div className="flex flex-col justify-center items-center gap-2">
//             <Image
//               src={tutor?.profileImage}
//               width={150}
//               height={150}
//               className="rounded-full"
//               alt={tutor?.name}
//             ></Image>
//             <Link href={`/${user?.role}/dashboard`}>
//               <Button className="roudend-full border-0 btn cursor-pointer bg-gray-300 text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ...">
//                 {" "}
//                 View Profile
//               </Button>
//             </Link>
//           </div>
//           <div>
//             <div>
//               <p className=" text-sm md:text-sm lg:text-lg text-gray-700 ">
//                 Name: {tutor.name}
//               </p>
//               <p className=" text-sm md:text-sm lg:text-lg text-gray-700 ">
//                 Email: {tutor.email}
//               </p>
//               <p className=" text-sm md:text-sm lg:text-lg text-gray-700 ">
//                 Phone: {tutor.phoneNumber}
//               </p>
//               <p className=" text-sm md:text-sm lg:text-lg text-gray-700 line-clamp-2">
//                 <span className="text-gray-900">Subject: </span>{" "}
//                 {tutor?.subjects?.join(", ")}
//               </p>
//               <p className=" text-sm md:text-sm lg:text-lg text-gray-700 line-clamp-2">
//                 <span className="text-gray-900"> Avilability:</span>{" "}
//                 {tutor?.availability
//                   ?.map(
//                     (avail: { day: string; time: string }) =>
//                       `${avail.day}: ${avail.time}`
//                   )
//                   .join(", ")}
//               </p>
//               <p className=" text-sm md:text-sm lg:text-lg text-gray-700 ">
//                 Category: {tutor.category}
//               </p>
//               <p className=" text-sm md:text-sm lg:text-lg text-gray-700 ">
//                 GradeLevel: {tutor.gradeLevel}
//               </p>
//               <p className=" text-sm md:text-sm lg:text-lg text-gray-700 ">
//                 HourelyRate: {tutor.hourlyRate}
//               </p>
//               <p className=" text-sm md:text-sm lg:text-lg text-gray-700 ">
//                 Details: {tutor.bio}
//               </p>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ProfileInfo;
