import { UserProfile } from "@clerk/nextjs";

export default function Page() {
  return (
    <UserProfile
      appearance={{
        elements: {
          card: "rounded-xl border border-muted bg-transparent shadow",
          navbar: "border-muted border-r",
          navbarButton: "text-card-foreground",
          headerTitle: "text-card-foreground",
          headerSubtitle: "text-muted-foreground",
          profileSectionTitleText: "text-card-foreground",
          userPreviewMainIdentifier: "text-card-foreground",
          accordionTriggerButton: "text-card-foreground",
          activeDeviceListItem: "text-card-foreground",
          profileSectionPrimaryButton:
            "hover:bg-primary/80 text-card-foreground",
          badge: "bg-primary/80 text-card-foreground",
        },
      }}
    />
  );
}
