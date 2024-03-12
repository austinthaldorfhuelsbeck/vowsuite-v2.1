import { zodResolver } from "@hookform/resolvers/zod";
import { type Agency } from "@prisma/client";
import { InfoIcon, LightbulbIcon } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "~/components/ui/resizable";
import AgencyCard from "../agency-card";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const initialFormValues = {
  name: "My Agency",
  avatar: "/assets/user-placeholder.jpg",
  fontPrimary: "Inter",
  fontSecondary: "Roboto",
  colorAccent: "#ffbe98",
  colorBackground: "#f2e8da",
  colorText: "#1c1917",
};

const formSchema = z.object({
  name: z.string().min(2),
  avatar: z.string().url().optional(),
  fontPrimary: z.string().optional(),
  fontSecondary: z.string().optional(),
  colorAccent: z.string(),
  colorBackground: z.string(),
  colorText: z.string(),
});

const AgencyForm = (props: { agency?: Agency }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: props.agency ?? initialFormValues,
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Submitted", values);
    // mutate(values);
  };

  return (
    <Form {...form}>
      <div className="mx-3 w-full rounded-lg border">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={50} minSize={40} className="p-3">
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex h-full flex-col justify-between space-y-3"
            >
              {!props.agency && (
                <Alert>
                  <LightbulbIcon size={18} />
                  <AlertTitle>Start by creating an agency.</AlertTitle>
                  <AlertDescription className="text-muted-foreground">
                    <em>Tip:</em> You can always make edits to your agency
                    details later from your agency settings.
                  </AlertDescription>
                </Alert>
              )}

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
                          <SelectItem value="Inter">Inter</SelectItem>
                          <SelectItem value="Roboto">Roboto</SelectItem>
                          <SelectItem value="Georgia">Georgia</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                          <SelectItem value="Inter">Inter</SelectItem>
                          <SelectItem value="Roboto">Roboto</SelectItem>
                          <SelectItem value="Georgia">Georgia</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" variant="secondary">
                Create agency
              </Button>
            </form>
          </ResizablePanel>

          <ResizableHandle />

          <ResizablePanel defaultSize={50} minSize={35}>
            <div className="flex h-full flex-col space-y-2 px-3 py-3">
              <div className="flex space-x-2 text-sm font-extralight text-muted-foreground">
                <span>Client Preview</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon size={12} className="my-auto" />
                    </TooltipTrigger>
                    <TooltipContent>
                      This is how your agency will appear to clients while they
                      are viewing their gallery.
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <AgencyCard agency={props.agency ?? form.watch()} />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </Form>
  );
};

export default AgencyForm;
