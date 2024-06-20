import { Inter } from "next/font/google";
import "./globals.css";
import { HeaderComponent, MobileBottomNavbar, MobileHeaderComponent } from "./header";
import { ToastifyNotification } from "@/components/NotificationComponent";
import RecentRoomsComponent from "@/components/RecentRoomsComponent";
import "react-toastify/ReactToastify.css";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "BolDena",
  description:
    "Boldena is an open Forum without any Logins. Be completely anonymous while creating any post. Create private discussion posts for true feedbacks.",
  metadataBase: new URL("https://boldena.com"),
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
            <div className="hidden lg:block w-full col-span-1 h-full px-2">
              <div className="relative bg-gradient-to-b from-white to-lime-100 w-full h-[86vh] rounded-lg shadow-lg p-4 flex flex-col justify-start items-center"
              >
                <div className="relative font-poppins font-extrabold text-center w-full text-2xl py-10 z-20">
                  WHY USE BOLDENA?
                </div>
                <div className="absolute inset-0 top-20 left-10 opacity-30 z-10"><Image src="/assets/speaker.svg" alt="logo" width={180} height={100} /></div>
                <div className="font-acme w-full text-xl font-bold text-center text-blue-800 z-20">
                  <ul className="list-inside list-disc">
                    <li className="py-6">NO LOGINS EVER</li>
                    <li className="py-6">BE ANONYMOUS ALWAYS AND SHARE YOUR THOUGHTS</li>
                    <li className="py-6">
                      CREATE PRIVATE SHAREABLE DISCUSSION POSTS TO GET HONEST
                      FEEDBACKS FROM YOUR COLLEAGUES
                    </li>
                    <li>EXPRESS YOURSELF OR ASK ANY QUESTION WITHOUT THINKING OF HOW PEOPLE WILL JUDGE YOU.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <MobileBottomNavbar />
          <ToastifyNotification />
        </div>
      </body>
    </html>
  );
}
