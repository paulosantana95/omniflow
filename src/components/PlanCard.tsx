import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import clsx from "clsx";

interface PlanCardProps {
  title: string;
  benefits: string[];
  price: string;
  highlight?: boolean | null;
  buttonTitle: string;
  onTry: () => void;
}

export function PlanCard({
  title,
  benefits,
  price,
  highlight,
  buttonTitle,
  onTry,
}: PlanCardProps) {
  return (
    <div className="relative flex flex-col items-center w-full h-full">
      {highlight && (
        <div className="absolute -top-2 z-10 animate-pulse">
          <Badge className="text-sm px-4 py-1 bg-gradient-to-br from-green-500 to-blue-500 text-muted rounded-full shadow-xl">
            Melhor custo-benefício
          </Badge>
        </div>
      )}
      <div className={clsx(
        "relative w-full max-w-md transition-shadow h-full",
        {
          "p-[2px] bg-gradient-to-br from-green-500 to-blue-500 rounded-[18px]": highlight,
        }
      )}>
        <Card
          className={clsx(
            "bg-card text-primary p-8 h-full rounded-2xl",
            {
              "shadow-xl": highlight,
              "shadow-md": !highlight,
            }
          )}
        >
          <CardHeader>
            <CardTitle className="text-2xl font-bold mb-2 text-shadow-2xs">{title}</CardTitle>
            <div className="text-3xl font-semibold bg-gradient-to-br from-green-500 to-blue-500 bg-clip-text text-transparent text-shadow-2xs">{price}</div>
          </CardHeader>
          <CardContent className="flex flex-col h-full">
            <ul className="space-y-4 mb-6 flex-1">
              {benefits.map((benefit, idx) => (
                <li key={idx} className="flex gap-2 text-left text-md leading-tight">
                  <span className="flex items-center justify-center h-5">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </span>
                  <span className="flex-1">{benefit}</span>
                </li>
              ))}
            </ul>
            <div className="w-full mt-auto">
              <Button className="w-full cursor-pointer bg-gradient-to-br from-green-500 to-blue-500  text-primary text-base py-2 shadow-md text-shadow-2xs" onClick={onTry}>
                {buttonTitle}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}