"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Image from "next/image";
import useSWR from "swr";

interface userDataProps {
  id: string;
  image: string;
  name: string;
  email: string;
  createdAt: string;
}
const AllUser = () => {
  const { data, isLoading } = useSWR(
    `${process.env.NEXT_API_URL}/admin/alluser`
  );
  console.log(data);
  if (isLoading) return <div>loading...</div>;
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="text-right">Account Open Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.user?.map((item: userDataProps) => (
          <TableRow key={item.id}>
            <TableCell>
              <Image
                src={item?.image}
                alt=""
                height={500}
                width={500}
                className="h-10 w-10 rounded-full"
              />
            </TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>{item.createdAt.slice(0, 10)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AllUser;
