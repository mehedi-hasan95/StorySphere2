export async function getAllUser() {
  const res = await fetch(process.env.NEXTAUTH_URL + "/admin/alluser");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
