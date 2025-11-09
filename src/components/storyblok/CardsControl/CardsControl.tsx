"use client"

import { useId } from "react"
import "./CardsControl.css"

interface CardsControlProps {
  label: string
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
  className?: string
}

export function CardsControl({
  label,
  value,
  onChange,
  options,
  className = "select-wrap",
}: CardsControlProps) {
  const selectId = useId()

  return (
    <div className={className}>
      <label htmlFor={selectId} className="select-label">
        {label}:
      </label>
      <select
        id={selectId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="select"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
