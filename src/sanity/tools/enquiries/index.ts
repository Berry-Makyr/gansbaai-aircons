import { EnvelopeIcon } from "@sanity/icons/Envelope";
import type { Tool } from "sanity";
import { EnquiriesTool } from "./EnquiriesTool";

export const enquiriesTool = (): Tool => ({
  title: "Enquiries",
  name: "enquiries",
  icon: EnvelopeIcon,
  component: EnquiriesTool,
});
