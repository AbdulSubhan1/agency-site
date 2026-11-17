import type { Service, ServiceId } from "../schema";
import { audit } from "./audit";
import { chatAgent } from "./chat-agent";
import { content } from "./content";
import { crm } from "./crm";
import { documents } from "./documents";
import { leadResponse } from "./lead-response";
import { voice } from "./voice";
import { website } from "./website";
import { workflows } from "./workflows";

/** Every service, shared by both brands. Each brand picks the order and may override the wording. */
export const SERVICES: Record<ServiceId, Service> = {
  audit,
  workflows,
  "lead-response": leadResponse,
  "chat-agent": chatAgent,
  voice,
  crm,
  documents,
  website,
  content,
};
