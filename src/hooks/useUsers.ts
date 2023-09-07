import { useState, useEffect } from "react";
import axios from "axios";
import { RequestType } from "../api/api-utils";

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export type NewUser = Omit<User, "id">;

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);

  const apiRequest = async (url: string, method: RequestType, data?: any) => {
    try {
      setError(undefined);
      const response = await axios({ method, url, data });
      setLoading(false);
      return response.data;
    } catch (error) {
      console.error("Internal error", error);
      setError("Internal error.");
      setLoading(false);
      return null;
    }
  };

  const fetchUsers = async () => {
    const data = await apiRequest("http://localhost:8080/users", RequestType.GET);
    if (data) {
      setUsers(data);
    }
  };

  const addUser = async (user: NewUser) => {
    await apiRequest("http://localhost:8080/user", RequestType.POST, user);
  };

  const editUser = async (user: User) => {
    await apiRequest(`http://localhost:8080/user/${user.id}`, RequestType.PUT, user);
  };

  const deleteUser = async (id: number) => {
    await apiRequest(`http://localhost:8080/user/${id}`, RequestType.DELETE);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, loading, error, addUser, editUser, deleteUser, fetchUsers };
}
