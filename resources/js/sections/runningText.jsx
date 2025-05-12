import React from "react";
import "../../css/app.css";

export default function RunningText() {
    return (
        <section className="bg-red-600 text-white overflow-hidden">
            <div className="relative w-full">
                <div className="marquee flex whitespace-nowrap w-max animate-marquee">
                    <div className="flex items-center gap-8 px-4">
                        <span className="bg-white text-red-600 py-2 px-5 m-3 rounded-sm">
                            Breaking news
                        </span>
                        <span>Running Text Continues</span>
                        <span>More Updates Coming</span>
                        <span>Stay Tuned</span>
                    </div>
                    <div className="flex items-center gap-8 px-4">
                        <span className="bg-white text-red-600 py-2 px-5 m-3 rounded-sm">
                            Breaking news
                        </span>
                        <span>Running Text Continues</span>
                        <span>More Updates Coming</span>
                        <span>Stay Tuned</span>
                    </div>
                    <div className="flex items-center gap-8 px-4">
                        <span className="bg-white text-red-600 py-2 px-5 m-3 rounded-sm">
                            Breaking news
                        </span>
                        <span>Running Text Continues</span>
                        <span>More Updates Coming</span>
                        <span>Stay Tuned</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
