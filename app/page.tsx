"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoaderCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { toast } from "sonner";

const formSchema = z.object({
  realname: z.string().min(2).max(50),
  age: z.string().min(2).max(50),
  discordname: z.string().min(2).max(50),
  time: z.string().min(2).max(50),
  email: z.string().email(),
  phonenumber: z.string().min(2).max(15),
});

const Home = () => {

  const [IsLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      realname: "",
      discordname: "",
      age: "",
      time: "",
      email: "",
      phonenumber: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    const response = await fetch("/api/application/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        realname: values.realname,
        discordname: values.discordname,
        age: values.age,
        time: values.time,
        email: values.email,
        phonenumber: values.phonenumber,
      }),
    });

    const data = await response.json();

    if (data?.success) {
      setIsLoading(false);
      setOpenDialog(true);
    } else {
      toast(data?.message);
      setOpenDialog(false);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-y-3 w-[320px] md:w-[700px] lg:w-[900px] bg-neutral-50 ml-auto mr-auto mt-20 p-3"
        >
          <h1 className="text-3xl font-semibold">
            Apply for admin in SuperahmedGaming Community Guild
          </h1>
          <FormField
            control={form.control}
            name="realname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What is Your Real Name?</FormLabel>
                <FormControl>
                  <input
                    className="border-2 outline-none w-full text-zinc-900  border-solid border-black rounded-xl p-2 "
                    placeholder="What is Your Real Name?"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="!m-0 !p-0 !text-sm !text-black" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="discordname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What is Your Discord Name?</FormLabel>
                <FormControl>
                  <input
                    className="border-2 outline-none w-full text-zinc-900  border-solid border-black rounded-xl p-2 "
                    placeholder="What is Your Discord Name?"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="!m-0 !p-0 !text-sm !text-black" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>How Old Are You?</FormLabel>
                <FormControl>
                  <input
                    className="border-2 outline-none w-full text-zinc-900  border-solid border-black rounded-xl p-2 "
                    placeholder="How Old Are You?"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="!m-0 !p-0 !text-sm !text-black" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>How many time you will be active in it?</FormLabel>
                <FormControl>
                  <input
                    className="border-2 outline-none w-full text-zinc-900  border-solid border-black rounded-xl p-2 "
                    placeholder="How many time you will be active in it?"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="!m-0 !p-0 !text-sm !text-black" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email?</FormLabel>
                <FormControl>
                  <input
                    className="border-2 outline-none w-full text-zinc-900  border-solid border-black rounded-xl p-2 "
                    placeholder="Email?"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="!m-0 !p-0 !text-sm !text-black" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phonenumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-medium text-zinc-900">
                  What is Your Phone Number?
                </FormLabel>
                <FormControl>
                  <input
                    className="border-2 outline-none w-full text-zinc-900  border-solid border-black rounded-xl p-2 "
                    placeholder="What is Your Phone Number"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="!m-0 !p-0 !text-sm !text-black" />
              </FormItem>
            )}
          />

          <button
            type="submit"
            disabled={IsLoading}
            className="bg-black disabled:cursor-not-allowed disabled:opacity-30 cursor-pointer text-center justify-center p-3 w-full text-white rounded-xl hover:bg-zinc-900 font-medium flex items-center gap-2"
          >
            {IsLoading ? (
              <LoaderCircle size={22} className="animate-spin" />
            ) : null}
            Apply
          </button>
        </form>
      </Form>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-center text-zinc-900 ">
              Application?
            </DialogTitle>
            <DialogDescription className="flex flex-col items-center gap-y-3 justify-center">
              <Image
                src="/success.png"
                width={90}
                height={90}
                alt="successcheck"
                loading="lazy"
                className="hover:transition-all hover:ease-in-out hover:duration-500 hover:scale-110"
              />
              <p className="text-black font-bold text-lg">
                Thanks, for your application within 24 hour check your email
              </p>
              <p className="text-black font-bold text-lg">
                شكراً لك يمكنك تلقي نظرة على يمالك في خلال 24 ساعة
              </p>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Home;
