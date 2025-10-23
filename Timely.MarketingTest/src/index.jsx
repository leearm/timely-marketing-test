import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

function HomePage({ pageTitle, heroUrl, mainParagraph, rightSideParagraph }) {
  return (
    <main className="w-full">
      {/* Full-width hero section */}
      <header className="relative w-full h-[450px]">
        <img
          src={heroUrl}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      </header>

      {/* column section */}
      {/* Left column */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          <div className="w-full lg:w-3/5">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{pageTitle}</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {mainParagraph || ""}
            </p>
          </div>

          {/* Right column */}
          <div className="w-full lg:w-2/5">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Right Column</h3>
            <p className="text-gray-600">
              {rightSideParagraph || ""}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

const el = document.getElementById("react-root");
if (el) {
  const props = {
    pageTitle: el.dataset.pageTitle,
    heroUrl: el.dataset.heroUrl,
    mainParagraph: el.dataset.mainParagraph,
    rightSideParagraph: el.dataset.rightSideParagraph
  };
  createRoot(el).render(<HomePage {...props} />);
}
