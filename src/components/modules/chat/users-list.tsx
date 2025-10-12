"use client";

import { IUser } from "../../../../types/schema";

export function UsersList({ users }: { users: IUser[] }) {
  return (
    <div className="max-w-lg mx-auto flex justify-start w-full items-center my-4">
      <p className="text-center text-neutral-500 font-light">Users List</p>
    </div>
  );
}
