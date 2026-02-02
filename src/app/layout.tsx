import "./globals.css";
import Providers from "@/components/ui/provider";
import SideBar from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import { Flex } from "@chakra-ui/react";
import AddBookmarkModal from "@/components/client/AddBookmarkModal";
import { BookmarkProvider } from "@/context/BookmarkContext";
import { UserContextProvider } from "@/context/UserContext";
import { Metadata } from "next";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });
// app/layout.tsx

export const metadata: Metadata = {
  title: {
    default: "Bookmark Manager",
    template: "%s | Bookmark Manager",
  },
  description: "Save, organize, and search your bookmarks efficiently all in one place.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <UserContextProvider>
          <BookmarkProvider>

            <Providers>
              <TopBar />
              <Flex
                position={"relative"}
                h={"100vh"}
                w={"full"}
              >
                <SideBar />
                {children}
              </Flex>
              <AddBookmarkModal />
            </Providers>
            
          </BookmarkProvider>
        </UserContextProvider>
      </body>
    </html>
  );
}
