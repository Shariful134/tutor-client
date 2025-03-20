"use client";
import { useUser } from "@/context/UserContext";
import { getAllUsers } from "@/services/User";
import { useEffect, useState } from "react";
import { getAllBooking } from "@/services/booking";
import { ITutor } from "../home/page";
import { NMTable } from "@/components/ui/core/NMTable";

import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TBooking } from "@/types/bookings";
import { acceptBooking, cancelBooking } from "@/services/request";

const BookingRequest = () => {
  const { user, setIsLoading } = useUser();
  //   const [tutorId, setTutorId] = useState<string | null>(null);
  const [bookings, setBookings] = useState<TBooking[] | []>([]);
  const [users, setUsers] = useState<ITutor[] | []>([]);

  const getbooking = async () => {
    const databooking = await getAllBooking();
    setBookings(databooking?.data);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [usersData, bookingsData] = await Promise.all([
          getAllUsers(),
          getAllBooking(),
        ]);

        setUsers(usersData?.data);
        setBookings(bookingsData?.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const currentTutor = users?.find(
    (item: any) => item.email === user?.userEmail
  );
  const BookingTutor = bookings?.filter(
    (item: any) => item.tutor._id === currentTutor?._id
  );

  //handle Booking Request
  const handleBookingRequest = async (id: string) => {
    await acceptBooking(id);
    await getbooking();
  };
  //handle Booking cancel
  const handleBookingCancel = async (id: string) => {
    await cancelBooking(id);
    await getbooking();
  };
  //show this data your Table
  console.log("BookingTutor :", BookingTutor);

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "student",
      header: () => <div className="text-right w-8">Name</div>,
      cell: ({ row }) => {
        return (
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage
                src={row.original.student.profileImage}
                alt={row.original.student.name}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="text-right font-medium w-8">
              {row.original.student.name}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "tutor",
      header: () => <div className="text-right w-8">Subjects</div>,
      cell: ({ row }) => {
        const subjects = row.original.tutor.subjects;

        return (
          <div className="flex items-center space-x-3">
            <div className="text-right font-medium w-8">
              {subjects.join(", ")}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "bookingRequest",
      header: () => <div className="text-start w-8 ">bookingRequest</div>,
      cell: ({ row }) => {
        return (
          <div className="flex items-center  space-x-3">
            {row.original.bookingRequest ? (
              <p className="text-green-500 bg-green-300/25 px-2  rounded">
                Accept
              </p>
            ) : (
              <p className="text-green-500 bg-green-300/25 px-2  rounded">
                Request
              </p>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "Action",
      header: () => <div className="text-">Action</div>,
      cell: ({ row }) => {
        return (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleBookingRequest(row?.original?._id)}
              className="btn text-green-500 bg-green-300/25 font-normal px-2 py-1 h-6 border-0 rounded"
            >
              Accept
            </button>

            <button
              onClick={() => handleBookingCancel(row?.original?._id)}
              className="btn text-green-500 bg-green-300/25 font-normal px-2 py-1 h-6 border-0 rounded"
            >
              Cancel
            </button>

            {/* <button
              onClick={() => handleDelete(row.original)}
              className="text-red-500"
              title="Delete"
            >
              {" "}
              <Trash className="w-5 h-5" />
            </button> */}
          </div>
        );
      },
    },
  ];
  return (
    <div>
      Request for Bookings
      <div>
        <div className="pt-5">
          <NMTable columns={columns} data={BookingTutor || []}></NMTable>
        </div>
        {/* <div>
          <DeleteConfirmationModal
            name={selectedItem}
            isOpen={isModalOpen}
            onOpenChange={setModalOpen}
            onConfirm={handleDeleteConfirm}
          />
        </div> */}
      </div>
    </div>
  );
};

export default BookingRequest;
