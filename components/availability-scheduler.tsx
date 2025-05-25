"use client"
import { Clock, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

export interface TimeSlot {
  id: string
  days: string[]
  startTime: string
  endTime: string
}

interface AvailabilitySchedulerProps {
  value: TimeSlot[]
  onChange: (value: TimeSlot[]) => void
  className?: string
}

const DAYS_OF_WEEK = [
  { value: "monday", label: "Mon" },
  { value: "tuesday", label: "Tue" },
  { value: "wednesday", label: "Wed" },
  { value: "thursday", label: "Thu" },
  { value: "friday", label: "Fri" },
  { value: "saturday", label: "Sat" },
  { value: "sunday", label: "Sun" },
]

const TIME_OPTIONS = [
  "00:00",
  "00:30",
  "01:00",
  "01:30",
  "02:00",
  "02:30",
  "03:00",
  "03:30",
  "04:00",
  "04:30",
  "05:00",
  "05:30",
  "06:00",
  "06:30",
  "07:00",
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
  "23:30",
]

export function AvailabilityScheduler({ value, onChange, className }: AvailabilitySchedulerProps) {
  const addTimeSlot = () => {
    const newSlot: TimeSlot = {
      id: crypto.randomUUID(),
      days: [],
      startTime: "09:00",
      endTime: "17:00",
    }
    onChange([...value, newSlot])
  }

  const removeTimeSlot = (id: string) => {
    onChange(value.filter((slot) => slot.id !== id))
  }

  const updateTimeSlot = (id: string, field: keyof TimeSlot, newValue: any) => {
    onChange(value.map((slot) => (slot.id === id ? { ...slot, [field]: newValue } : slot)))
  }

  const toggleDay = (slotId: string, day: string) => {
    const slot = value.find((s) => s.id === slotId)
    if (!slot) return

    const updatedDays = slot.days.includes(day) ? slot.days.filter((d) => d !== day) : [...slot.days, day]

    updateTimeSlot(slotId, "days", updatedDays)
  }

  const formatTimeRange = (startTime: string, endTime: string) => {
    return `${startTime} - ${endTime}`
  }

  const isTimeRangeValid = (startTime: string, endTime: string) => {
    return startTime < endTime
  }

  return (
    <div className={cn("space-y-4", className)}>
      {value.length === 0 ? (
        <div className="text-center py-8 border border-dashed border-border rounded-lg">
          <Clock className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
          <p className="text-muted-foreground">No availability set</p>
          <p className="text-xs text-muted-foreground mb-4">Add time slots when you're available for sessions</p>
          <Button type="button" variant="outline" onClick={addTimeSlot} className="mx-auto">
            <Plus className="mr-2 h-4 w-4" />
            Add Time Slot
          </Button>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {value.map((slot) => (
              <div key={slot.id} className="border rounded-lg p-4 bg-background/50 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">
                    {slot.days.length > 0
                      ? DAYS_OF_WEEK.filter((day) => slot.days.includes(day.value))
                          .map((day) => day.label)
                          .join(", ")
                      : "Select days"}
                  </h4>
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "text-sm",
                        isTimeRangeValid(slot.startTime, slot.endTime) ? "text-muted-foreground" : "text-destructive",
                      )}
                    >
                      {formatTimeRange(slot.startTime, slot.endTime)}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeTimeSlot(slot.id)}
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remove time slot</span>
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {DAYS_OF_WEEK.map((day) => (
                    <div key={day.value} className="flex flex-col items-center">
                      <Checkbox
                        id={`${slot.id}-${day.value}`}
                        checked={slot.days.includes(day.value)}
                        onCheckedChange={() => toggleDay(slot.id, day.value)}
                        className="mb-1"
                      />
                      <Label htmlFor={`${slot.id}-${day.value}`} className="text-xs cursor-pointer">
                        {day.label}
                      </Label>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <Label htmlFor={`${slot.id}-start`} className="text-xs mb-1 block">
                      Start Time
                    </Label>
                    <Select
                      value={slot.startTime}
                      onValueChange={(value) => updateTimeSlot(slot.id, "startTime", value)}
                    >
                      <SelectTrigger id={`${slot.id}-start`} className="w-full">
                        <SelectValue placeholder="Start time" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[300px]">
                        {TIME_OPTIONS.map((time) => (
                          <SelectItem key={`start-${time}`} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-1">
                    <Label htmlFor={`${slot.id}-end`} className="text-xs mb-1 block">
                      End Time
                    </Label>
                    <Select value={slot.endTime} onValueChange={(value) => updateTimeSlot(slot.id, "endTime", value)}>
                      <SelectTrigger
                        id={`${slot.id}-end`}
                        className={cn(
                          "w-full",
                          !isTimeRangeValid(slot.startTime, slot.endTime) && "border-destructive",
                        )}
                      >
                        <SelectValue placeholder="End time" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[300px]">
                        {TIME_OPTIONS.map((time) => (
                          <SelectItem key={`end-${time}`} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {!isTimeRangeValid(slot.startTime, slot.endTime) && (
                  <p className="text-destructive text-xs">End time must be after start time</p>
                )}
              </div>
            ))}
          </div>

          <Button type="button" variant="outline" onClick={addTimeSlot} className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add Another Time Slot
          </Button>
        </>
      )}
    </div>
  )
}
