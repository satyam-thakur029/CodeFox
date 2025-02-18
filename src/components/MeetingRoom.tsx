import { 
  CallControls, 
  CallingState, 
  CallParticipantsList, 
  PaginatedGridLayout, 
  SpeakerLayout, 
  useCallStateHooks 
} from "@stream-io/video-react-sdk";

import { LayoutListIcon, LoaderIcon, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { 
  ResizableHandle, 
  ResizablePanel, 
  ResizablePanelGroup 
} from "./ui/resizable";

import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";  // Ensure correct import

import { Button } from "./ui/button";
import EndCallButton from "./EndCallButton";
import CodeEditor from "./CodeEditor";

export default function MeetingRoom() { 
  const router = useRouter();
  const [layout, setLayout] = useState<"grid" | "speaker">("speaker");
  const [showParticipants, setShowParticipants] = useState(false);
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  // ✅ Fix: Ensure Loader returns properly
  if (callingState !== CallingState.JOINED) {
    return (
      <div className="h-96 flex items-center justify-center">
        <LoaderIcon className="size-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-4rem-1px)]">
      <ResizablePanelGroup direction={"horizontal"}>
        
        {/* Left Panel: Video Section */}
        <ResizablePanel defaultSize={35} minSize={25} maxSize={100} className="relative">
          
          {/* Video layout */}
          <div className="absolute inset-0">
            {layout === "grid" ? <PaginatedGridLayout /> : <SpeakerLayout />}
            
            {/* Participants list overlay */}
            {showParticipants && (
              <div className="absolute right-0 top-0 h-full w-[300px] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <CallParticipantsList onClose={() => setShowParticipants(false)} />
              </div>
            )}
          </div>

          {/* Video Controls */}
          <div className="absolute bottom-4 left-0 right-0">
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-2 flex-wrap justify-center px-4">
                
                <CallControls onLeave={() => router.push("/")} />
                
                {/* View Dropdown & Participants Button */}
                <div className="flex items-center gap-2">
                  
                  {/* ✅ Fix: Proper DropdownMenu implementation */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon" className="size-10">
                        <LayoutListIcon className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center" sideOffset={6}>
                      <DropdownMenuItem onClick={() => setLayout("grid")}>
                        Grid View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setLayout("speaker")}>
                        Speaker View
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* Show Participants Button */}
                  <Button
                    variant="outline"
                    size="icon"
                    className="size-10"
                    onClick={() => setShowParticipants(!showParticipants)}
                  >
                    <UserIcon className="size-4" />
                  </Button>

                  <EndCallButton />
                </div>
              </div>
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Right Panel: Code Editor */}
        <ResizablePanel defaultSize={65} minSize={25}>
          <CodeEditor />
        </ResizablePanel>

      </ResizablePanelGroup>
    </div>
  );
}
