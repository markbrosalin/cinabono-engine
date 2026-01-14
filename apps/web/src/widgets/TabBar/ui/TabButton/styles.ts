import { tv } from "tailwind-variants";

export const tabStyle = tv({
    base: `relative overflow-hidden font-bold-main h-full outline-0
    inline-flex items-center px-5 max-w-40 min-w-40`,

    variants: {
        active: {
            true: "",
            false: "",
        },
        hovered: {
            true: "",
            false: "",
        },
        theme: {
            light: "",
            dark: "",
        },
    },
    compoundVariants: [
        //light + default
        {
            active: false,
            hovered: false,
            theme: "light",
            class: "z-0 text-gray-500 bg-gray-900",
        },
        //light + hovered
        {
            active: false,
            hovered: true,
            theme: "light",
            class: "z-1 bg-gray-800 text-gray-100 cursor-pointer ",
        },
        //light + active
        {
            active: true,
            theme: "light",
            class: "z-2  text-gray-50 bg-indigo-500",
        },
    ],
});

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
