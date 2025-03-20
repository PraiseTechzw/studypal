"use client"

import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      
      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        <Header />
        <div className="min-h-screen">
          <main className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
