import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { type User } from "@prisma/client";
import { RocketIcon } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { LoadingPage } from "~/components/global/loading";
import Navigation from "~/components/global/navigation";
import ServerError from "~/components/server-error";
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
import PageWrapper from "~/layouts/page-wrapper";
import { api } from "~/utils/api";

const Sidebar = () => {
  return (
    <aside className="my-3 ml-3 h-screen w-56 rounded-lg border">
      <nav className="space-y-4 p-4">Sidebar</nav>
    </aside>
  );
};

const formSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email().min(5),
  avatar: z.string().url().optional(),
});

const NewUserForm = (props: { user: Partial<User> }) => {
  const { mutate, isLoading: isPosting } = api.user.create.useMutation({
    onSuccess: (data) => {
      console.log(data);
      // TODO: Redirect to the next page
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
    mutate(values);
  };

  return (
    <Form {...form}>
      <div className="mx-auto max-w-xl p-3">
        <h1 className="mx-auto my-3 inline-block bg-gradient-to-l from-primary to-primary/70 bg-clip-text text-4xl font-bold text-transparent">
          {`Welcome to Vowsuite, ${form.watch("firstName")}!`}
        </h1>
        <Alert className="my-3">
          <RocketIcon size={18} />
          <AlertTitle>Fill in your details</AlertTitle>
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
                      <FormLabel>Email</FormLabel>
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

const Studio = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <PageWrapper>
        <LoadingPage />
      </PageWrapper>
    );
  }

  if (!user?.emailAddresses[0]?.emailAddress)
    return (
      <ServerError
        code="500"
        message="Something went wrong. Please try again."
      />
    );

  const { data: userFromDb } = api.user.getByEmail.useQuery(
    {
      email: user?.emailAddresses[0]?.emailAddress,
    },
    { retry: false },
  );

  return (
    <PageWrapper>
      <Navigation
        user={{
          avatar: user?.imageUrl,
          firstName: user?.firstName ?? undefined,
          lastName: user?.lastName ?? undefined,
        }}
      />
      <div className="flex">
        <Sidebar />
        {!userFromDb && (
          <NewUserForm
            user={{
              firstName: user.externalAccounts[0]?.firstName,
              lastName: user.externalAccounts[0]?.lastName,
              email: user.emailAddresses[0]?.emailAddress,
              avatar: user.imageUrl,
            }}
          />
        )}
      </div>
    </PageWrapper>
  );
};

export default Studio;
