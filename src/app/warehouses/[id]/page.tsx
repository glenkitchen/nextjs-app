import { webApi } from "@/utils/web-api";
import Form from "./warehouses-form";

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <Form data={await webApi.getData(`distributioncenter/${params.id}`)} />
  );
}
