import { type ReactNode } from "react";

import { nounsFont } from "@/lib/fonts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export type DefaultCardProps = {
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
};

export default function DefaultCard({
  title,
  description,
  children,
  footer,
}: DefaultCardProps) {
  return (
    <Card className="bg-brandWhiteLavender">
      <CardHeader>
        <CardTitle
          className={`${nounsFont.className} text-2xl text-primary xs:text-3xl`}
        >
          {title}
        </CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
}
