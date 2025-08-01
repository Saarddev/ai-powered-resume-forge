import { useEffect, useRef } from "react";

const Banner = () => {
    const adRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        (window as any).atOptions = {
            key: "6c128e8067bebd5aa5594bdedcac2e18",
            format: "iframe",
            height: 600,
            width: 160,
            params: {}
        };

        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "//www.highperformanceformat.com/6c128e8067bebd5aa5594bdedcac2e18/invoke.js";
        script.async = true;

        if (adRef.current) {
            adRef.current.innerHTML = "";
            adRef.current.appendChild(script);
        }

        return () => {
            if (adRef.current) adRef.current.innerHTML = "";
        };
    }, []);

    return (
        <div className="max-w-[180px] bg-white border border-gray-200 shadow-lg rounded-2xl p-3 flex flex-col items-center">
            <span className="text-xs text-gray-500 font-medium mb-2">📢 Sponsored</span>
            <div ref={adRef} className="w-full h-[600px]" />
        </div>
    );
};

export default Banner;
