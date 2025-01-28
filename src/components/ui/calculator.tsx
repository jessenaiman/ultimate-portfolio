"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "radix-ui"
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { GraphingPlane } from "./graphing-plane" // Add this import

export default function Calculator() {
  const [displayValue, setDisplayValue] = useState("0")
  const [graphPoints, setGraphPoints] = useState<{ x: number; y: number }[]>([])
  const [currentTab, setCurrentTab] = useState("calculator")

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
    <div className="w-full max-w-4xl mx-auto p-4">
      <Tabs value={currentTab} onValueChange={setCurrentTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="calculator">Calculator</TabsTrigger>
          <TabsTrigger value="graph">Graph</TabsTrigger>
        </TabsList>

        <TabsContent value="calculator">
          <Card>
            <CardContent className="p-6">
              <Input value={displayValue} readOnly className="text-right text-2xl mb-4 font-mono" />
              <div className="grid grid-cols-4 gap-2">
                {/* Scientific Functions */}
                <Button variant="outline" onClick={() => handleScientific("sin")}>
                  sin
                </Button>
                <Button variant="outline" onClick={() => handleScientific("cos")}>
                  cos
                </Button>
                <Button variant="outline" onClick={() => handleScientific("tan")}>
                  tan
                </Button>
                <Button variant="outline" onClick={() => handleScientific("log")}>
                  log
                </Button>
                <Button variant="outline" onClick={() => handleScientific("ln")}>
                  ln
                </Button>
                <Button variant="outline" onClick={() => handleScientific("sqrt")}>
                  √
                </Button>
                <Button variant="outline" onClick={() => handleScientific("pow2")}>
                  x²
                </Button>
                <Button variant="outline" onClick={() => handleScientific("pow3")}>
                  x³
                </Button>

                {/* Numbers and Basic Operators */}
                <Button variant="outline" onClick={() => handleNumber("7")}>
                  7
                </Button>
                <Button variant="outline" onClick={() => handleNumber("8")}>
                  8
                </Button>
                <Button variant="outline" onClick={() => handleNumber("9")}>
                  9
                </Button>
                <Button variant="outline" onClick={() => handleOperator("/")}>
                  ÷
                </Button>
                <Button variant="outline" onClick={() => handleNumber("4")}>
                  4
                </Button>
                <Button variant="outline" onClick={() => handleNumber("5")}>
                  5
                </Button>
                <Button variant="outline" onClick={() => handleNumber("6")}>
                  6
                </Button>
                <Button variant="outline" onClick={() => handleOperator("*")}>
                  ×
                </Button>
                <Button variant="outline" onClick={() => handleNumber("1")}>
                  1
                </Button>
                <Button variant="outline" onClick={() => handleNumber("2")}>
                  2
                </Button>
                <Button variant="outline" onClick={() => handleNumber("3")}>
                  3
                </Button>
                <Button variant="outline" onClick={() => handleOperator("-")}>
                  -
                </Button>
                <Button variant="outline" onClick={() => handleNumber("0")}>
                  0
                </Button>
                <Button variant="outline" onClick={() => handleNumber(".")}>
                  .
                </Button>
                <Button variant="outline" onClick={calculate}>
                  =
                </Button>
                <Button variant="outline" onClick={() => handleOperator("+")}>
                  +
                </Button>
                <Button variant="outline" className="col-span-4" onClick={clear}>
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="graph">
          <Card>
            <CardContent className="p-6">
              <GraphingPlane points={graphPoints} />
              <div className="mt-4 grid grid-cols-2 gap-4">
                <Button
                  onClick={() =>
                    setGraphPoints([
                      { x: -3.56, y: -2.41 },
                      { x: 0.18, y: -4.81 },
                    ])
                  }
                >
                  Plot Example Points
                </Button>
                <Button onClick={() => setGraphPoints([])}>Clear Graph</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}