import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"
import { Button } from "@/components/ui/button";

type TriggerProp = string | React.ReactElement;
export function MyHoverCard({ trigger, content} : {trigger:TriggerProp;content:string;}) {

return (
    <HoverCard>
    <HoverCardTrigger asChild>
        {typeof trigger === "string" ? (
            <span tabIndex={0}>{trigger}</span>
        ) : (
            <span tabIndex={0} className="hover-card-trigger p-0 h-auto">{trigger}</span>
        )}
    </HoverCardTrigger>
    <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
        { content }
        </div>
    </HoverCardContent>
    </HoverCard>
)
}