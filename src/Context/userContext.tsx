import React, { createContext, useState, ReactNode } from "react";

// Tạo một interface cho thông tin user
interface User {
  id: number;
  username: string;
  img?: string;
  admin: boolean;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

// Tạo context và giá trị mặc định
export const UserContext = createContext<UserContextType | null>(null);

// Tạo provider component
export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
