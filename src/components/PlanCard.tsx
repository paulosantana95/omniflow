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
          <Badge className="text-sm px-4 py-1 bg-gradient-to-br from-green-500 to-blue-500 text-muted rounded-full shadow-xl">
            {highlight}
          </Badge>
        </div>
      )}
      <div className={clsx(
        "relative w-full max-w-md transition-shadow h-full",
        {
          "p-[2px] bg-gradient-to-br from-green-500 to-blue-500 rounded-[18px]": animate,
        }
      )}>
        <Card
          className={clsx(
            "bg-card text-primary p-8 h-full rounded-2xl",
            {
              "shadow-xl": animate,
              "shadow-md": !animate,
            }
          )}
        >
          <CardHeader>
            <CardTitle className="text-2xl font-bold mb-2">{title}</CardTitle>
            <div className="text-3xl font-semibold bg-gradient-to-br from-green-500 to-blue-500 bg-clip-text text-transparent text-shadow-2xs">{price}</div>
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
            <Button className="w-full cursor-pointer bg-gradient-to-br from-green-500 to-blue-500  text-muted text-base py-2" onClick={onTry}>
              {tryFree}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}