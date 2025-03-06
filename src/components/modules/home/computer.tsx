"use client";
import { getAllTutors } from "@/services/User";
import React, { useEffect, useState } from "react";
import { ITutor } from "./page";

const Computer = () => {
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

  return <div>computer page</div>;
};

export default Computer;
