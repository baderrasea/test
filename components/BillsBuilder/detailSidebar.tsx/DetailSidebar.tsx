"use client";
import * as React from "react";
import { TemplateSection } from "./TemplateSection";
import { PageSection } from "./PageSection";

const DetailSidebar: React.FC = () => {
  return (
    <main className="p-5 mx-auto w-full bg-white rounded-3xl max-w-[480px]">
      <header className="text-xl font-semibold text-right text-gray-600">
        خصائص القالب
      </header>
      <div className="mt-5 w-full">
        <TemplateSection />
      </div>
      <div className="mt-5 w-full">
        <PageSection />
      </div>
    </main>
  );
};

export default DetailSidebar;
