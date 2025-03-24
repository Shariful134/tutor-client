/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

// import Loading from "@/components/ui/shared/Loading";
import { useUser } from "@/context/UserContext";
import { getAllUsers } from "@/services/User";
import { IUsers } from "@/types";
import { TBooking } from "@/types/bookings";
import { useEffect, useState } from "react";

// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableFooter,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
import { getAllBookings } from "@/services/request";

// export type BookingStatus = "Pending" | "Paid" | "Cancelled";

const BookingsHistoryComponents = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [bookings, setBookings] = useState<TBooking[] | []>([]);

  const { user } = useUser();
  const email = user?.userEmail;
  console.log(email);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        //get User
        const allUsers = await getAllUsers();

        const loggedUser = allUsers.data.find(
          (user: IUsers) => user.email === email
        );

        //get Booking

        const allbookings = await getAllBookings();
        const currentBookings = allbookings?.data?.filter(
          (booking: TBooking) =>
            booking.student?._id === loggedUser?._id &&
            booking.status === "Paid"
        );
        setBookings(currentBookings);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    if (email) {
      fetchData();
    }
  }, [email]);

  // if (loading) {
  //   return <Loading></Loading>;
  // }

  //handle Booking cancel
  // const handleBookingCancel = async (id: string) => {
  //   await cancelBooking(id);
  // };
  // console.log("currenBookings: ", bookings);
  //tableData
  const invoices = bookings?.map((booking: TBooking) => ({
    name: booking.student?.name,
    tutorName: booking.tutor?.name,
    tutor: booking.tutor?._id,
    address: booking.address,
    subjects: booking.tutor?.subjects,
    dateTime: booking.dateTime,
    duration: booking.duration,
    phone: booking.phone,
    status: booking.status,
    totalPrice: booking.totalPrice,
    action: "",
    _id: "67dfe4c69f02fdfa142aa12e",
  }));
  console.log("invoices1: ", bookings);
  console.log("invoices: ", invoices);

  return (
    <div className="pt-5">
      <h2>BookingHistory</h2>
      <div className="pt-5 ">
        <section className="container mx-auto">
          <div className="flex flex-col">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          <div className="flex items-center gap-x-3">
                            <button className="flex items-center gap-x-2">
                              <span>StudentName</span>
                            </button>
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Address
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Phone
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          TutorName
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Subjects
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Duration
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          TotalPrice
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Actions
                        </th>
                        <th scope="col" className="relative py-3.5 px-4">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                      {invoices?.map((booking, index) => (
                        <tr key={index}>
                          <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                            <div className="inline-flex items-center gap-x-3">
                              <span>{booking.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            {booking.address}
                          </td>
                          <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">
                              <h2 className="text-sm font-normal">
                                {" "}
                                {booking.phone}
                              </h2>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">
                              <h2 className="text-sm font-normal">
                                {" "}
                                {booking.tutorName}
                              </h2>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">
                              <h2 className="text-sm font-normal">
                                {Array.isArray(booking?.subjects)
                                  ? booking.subjects.join(", ")
                                  : "No subjects"}
                              </h2>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">
                              <h2 className="text-sm font-normal">
                                {booking.dateTime}
                              </h2>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            <div className="flex items-center gap-x-2">
                              <p className="text-xs font-normal text-gray-600 dark:text-gray-400">
                                {booking.duration}
                              </p>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            {booking.totalPrice} BDT
                          </td>
                          <td className="px-4 py-4 text-sm whitespace-nowrap">
                            <div className="flex items-center gap-x-6">
                              <button className="text-gray-500 transition-colors duration-200 dark:hover:text-indigo-500 dark:text-gray-300 hover:text-indigo-500 focus:outline-none">
                                Update
                              </button>
                              <button className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none">
                                Cancel
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BookingsHistoryComponents;
