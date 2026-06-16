import { NextResponse } from "next/server"
import { getDashboardMetrics } from "@/lib/data"

export async function GET() {
  const metrics = getDashboardMetrics()
  return NextResponse.json(metrics)
}
