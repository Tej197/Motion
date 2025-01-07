"use client";

import { useOthers } from "../../../liveblocks.config";

export function CollaborativeApp() {
  const others = useOthers();
  const userCount = others.length;
  return(
    <div className='p-6 ml-4'>There are {userCount} other user(s) online</div>
  )
}