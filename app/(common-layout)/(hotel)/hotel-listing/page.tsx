"use client";
import CardPagination from "@/components/CardPagination";
import HotelListingList from "@/components/HotelListingList";
import { useEffect, useState } from "react";

interface Hotel {
  property_id: number; // Assuming property_id is a number
  hotel_name: string;
  starting_price: number; // Assuming starting_price is a number
  ratings: number; // Assuming ratings is a number
  full_address: string;
  featured_image: string;
}

const Page = () => {
  const [hotels, setHotels] = useState<{ 
    id: number; 
    img: string; 
    name: string; 
    rating: number; 
    location: string; 
    price: number; 
    favourite: boolean; 
  }[]>([]); // Define the state type as an array of objects with specific properties

  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch('https://yrpitsolutions.com/tourism_api/api/admin/hotels');
        const data = await response.json(); // No type assertion for now, just log it
    
        console.log("Fetched data:", data); // Log the raw data
    
        // If the API returns an object with hotels in a specific property, access that property
        // For example, if the structure is { hotels: [...] }, use: data.hotels
    
        const formattedHotels = Array.isArray(data) ? data.map((hotel: Hotel) => ({
          id: hotel.property_id,
          img: hotel.featured_image,
          name: hotel.hotel_name,
          rating: hotel.ratings,
          location: hotel.full_address,
          price: hotel.starting_price,
          favourite: false,
        })) : []; // Default to an empty array if data is not an array
    
        console.log("Formatted hotels:", formattedHotels); // Log the formatted data
    
        setHotels(formattedHotels);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      } finally {
        setLoading(false);
      }
    };
    

    fetchHotels();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      {hotels.map((item) => (
        <HotelListingList key={item.id} item={item} />
      ))}
      {/* <CardPagination /> */}
    </>
  );
};

export default Page;
