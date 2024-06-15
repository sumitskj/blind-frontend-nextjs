import { Inter } from "next/font/google";
import "./globals.css";
import HeaderComponent from "./header";
import { ToastifyNotification } from "@/components/NotificationComponent";
import RecentRoomsComponent from "@/components/RecentRoomsComponent";
import "react-toastify/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "nUoSER",
  description: "Open Forum without any Logins",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="font-rubik w-full relative flex flex-col justify-start items-start gap-0 bg-indigo-50">
          <HeaderComponent />
          <div className="grid grid-cols-4 w-full justify-between items-start relative pt-24">
            <div className="col-span-1 w-full flex flex-col justify-start items-center pb-10">
              <RecentRoomsComponent />
            </div>
            <div className="w-full col-span-2">{children}</div>
          </div>
          <ToastifyNotification />
        </div>
      </body>
    </html>
  );
}
