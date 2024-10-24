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
import Pagination from "@/components/vendor-dashboard/Pagination";
import Image from "next/image";
import dynamic from 'next/dynamic';
import React, { useState, useEffect } from "react";

const QuillEditor = dynamic(() => import('../../../../components/QuillEditor'), { ssr: false });

// Define the Policy interface
interface Policy {
  id: number; // or string depending on your API response
  policy_title: string;
  created_at: string; // Adjust type if necessary (e.g., Date)
}

const Page = () => {
  const [description, setDescription] = useState("");
  const [policyTitle, setPolicyTitle] = useState(""); // State for policy title
  const [policies, setPolicies] = useState<Policy[]>([]); // Type the state as Policy[]

  // Fetch policies from the API
  useEffect(() => {
    const fetchPolicies = async () => {
      const token = localStorage.getItem('access_token'); // Retrieve the Bearer token

      try {
        const response = await fetch('https://yrpitsolutions.com/tourism_api/api/admin/get_policy', {
          headers: {
            'Authorization': `Bearer ${token}`, // Add the token to the headers
          },
        });
        const data = await response.json();
        console.log('Fetched policies:', data); // Log the fetched data

        if (Array.isArray(data)) {
          setPolicies(data); // Set the fetched data to state if it's an array
        } else {
          console.error('Fetched data is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching policies:', error);
      }
    };

    fetchPolicies();
  }, []); // Run only once when component mounts

  // Delete policy function
  const handleDelete = async (id: number) => { // Type the id parameter
    if (confirm('Are you sure you want to delete this policy?')) {
      const token = localStorage.getItem('access_token'); // Retrieve the Bearer token

      try {
        const response = await fetch(`https://yrpitsolutions.com/tourism_api/api/admin/delete_policy_by_id/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`, // Add the token to the headers
          },
        });

        if (response.ok) {
          // Filter out the deleted policy from state
          setPolicies(policies.filter(policy => policy.id !== id));
          alert('Policy deleted successfully');
        } else {
          throw new Error('Failed to delete the policy');
        }
      } catch (error) {
        console.error('Error deleting policy:', error);
        alert('An error occurred while deleting the policy');
      }
    }
  };

  // Function to handle adding a new policy
  const handleAddPolicy = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    const newPolicy = {
      policy_title: policyTitle,
      policy_description: description,
    };

    const token = localStorage.getItem('access_token'); // Retrieve the Bearer token

    try {
      const response = await fetch('https://yrpitsolutions.com/tourism_api/api/admin/save_policy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Add the token to the headers
        },
        body: JSON.stringify(newPolicy),
      });

      if (response.ok) {
        const result = await response.json();
        const addedPolicy = result.data;

        // Update the state with the new policy
        setPolicies((prevPolicies) => [
          ...prevPolicies,
          {
            id: addedPolicy.id,
            policy_title: addedPolicy.policy_title,
            created_at: addedPolicy.created_at,
          },
        ]);
        alert(result.message); // Show success message
        setPolicyTitle(""); // Clear input
        setDescription(""); // Clear description
      } else {
        const errorText = await response.text(); // Log error details
        console.error('Error details:', errorText);
        throw new Error('Failed to add policy: ' + errorText);
      }
    } catch (error) {
      console.error('Error adding policy:', error);
      alert('An error occurred while adding the policy.');
    }
  };

  return (
    <div className="bg-[var(--bg-2)]">
      <div className="flex items-center justify-between flex-wrap px-3 py-5 md:p-[30px] gap-5 lg:p-[60px] bg-[var(--dark)]">
        <h2 className="h2 text-white">Hotel Policy</h2>
        <Link href="/add-property" className="btn-primary">
          <EyeIcon className="w-5 h-5" /> View All Hotel
        </Link>
      </div>
      {/* statistics */}
      <section className="grid z-[1] grid-cols-12 gap-4 mb-6 lg:gap-6 px-3 md:px-6 bg-[var(--bg-2)] relative after:absolute after:bg-[var(--dark)] after:w-full after:h-[60px] after:top-0 after:left-0 after:z-[-1] pb-10 xxl:pb-0">
        <div className="col-span-12 lg:col-span-6 p-4 md:p-6 lg:p-10 rounded-2xl bg-white">
          <h3 className="border-b h3 pb-6">Add Policies</h3>
          <form onSubmit={handleAddPolicy}>
            <p className="mt-6 mb-4 text-xl font-medium">Name :</p>
            <input
              type="text"
              className="w-full border p-2 focus:outline-none rounded-md text-base"
              placeholder="Policy Name"
              value={policyTitle} // Bind the input to the policyTitle state
              onChange={(e) => setPolicyTitle(e.target.value)} // Update state on input change
              required // Optional: Add validation
            />
            <p className="mt-6 mb-4 text-xl font-medium">Description :</p>
            <QuillEditor onChange={setDescription} value={description} />
            <div className="mt-[20px]">
              <button type="submit" className="btn-primary font-semibold"> {/* Change Link to button */}
                <span className="inline-block"> Add New </span>
              </button>
            </div>
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
                {(Array.isArray(policies) ? policies.slice(0, 6) : []).map(({ id, policy_title, created_at }) => (
                  <tr
                    key={id}
                    className="border-b border-dashed hover:bg-[var(--bg-1)] duration-300">
                    <td className="py-3 lg:py-4 px-2">{new Date(created_at).toLocaleDateString()}</td>
                    <td className="py-3 lg:py-4 px-2">{policy_title}</td>
                    <td className="py-3 lg:py-4 px-2 flex gap-2 items-center">
                      <Link  href={`/hotel/edit-hotel-policy?policyId=${id}`} className="text-primary">
                        <PencilSquareIcon className="w-5 h-5" />
                      </Link>
                      <button 
                        className="text-[var(--secondary-500)]" 
                        onClick={() => handleDelete(id)}
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

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Page;
