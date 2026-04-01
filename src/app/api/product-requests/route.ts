import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const requests = await prisma.productRequest.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(requests);
  } catch (error) {
    console.error("Error fetching product requests:", error);
    return NextResponse.json(
      { error: "Failed to fetch product requests" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, productName, description } = body;

    if (!name || !productName) {
      return NextResponse.json(
        { error: "Name and product name are required" },
        { status: 400 }
      );
    }

    const productRequest = await prisma.productRequest.create({
      data: {
        name,
        email: email || "",
        productName,
        description: description || "",
      },
    });

    return NextResponse.json(productRequest, { status: 201 });
  } catch (error) {
    console.error("Error creating product request:", error);
    return NextResponse.json(
      { error: "Failed to create product request" },
      { status: 500 }
    );
  }
}
