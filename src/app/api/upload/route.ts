import { type NextRequest, NextResponse } from "next/server";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "File size exceeds 5MB limit" }, { status: 400 });
    }

    // Read file as buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(7);
    const fileExtension = file.name.split(".").pop();
    const fileName = `${timestamp}-${randomString}.${fileExtension}`;

    // For now, we're returning a reference that can be used to retrieve the file
    const fileUrl = `/uploads/${fileName}`;

    // Example with Vercel Blob:
    // const blob = await put(fileName, buffer, { access: 'public' })
    // const fileUrl = blob.url

    return NextResponse.json(
      {
        success: true,
        url: fileUrl,
        fileName: file.name,
        fileSize: file.size,
        mimeType: file.type,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
