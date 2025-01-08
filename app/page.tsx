"use client"

import { useState } from "react"
import Image from "next/image"
import toast from "react-hot-toast"

export default function Home() {
    const [inputValue,   setInputValue]   = useState("0")
    const [outputValue,  setOutputValue]  = useState("0")
    const [inputOption,  setInputOption]  = useState("USD")
    const [outputOption, setOutputOption] = useState("USD")
    const handleSubmit = async () => {
        setOutputValue("")
        try {
            const res = await fetch("/api/endpoint-cvt", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    base_currency:   inputOption,
                    target_currency: outputOption,
                    amount:          parseFloat(inputValue)
                })
            })
            const data = await res.json()
            if (!res.ok) {
                console.log(data.error)
                throw new Error(`HTTP error! Status: ${res.status}`)
            }
            setOutputValue(`${data.result}`)
        } catch (error) {
            let msg = ""
            if (error instanceof Error) {
                msg = error.message
            } else {
                msg = "An unknown error occured."
            }
            toast.error(msg, {
                style: {
                    fontWeight: "bold"
                }
            })
        }
    }
    const currencies = [
        ["USD", "US Dollar ($)"],
        ["EUR", "Euro (€)"],
        ["JPY", "Japanese Yen (JP¥)"],
        ["GBP", "British Pound (£)"],
        ["AUD", "Australian Dollar (A$)"],
        ["CAD", "Canadian Dollar (C$)"],
        ["CHF", "Swiss Franc (₣)"],
        ["CNY", "Chinese Yuan (¥)"],
        ["SEK", "Swedish Krona (kr)"],
        ["HKD", "Honk Kong Dollar (HK$)"],
        ["MXN", "Mexican Peso (Mex$)"],
        ["ZAR", "South African Rand (R)"],
        ["BRL", "Brazilian Real (R$)"],
        ["AED", "UAE Dirham (Dh)"],
        ["TRY", "Turkish Lira (₺)"],
        ["HUF", "Hungarian Forint (Ft)"],
        ["SAR", "Saudi Riyal (SRl)"],
        ["RUB", "Russian Ruble (₽)"],
        ["PEN", "Peruvian Sol (S/)"],
        ["BAM", "Bosnian Convertible Mark (KM)"]
    ]
    return (
        <div>
            <input
                type="number"
                step="0.01"
                defaultValue="0"
                onChange={(ev) => setInputValue(ev.target.value)}
            />
            <Image
                className="dark:invert inline m-2 cursor-pointer"
                src="/arrow.png"
                alt=""
                width={128}
                height={96}
                priority
                onClick={handleSubmit}
            />
            <input
                type="number"
                step="0.01"
                value={outputValue}
                readOnly
            />
            <br />
            <div className="text-container m-2 ml-4">From...</div>
            <select
                onChange={
                    (ev) => {
                        const target = ev.target
                        const option = target.options[target.selectedIndex]
                        const name: any = option.getAttribute("name")
                        if (name instanceof string) {
                            setInputOption(name)
                        }
                    }
                }
            >
                {
                    currencies.map(([code, label]) => (
                        <option key={label} name={code}>
                            {label}
                        </option>
                    ))
                }
            </select>
            <div
                className="w-[160px] inline-block"
            ></div>
            <div className="text-container m-2 ml-4">To...</div>
            <select
                onChange={
                    (ev) => {
                        const target = ev.target
                        const option = target.options[target.selectedIndex]
                        const name: any = option.getAttribute("name")
                        if (name instanceof string) {
                            setOutputOption(name)
                        }
                    }
                }
            >
                {
                    currencies.map(([code, label]) => (
                        <option key={label} name={code}>
                            {label}
                        </option>
                    ))
                }
            </select>
        </div>
    )
}
