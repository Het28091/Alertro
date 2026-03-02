import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function POST(req) {
    try {
        const formData = await req.formData();
        const files = formData.getAll("files");

        if (!files || files.length === 0) {
            return NextResponse.json({ error: "No files received" }, { status: 400 });
        }

        const uploadDir = path.join(process.cwd(), "public/uploads");
        await fs.mkdir(uploadDir, { recursive: true });

        const urls = [];
        for (const file of files) {
            if (typeof file === "string") continue; // Just in case
            const buffer = Buffer.from(await file.arrayBuffer());
            const filename = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
            await fs.writeFile(path.join(uploadDir, filename), buffer);
            urls.push(`/uploads/${filename}`);
        }

        return NextResponse.json({ urls });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}
