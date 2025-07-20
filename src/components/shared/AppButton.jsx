import { Button, Spinner } from 'flowbite-react';

export default function AppButton({
  children,
  isLoading,
  className,
  ...props
}) {
  return (
    <Button
      {...props}
      className={`flex items-center gap-2 hover:cursor-pointer ${className}`}
      disabled={isLoading}
    >
      {isLoading && <Spinner size="sm" />} {children}
    </Button>
  );
}
