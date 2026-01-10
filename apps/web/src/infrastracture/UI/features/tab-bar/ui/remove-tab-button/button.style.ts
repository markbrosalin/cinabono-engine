import { tv } from "tailwind-variants";

export const tabGradientStyle = tv({
    base: `absolute right-0 top-0 w-12 h-full text-gray-50  
    flex items-center justify-end`,

    variants: {
        active: {
            true: "bg-gradient-to-l from-indigo-500 via-indigo-500 to-transparent",
            false: "bg-gradient-to-l from-gray-800 via-gray-800 to-transparent",
        },
        showButton: {
            true: "opacity-100",
            false: "opacity-0",
        },
        theme: {
            light: "",
            dark: "",
        },
    },
});
