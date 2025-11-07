"use client";
import { ProgressProvider } from "@bprogress/next/app";
import React from "react";

export default function Progress({ children }) {
  return (
    <ProgressProvider
      height="2px"
      color={"oklch(0.577 0.245 27.325)"} // uses Shadcn's primary color
      options={{ showSpinner: false }}
      shallowRouting
    >
      {children}
    </ProgressProvider>
  );
}
