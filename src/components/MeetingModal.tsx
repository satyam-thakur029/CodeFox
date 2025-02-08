
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import useMeetingAction from "@/hooks/useMeetingAction";


interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  isJoinMeeting: boolean;
}

function MeetingModal({ isOpen, onClose, title, isJoinMeeting }: MeetingModalProps) {
  const [meetingUrl, setMeetingUrl] = useState("");
  const { createInstantMeeting, joinMeeting } = useMeetingAction();
  
  const handleStart = () => {
    if (isJoinMeeting) {
        const meetingId = meetingUrl.split("/").pop();
        if (meetingId) joinMeeting(meetingId);
      } else {
        createInstantMeeting();
      }

    setMeetingUrl("");
    onClose();
  };

  return (
    // when ever interviewer click the option then open the dialog box that ask about join or creat the meeting
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
{/* join meeting option or creat meeting option*/}
        <div className="space-y-4 pt-4">
          {isJoinMeeting && (
            <Input
              placeholder="Paste meeting link here..."
              value={meetingUrl}
              onChange={(e) => setMeetingUrl(e.target.value)}
            />
          )}

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            {/* if new call then open start metting else then join meeting */}
            <Button onClick={handleStart} disabled={isJoinMeeting && !meetingUrl.trim()}>
              {isJoinMeeting ? "Join Meeting" : "Start Meeting"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
export default MeetingModal;




