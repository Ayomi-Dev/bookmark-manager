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

const MAX_ATTEMPTS = 3;  // Maximum retry attempts
const RETRY_DELAY = 2000; // Delay between retries (in ms)

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json(
        { error: "URL is required" },
        { status: 400 }
      );
    }

    let attempt = 0;
    let metadata = null;

    // Retry mechanism
    while (attempt < MAX_ATTEMPTS) {
      try {
        const response = await fetch(url, {
          headers: {
            "User-Agent": "Mozilla/5.0 (compatible; MetadataBot/1.0)"
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch URL: ${response.status}`);
        }

        const html = await response.text();
        metadata = await scraper({ html, url });
        console.log(metadata)

        // Break out if the loop is successful
        break;
      } catch (error: any) {
        attempt++;
        console.error(`Attempt ${attempt} failed: ${error.message}`);

        // If max attempts or retries has not been reached yet, wait before retrying
        if (attempt < MAX_ATTEMPTS) {
          await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        }
      }
    }

    // If metadata is still null after retries, return an error
    if (!metadata) {
      return NextResponse.json(
        { error: "Failed to fetch metadata after multiple attempts" },
        { status: 500 }
      );
    }

    return NextResponse.json(metadata);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Metadata extraction failed" },
      { status: 500 }
    );
  }
}
