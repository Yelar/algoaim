'use client'
import Landing from "@/app/components/Landing";
import React from "react";


export default function Interview({params} : any) {
  const title = params.title_slug;

  return (
    
    <Landing title={title}/>
    
  );
}