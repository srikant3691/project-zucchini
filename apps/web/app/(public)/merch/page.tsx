"use client";

import { useState } from "react";
import Link from "next/link";
import MainButton from "@/components/ui/main-button";
import SectionHeading from "@/components/ui/section-heading";
import SizeChartModal from "@/components/merch/size-chart-modal";
import MerchSection from "@/components/merch/merch-section";
import {
  REGULAR_FIT_PRODUCTS,
  OVERSIZED_PRODUCTS,
  REGULAR_SIZE_CHART,
  OVERSIZED_SIZE_CHART,
  ORDER_LINK,
} from "@/config/merch";

export default function MerchPage() {
  const [modalState, setModalState] = useState<{ isOpen: boolean; image: string; title: string }>({
    isOpen: false,
    image: "",
    title: "",
  });

  const openModal = (image: string, title: string) => {
    setModalState({ isOpen: true, image, title });
  };

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="relative w-full min-h-screen py-40 px-4 md:px-8 font-sans">
      <div className="fixed inset-0 w-full h-full back-image -z-10" />

      <div
        className="
            fixed inset-0 w-full h-full bg-black/55 pointer-events-none
            [mask-image:radial-gradient(circle_at_center,transparent_30%,black_80%)]
            z-0
        "
      />
      <div className="relative z-10 max-w-7xl mx-auto space-y-12">
        <div className="space-y-8 text-center">
          <SectionHeading
            title={
              <>
                <span className="hidden min-[360px]:inline">Official </span>Merchandise
              </>
            }
          />

          <div className="max-w-5xl mx-auto space-y-6 text-gray-200 text-xl leading-relaxed rounded-2xl ">
            <p className="font-berlins">
              Inspired by this year’s vibrant theme{" "}
              <span className="text-[#E74C3C]  font-berkshire">Carnival of Colours</span> we bring
              you exclusive oversized and regular-fit T-shirts.
            </p>
          </div>
        </div>

        <div className="space-y-20 mt-20">
          <MerchSection
            title="Regular Fit Collection"
            products={REGULAR_FIT_PRODUCTS}
            onSizeChartClick={() => openModal(REGULAR_SIZE_CHART, "Regular Fit Size Chart")}
            titleGradient="from-purple-400 to-pink-600"
          />

          <MerchSection
            title="Oversized Collection"
            products={OVERSIZED_PRODUCTS}
            onSizeChartClick={() => openModal(OVERSIZED_SIZE_CHART, "Oversized Fit Size Chart")}
            titleGradient="from-blue-400 to-cyan-600"
          />
        </div>
      </div>

      <SizeChartModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        imageSrc={modalState.image}
        title={modalState.title}
      />
    </div>
  );
}
