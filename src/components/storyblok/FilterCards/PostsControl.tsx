"use client"

import { useId } from "react"
import "./PostsControl.css"

interface PostsControlProps {
  label: string
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
  className?: string
}

export function PostsControl({
  label,
  value,
  onChange,
  options,
  className = "select-wrap",
}: PostsControlProps) {
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
