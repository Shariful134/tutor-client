"use client";
import Logo from "@/app/assest/svgs/Logo";
import { Button } from "@/components/ui/button";
import NMImageUploader from "@/components/ui/core/NMImageUploader";
import ImagePreviewer from "@/components/ui/core/NMImageUploader/ImagePriviewer";
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

import { Textarea } from "@/components/ui/textarea";
import { createShop } from "@/services/Shop";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const CreateShopForm = () => {
  const [imageFiels, setImageFiels] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const form = useForm({});

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const servicesOffered = data?.servicesOffered
      .split(",")
      .map((service: string) => service.trim())
      .filter((service: string) => service !== "");

    const establishedYear = Number(data?.establishedYear);
    const modifiedData = {
      ...data,
      establishedYear,
      servicesOffered,
    };

    const formdata = new FormData();
    formdata.append("data", JSON.stringify(modifiedData));
    formdata.append("logo", imageFiels[0] as File);
    console.log(formdata);
    console.log(modifiedData);

    try {
      const res = await createShop(formdata);
      console.log(res);
      if (res?.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-2xl p-5 my-5">
      <div className="flex items-center justify-center space-x-2 pb-2">
        <Logo />
        <h1 className="font-semibold text-xl">Create Your Shop</h1>
        <p className="text-sm text-extralight text-gray-600">Jois us today</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
            <FormField
              control={form.control}
              name="shopName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ShopName</FormLabel>
                  <FormControl>
                    <Input
                      className="border border-gray-400"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="businessLicenseNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business LicenseNumber</FormLabel>
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
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
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
            <FormField
              control={form.control}
              name="contactNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
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
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
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
            <FormField
              control={form.control}
              name="establishedYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Established Year</FormLabel>
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
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
            <FormField
              control={form.control}
              name="taxIdentificationNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tax Identification Number</FormLabel>
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
            <FormField
              control={form.control}
              name="socialMediaLinks.facebook"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Facebook</FormLabel>
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
            <FormField
              control={form.control}
              name="socialMediaLinks.twitter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Twitter</FormLabel>
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
            <FormField
              control={form.control}
              name="socialMediaLinks.instagram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instagram</FormLabel>
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

            <FormField
              control={form.control}
              name="servicesOffered"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Services Offered</FormLabel>
                  <FormControl>
                    <Textarea
                      className="border border-gray-400 h-36"
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
              {isSubmitting ? "Creating..." : "Create Shop"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateShopForm;
