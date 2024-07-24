import React from 'react';
import { Input } from '@nextui-org/input';
import { SearchIcon } from '@/components/Icons';
import { Search } from 'lucide-react';

export const Searchbar = () => {
  return (
    <div className="w-full flex justify-center">
      <Input
        aria-label="Search"
        classNames={{
          inputWrapper: "bg-default-100",
          input: "text-sm",
        }}
        className="w-4/5 md:w-3/5  text-primary-400"
        labelPlacement="outside"
        placeholder="Search futsal..."
        startContent={
          <SearchIcon className="text-base text-default pointer-events-none flex-shrink-0" />
        }
        type="search"
      />
    </div>
  );
};

