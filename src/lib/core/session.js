import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const getUserSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session?.user || null;
};

export const getUserRole = async (userRole) => {
  const user = await getUserSession();
  if (user.role !== userRole){
    return redirect ('unauthorized');
  }
};
