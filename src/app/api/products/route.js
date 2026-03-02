import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("AlertroDB");

        // Fetch products and convert _id to id
        const products = await db.collection("products").find({}).toArray();
        const formattedProducts = products.map(p => ({
            ...p,
            id: p._id.toString(),
            _id: undefined
        }));

        return NextResponse.json(formattedProducts);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch from MongoDB" }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const newProduct = await req.json();
        const client = await clientPromise;
        const db = client.db("AlertroDB");

        const result = await db.collection("products").insertOne(newProduct);

        return NextResponse.json({ ...newProduct, id: result.insertedId.toString() }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to save to MongoDB" }, { status: 500 });
    }
}
