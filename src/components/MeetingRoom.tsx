import { CallControls, CallingState, CallParticipantsList, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from "@stream-io/video-react-sdk";
import { LayoutListIcon, LoaderIcon, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./ui/resizable";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";
import EndCallButton from "./EndCallButton";


export default function MeetingRoom() { 
  const router = useRouter();
  const [layout,setlayout] = useState <"grid" | "speaker"> ('speaker')
  const [showParticipants,setShowParticipants] = useState(false);
  const {useCallCallingState}  = useCallStateHooks ();
  const callingState = useCallCallingState();
  if(callingState !== CallingState.JOINED){
<div className="h-96 flex items-center justify-center">
  <LoaderIcon className="size-6 animate-spin"/>

</div>
  }
    return (
      <div className="h-[calc(100vh-4rem-1px)]">
     <ResizablePanelGroup direction={"horizontal"}>
      <ResizablePanel defaultSize={35} minSize={25} maxSize={100} className="relative">
      {/* video layout */}
      <div className="absolute inset-0">
        {layout === "grid" ? <PaginatedGridLayout/> : <SpeakerLayout/>}

 {/* participants list overlay */}
 {showParticipants && (
              <div className="absolute right-0 top-0 h-full w-[300px] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <CallParticipantsList onClose={() => setShowParticipants(false)} />
              </div>
            )}
      </div>
      {/* video control */}

      <div className="absolute bottom-4 left-0 right-0">
     <div className="flex flex-col items-center gap-4">
   <div className="flex items-center gap-2 flex-wrap justify-center px-4 ">
    <CallControls onLeave={() => router.push("/")}/>

      <div className="flex items-center gap-2">
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon" className="size-10">
                        <LayoutListIcon className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => setlayout("grid")}>
                        Grid View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setlayout("speaker")}>
                        Speaker View
                      </DropdownMenuItem>
                    </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="outline"
        size="icon"
        className="size-10"
        onClick={() => setShowParticipants(!showParticipants)}>
         <UserIcon className="size-4" /> 
        </Button>
        <EndCallButton/>
      </div>

   </div>
     </div>
      </div>
      </ResizablePanel>
        <ResizableHandle withHandle/>

      <ResizablePanel defaultSize={65} minSize={25}>
        <h1>code editor will go here</h1>
      </ResizablePanel>
     </ResizablePanelGroup>
     </div>
    ); 
  }



  
