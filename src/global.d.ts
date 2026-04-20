declare module "lucide-react" {
  import { ReactNode, SVGProps } from "react";

  export interface IconProps extends SVGProps<SVGSVGElement> {
    size?: number | string;
    strokeWidth?: number;
    absoluteStrokeWidth?: boolean;
    children?: ReactNode;
  }

  export const Heart: React.FC<IconProps>;
  export const Gift: React.FC<IconProps>;
  export const PartyPopper: React.FC<IconProps>;
  export const Volume2: React.FC<IconProps>;
  export const VolumeX: React.FC<IconProps>;
  export const Star: React.FC<IconProps>;
  export const Cake: React.FC<IconProps>;
  export const Sparkles: React.FC<IconProps>;
  export const ChevronRight: React.FC<IconProps>;
  export const Camera: React.FC<IconProps>;
  export const MessageCircle: React.FC<IconProps>;
  export const ArrowRight: React.FC<IconProps>;
}

declare module "motion/react" {
  export * from "motion";
  export { default } from "motion";
}
