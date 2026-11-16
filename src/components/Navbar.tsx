import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import { LogOut, Settings, User } from "lucide-react"
import { LocationOnRounded } from "@mui/icons-material"

// Mock user data - replace with your auth state
const user = {
  name: "John Doe",
  email: "john@example.com",
  avatarUrl: "", // optional
}

const  Navbar = () => {
  const initials = user.name.slice(0,1).toUpperCase()

  return (
    <header className= "border-b border-divider w-full bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-16 items-center justify-between gap-4 px-4">
      
      <div className="flex items-center gap-1.5 px-2.5 py-2 min-h-[72px] border-b border-divider">
        <div className="w-9 h-9 rounded-lg bg-primary-main text-primary-contrast flex items-center justify-center shrink-0">
          <LocationOnRounded />
        </div>
        <span
          className={[
            "font-semibold text-text-primary whitespace-nowrap",
            "transition-opacity duration-200 uppercase",
          ].join(" ")}
        >
         nodes
        </span>
      </div>
        {/* Profile Dropdown */}
        <div className="shrink-0">
          <DropdownMenu>
            <DropdownMenuTrigger 
            render={
              <button className="rounded-full outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                <Avatar className="h-9 w-9 cursor-pointer">
                  {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt={user.name} />}
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
              </button>
              } 
              />
            {/* </DropdownMenuTrigger> */}
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuGroup>

              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem render={

                <a href="/profile" className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </a>
              } />
              <DropdownMenuItem render={

                <a href="/settings" className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </a>
              } />
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer text-red-600 focus:text-red-600"
                onClick={() => {
                  // handle logout
                  console.log("Logging out...")
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

export default Navbar