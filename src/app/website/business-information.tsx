import { Card, CardHeader, CardTitle, CardContent } from "~components/ui/card";
import type { Website } from "~types/website";
import { BriefcaseBusiness, ShoppingCart, SquareUser } from "lucide-react";

export default function BusinessInformation({
  websiteData,
}: {
  websiteData: Website;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          Business Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="py-4 space-y-1">
          <h3 className="font-semibold flex gap-2">
            <ShoppingCart />
            Product & Service
          </h3>
          <p className="text-sm leading-relaxed">
            {websiteData.productOrService}
          </p>
        </div>
        <div className="py-4 space-y-1">
          <h3 className="font-semibold flex gap-2">
            <BriefcaseBusiness />
            Business Category
          </h3>
          <p className="text-sm leading-relaxed">
            {websiteData.businessCategory}
          </p>
        </div>
        <div className="py-4 space-y-1">
          <h3 className="font-semibold flex gap-2">
            <SquareUser />
            Target Audience
          </h3>
          <p className="text-sm leading-relaxed">
            {websiteData.targetAudience}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
