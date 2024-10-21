"use client";

import React, { Fragment, useState } from "react";
import {
  PencilSquareIcon,
  TrashIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Footer from "@/components/vendor-dashboard/Vendor.Footer";
import Pagination from "@/components/vendor-dashboard/Pagination";
import { StarIcon } from "@heroicons/react/20/solid";
import { adminRecentListings } from "@/public/data/adminrecentlisting";
import { Dialog, Transition } from "@headlessui/react";

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hotelToDelete, setHotelToDelete] = useState<string | null>(null);

  const openModal = (hotel: string) => {
    setHotelToDelete(hotel);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setHotelToDelete(null);
  };

  const handleDelete = () => {
    console.log("Hotel deleted:", hotelToDelete);
    closeModal();
  };

  return (
    <div className="bg-[var(--bg-2)]">
      <div className="flex items-center justify-between flex-wrap px-3 py-5 md:p-[30px] gap-5 lg:p-[60px] bg-[var(--dark)]">
        <h2 className="h2 text-white">All Hotels</h2>
        <Link href="/hotel/add-new-hotel" className="btn-primary">
          <PlusCircleIcon className="w-5 h-5" /> Add New Hotel
        </Link>
      </div>

      {/* Recent bookings */}
      <section className="bg-[var(--bg-2)] px-3 lg:px-6 pb-4 lg:pb-6 relative after:absolute after:bg-[var(--dark)] after:w-full after:h-[60px] after:top-0 after:left-0">
        <div className="p-3 md:py-6 lg:py-8 md:px-8 lg:px-10 border rounded-2xl bg-white relative z-[1]">
          <div className="flex flex-wrap gap-3 justify-between mb-7">
            <form className="flex flex-wrap items-center gap-3">
              <div className="border rounded-full flex items-center p-1 pr-2 bg-[var(--bg-1)]">
                <input
                  type="text"
                  placeholder="Search"
                  className="rounded-full w-[200px] sm:w-full bg-transparent focus:outline-none p-2 lg:pl-4"
                />
              </div>
            </form>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full table-auto whitespace-nowrap">
              <thead>
                <tr className="text-left bg-[var(--bg-1)] border-b border-dashed">
                  <th className="py-3 lg:py-4 px-2">Date</th>
                  <th className="py-3 lg:py-4 px-2 md:px-5">Hotel Name</th>
                  <th className="py-3 lg:py-4 px-2">Location</th>
                  <th className="py-3 lg:py-4 px-2">Review</th>
                  <th className="py-3 lg:py-4 px-2">Status</th>
                  <th className="py-3 lg:py-4 px-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {adminRecentListings.map(({ id, date, location, name, review, status }) => (
                  <tr
                    key={id}
                    className="border-b border-dashed hover:bg-[var(--bg-1)] duration-300"
                  >
                    <td className="py-3 lg:py-4 px-2">{date}</td>
                    <td className="py-3 lg:py-4 px-2 md:px-5">
                      <Link href="/hotel/edit-hotel" className="text-blue-500 hover:underline">
                        {name}
                      </Link>
                    </td>
                    <td className="py-3 lg:py-4 px-2">{location}</td>
                    <td className="py-3 lg:py-4 px-2">
                      <span className="flex gap-1 items-center">
                        <StarIcon className="w-5 h-5 text-[var(--tertiary)]" />
                        {review}
                      </span>
                    </td>
                    <td className="py-3 lg:py-4 px-2">
                      <div className="w-32">{status}</div>
                    </td>
                    <td className="py-3 lg:py-7 px-2 flex gap-2 items-center">
                      <a href="./edit-hotel" className="text-primary">
                        <PencilSquareIcon className="w-5 h-5" />
                      </a>
                      <button
                        className="text-[var(--secondary-500)]"
                        onClick={() => openModal(name)}
                      >
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

      {/* Modal for deletion confirmation */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Delete Hotel
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete the hotel{" "}
                      <span className="font-bold">{hotelToDelete}</span>? This action cannot be undone.
                    </p>
                  </div>

                  <div className="mt-4 flex justify-end gap-3">
                    <button
                      className="btn-outline"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn-primary"
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Page;
