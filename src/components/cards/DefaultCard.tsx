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
    <Card>
      <CardHeader className="pb-2">
        <CardTitle
          className={`${nounsFont.className} text-xl font-light text-primary xs:text-2xl`}
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
