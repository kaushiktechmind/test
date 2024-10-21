"use client";
import {
  EllipsisVerticalIcon,
  EyeIcon,
  PencilSquareIcon,
  CloudArrowUpIcon,
  InformationCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Footer from "@/components/vendor-dashboard/Vendor.Footer";
import CheckboxCustom from "@/components/Checkbox";
import { SearchIcon } from "@/public/data/icons";
import { adminRecentListings } from "@/public/data/adminrecentlisting";
import Pagination from "@/components/vendor-dashboard/Pagination";
import Image from "next/image";
import dynamic from 'next/dynamic';
const QuillEditor = dynamic(() => import('../../../../components/QuillEditor'), { ssr: false });
import React, { useState, useEffect } from "react";


const Page = () => {
  const [description, setDescription] = useState("");
  return (
    <div className="bg-[var(--bg-2)]">
      <div className="flex items-center justify-between flex-wrap px-3 py-5 md:p-[30px] gap-5 lg:p-[60px] bg-[var(--dark)]">
        <h2 className="h2 text-white">Hotel Policy</h2>
        <Link href="/add-property" className="btn-primary">
          <EyeIcon className="w-5 h-5" /> View All Hotel
        </Link>
      </div>
      {/* statisticts */}
      <section className="grid z-[1] grid-cols-12 gap-4 mb-6 lg:gap-6 px-3 md:px-6 bg-[var(--bg-2)] relative after:absolute after:bg-[var(--dark)] after:w-full after:h-[60px] after:top-0 after:left-0 after:z-[-1] pb-10 xxl:pb-0">
        <div className="col-span-12 lg:col-span-6 p-4 md:p-6 lg:p-10 rounded-2xl bg-white">
          <h3 className="border-b h3 pb-6">Add Policies</h3>
          <form>
          <p className="mt-6 mb-4 text-xl font-medium">Name :</p>
                  <input
                    type="text"
                    className="w-full border p-2 focus:outline-none rounded-md  text-base"
                    placeholder="Policy Name"
                  />
           
            <p className="mt-6 mb-4 text-xl font-medium">Description :</p>
                <QuillEditor onChange={setDescription} value={description} />
            
            
            <div className="mt-[20px]">
              <Link href="#" className="btn-primary font-semibold">
                <span className="inline-block"> Add New </span>
              </Link>
            </div>
            {/* <button className="btn-primary">Apply</button> */}

            {/* <h5 className="text-base sm:text-lg md:text-xl font-medium pb-4">
              Tagline:
            </h5>
            <CheckboxCustom label="I agree to the privacy policy" />
            <h5 className="text-base xm:text-lg md:text-xl font-medium py-4">
              Tag
            </h5> */}
            {/* <CheckboxCustom label="I agree to the Terms & Conditions" /> */}

          </form>
        </div>
        <div className="col-span-12 lg:col-span-6 p-4 md:p-6 lg:p-10 rounded-2xl bg-white">
          <div className="flex flex-wrap gap-3 justify-between mb-7">
            <form className="flex flex-wrap items-center gap-3">
              <div className="border rounded-full flex items-center p-1 pr-2 xl:pr-4 bg-[var(--bg-1)]">
                <input
                  type="text"
                  placeholder="Search"
                  className="rounded-full bg-transparent focus:outline-none p-2 xl:px-4"
                />
                <SearchIcon />
              </div>
            </form>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full whitespace-nowrap">
              <thead>
                <tr className="text-left bg-[var(--bg-1)] border-b border-dashed">
                  <th className="py-3 lg:py-4 px-2">Date</th>
                  <th className="py-3 lg:py-4 px-2">Name</th>
                  <th className="py-3 lg:py-4 px-2">Action</th>

                </tr>
              </thead>
              <tbody>
                {adminRecentListings.slice(0, 6).map(({ id, agent, date }) => (
                  <tr
                    key={id}
                    className="border-b border-dashed hover:bg-[var(--bg-1)] duration-300">
                    <td className="py-3 lg:py-4 px-2">{date}</td>
                    <td className="py-3 lg:py-4 px-2">{agent}</td>
                    <td className="py-3 lg:py-4 px-2 flex gap-2 items-center">
                      <Link href="/hotel/edit-hotel-policy" className="text-primary">
                        <PencilSquareIcon className="w-5 h-5" />
                      </Link>
                      <button className="text-[var(--secondary-500)]">
                        <TrashIcon className="w-5 h-5" />
                      </button>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Page;
