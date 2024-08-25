"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { marked } from 'marked'; 
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

interface PageProps {
  params: {
    title: string;
  };
}

function Page({ params }: PageProps) {
  const { title } = params;
  const [data, setData] = useState('');
  
  
  const newTitle = title[0].replaceAll("%20", " ");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post('/api/gemini', { title: newTitle });
        setData(res.data.text);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, [newTitle]); 

  
  const renderMarkdown = (markdownText: string) => {
    return { __html: marked(markdownText) };
  };

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-black">
      <ResizablePanelGroup
        direction="vertical"
        className="h-full w-full rounded-lg border"
      >
        
        <ResizablePanel defaultSize={150}>
          <div className="flex h-full items-center justify-center p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
            <h1 className="text-3xl font-bold">{newTitle}</h1>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        
        
        <ResizablePanel defaultSize={500} className=' overflow-auto'>
          <div className="flex h-full w-full items-center justify-center p-6 overflow-auto bg-white dark:bg-neutral-900 rounded-b-lg">
            
            <div className="text-lg text-center leading-relaxed" dangerouslySetInnerHTML={renderMarkdown(data)} />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default Page;
