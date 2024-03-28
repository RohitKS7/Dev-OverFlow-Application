import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ========================================================
// Converting computational date into Readable Date
// Function created with the help of CHAT-GPT,
// Searched like this for the answer
/* 
create a javascript function that looks like this:
 
"export const getTimestamp = (createdAt: Date): string => {}"

and whose goal is to take-in a date and return a string in this format: (time) ago.

examples: 5 days ago, 2 minutes ago and similiar
*/

export const getTimestamp = (createdAt: Date): string => {
  const now = new Date();

  /* I was getting this error from typescript 
  `The right-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.`
  In this line: 'const elapsed = now - createdAt;' 
  
  So, I asked the chat-gpt about it and I got the updated version answer like this -

  'To resolve the TypeScript error, you can explicitly cast the dates to number before performing arithmetic operations. By using .getTime() on the Date objects, you convert them to numbers representing milliseconds since the UNIX epoch, which allows you to perform arithmetic operations without TypeScript complaints.'
  */
  const elapsed = now.getTime() - createdAt.getTime();

  // Define time intervals in milliseconds
  const intervals = {
    year: 365 * 24 * 60 * 60 * 1000,
    month: 30 * 24 * 60 * 60 * 1000,
    week: 7 * 24 * 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
  };

  // Find the largest interval that fits the elapsed time
  for (const [unit, interval] of Object.entries(intervals)) {
    const value = Math.floor(elapsed / interval);
    if (value >= 1) {
      return `${value} ${unit}${value === 1 ? "" : "s"} ago`;
    }
  }

  // If the time difference is less than a minute, return 'just now'
  return "just now";
};

// ======================================================

// Function to convert Big Numbers in String ex:(10000 => 10K)
/* Chat-gpt entered question:-

   create another typescript function that takes-in a big number and returns a string of the number with the extension of M for millions and K for thousands and immediatly divides the number by the factor

*/
export const formatBigNumber = (num: number): string => {
  if (Math.abs(num) >= 1e6) {
    return (num / 1e6).toFixed(1) + "M";
  } else if (Math.abs(num) >= 1e3) {
    return (num / 1e3).toFixed(1) + "K";
  } else if (num !== undefined) {
    // Add this condition to check if num is defined
    return num.toString();
  } else {
    return "0"; // Return a default value if num is undefined
  }
};

//  this function `formatTimestamp` that takes in a Date object and returns a string in the format 'Sep 24, 2023, 8:10 PM':
export const formatTimestamp = (
  createdAt: Date,
  includeMonthYear: boolean = false
): string => {
  // Create options for formatting the date in the original way
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  // If includeMonthYear is true, extract month and year from the createdAt date
  if (includeMonthYear) {
    const month = createdAt.toLocaleString("default", { month: "long" });
    const year = createdAt.getFullYear();

    // Return the formatted string with month and year
    return `${month} ${year}`;
  }

  // Format the date using Intl.DateTimeFormat
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    createdAt
  );

  return formattedDate;
};
