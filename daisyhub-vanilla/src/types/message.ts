export type MessageBody = {
  authorId: string;
  name: string;
  message: string;
};

export type Message = {
  id: string;
  creationDate: string;
  bulletinId: string;
} & MessageBody;
