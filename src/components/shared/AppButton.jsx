import { Button, Spinner } from 'flowbite-react';

export default function AppButton({ children, isLoading, ...props }) {
  return (
    <Button  {...props} className='flex items-center gap-2 hover:cursor-pointer' disabled={isLoading} >
     { isLoading && <Spinner size="sm" /> } { children }
    </Button>
  );
}
