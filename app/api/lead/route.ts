import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { company, website, name, email, phone, locale, context } = data;

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    // Log the lead to a JSON file (serverless-safe, append to Vercel /tmp)
    const lead = {
      timestamp: new Date().toISOString(),
      company: company || "",
      website: website || "",
      name: name || "",
      email,
      phone: phone || "",
      locale: locale || "fr",
      context: context || "",
    };

    // Store in /tmp (Vercel serverless) — ephemeral but useful for debugging
    const logPath = path.join("/tmp", "leads.json");
    let leads: unknown[] = [];
    try {
      const existing = fs.readFileSync(logPath, "utf-8");
      leads = JSON.parse(existing);
    } catch {
      // File doesn't exist yet
    }
    leads.push(lead);
    fs.writeFileSync(logPath, JSON.stringify(leads, null, 2));

    // Send notification email via mailto fallback
    // TODO: Replace with proper email API (Resend, SendGrid, or Gmail API)
    // For now, log to console (visible in Vercel function logs)
    console.log("=== NEW LEAD ===");
    console.log(JSON.stringify(lead, null, 2));
    console.log("================");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead API error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
