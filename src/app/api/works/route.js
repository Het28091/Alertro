import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("AlertroDB");

        // Fetch works and convert _id to id
        const works = await db.collection("works").find({}).toArray();
        const formattedWorks = works.map(w => ({
            ...w,
            id: w._id.toString(),
            _id: undefined
        }));

        return NextResponse.json(formattedWorks);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch from MongoDB" }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const newWork = await req.json();
        const client = await clientPromise;
        const db = client.db("AlertroDB");

        const result = await db.collection("works").insertOne(newWork);

        return NextResponse.json({ ...newWork, id: result.insertedId.toString() }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to save to MongoDB" }, { status: 500 });
    }
}
