"use client";

import { useState, useTransition } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "~components/ui/card";
import { Badge } from "~components/ui/badge";
import { Button } from "~components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "~components/ui/table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import type { Review } from "~types/review";
import { fetchWebsiteReviews } from "./actions";
import { extractDomainWord } from "~lib/utils";

interface Props {
  websiteId: string;
  reviews: Review[];
  totalReviews: number;
  page: number;
  limit: number;
}

export default function ReviewsTable({
  websiteId,
  reviews: initialReviews,
  totalReviews,
  page: initialPage,
  limit,
}: Props) {
  const [data, setData] = useState<Review[]>(initialReviews);
  const [currentPage, setCurrent] = useState(initialPage);
  const [pending, start] = useTransition();
  const [selectedReview, setSelectedReview] = useState<string | null>(null);

  const totalPages = Math.ceil(totalReviews / limit);
  const startIndex = (currentPage - 1) * limit;

  function goToPage(newPage: number) {
    if (newPage < 1 || newPage > totalPages) return;
    start(() => {
      fetchWebsiteReviews(websiteId, newPage, limit)
        .then((res) => {
          setData(res.reviews);
          setCurrent(res.page);
        })
        .catch((err) => {
          console.error(err);
          toast.error(err.message || "Failed to load page");
        });
    });
  }

  function toggleSelect(id: string) {
    setSelectedReview((prev) => (prev === id ? null : id));
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Reviews</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Source</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead className="w-[120px]">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((r) => (
              <TableRow
                key={r._id}
                className={`cursor-pointer transition-colors ${
                  selectedReview === r._id ? "border-l-4 border-l-blue-500" : ""
                }`}
                onClick={() => {
                  toggleSelect(r._id);
                  window.open(r.link, "_blank", "noopener,noreferrer");
                }}
              >
                <TableCell>
                  <Badge className="text-xs">{extractDomainWord(r.link)}</Badge>
                </TableCell>
                <TableCell className="font-medium">{r.subject}</TableCell>
                <TableCell>{new Date(r.date).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm">
            Showing {startIndex + 1}–
            {Math.min(startIndex + limit, totalReviews)} of {totalReviews}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1 || pending}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {Array.from({ length: totalPages }, (_, i) => {
              const p = i + 1;
              return (
                <Button
                  key={p}
                  size="sm"
                  variant={p === currentPage ? "default" : "outline"}
                  className="w-8 h-8 p-0"
                  onClick={() => goToPage(p)}
                  disabled={pending}
                >
                  {p}
                </Button>
              );
            })}

            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages || pending}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
