import * as React from "react";

export default function PlusCircleIcon(props: any) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z"
        fill="#000D37"
      />
      <path
        d="M0.500001 12C0.500002 5.64873 5.64873 0.500002 12 0.500003C18.3513 0.500003 23.5 5.64873 23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.500001 12Z"
        stroke="white"
        strokeOpacity="0.9"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.6656 12.6672L18 12.6672L18 11.3338L12.6656 11.3338L12.6656 6L11.3323 6L11.3323 11.3338L6 11.3338L6 12.6672L11.3323 12.6672L11.3323 18L12.6656 18L12.6656 12.6672Z"
        fill="white"
      />
    </svg>
  );
}
