"use client";
import { IUser } from "../../../../types/schema";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useSearchUser } from "@/store/user";
import initials from "initials";
import { SendHorizonal } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export function UsersComponent({ users }: { users: IUser[] }) {
  const { searchUser } = useSearchUser();
  const [page, setPage] = useState(1);
  const USERS_PER_PAGE = 10;

  const filteredUser =
    users.filter((user: IUser) =>
      user.name.toLowerCase().includes(searchUser.toLowerCase())
    ) ?? [];

  const totalPages = Math.ceil(filteredUser.length / USERS_PER_PAGE);
  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [searchUser, totalPages]);
  const paginatedUsers = filteredUser.slice(
    (page - 1) * USERS_PER_PAGE,
    page * USERS_PER_PAGE
  );

  if (filteredUser?.length === 0) {
    return (
      <p className="font-light text-neutral-500 max-w-md mx-auto my-4 text-center">
        No users found
      </p>
    );
  }

  return (
    <div className="max-w-md mx-auto my-4">
      {paginatedUsers.map((user: IUser) => (
        <div
          className="w-full flex justify-between items-center p-3 rounded-lg border shadow-xs mb-4"
          key={user._id?.toString()}
        >
          <div className="flex justify-center items-center gap-x-3">
            <Avatar>
              <AvatarImage src={user.image} />
              <AvatarFallback className="bg-rose-400 text-white font-light text-sm">
                {initials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-between items-start">
              <p className="text-sm text-neutral-600">{user.name}</p>
              <p className="text-xs text-neutral-500">{user.email}</p>
            </div>
          </div>
          <Button size="icon" variant="secondary" asChild>
            <Link href={`/chat/${user._id?.toString()}`}>
              <SendHorizonal />
            </Link>
          </Button>
        </div>
      ))}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          <span className="px-2 py-1 text-sm text-neutral-600">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
