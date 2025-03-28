"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Code } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

const Navbar = () => {
  const { theme, toggleTheme, mounted } = useTheme();

  return (
    <header className="border-b border-gray-200 bg-white/90 dark:bg-devlink-primary/90 dark:border-gray-800 backdrop-blur-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Code className="h-8 w-8 text-devlink-secondary" />
              <span className="ml-2 text-xl font-bold text-devlink-primary dark:text-white">
                DevLink
              </span>
            </Link>
            <nav className="hidden md:ml-10 md:flex space-x-8">
              <Link
                href="#features"
                className="text-gray-600 dark:text-gray-300 hover:text-devlink-secondary font-medium"
              >
                Features
              </Link>
              <Link
                href="#pricing"
                className="text-gray-600 dark:text-gray-300 hover:text-devlink-secondary font-medium"
              >
                Pricing
              </Link>
              <Link
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-devlink-secondary font-medium"
              >
                Documentation
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="mr-2"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5 text-yellow-400" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-600" />
                )}
              </Button>
            )}
            <Button
              variant="outline"
              className="hidden md:inline-flex dark:text-white dark:border-gray-700"
            >
              Sign In
            </Button>
            <Button className="bg-devlink-secondary hover:bg-devlink-secondary/90">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
