"use client";
import React, { useEffect, useState } from "react";
import { LoaderCircleIcon, SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSearchUser } from "@/store/user";

export function SearchUsers() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { searchUser, setSearchUser } = useSearchUser();
  
  useEffect(() => {
    if (searchUser) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
    setIsLoading(false);
  }, [searchUser]);

  return (
    <div className="max-w-lg">
      <div className="relative w-full">
        <Input
          className="peer ps-9 pe-9 w-full"
          placeholder="Search..."
          type="search"
          value={searchUser}
          onChange={(e) => setSearchUser(e.target.value)}
        />
        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
          {isLoading ? (
            <LoaderCircleIcon
              className="animate-spin"
              size={16}
              role="status"
              aria-label="Loading..."
            />
          ) : (
            <SearchIcon size={16} aria-hidden="true" />
          )}
        </div>
      </div>
    </div>
  );
}
