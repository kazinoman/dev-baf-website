"use client";
import React from "react";
import { CommentCard } from "./CommentCard";
import author from "@/assets/images/author/author.jpg";
import user1 from "@/assets/images/author/user1.png";
import user2 from "@/assets/images/author/user2.png";
import user3 from "@/assets/images/author/user3.png";

const CommentPage = () => {
  const handleReply = () => {
    console.log("Reply clicked");
  };

  return (
    <div className="mt-10 md:mt-20 mb-10 md:mb-20">

      <h5 className="font-bold text-center md:text-start text-xl sm:text-2xl md:text-3xl group-hover:text-primary transition-colors">
        03 comment
      </h5>

      <CommentCard
        author={{
          name: "Rosalina Kelian",
          avatar: user1,
          initials: "RK",
        }}
        date="24th March 2023"
        content="But that's not all. Not to be outdone, individual sellers have increasingly engaged in e-commerce transactions via their own personal websites. And digital marketplaces such as eBay or Etsy serve as exchanges where multitudes of buyers and sellers come together to conduct business. commerce has changed the way people shop and consume products and services."
        onReply={handleReply}
      />

      <div className="lg:ml-20">
        <CommentCard
          author={{
            name: "Rosalina Kelian",
            avatar: user2,
            initials: "RK",
          }}
          date="24th March 2023"
          content="But that's not all. Not to be outdone, individual sellers have increasingly engaged in e-commerce transactions via their own personal websites. And digital marketplaces such as eBay or Etsy serve as exchanges where multitudes of buyers and sellers come together to conduct business. commerce has changed the way people shop and consume products and services."
          onReply={handleReply}
        />
      </div>

      <CommentCard
        author={{
          name: "Rosalina Kelian",
          avatar: user3,
          initials: "RK",
        }}
        date="24th March 2023"
        content="But that's not all. Not to be outdone, individual sellers have increasingly engaged in e-commerce transactions via their own personal websites. And digital marketplaces such as eBay or Etsy serve as exchanges where multitudes of buyers and sellers come together to conduct business. commerce has changed the way people shop and consume products and services."
        onReply={handleReply}
      />
    </div>
  );
};

export default CommentPage;
