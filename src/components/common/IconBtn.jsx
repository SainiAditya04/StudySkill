export default function IconBtn({
    text,
    onclick,
    children,
    disabled,
    outline = false,
    customClasses,
    type,
  }) {
    return (
      <button
        disabled={disabled}
        onClick={onclick}
        className={`flex items-center ${
          outline ? "border-[1px] border-[#a435f0] bg-transparent" : "bg-[#a435f0]"
        } cursor-pointer gap-x-2 text-sm rounded-md w-fit py-[6px] px-[10px] font-semibold
         text-richblack-900 hover:scale-95 transition-all duration-200 ${customClasses}`}
        type={type}
      >
        {children ? (
          <>
            <span className={`${outline && "text-[#a435f0]"} text-sm font-semibold`}>{text}</span>
            {children}
          </>
        ) : (
          text
        )}
      </button>
    )
  }