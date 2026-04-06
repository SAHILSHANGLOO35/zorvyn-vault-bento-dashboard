"use client"

import { useCurrentUser } from "@/hooks/use-current-user"
import { Container } from "./container"
import { Switch } from "./ui/switch"
import { Label } from "./ui/label"
import { motion, Variants } from "motion/react"
import { cn } from "@/lib/utils"
import { useLayoutEffect, useRef, useState } from "react"

export const Navbar = () => {
  return (
    <div>
      <DesktopNavbar />
      <MobileNavbar />
    </div>
  )
}

const containerVariants: Variants = {
  initial: {
    backgroundColor: "var(--bg-light)",
    boxShadow: "var(--shadow-s)",
  },
  hover: {
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
}

const iconVariants = (offset: number): Variants => ({
  initial: { x: 0, rotate: 0 },
  hover: {
    x: offset,
    rotate: 360,
    transition: { duration: 1, ease: "easeInOut" },
  },
})

const textVariants: Variants = {
  initial: { x: 0, opacity: 1 },
  hover: {
    x: -50,
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
}

const MobileNavbar = () => {
  const { name, role } = useCurrentUser()

  return (
    <Container className="mb-2 flex items-center justify-between py-3 sm:hidden">
      <div className="nav flex w-full items-center justify-between rounded-md px-3 py-3">
        <div className="flex items-center gap-2">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full"
            style={{
              background: "var(--bg-light)",
              boxShadow: "var(--shadow-s)",
            }}
          >
            <DarkModeBankSVG className="h-5 w-5 text-gray-800/80 dark:text-gray-300" />
          </div>

          <div className="flex flex-col leading-tight">
            <span className="text-sm font-bold">ZORVYN VAULT</span>
            <span className="text-[10px] text-muted-foreground">
              Track money | Be Cool
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold"
            style={{
              backgroundColor: "var(--bg-light)",
              boxShadow: "var(--shadow-s)",
            }}
          >
            {name[0]}
          </div>

          <div className="flex items-center gap-1">
            <span className="text-xs text-muted-foreground">
              {role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()}
            </span>
            {role === "admin" ? (
              <Switch checked={true} />
            ) : (
              <Switch checked={false} />
            )}
          </div>
        </div>
      </div>
    </Container>
  )
}

const DesktopNavbar = () => {
  const { name, role } = useCurrentUser()
  const pillRef = useRef<HTMLDivElement>(null)
  const [iconOffset, setIconOffset] = useState(0)

  useLayoutEffect(() => {
    if (!pillRef.current) return
    setIconOffset(pillRef.current.offsetWidth - 60) // 16 = half of icon's w-8
  }, [name])

  return (
    <Container className="mb-2 hidden items-center justify-between py-4 sm:flex">
      <div className="nav flex w-full items-center justify-between rounded-md px-4 py-4">
        <div className="flex flex-col gap-1">
          <div className="text-xl font-bold tracking-wider text-shadow-white/25 text-shadow-xs">
            ZORVYN VAULT
          </div>
          <div className="flex items-center justify-center gap-2">
            <div
              className="rounded-full px-2 py-2"
              style={{
                background: "var(--bg-light)",
                boxShadow: "var(--shadow-s)",
              }}
            >
              <DarkModeBankSVG className="text-gray-800/80 dark:text-gray-300" />
            </div>
            <div className="tracking-wid font-sans text-sm text-muted-foreground">
              Money never sleeps, but it should be tracked
            </div>
          </div>
        </div>

        <div className="relative flex items-center justify-center gap-4">
          <div className="relative hidden md:block">
            <span className="absolute top-2 -left-8 -rotate-19 font-dmMono text-xs text-muted-foreground">
              Hover me
            </span>
            <ArrowSVG className="rotate-335" />
          </div>
          <motion.div
            variants={containerVariants}
            ref={pillRef}
            initial="initial"
            whileHover="hover"
            className="group relative flex shrink-0 cursor-pointer items-center justify-center gap-4 rounded-full px-4 py-2"
          >
            <motion.div
              variants={iconVariants(iconOffset)}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="relative z-30 flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-semibold text-shadow-white/25 text-shadow-xs"
              style={{
                backgroundColor: "var(--bg-light)",
                boxShadow: "var(--shadow-s)",
              }}
            >
              {name[0]}
            </motion.div>
            <motion.div
              variants={textVariants}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="text-md relative z-10 font-semibold tracking-wide text-shadow-white/20 text-shadow-xs"
            >
              {name}
            </motion.div>
          </motion.div>

          <div className="flex items-center justify-center gap-2">
            <div>
              <Label className="font-dmMono font-light text-muted-foreground">
                {role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()}
                {role === "admin" ? (
                  <Switch checked={true} />
                ) : (
                  <Switch checked={false} />
                )}
              </Label>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export const DarkModeBankSVG = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="currentColor"
      viewBox="0 0 256 256"
      className={className}
    >
      <path d="M248,208a8,8,0,0,1-8,8H16a8,8,0,0,1,0-16H240A8,8,0,0,1,248,208ZM16.3,98.18a8,8,0,0,1,3.51-9l104-64a8,8,0,0,1,8.38,0l104,64A8,8,0,0,1,232,104H208v64h16a8,8,0,0,1,0,16H32a8,8,0,0,1,0-16H48V104H24A8,8,0,0,1,16.3,98.18ZM144,160a8,8,0,0,0,16,0V112a8,8,0,0,0-16,0Zm-48,0a8,8,0,0,0,16,0V112a8,8,0,0,0-16,0Z"></path>
    </svg>
  )
}

export const ArrowSVG = ({ className }: { className?: string }) => {
  return (
    <svg
      width="111"
      height="57"
      viewBox="0 0 111 57"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "w-15 rotate-90 text-neutral-900 dark:text-white",
        className
      )}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M100.799 50.4972L100.37 45.7563L110.751 50.4435L101.379 56.9168L100.889 51.4982C26.4078 50.677 2.8302 18.0111 0.504639 1.06799L1.49536 0.932007C3.72302 17.1617 26.647 49.6532 100.799 50.4972Z"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        pathLength="1"
        strokeDashoffset="0px"
        strokeDasharray="1px 1px"
      ></path>
    </svg>
  )
}
