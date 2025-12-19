import { useEffect, useState, useCallback } from "react";
import userAPI from "@/apis/userAPI";
import { AxiosError } from "axios";
import type { User } from "@/types/User";

export function useUser() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const parseError = (err: unknown): string => {
    if (err instanceof AxiosError) {
      return err.response?.data?.message || err.message;
    }
    return "Unexpected error";
  };

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await userAPI.getUsers();

      if (res?.data) {
        setUsers(res.data);
      }
    } catch (err) {
      setError(parseError(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    Promise.resolve().then(() => {
      fetchUsers();
    });
  }, [fetchUsers]);

  const createUser = async (data: Omit<User, "id">) => {
    const res = await userAPI.createUser(data).catch((err) => {
      setError(parseError(err));
      return null;
    });

    if (res) {
      setUsers((prev) => [...prev, res.data]);
      return res.data;
    }
    return null;
  };

  const updateUser = async (id: number, data: Partial<User>) => {
    const res = await userAPI.updateUser(id, data).catch((err) => {
      setError(parseError(err));
      return null;
    });

    if (res) {
      setUsers((prev) => prev.map((u) => (u.userId === id ? res.data : u)));
      return res.data;
    }
    return null;
  };

  const deleteUser = async (id: number) => {
    const res = await userAPI.deleteUser(id).catch((err) => {
      setError(parseError(err));
      return null;
    });

    if (res) {
      setUsers((prev) => prev.filter((u) => u.userId !== id));
      return true;
    }
    return false;
  };

  return {
    users,
    loading,
    error,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
  };
}