"use server";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

//create bookings
export const createBooking = async (orderData: FieldValues) => {
  const token = (await cookies()).get("accessToken")!.value;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/bookings/create`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(orderData),
      }
    );

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// getAll Bookings
export const getAllBooking = async () => {
  const token = (await cookies()).get("accessToken")!.value;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/bookings/get`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
      }
    );

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
