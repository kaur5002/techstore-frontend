"use client";
import { useId } from "react";
import { Button } from "./Button";
type Props = { value: number; onChange: (value: number) => void; label?: string; min?: number };
export function QuantitySelector({ value, onChange, label = "Quantity", min = 1 }: Props) { const labelId = useId(); return <div className="quantity"><span className="sr-only" id={labelId}>{label}</span><Button variant="secondary" aria-label={`Decrease ${label.toLowerCase()}`} onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min}>−</Button><output aria-live="polite" aria-labelledby={labelId}>{value}</output><Button variant="secondary" aria-label={`Increase ${label.toLowerCase()}`} onClick={() => onChange(value + 1)} disabled={value >= 99}>+</Button></div>; }
