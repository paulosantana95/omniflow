import { Switch } from "@/components/ui/switch"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/providers/theme-provider"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const isDark = theme === "dark"



  return (
    <div className="flex items-center gap-2">
      <Sun className="h-5 w-5 text-yellow-400 dark:text-primary" />
      <Switch
        checked={isDark}
        onCheckedChange={checked => setTheme(checked ? "dark" : "light")}
        className="data-[state=checked]:bg-accent-foreground data-[state=unchecked]:bg-accent-foreground"
        aria-label="Alternar tema"
      />
      <Moon className="h-5 w-5 text-blue-900 dark:text-yellow-400" />
    </div>
  )
}