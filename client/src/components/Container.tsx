import clsx from "clsx";

type ContainerProps = {
  className?: string;
  children?: React.ReactNode;
};
export default function Container({ className, children }: ContainerProps) {
  return <div className={clsx(className,"container mx-auto py-4")}>{children}</div>;
}
