import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const formData = await req.formData();
        const files = formData.getAll("files");

        if (!files || files.length === 0) {
            return NextResponse.json({ error: "No files received" }, { status: 400 });
        }

        const urls = [];
        for (const file of files) {
            if (typeof file === "string") continue; // Just in case
            const buffer = Buffer.from(await file.arrayBuffer());
            const base64 = buffer.toString("base64");
            const mimeType = file.type || "image/jpeg";
            const dataUri = `data:${mimeType};base64,${base64}`;
            urls.push(dataUri);
        }

        return NextResponse.json({ urls });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}
