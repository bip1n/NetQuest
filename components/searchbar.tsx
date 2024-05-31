import React from 'react';
import { Input } from '@nextui-org/input';
import { SearchIcon } from '@/components/icons';

export const Searchbar = () => {
  return (
    <div className="w-full flex justify-center mt-4">
      <Input
        aria-label="Search"
        classNames={{
          inputWrapper: "bg-default-100",
          input: "text-sm",
        }}
        className="w-4/5 md:w-3/5"
        labelPlacement="outside"
        placeholder="Search futsal..."
        startContent={
          <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
        }
        type="search"
      />
    </div>
  );
};
