import { useEffect } from "react";

export default function useIsOutsideClick(ref, callback) {
  useEffect(() => {
    function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          return callback(true);
        }
        return callback(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
}