import { zodResolver } from "@hookform/resolvers/zod";
import { type User } from "@prisma/client";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { RocketIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { api } from "~/utils/api";

const formSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email().min(5),
  avatar: z.string().url().optional(),
});

const NewUserForm = (props: { user: Partial<User> }) => {
  const router = useRouter();
  const { mutate, isLoading: isPosting } = api.user.create.useMutation({
    onSuccess: (data) => {
      console.log("Congratulations! You're now a Vowsuite user!", data);
      router.reload();
      toast.success("Congratulations! You're now a Vowsuite user!");
    },
    onError: (error) => {
      const errorMessage = error.data?.zodError?.fieldErrors.content;
      toast.error(
        errorMessage?.[0]
          ? `Error: ${errorMessage[0]}`
          : "An error occurred. Please try again.",
      );
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { ...props.user, avatar: props.user.avatar ?? "" },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    // mutate(values);
  };

  return (
    <Form {...form}>
      <div className="mx-auto max-w-xl p-3">
        <h1 className="mx-auto my-3 inline-block bg-gradient-to-l from-primary to-primary/70 bg-clip-text text-4xl font-bold text-transparent">
          {`Welcome to Vowsuite, ${form.watch("firstName")}!`}
        </h1>
        <Alert className="my-3">
          <RocketIcon size={18} />
          <AlertTitle>Fill in your info to get started</AlertTitle>
          <AlertDescription className="text-muted-foreground">
            <em>Tip:</em> You can always make edits to your account details
            later from your account settings.
          </AlertDescription>
        </Alert>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-5 py-5"
        >
          <div className="flex space-x-4">
            <div className="flex-1">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your first name"
                        disabled={isPosting}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex-1">
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your last name"
                        disabled={isPosting}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <FormLabel className="flex space-x-1">
                        <span>Email</span>
                        <QuestionMarkCircledIcon />
                      </FormLabel>
                    </TooltipTrigger>
                    <TooltipContent>
                      If you signed in with a third-party service, you can
                      change your email address later.
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <FormControl>
                  <Input
                    placeholder="Your email address"
                    disabled={isPosting || !!props.user.email}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormLabel>Profile picture</FormLabel>

          <Image
            src={form.watch("avatar") ?? "/images/user-placeholder-image.jpg"}
            alt="Your profile picture"
            width={100}
            height={100}
            className="rounded-full"
          />

          <Button type="submit" variant="secondary">
            Get started
          </Button>
        </form>
      </div>
    </Form>
  );
};

export default NewUserForm;
