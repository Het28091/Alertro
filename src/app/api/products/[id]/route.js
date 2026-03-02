import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function DELETE(req, { params }) {
    try {
        const { id } = await params;
        const client = await clientPromise;
        const db = client.db("AlertroDB");

        await db.collection("products").deleteOne({ _id: new ObjectId(id) });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete product from MongoDB" }, { status: 500 });
    }
}
