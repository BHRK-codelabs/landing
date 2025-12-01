"use client";

import {useTheme} from "next-themes";
import {useEffect} from "react";

export default function ThemeSwitchButton() {
    const [mounted, setMounted] = useState(false);
    const {theme, setTheme, resolvedTheme} = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null; // Or a placeholder to prevent flicker

    return (
        <button
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'dark' : 'light')}
        >
            {resolvedTheme === 'dark' ? 'Dark Mode' : 'Light Mode'}
        </button>
    );

}