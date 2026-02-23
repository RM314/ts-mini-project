import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

// Enum-like runtime values, but erasable-syntax-safe (no TypeScript enum).
export const ViewMode = { All: "all", Favorites: "favorites", } as const;

// Union type: "all" | "favorites".
export type ViewMode = (typeof ViewMode)[keyof typeof ViewMode];

// so we can use this ^^ as an enum

interface IViewModeContextType {
    viewMode: ViewMode;
    setViewMode: (mode: ViewMode) => void;
    toggleViewMode: () => void;
}

export const ViewModeContext = createContext<IViewModeContextType | undefined>(undefined);

export function ViewModeProvider({ children }: { children: ReactNode }) {
    // Default app mode: show all artworks.
    const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.All);

    // Convenience helper for a one-click switch between both modes.
    const toggleViewMode = () => {
        setViewMode((prev) => (prev === ViewMode.All ? ViewMode.Favorites : ViewMode.All));
    };

    // Memoize the context value object so consumers do not re-render
    // just because a new object reference is created on every provider render.
    // This object only changes when viewMode changes.
    const value = useMemo(
        () => ({ viewMode, setViewMode, toggleViewMode }),
        [viewMode],
    );

    return <ViewModeContext.Provider value={value}>{children}</ViewModeContext.Provider>;
}

export function useViewModeContext() {
    return useContext(ViewModeContext);
}