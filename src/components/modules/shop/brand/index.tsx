"use client";
import React, { useState } from "react";

import { NMTable } from "@/components/ui/core/NMTable";
import { ColumnDef } from "@tanstack/react-table";

import { Trash } from "lucide-react";

import { toast } from "sonner";
import DeleteConfirmationModal from "@/components/ui/core/NMTable/NMModal/DeleteConfirmationModal";
import CreateBrandModal from "./CreateBrandModal";
import { IBrand } from "@/types/brands";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { deleteBrand } from "@/services/Brand";

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

const ManageCategoriesBrand = ({ brands }: { brands: IBrand[] }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  console.log(selectedId);

  const handleDelete = (data: IBrand) => {
    setSelectedId(data?._id);
    setSelectedItem(data?.name);
    setModalOpen(true);
  };
  const handleDeleteConfirm = async () => {
    try {
      if (selectedId) {
        const res = await deleteBrand(selectedId);
        console.log("error-res", res);
        if (res.success) {
          toast.success(res.message);
          setModalOpen(false);
        } else {
          toast.error(res.message);
        }
      }
    } catch (err: any) {
      console.error(err?.message);
    }
  };
  const columns: ColumnDef<IBrand>[] = [
    {
      accessorKey: "name",
      header: () => <div className="text-right w-8">Category Name</div>,
      cell: ({ row }) => {
        console.log(row.original.name);

        return (
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={row.original.logo} alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="text-right font-medium w-8">
              {row.original.name}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "isActive",
      header: () => <div className="text-">IsActive</div>,
      cell: ({ row }) => {
        return (
          <div className="flex items-center space-x-3">
            {row.original.isActive ? (
              <p className="text-green-500 bg-green-300/25 px-2  rounded">
                true
              </p>
            ) : (
              <p className="text-green-500 bg-green-300/25 px-2  rounded">
                false
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
          <div className="flex items-center space-x-30">
            <button
              onClick={() => handleDelete(row.original)}
              className="text-red-500"
              title="Delete"
            >
              {" "}
              <Trash className="w-5 h-5" />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div className="flex justify-between">
        <h2>Mange Categories</h2>
        <CreateBrandModal></CreateBrandModal>
      </div>
      <div className="pt-5">
        <NMTable columns={columns} data={brands || []}></NMTable>
      </div>
      <div>
        <DeleteConfirmationModal
          name={selectedItem}
          isOpen={isModalOpen}
          onOpenChange={setModalOpen}
          onConfirm={handleDeleteConfirm}
        />
      </div>
    </div>
  );
};

export default ManageCategoriesBrand;
