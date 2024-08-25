'use client';

import { SingleImageDropzone } from '@/components/SingleImageDropzone';
import { useEdgeStore } from '@/lib/edgestore';
import { useState } from 'react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import axios from 'axios';
import { GridPattern } from '@/components/ui/file-upload';

function Page() {
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();
  const [gotResponse, setGotResponse] = useState(false);
  const [story, setStory] = useState("");

  const handleUpload = async () => {
    if (file) {
      try {
        const res = await edgestore.publicFiles.upload({
          file,
          onProgressChange: (progress) => {
            console.log(progress); 
          },
        });

        const url = res.url;
        console.log(url);

        const storyRes = await axios.post("/api/imagecontext", { url });
        console.log(storyRes.data);

        setStory(storyRes.data);
        setGotResponse(true);
      } catch (error) {
        console.error("Error uploading image or getting story:", error);
      }
    }
  };

  return (
    <div className="relative bg-black w-full h-screen flex flex-col">
      
      <div className="absolute inset-0 z-0 overflow-hidden">
        <GridPattern />
      </div>

      
      <div className="relative z-10 flex flex-col items-center justify-center p-4 space-y-4">
        <SingleImageDropzone
          width={200}
          height={200}
          value={file}
          onChange={(file) => setFile(file)}
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleUpload}
        >
          Upload
        </button>
      </div>

      
      {gotResponse && (
        <div className="relative z-10 flex-grow flex items-center justify-center p-4">
        <ResizablePanelGroup
          direction="vertical"
          className="w-[80%] max-w-4xl rounded-lg border bg-white dark:bg-neutral-900"
        >
          
          <ResizablePanel defaultSize={150} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <div className="flex h-full items-center justify-center p-6 rounded-t-lg">
              <h1 className="text-3xl font-bold">Drag Up To reveal </h1>
            </div>
          </ResizablePanel>
          <ResizableHandle />
      
          
          <ResizablePanel defaultSize={500} className="overflow-auto">
            <div className="flex h-full w-full items-center justify-center p-6">
              <p className="text-md text-center leading-relaxed">{story}</p>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      )}
    </div>
  );
}

export default Page;
