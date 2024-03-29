"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type Agency } from "@prisma/client";
import { InfoIcon } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AgencyCard from "~/app/studio/_components/agency-card";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "~/components/ui/resizable";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Separator } from "~/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

const formSchema = z.object({
  name: z.string().min(2),
  avatar: z.string().url().optional(),
  fontPrimary: z.string().optional(),
  fontSecondary: z.string().optional(),
  colorAccent: z.string(),
  colorBackground: z.string(),
  colorText: z.string(),
});

export default function AgencyForm(props: { agency: Agency }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { ...props.agency, avatar: props.agency.avatar ?? undefined },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Submitted", values);
    // mutate(values);
  };

  return (
    <Form {...form}>
      <div className="w-full rounded-lg border">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={50} minSize={40} className="p-3">
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex h-full flex-col justify-between space-y-5"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Agency name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your agency's name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <>
                <FormLabel>Logo</FormLabel>
                <Image
                  src={
                    form.watch("avatar") ?? "/images/user-placeholder-image.jpg"
                  }
                  alt="Your profile picture"
                  width={100}
                  height={100}
                  className="rounded-full"
                />
              </>

              <div className="flex flex-col xl:flex-row xl:space-x-2">
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="fontPrimary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Primary font</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a font" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="Georgia">Georgia</SelectItem>
                              <SelectItem value="Roboto">Roboto</SelectItem>
                              <SelectItem value="Helvetica">
                                Helvetica
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="fontSecondary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Secondary font</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a font" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="Georgia">Georgia</SelectItem>
                              <SelectItem value="Roboto">Roboto</SelectItem>
                              <SelectItem value="Helvetica">
                                Helvetica
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:space-x-2">
                <div className="mt-auto flex-1">
                  <FormField
                    control={form.control}
                    name="colorBackground"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Background color</FormLabel>
                        <FormControl>
                          <Input type="color" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mt-auto flex-1">
                  <FormField
                    control={form.control}
                    name="colorText"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Text color</FormLabel>
                        <FormControl>
                          <Input type="color" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mt-auto flex-1">
                  <FormField
                    control={form.control}
                    name="colorAccent"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Accent color</FormLabel>
                        <FormControl>
                          <Input type="color" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator />

              <Button type="submit" variant="secondary" className="mr-auto">
                Save changes
              </Button>
            </form>
          </ResizablePanel>

          <ResizableHandle />

          <ResizablePanel defaultSize={50} minSize={35}>
            <div className="flex h-full flex-col space-y-2 px-3 py-3">
              <div className="flex space-x-2 text-sm font-extralight text-muted-foreground">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <FormLabel className="flex space-x-1">
                        <span>Client Preview</span>
                        <InfoIcon size={12} className="my-auto" />
                      </FormLabel>
                    </TooltipTrigger>
                    <TooltipContent>
                      This is how your agency will appear to clients while they
                      are viewing their gallery.
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <AgencyCard agency={form.watch()} />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </Form>
  );
}
