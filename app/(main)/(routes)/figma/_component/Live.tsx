import React, { useCallback, useEffect, useState } from "react"
import LiveCursor from "./cursor/LiveCursor"
import { useBroadcastEvent, useEventListener, useMyPresence, useOthers } from "@/liveblocks.config"
import { CursorMode, CursorState, Reaction, ReactionEvent } from "@/constants/types"
import CursorChat from "./cursor/CursorChat"
import ReactionSelector from "./reaction/ReactionButton"
import FlyingReaction from "./reaction/FlyingReaction"
import useInterval from "@/hooks/useInterval"

const Live=()=>{
    const others= useOthers()
    const [{cursor}, updateMyPresence]= useMyPresence() as any;
    const [cursorState, setCursorState] = useState<CursorState>({
        mode: CursorMode.Hidden,
    });

    const [reaction, setReaction] = useState<Reaction[]>([])

    const broadcast = useBroadcastEvent()

    useInterval(()=>{
      setReaction((reaction)=>reaction.filter((r)=>r.timestamp>Date.now()-4000))
    },1000)

    useInterval(()=>{
      if(cursorState.mode===CursorMode.Reaction && cursorState.isPressed && cursor){
        setReaction((reactions)=>reactions.concat([
          {
            point:{x:cursor.x , y:cursor.y},
            value:cursorState.reaction,
            timestamp:Date.now()
          }
        ]))

      broadcast({
        x:cursor.x,
        y:cursor.y,
        value:cursorState.reaction
      })
      }
    },100)

    useEventListener((eventData)=>{
      const event = eventData.event as ReactionEvent

      setReaction((reactions)=>reactions.concat([
        {
          point:{x:event.x , y:event.y},
          value:event.value,
          timestamp:Date.now()
        }
      ]))
    })

    const handlePointerMove = useCallback((event: React.PointerEvent) => {
        event.preventDefault();
    
        // if cursor is not in reaction selector mode, update the cursor position
        if (cursor == null || cursorState.mode !== CursorMode.ReactionSelector) {
          // get the cursor position in the canvas
          const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
          const y = event.clientY - event.currentTarget.getBoundingClientRect().y;
    
          // broadcast the cursor position to other users
          updateMyPresence({
            cursor: {
              x,
              y,
            },
          });
        }
    }, []);
    
    const handlePointerUp = useCallback((event:React.PointerEvent)=>{
      setCursorState((state: CursorState) =>
        cursorState.mode === CursorMode.Reaction ? { ...state, isPressed: true } : state
      );
    },[cursorState.mode, setCursorState])

    const handlePointerLeave = useCallback(() => {
      setCursorState({
        mode: CursorMode.Hidden,
      });
      updateMyPresence({
        cursor: null,
        message: null,
      });
    }, []);

    const handlePointerDown = useCallback((event: React.PointerEvent) => {
      // get the cursor position in the canvas
      const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
      const y = event.clientY - event.currentTarget.getBoundingClientRect().y;

      updateMyPresence({
        cursor: {
          x,
          y,
        },
      });

      // if cursor is in reaction mode, set isPressed to true
      setCursorState((state: CursorState) =>
        cursorState.mode === CursorMode.Reaction ? { ...state, isPressed: true } : state
      );
    },[cursorState.mode, setCursorState]);

    useEffect(() => {
        const onKeyUp = (e: KeyboardEvent) => {
          if(e.key==='/'){
            setCursorState({
              mode:CursorMode.Chat,
              previousMessage:null,
              message:""
            })
          }else if(e.key==='Escape'){
            updateMyPresence({message:""})
            setCursorState({mode:CursorMode.Hidden})
          }else if(e.key === "e"){
            setCursorState({
              mode:CursorMode.ReactionSelector
            })
          }
        };
    
        const onKeyDown = (e: KeyboardEvent) => {
          if(e.key==='/'){
            e.preventDefault()
          }
        };
    
        window.addEventListener("keyup", onKeyUp);
        window.addEventListener("keydown", onKeyDown);
    
        return () => {
          window.removeEventListener("keyup", onKeyUp);
          window.removeEventListener("keydown", onKeyDown);
        };
    }, [updateMyPresence]);

    const setReactions = useCallback((reaction:string)=>{
      setCursorState({mode:CursorMode.Reaction,reaction,isPressed:false})

    },[])

    return(
        <div 
        onPointerDown={handlePointerDown}
        onPointerLeave={handlePointerLeave}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="h-[100vh] w-full flex justify-center items-center text-center"
        >

        {reaction.map((r)=>{
          return(
            <FlyingReaction 
              key={r.timestamp.toString()}
              value={r.value}
              timestamp={r.timestamp}
              x={r.point.x}
              y={r.point.y}
            />
          )
        })}

        {cursor && (
          <CursorChat
            cursor={cursor}
            cursorState={cursorState}
            setCursorState={setCursorState}
            updateMyPresence={updateMyPresence}
            />
        )}


        {cursorState.mode === CursorMode.ReactionSelector && (
          <ReactionSelector 
            setReaction={setReactions}
          />
        )}


        <LiveCursor others={others}/>
        </div>
    )
}

export default Live