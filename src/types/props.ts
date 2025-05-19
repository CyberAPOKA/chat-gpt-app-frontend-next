import { Message } from "./message";

export interface ChatMessagesProps {
  messages: Message[];
  loading?: boolean;
  sending?: boolean;
  title?: string;
}

export interface MainContentProps {
  chatId?: string;
  initialMessages?: Message[];
  initialTitle?: string;
  loading?: boolean;
}
