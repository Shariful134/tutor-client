"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import NMImageUploader from "@/components/ui/core/NMImageUploader";
import ImagePreviewer from "@/components/ui/core/NMImageUploader/ImagePriviewer";
import { useState } from "react";

import { toast } from "sonner";
import { createBrand } from "@/services/Brand";

const CreateBrandModal = () => {
  const [imageFiels, setImageFiels] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);

  const form = useForm({});

  const {
    formState: { isSubmitting },
  } = form || {};

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const formdata = new FormData();
      formdata.append("data", JSON.stringify(data));
      formdata.append("logo", imageFiels[0] as File);

      const res = await createBrand(formdata);

      if (res.success) {
        toast.success(res?.message);
      } else {
        toast.error(res.message);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-rose-400 hover:bg-rose-500">Create Brand</Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Create Product Brand</DialogTitle>
        </DialogHeader>

        <div className="flex items-center justify-center">
          {imagePreview.length > 0 ? (
            <ImagePreviewer
              setImagePreview={setImagePreview}
              setImageFiels={setImageFiels}
              imagePreview={imagePreview}
              className="mt-5"
            />
          ) : (
            <NMImageUploader
              setImagePreview={setImagePreview}
              setImageFiels={setImageFiels}
              label="Upload Logo"
              className="mt-5"
            />
          )}
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      value={field.value || ""}
                      className="rounded-sm w-64"
                      placeholder="Name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="w-full flex flex-grow flex-col space-y-1">
              <Button
                className="btn bg-rose-400 hover:bg-rose-500  "
                type="submit"
              >
                {isSubmitting ? "Creating..." : "Create"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBrandModal;
