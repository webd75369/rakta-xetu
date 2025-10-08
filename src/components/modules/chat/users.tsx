"use client";
import { IUser } from "../../../../types/schema";

export function UsersComponent({ users }: { users: IUser[] }) {
  if (users?.length === 0) {
    return (
      <p className="font-light text-neutral-500 max-w-md mx-auto my-4 text-center">
        No users are present at this moment
      </p>
    );
  }

  return (
    <div className="max-w-md mx-auto my-4">
      <p>Users</p>
    </div>
  );
}
