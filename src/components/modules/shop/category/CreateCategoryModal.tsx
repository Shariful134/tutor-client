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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import NMImageUploader from "@/components/ui/core/NMImageUploader";
import ImagePreviewer from "@/components/ui/core/NMImageUploader/ImagePriviewer";
import { useState } from "react";
import { createCategory } from "@/services/Category";
import { toast } from "sonner";

const CreateCategoryModal = () => {
  const [imageFiels, setImageFiels] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const form = useForm({});

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const modifiedData = {
        ...data,
      };
      const formdata = new FormData();
      formdata.append("data", JSON.stringify(modifiedData));
      formdata.append("icon", imageFiels[0] as File);
      console.log(modifiedData);
      const res = await createCategory(formdata);
      console.log(res);
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
        <Button className="bg-rose-400 hover:bg-rose-500">
          Create Category
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Create Category</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      className="border border-gray-400"
                      type="text"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-between ">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        className="border border-gray-400 w-76 h-36"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />

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
            <div className="w-full flex flex-grow flex-col space-y-1">
              <Button
                className="btn bg-rose-400 hover:bg-rose-500  "
                type="submit"
              >
                Create
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategoryModal;
