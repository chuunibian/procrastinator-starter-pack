
import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
    onClick: () => void;
    type: "submit" | "reset" | "button" | undefined;
    disabled: boolean;
}

function Button(prop: Props) {
  return (
    <button
      type={prop.type}
      onClick={prop.onClick}
      disabled={prop.disabled}
      className="relative px-6 py-3 font-bold text-white rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-600 hover:to-pink-600 transform hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl focus:ring-2 focus:ring-purple-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group"
    >
      <span className="relative z-10">{prop.children}</span>
      <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
    </button>
  );
}

export default Button;


// Note the prop.children is what ever was passed in as its child