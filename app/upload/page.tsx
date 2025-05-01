"use client";

import { useState } from "react";

export default function UploadPage() {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Upload failed: ${res.status} ${errorText}`);
      }

      const data = await res.json();
      setFileUrl(data.url);
      console.log("Uploaded URL:", data.url);
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Upload File</h1>
      <input type="file" onChange={handleUpload} className="mb-4" />

      {uploading && <p>Uploading...</p>}

      {fileUrl && (
        <div className="mt-4">
          {fileUrl.endsWith(".pdf") ? (
            <iframe src={fileUrl} width="100%" height="600px" />
          ) : fileUrl.match(/\.(mp4|mov)$/) ? (
            <video src={fileUrl} controls width="100%" />
          ) : (
            <img src={fileUrl} alt="Uploaded" className="w-1/2" />
          )}
          <p className="mt-2">
            <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
              Open Uploaded File
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
