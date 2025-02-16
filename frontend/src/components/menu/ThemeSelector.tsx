import * as React from 'react'
import {Check} from 'lucide-react'

import {cn} from '@/lib/utils'
import {useTheme} from "next-themes";

const themes = [
    {
        name: '浅色',
        value: 'light',
        background: 'bg-white',
        foreground: 'bg-zinc-200',
    },
    {
        name: '深色',
        value: 'dark',
        background: 'bg-zinc-900',
        foreground: 'bg-zinc-700',
    },
    {
        name: '跟随系统',
        value: 'system',
        background: 'bg-blue-200',
        foreground: 'bg-blue-700',
    },
]

export function ThemeSelector() {
    const [selectedTheme, setSelectedTheme] = React.useState('light')
    const themeUtil = useTheme();

    React.useEffect(() => {
        if (!themeUtil.theme) return;
        setSelectedTheme(themeUtil.theme)
    }, [themeUtil.theme])

    return (
        <div className="grid grid-cols-3 gap-2">
            {themes.map((theme) => (
                <button
                    key={theme.value}
                    className={cn(
                        "relative flex flex-col items-center justify-center rounded-md p-2 transition-all hover:scale-105 focus:outline-none",
                        selectedTheme === theme.value && "ring-2 ring-primary"
                    )}
                    onClick={() => {
                        setSelectedTheme(theme.value)
                        themeUtil.setTheme(theme.value)
                    }}
                >
          <span className={cn("h-10 w-10 rounded-md", theme.background)}>
            <span className={cn("block h-4 w-8 rounded-sm", theme.foreground)}/>
          </span>
                    <span className="mt-1 text-xs font-medium">{theme.name}</span>
                    {selectedTheme === theme.value && (
                        <Check className="absolute top-1 right-1 h-4 w-4 text-primary"/>
                    )}
                </button>
            ))}
        </div>
    )
}
