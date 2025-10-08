"use client";
import { IUser } from "../../../../types/schema";

export function UsersComponent({ users }: { users: IUser }) {
  return (
    <div className="max-w-md mx-auto my-4">
      <p>Users</p>
    </div>
  );
}
