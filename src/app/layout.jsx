import { Inter } from "next/font/google";
import "./globals.css";
import {
  HeaderComponent,
  MobileBottomNavbar,
  MobileHeaderComponent,
} from "./header";
import { ToastifyNotification } from "@/components/NotificationComponent";
import RecentRoomsComponent from "@/components/RecentRoomsComponent";
import "react-toastify/ReactToastify.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { headers } from "next/headers";
import WhyToUse from "@/components/WhyToUser";
import GoogleAdsense from "@/components/GoogleAdsense";
import Footer from "@/components/Footer";
import AdComponent from "@/components/AdComponent";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "BolDena",
  description:
    "Boldena is an open Forum without any Logins. Be completely anonymous while creating any post. Create private discussion posts for true feedbacks.",
  metadataBase: new URL("https://boldena.com"),
};

export default function RootLayout({ children }) {
  const headersList = headers();
  const pathname = headersList.get("x-pathname");

  return (
    <html lang="en">
      <head>
        <GoogleAdsense pId={"1674144837923693"} />
        <GoogleAnalytics gaId="G-G3NLQGJW6V" />
      </head>
      <body className={inter.className}>
        <div className="font-rubik w-full relative flex h-screen flex-col justify-start items-start gap-0 bg-indigo-50">
          <HeaderComponent />
          <MobileHeaderComponent />
          <div className="grid grid-cols-1 lg:grid-cols-4 w-full justify-between items-start relative overflow-hidden pt-24">
            <div
              className="hidden col-span-1 w-full lg:flex flex-col justify-start items-center pb-10 px-2"
              style={{ height: "calc(100vh - 4rem)" }}
            >
              <RecentRoomsComponent />
            </div>
            <div className="w-full col-span-2">{children}</div>
            {/* {!pathname.includes("article") && (
              <div
                className="hidden lg:block w-full col-span-1 px-2 pb-10"
                style={{ height: "calc(100vh - 4rem)" }}
              >
                <WhyToUse />
              </div>
            )} */}
            <div
              className="hidden lg:flex flex-col justify-start items-start w-full col-span-1 px-2 pb-10 gap-2"
              style={{ height: "calc(100vh - 4rem)" }}
            >
              <AdComponent adSlot={"8467299603"} />
              <AdComponent adSlot={"8728353163"} />
            </div>
          </div>
          <MobileBottomNavbar />
          <ToastifyNotification />
        </div>
        <div className="w-full relative">
          <Footer />
        </div>
      </body>
    </html>
  );
}
