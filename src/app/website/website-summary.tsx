'use client'

import { Card, CardHeader, CardTitle, CardContent } from "~components/ui/card";
import {
  formatPercent,
  getStatusIcon,
  setProgressClasses,
  setRatingsClasses,
} from "~lib/utils";
import { Button } from "~components/ui/button";
import type { Website } from "~types/website";
import { useRouter } from "next/navigation";

export default function WebsiteStatusSummary({
  websiteData,
}: {
  websiteData: Website;
}) {
  const router = useRouter()
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex justify-between">Website Analysis
        <Button onClick={() => router.push("/analyze")}>Go Back</Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          {/* URL + status badge */}
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 p-3 rounded-md dark:bg-black-100 bg-black-40 justify-between">
                <span className="font-mono text-sm">{websiteData.url}</span>
                <span>
                  {getStatusIcon(websiteData.isScam, websiteData.rating)}
                </span>
              </div>
            </div>

            {/* Overall score */}
            <div className="space-y-2">
              <div className="flex items-center gap-4 p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Overall Score</span>
                    <span
                      className={`text-lg font-bold ${setRatingsClasses(websiteData.rating)}`}
                    >
                      {websiteData.rating} / 10
                    </span>
                  </div>
                  <div className="w-full bg-black-80 rounded-full h-2">
                    <div
                      className={`bg-gradient-to-r h-2 rounded-full ${setProgressClasses(websiteData.rating)}`}
                      style={{ width: formatPercent(websiteData.rating) }}
                    />
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm">Risk Factor</div>
                  <div
                    className={`text-lg font-semibold ${setRatingsClasses(websiteData.rating)}`}
                  >
                    {websiteData.riskFactor}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Summary</label>
            <div className="py-4 rounded-md">
              <p className="text-sm leading-relaxed">{websiteData.summary}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
