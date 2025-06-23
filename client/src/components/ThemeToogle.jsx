import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "../lib/utils";

export const ThemeToogle = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme === "dark") {
            setIsDarkMode(true);
            document.documentElement.classList.add("dark");
        } else if (storedTheme === "light") {
            setIsDarkMode(false);
            document.documentElement.classList.remove("dark");
        } else {
            // If no theme is stored, default to light mode
            localStorage.setItem("theme", "light");
            setIsDarkMode(false);
            document.documentElement.classList.remove("dark");
        }
    }, []);

    const toogleTheme = () => {
        if (isDarkMode) {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
            setIsDarkMode(false);
        } else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
            setIsDarkMode(true);
        }
    };

    return <button 
    onClick={toogleTheme} 
    className={cn(
        "fixed max-sm:hidden top-4 right-5 z-50 p-2 rounded-full transition-colors duration-300",
        "focus:outlin-hidden"
    )}>
        {" "}
        {isDarkMode ? (
        <Sun className="h-6 w-6 text-yellow-300"/> 
        ) : (
        <Moon className="h-6 w-6 text-blue-300"/> 
    )}</button>
}