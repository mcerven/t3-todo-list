import { useRouter } from "next/router";
import React from "react";
import Loading from "../../components/Loading";
import { trpc } from "../../utils/trpc";

export default function TodoDetail() {
  const { id } = useRouter().query;

  if (typeof id !== "string") return <Loading />;

  const { isLoading, data } = trpc.todos.getTodo.useQuery(id);

  if (isLoading) return <Loading />;

  return <div>{data?.title}</div>;
}
