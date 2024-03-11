export interface ClientToServerEvents {
  createMessage: () => void;
  joinRoom: (client: Socket, room: string) => void;
  leaveRoom: (client: Socket, room: string) => void;
}
