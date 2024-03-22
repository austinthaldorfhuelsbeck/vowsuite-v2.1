"use client";

import { TabletSmartphoneIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";

export default function MobileAppAlert() {
  const [isShowing, setIsShowing] = useState(true);

  return (
    isShowing && (
      <Alert>
        <TabletSmartphoneIcon size={24} className="my-auto" />
        <AlertTitle className="my-auto flex justify-between text-lg">
          Try the mobile app!
          <XIcon
            className="cursor-pointer"
            onClick={() => setIsShowing(!isShowing)}
          />
        </AlertTitle>
        <AlertDescription>
          <p className="text-sm text-muted-foreground">
            Vowsuite is now available on the App Store and Google Play Store.
            Download the app to stay connected on the go.
          </p>
          <Button className="mt-3 w-full">Download now</Button>
        </AlertDescription>
      </Alert>
    )
  );
}
