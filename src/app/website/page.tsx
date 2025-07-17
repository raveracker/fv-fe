import WebsiteStatusSummary from "./website-summary";
import BusinessInformation from "./business-information";
import ReviewsTable from "./reviews";
import { getWebsiteData, fetchWebsiteReviews } from "./actions";
import type { Website } from "~types/website";
import type { ReviewResponse } from "~types/review";
import NotFound from "~app/not-found";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// renamed so we don't shadow Next.js's PageProps
export interface PageProps {
  searchParams: Promise<{
    url?: string;
  }>;
}

export default async function WebsiteAnalysisPage({ searchParams }: PageProps) {
  const { url } = await searchParams;

  if (!url) {
    return <NotFound />;
  }

  const websiteData: Website = await getWebsiteData(url);
  const websiteReviews: ReviewResponse = await fetchWebsiteReviews(
    websiteData._id
  );

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 space-y-8">
        <WebsiteStatusSummary websiteData={websiteData} />
        <BusinessInformation websiteData={websiteData} />
        <ReviewsTable
          websiteId={websiteData._id}
          reviews={websiteReviews.reviews}
          limit={websiteReviews.limit}
          page={websiteReviews.page}
          totalReviews={websiteReviews.total}
        />
      </div>
    </div>
  );
}
