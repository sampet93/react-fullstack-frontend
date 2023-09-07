import { useState, useEffect } from "react";
import axios from "axios";

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export type NewUser = Omit<User, "id">;

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/users");
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Internal error", error);
      setLoading(false);
    }
  };

  const addUser = async (user: NewUser) => {
    try {
      const response = await axios.post("http://localhost:8080/user", user);
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Internal error", error);
      setLoading(false);
    }
  };

  const editUser = async (user: User) => {
    try {
      const response = await axios.put(`http://localhost:8080/user/${user.id}`, user);
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Internal error", error);
      setLoading(false);
    }
  };

  const deleteUser = async (id: number) => {
    try {
      const response = await axios.delete(`http://localhost:8080/user/${id}`);
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Internal error", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, loading, addUser, editUser, deleteUser, fetchUsers };
}
