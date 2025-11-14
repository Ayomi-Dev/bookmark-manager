import { NextResponse } from "next/server";
import metascraper from "metascraper";
import metascraperTitle from "metascraper-title";
import metascraperDescription from "metascraper-description";
import metascraperImage from "metascraper-image";
import metascraperLogo from "metascraper-logo";
import metascraperUrl from "metascraper-url";
import metascraperAuthor from "metascraper-author";
import metascraperPublisher from "metascraper-publisher";

const scraper = metascraper([
  metascraperTitle(),
  metascraperDescription(),
  metascraperImage(),
  metascraperLogo(),
  metascraperUrl(),
  metascraperAuthor(),
  metascraperPublisher(),
]);

export async function POST(req: Request) {
  try {
    const { url } = await req.json(); //grabs the url sent by user

    if (!url) {
      return NextResponse.json(
        { error: "URL is required" },
        { status: 400 }
      );
    }

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; MetadataBot/1.0; +http://localhost:3000)"  //fetches the webpage with a browser-like User-Agent so metadata can be can successfully read.
      }
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch URL: ${response.status}` },
        { status: response.status }
      );
    }

    const html = await response.text();
    const metadata = await scraper({ html, url }); //extracts the html content of the url
    console.log(metadata)

    return NextResponse.json(metadata);
  } 
  catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: "Metadata extraction failed" },
      { status: 500 }
    );
  }
}
;
