import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { status, adminNotes } = body;

    const productRequest = await prisma.productRequest.update({
      where: { id: params.id },
      data: {
        ...(status !== undefined && { status }),
        ...(adminNotes !== undefined && { adminNotes }),
      },
    });

    return NextResponse.json(productRequest);
  } catch (error) {
    console.error("Error updating product request:", error);
    return NextResponse.json(
      { error: "Failed to update product request" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.productRequest.delete({ where: { id: params.id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting product request:", error);
    return NextResponse.json(
      { error: "Failed to delete product request" },
      { status: 500 }
    );
  }
}
