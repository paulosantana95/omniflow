// ==== Arquivo: src/components/PlanCard.tsx ====
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import clsx from "clsx";

interface PlanCardProps {
  title: string;
  benefits: string[];
  price: string;
  highlight?: string | null;
  tryFree: string;
  onTry: () => void;
  animate?: boolean;
}

export function PlanCard({
  title,
  benefits,
  price,
  highlight,
  tryFree,
  onTry,
  animate = false,
}: PlanCardProps) {
  return (
    <div className="relative flex flex-col items-center w-full h-full">
      {highlight && (
        <div className="absolute -top-2 z-10 animate-pulse">
          <Badge className="text-sm px-4 py-1 bg-purple-600 text-white rounded-full shadow-md">
            {highlight}
          </Badge>
        </div>
      )}
      <div className="relative w-full max-w-md transition-shadow h-full">
        <Card
          className={clsx(
            "bg-white text-black p-8 h-full rounded-2xl",
            {
              "border-2 border-purple-500 shadow-xl": animate,
              "shadow-md": !animate,
            }
          )}
        >
          <CardHeader>
            <CardTitle className="text-2xl font-bold mb-2">{title}</CardTitle>
            <div className="text-3xl font-semibold text-purple-600">{price}</div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 mb-6">
              {benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-center gap-2 text-base leading-tight">
                  <span className="flex items-center justify-center h-5">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </span>
                  <span className="flex-1">{benefit}</span>
                </li>
              ))}
            </ul>
            <Button className="w-full cursor-pointer bg-purple-600 hover:bg-purple-700 text-white text-base py-2" onClick={onTry}>
              {tryFree}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}