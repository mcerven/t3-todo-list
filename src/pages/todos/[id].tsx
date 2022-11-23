import { useRouter } from "next/router";
import React from "react";
import { trpc } from "../../utils/trpc";

export default function TodoDetail() {
  const { id } = useRouter().query;

  const getTodoResult = trpc.todos.getTodo.useQuery(id as string);
  return <div>{getTodoResult.data?.title}</div>;
}
