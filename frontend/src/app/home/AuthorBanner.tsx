import React from 'react';
import AuthorCard from "@/app/home/AuthorCard";
import BannerTitle from "@/app/home/BannerTitle";

const AuthorBanner = () => {
    return (
        <div className="banner flex">
            <BannerTitle/>
            <AuthorCard/>
        </div>
    );
};

export default AuthorBanner;
