import { MessageDTO } from "./messageDTO";

export type NewMessage = Pick<MessageDTO, 'studentid' | 'text'>;
