"use client";


import { redirect } from "next/navigation";

// const staggerContainer = {
//   initial: {},
//   animate: {
//     transition: {
//       staggerChildren: 0.1
//     }
//   }
// };

// const fadeIn = {
//   initial: { opacity: 0, y: 20 },
//   animate: { opacity: 1, y: 0 },
//   exit: { opacity: 0, y: 20 }
// };

const Page = () => {
  return redirect('/');
};

export default Page;