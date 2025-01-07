"use client"
import Cursor from "./Cursor";
import { COLORS } from '@/constants/Colors';
import { LiveCursorProps } from "@/constants/types";


const LiveCursor = ({ others }: LiveCursorProps) => {
    return others.map(({ connectionId, presence }) => {
      console.log("presence.cursor.x",presence)
      if (!presence?.cursor) {
        return null;
      }
  
      return (
        <Cursor
          key={connectionId}
          color={COLORS[Number(connectionId) % COLORS.length]}
          x={presence.cursor.x}
          y={presence.cursor.y}
          message={presence.message}
        />
      );
    });
  };

export default LiveCursor