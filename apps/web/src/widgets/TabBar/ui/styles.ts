import { tv } from "tailwind-variants";

export const TabBarButtonStyles = tv({
    base: `flex aspect-square h-full font-bold-main outline-0 
    text-gray-11 bg-gray-1 
    hover:text-gray-12 hover:bg-gray-2 
    active:bg-primary-9 active:text-gray-12
    data-pressed:bg-primary-9 data-pressed:text-gray-12
    data-disabled:bg-gray-1 data-disabled:text-gray-8 hover:cursor-pointer`,
});

export const tabWrap = tv({
    base: "relative h-full max-w-40 min-w-40 group",
});

export const tabTrigger = tv({
    base: `
    peer
    h-full w-full
    inline-flex items-center justify-start
    px-5 pr-9
    font-bold-main outline-0
    text-gray-11 bg-gray-1
    hover:text-gray-12 hover:bg-gray-2 cursor-pointer
    transition-colors duration-100

    data-selected:bg-primary-9 data-selected:text-gray-12 data-selected:cursor-default
    data-disabled:text-gray-8 data-disabled:cursor-not-allowed
  `,
});

export const tabTitle = tv({
    base: "truncate select-none",
});

export const tabEditOverlay = tv({
    base: "absolute inset-0 z-20 px-5 flex items-center",
});

export const tabCloseBtn = tv({
    base: `
    absolute right-0 top-0 z-30 h-full
    inline-flex items-center justify-center
    pr-3 transition-opacity duration-100 text-gray-11
    peer-data-selected:text-gray-12
  `,
    variants: {
        visible: {
            true: "opacity-100 pointer-events-auto",
            false: "opacity-0 pointer-events-none",
        },
    },
});

export const tabCloseIcon = tv({
    base: `hover:text-gray-12 hover:cursor-pointer`,
});
