import { Inter } from "next/font/google";
import "./globals.css";
import { HeaderComponent, MobileBottomNavbar, MobileHeaderComponent } from "./header";
import { ToastifyNotification } from "@/components/NotificationComponent";
import RecentRoomsComponent from "@/components/RecentRoomsComponent";
import "react-toastify/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "BolDena",
  description:
    "Open Forum without any Logins. Be completely anonymous while creating any post. Create private discussion posts for true feedbacks.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="font-rubik w-full relative flex flex-col h-screen justify-start items-start gap-0 bg-indigo-50">
          <HeaderComponent />
          <MobileHeaderComponent />
          <div className="grid grid-cols-1 lg:grid-cols-4 overflow-y-auto w-full justify-between items-start relative pt-24">
            <div className="hidden col-span-1 w-full lg:flex flex-col justify-start items-center pb-10">
              <RecentRoomsComponent />
            </div>
            <div className="w-full col-span-2">{children}</div>
          </div>
          <MobileBottomNavbar />
          <ToastifyNotification />
        </div>
      </body>
    </html>
  );
}
