import type { Metadata } from "next";
import { RootDocument } from "@/components/root-document";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, SITE_NAME, SITE_URL, SOCIAL_IMAGE } from "@/lib/constants";
import "./globals.css";
export const metadata: Metadata = { metadataBase:new URL(SITE_URL), title:{default:DEFAULT_TITLE,template:`%s | ${SITE_NAME}`}, description:DEFAULT_DESCRIPTION, openGraph:{type:"website",siteName:SITE_NAME,title:DEFAULT_TITLE,description:DEFAULT_DESCRIPTION,url:SITE_URL,images:[SOCIAL_IMAGE]}, twitter:{card:"summary_large_image",images:[SOCIAL_IMAGE]} };
export default function RootLayout({children}:{children:React.ReactNode}) { return <RootDocument className="h-full antialiased">{children}</RootDocument>; }
