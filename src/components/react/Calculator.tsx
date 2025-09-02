"use client"

import { useState } from "react"

export default function Calculator() {
  const [displayValue, setDisplayValue] = useState("0")
  const [graphPoints, setGraphPoints] = useState<{ x: number; y: number }[]>([])

  // Scientific functions
  const scientificFunctions = {
    sin: Math.sin,
    cos: Math.cos,
    tan: Math.tan,
    log: Math.log10,
    ln: Math.log,
    sqrt: Math.sqrt,
    pow2: (x: number) => Math.pow(x, 2),
    pow3: (x: number) => Math.pow(x, 3),
  }

  const handleNumber = (num: string) => {
    setDisplayValue((prev) => (prev === "0" ? num : prev + num))
  }

  const handleOperator = (op: string) => {
    setDisplayValue((prev) => prev + op)
  }

  const handleScientific = (func: keyof typeof scientificFunctions) => {
    try {
      const value = Number.parseFloat(displayValue)
      const result = scientificFunctions[func](value)
      setDisplayValue(result.toString())
    } catch (error) {
      setDisplayValue("Error")
    }
  }

  const calculate = () => {
    try {
      setDisplayValue(eval(displayValue).toString())
    } catch {
      setDisplayValue("Error")
    }
  }

  const clear = () => {
    setDisplayValue("0")
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div role="tablist" className="tabs tabs-lifted">
        <input type="radio" name="calculator_tabs" role="tab" className="tab" aria-label="Calculator" defaultChecked />
        <div role="tabpanel" className="tab-content bg-base-200 border-base-300 rounded-box p-6">
            <input
              type="text"
              value={displayValue}
              readOnly
              className="input input-bordered text-right text-2xl mb-4 font-mono w-full"
            />
            <div className="grid grid-cols-4 gap-2">
              {/* Scientific Functions */}
              <button className="btn btn-outline" onClick={() => handleScientific("sin")}>sin</button>
              <button className="btn btn-outline" onClick={() => handleScientific("cos")}>cos</button>
              <button className="btn btn-outline" onClick={() => handleScientific("tan")}>tan</button>
              <button className="btn btn-outline" onClick={() => handleScientific("log")}>log</button>
              <button className="btn btn-outline" onClick={() => handleScientific("ln")}>ln</button>
              <button className="btn btn-outline" onClick={() => handleScientific("sqrt")}>√</button>
              <button className="btn btn-outline" onClick={() => handleScientific("pow2")}>x²</button>
              <button className="btn btn-outline" onClick={() => handleScientific("pow3")}>x³</button>

              {/* Numbers and Basic Operators */}
              <button className="btn" onClick={() => handleNumber("7")}>7</button>
              <button className="btn" onClick={() => handleNumber("8")}>8</button>
              <button className="btn" onClick={() => handleNumber("9")}>9</button>
              <button className="btn btn-primary" onClick={() => handleOperator("+")}>+</button>
              <button className="btn" onClick={() => handleNumber("4")}>4</button>
              <button className="btn" onClick={() => handleNumber("5")}>5</button>
              <button className="btn" onClick={() => handleNumber("6")}>6</button>
              <button className="btn btn-primary" onClick={() => handleOperator("-")}>-</button>
              <button className="btn" onClick={() => handleNumber("1")}>1</button>
              <button className="btn" onClick={() => handleNumber("2")}>2</button>
              <button className="btn" onClick={() => handleNumber("3")}>3</button>
              <button className="btn btn-primary" onClick={() => handleOperator("*")}>×</button>
              <button className="btn" onClick={() => handleNumber("0")}>0</button>
              <button className="btn" onClick={() => handleNumber(".")}>.</button>
              <button className="btn btn-accent" onClick={calculate}>=</button>
              <button className="btn btn-primary" onClick={() => handleOperator("/")}>÷</button>
              <button className="btn btn-error col-span-4" onClick={clear}>Clear</button>
            </div>
        </div>

        <input type="radio" name="calculator_tabs" role="tab" className="tab" aria-label="Graph" />
        <div role="tabpanel" className="tab-content bg-base-200 border-base-300 rounded-box p-6">
          <p>Graph functionality coming soon...</p>
        </div>
      </div>
    </div>
  )
}
